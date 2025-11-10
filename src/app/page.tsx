/**
 * App: Customer Registration Module
 * Package: src/app
 * File: page.tsx
 * Version: 0.1.0
 * Turns: 1
 * Author: AI Coding Agent
 * Date: 2025-11-10T20:52:42Z
 * Exports: default
 * Description: Renders the health plan overview and embeds matching JSON-LD structured data.
 */
const healthPlanJsonLd = {
  "@context": "http://health-lifesci.schema.org/",
  "@type": "HealthInsurancePlan",
  usesHealthPlanIdType: "http://healthplan.schema.org/HealthPlanIdTypeHIOS",
  healthPlanId: "12345XX9876543",
  name: "Sample Gold Health Plan",
  summaryUrl: "http://url/to/summary/benefits/coverage",
  marketingUrl: "http://url/to/health/plan/information",
  contactPoint: {
    "@type": "ContactPoint",
    email: "email@address.com",
  },
  healthPlanNetworkTiers: [
    "http://healthplan.schema.org/PreferredNetwork",
    "http://healthplan.schema.org/NonPreferredNetwork",
  ],
  includesHealthPlanFormulary: [
    {
      "@type": "HealthPlanFormulary",
      healthPlanDrugTier: "http://healthplan.schema.org/DrugTierGeneric",
      offersPrescriptionByMail: true,
      healthPlanCostSharing: [
        {
          "@type": "HealthPlanCostSharingSpecification",
          healthPlanPharmacyType: "1-MONTH-IN-RETAIL",
          healthPlanCopay: {
            "@type": "PriceSpecification",
            price: 20,
            currency: "USD",
          },
          healthPlanCopayOption:
            "http://healthplan.schema.org/HealthPlanCopayAfterDeductable",
          healthPlanCoinsuranceRate: 0.1,
          healthPlanCoinsuranceOption:
            "http://healthplan.schema.org/HealthPlanCoinsuranceBeforeDeductable",
        },
        {
          "@type": "HealthPlanCostSharingSpecification",
          healthPlanPharmacyType: "1-MONTH-IN-MAIL",
          healthPlanCopay: {
            "@type": "PriceSpecification",
            price: 0,
            currency: "USD",
          },
          healthPlanCopayOption:
            "http://healthplan.schema.org/HealthPlanCoPayNoCharge",
          healthPlanCoinsuranceRate: 0.2,
          healthPlanCoinsuranceOption:
            "http://healthplan.schema.org/HealthPlanCoinsuranceNone",
        },
      ],
    },
    {
      "@type": "HealthPlanFormulary",
      healthPlanDrugTier: "http://healthplan.schema.org/DrugTierBrand",
      offersPrescriptionByMail: true,
      healthPlanCostSharing: [
        {
          "@type": "HealthPlanCostSharingSpecification",
          healthPlanPharmacyType: "1-MONTH-IN-RETAIL",
          healthPlanCopay: {
            "@type": "PriceSpecification",
            price: 15,
            currency: "USD",
          },
          healthPlanCopayOption:
            "http://healthplan.schema.org/HealthPlanCopayNone",
          healthPlanCoinsuranceRate: 0,
          healthPlanCoinsuranceOption:
            "http://healthplan.schema.org/HealthPlanCoinsuranceNone",
        },
        {
          "@type": "HealthPlanCostSharingSpecification",
          healthPlanPharmacyType: "1-MONTH-IN-MAIL",
          healthPlanCopay: {
            "@type": "PriceSpecification",
            price: 20,
            currency: "USD",
          },
          healthPlanCopayOption:
            "http://healthplan.schema.org/HealthPlanCopayAfterDeductible",
          healthPlanCoinsuranceRate: 0.1,
          healthPlanCoinsuranceOption:
            "http://healthplan.schema.org/HealthPlanCoinsuranceBeforeDeductible",
        },
      ],
    },
  ],
} as const;

export default function HomePage() {
  const structuredData = JSON.stringify(healthPlanJsonLd);

  return (
    <main>
      <section>
        <h1>Sample Gold Health Plan</h1>
        <p>
          This plan showcases cost sharing across preferred and non-preferred networks
          alongside clear formulary coverage, matching the structured data exposed for
          search indexing.
        </p>
        <h2>Plan Highlights</h2>
        <ul>
          <li>HIOS identifier {healthPlanJsonLd.healthPlanId}</li>
          <li>Preferred and non-preferred pharmacy network tiers</li>
          <li>Mail-order fulfillment available for all drug tiers</li>
        </ul>
        <p>
          Review the <a href={healthPlanJsonLd.summaryUrl}>Summary of Benefits</a> or learn
          more from the <a href={healthPlanJsonLd.marketingUrl}>plan marketing page</a>.
        </p>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: structuredData }}
        />
      </section>
    </main>
  );
}
