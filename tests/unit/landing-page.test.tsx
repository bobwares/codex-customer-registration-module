/**
 * App: Customer Registration Module
 * Package: tests/unit
 * File: landing-page.test.tsx
 * Version: 0.1.0
 * Turns: 1
 * Author: Bobwares (bobwares@outlook.com)
 * Date: 2025-10-07T17:47:06Z
 * Exports: none
 * Description: Smoke test validating the registration landing page renders marketing content.
 */
import { render, screen } from "@testing-library/react";
import RegistrationLandingPage from "@/app/(public)/page";

describe("RegistrationLandingPage", () => {
  it("renders the hero headline", () => {
    render(<RegistrationLandingPage />);
    expect(
      screen.getByRole("heading", { name: /create your customer account/i })
    ).toBeInTheDocument();
  });
});
