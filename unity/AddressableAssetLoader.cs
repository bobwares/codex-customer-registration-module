using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using UnityEngine;
using UnityEngine.AddressableAssets;
using UnityEngine.ResourceManagement.AsyncOperations;

/// <summary>
/// Utility MonoBehaviour for loading and instantiating Addressable assets with
/// caching, cancellation support, and graceful cleanup.
/// Attach this component to a bootstrap object (e.g. a "GameSystems" GameObject).
/// </summary>
[DisallowMultipleComponent]
public class AddressableAssetLoader : MonoBehaviour
{
    [Tooltip("Optional list of assets to warm up as soon as the loader awakens.")]
    [SerializeField]
    private List<AssetReference> preloadAssets = new List<AssetReference>();
    private readonly Dictionary<object, AsyncOperationHandle> _loadedAssetHandles = new Dictionary<object, AsyncOperationHandle>();
    private readonly Dictionary<GameObject, AsyncOperationHandle<GameObject>> _instantiatedHandles = new Dictionary<GameObject, AsyncOperationHandle<GameObject>>();

    private void Awake()
    {
        if (preloadAssets is { Count: > 0 })
        {
            _ = PreloadAssetsAsync();
        }
    }

    /// <summary>
    /// Loads an addressable asset by reference and caches the AsyncOperationHandle so it can be released later.
    /// </summary>
    /// <typeparam name="T">The UnityEngine.Object type expected from the load.</typeparam>
    /// <param name="reference">The asset reference declared in the Addressables system.</param>
    /// <param name="cancellationToken">Token that cancels the load operation. Cancelling releases the handle.</param>
    /// <returns>The loaded asset instance.</returns>
    public async Task<T> LoadAssetAsync<T>(AssetReference reference, CancellationToken cancellationToken = default)
        where T : UnityEngine.Object
    {
        if (reference == null)
        {
            throw new ArgumentNullException(nameof(reference));
        }

        if (!reference.RuntimeKeyIsValid())
        {
            throw new InvalidOperationException($"Asset reference '{reference.RuntimeKey}' is not valid.");
        }

        var key = reference.RuntimeKey;
        if (_loadedAssetHandles.TryGetValue(key, out var cachedHandle))
        {
            if (cachedHandle.IsValid() && cachedHandle.Result is T cachedResult)
            {
                return cachedResult;
            }

            CleanupHandle(key, cachedHandle);
        }

        var handle = Addressables.LoadAssetAsync<T>(reference);

        try
        {
            using var ctr = RegisterCancellation(handle, cancellationToken, key);

            await handle.Task.ConfigureAwait(false);
            cancellationToken.ThrowIfCancellationRequested();

            if (handle.Status != AsyncOperationStatus.Succeeded)
            {
                throw new InvalidOperationException($"Failed to load addressable asset '{key}'. Status: {handle.Status}");
            }

            _loadedAssetHandles[key] = handle;
            return handle.Result;
        }
        catch
        {
            CleanupHandle(key, handle);
            throw;
        }
    }

    /// <summary>
    /// Loads an addressable asset by string key.
    /// </summary>
    public async Task<T> LoadAssetAsync<T>(string addressKey, CancellationToken cancellationToken = default)
        where T : UnityEngine.Object
    {
        if (string.IsNullOrWhiteSpace(addressKey))
        {
            throw new ArgumentException("Address key cannot be null or whitespace.", nameof(addressKey));
        }

        var handle = Addressables.LoadAssetAsync<T>(addressKey);
        var key = (object)addressKey;

        if (_loadedAssetHandles.TryGetValue(key, out var cachedHandle))
        {
            if (cachedHandle.IsValid() && cachedHandle.Result is T cachedResult)
            {
                return cachedResult;
            }

            CleanupHandle(key, cachedHandle);
        }

        try
        {
            using var ctr = RegisterCancellation(handle, cancellationToken, key);

            await handle.Task.ConfigureAwait(false);
            cancellationToken.ThrowIfCancellationRequested();

            if (handle.Status != AsyncOperationStatus.Succeeded)
            {
                throw new InvalidOperationException($"Failed to load addressable asset '{addressKey}'. Status: {handle.Status}");
            }

            _loadedAssetHandles[key] = handle;
            return handle.Result;
        }
        catch
        {
            CleanupHandle(key, handle);
            throw;
        }
    }

    /// <summary>
    /// Instantiates an Addressable prefab and tracks the handle so instances can be released.
    /// </summary>
    public async Task<GameObject> InstantiateAsync(
        AssetReferenceGameObject reference,
        Transform parent = null,
        bool instantiateInWorldSpace = false,
        CancellationToken cancellationToken = default)
    {
        if (reference == null)
        {
            throw new ArgumentNullException(nameof(reference));
        }

        if (!reference.RuntimeKeyIsValid())
        {
            throw new InvalidOperationException($"Prefab reference '{reference.RuntimeKey}' is not valid.");
        }

        var handle = reference.InstantiateAsync(parent, instantiateInWorldSpace);

        try
        {
            using var ctr = RegisterCancellation(handle, cancellationToken);

            await handle.Task.ConfigureAwait(false);
            cancellationToken.ThrowIfCancellationRequested();

            if (handle.Status != AsyncOperationStatus.Succeeded)
            {
                throw new InvalidOperationException($"Failed to instantiate addressable prefab '{reference.RuntimeKey}'. Status: {handle.Status}");
            }

            var instance = handle.Result;
            _instantiatedHandles[instance] = handle;
            return instance;
        }
        catch
        {
            if (handle.IsValid())
            {
                Addressables.ReleaseInstance(handle);
            }

            throw;
        }
    }

    /// <summary>
    /// Releases the cached handle for a previously loaded asset.
    /// </summary>
    public void Release(AssetReference reference)
    {
        if (reference == null)
        {
            return;
        }

        ReleaseByKey(reference.RuntimeKey);
    }

    /// <summary>
    /// Releases an addressable asset loaded by string key.
    /// </summary>
    public void Release(string addressKey)
    {
        if (string.IsNullOrWhiteSpace(addressKey))
        {
            return;
        }

        ReleaseByKey(addressKey);
    }

    /// <summary>
    /// Releases an instantiated prefab instance.
    /// </summary>
    public void ReleaseInstance(GameObject instance)
    {
        if (instance == null)
        {
            return;
        }

        if (_instantiatedHandles.TryGetValue(instance, out var handle))
        {
            if (handle.IsValid())
            {
                Addressables.ReleaseInstance(handle);
            }

            _instantiatedHandles.Remove(instance);
        }
        else
        {
            Addressables.ReleaseInstance(instance);
        }
    }

    /// <summary>
    /// Releases all cached asset and instance handles. Called automatically on destroy.
    /// </summary>
    public void ReleaseAll()
    {
        foreach (var (key, handle) in _loadedAssetHandles)
        {
            if (handle.IsValid())
            {
                Addressables.Release(handle);
            }
        }

        _loadedAssetHandles.Clear();

        foreach (var (instance, handle) in _instantiatedHandles)
        {
            if (handle.IsValid())
            {
                Addressables.ReleaseInstance(handle);
            }
            else if (instance != null)
            {
                Addressables.ReleaseInstance(instance);
            }
        }

        _instantiatedHandles.Clear();
    }

    private async Task PreloadAssetsAsync()
    {
        var token = this.GetCancellationTokenOnDestroy();

        foreach (var reference in preloadAssets)
        {
            if (reference == null)
            {
                continue;
            }

            try
            {
                await LoadAssetAsync<UnityEngine.Object>(reference, token).ConfigureAwait(false);
            }
            catch (OperationCanceledException)
            {
                break;
            }
            catch (Exception ex)
            {
                Debug.LogError($"Failed to preload addressable asset '{reference.RuntimeKey}': {ex.Message}");
            }
        }
    }

    private void ReleaseByKey(object key)
    {
        if (key == null)
        {
            return;
        }

        if (_loadedAssetHandles.TryGetValue(key, out var handle))
        {
            CleanupHandle(key, handle);
        }
    }

    private void CleanupHandle(object key, AsyncOperationHandle handle)
    {
        if (handle.IsValid())
        {
            Addressables.Release(handle);
        }

        _loadedAssetHandles.Remove(key);
    }

    private CancellationTokenRegistration RegisterCancellation(AsyncOperationHandle handle, CancellationToken token, object key)
    {
        if (!token.CanBeCanceled)
        {
            return default;
        }

        return token.Register(() =>
        {
            if (!handle.IsValid() || handle.IsDone)
            {
                return;
            }

            CleanupHandle(key, handle);
        });
    }

    private CancellationTokenRegistration RegisterCancellation(AsyncOperationHandle<GameObject> handle, CancellationToken token)
    {
        if (!token.CanBeCanceled)
        {
            return default;
        }

        return token.Register(() =>
        {
            if (!handle.IsValid() || handle.IsDone)
            {
                return;
            }

            Addressables.ReleaseInstance(handle);
        });
    }

    private void OnDestroy()
    {
        ReleaseAll();
    }
}
