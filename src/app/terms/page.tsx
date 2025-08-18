"use client";

import React from "react";
import { Highlighter } from "@/components/magicui/highlighter";
import { TermsBackgroundLines } from "@/components/ui/simple-background";

export default function Terms() {
  return (
    <main className="min-h-screen bg-gradient-to-tr from-green-50 via-white to-yellow-50">
      <TermsBackgroundLines>
        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-center mb-8 leading-tight">
              <span className="block">
                Terms and Conditions for
                <Highlighter action="highlight" color="#10CA33FF">
                  {" "}
                  RupeBeeApp
                </Highlighter>
              </span>
            </h1>

            <div className="prose prose-lg max-w-none">
              <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
              <p>
                Welcome to RupeBeeApp ("the App"), your comprehensive digital
                platform for financial tools, literacy, calculators, fraud
                protection, and personalized support. By using the App, you
                agree to the following Terms and Conditions, which govern access
                to our features, services, and content. Please read these Terms
                carefully before using the App.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">
                1. Acceptance of Terms
              </h2>
              <p>
                By downloading, accessing, or using RupeBeeApp, you confirm your
                agreement to these Terms. If you do not agree, please do not use
                the App.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">
                2. Eligibility
              </h2>
              <p>
                Users must be at least 18 years old or of the age of majority in
                their jurisdiction.
              </p>
              <p>
                For registration and authentication, valid government-issued
                identification (e.g., Aadhaar, PAN card) may be required.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">
                3. User Accounts and Registration
              </h2>
              <p>
                Users must provide accurate, current information during account
                creation.
              </p>
              <p>
                You are responsible for maintaining the confidentiality of login
                credentials and all activity under your account.
              </p>
              <p>
                In case of suspicious activity or unauthorized access, please
                notify us immediately.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">
                4. Privacy and Data Protection
              </h2>
              <p>
                Your personal information and data are processed according to
                our Privacy Policy, including secure authentication and
                encrypted communication.
              </p>
              <p>
                Sensitive data such as financial details, personal
                identification, and usage records are protected using
                industry-standard security protocols.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">
                5. App Features & Usage
              </h2>
              <h3 className="text-xl font-semibold mt-6 mb-3">
                a. Financial Calculators and Literacy
              </h3>
              <p>
                The financial calculators, budgeting tools, and educational
                modules are intended for informational purposes only and do not
                constitute personalized investment or financial advice.
              </p>
              <p>
                Calculations and literacy content are subject to change and may
                not reflect real-time market or regulatory updates.
              </p>

              <h3 className="text-xl font-semibold mt-6 mb-3">
                b. Security and Fraud Protection (Shield Module)
              </h3>
              <p>
                The Shield module offers tools such as fraud detection, security
                alerts, and complaint filing, designed to help protect your
                account and educate you about digital threats.
              </p>
              <p>
                AI-based fraud simulation and security warnings are intended as
                guidance; users should exercise caution and verify independently
                in case of alerts or warnings.
              </p>

              <h3 className="text-xl font-semibold mt-6 mb-3">
                c. Authentication & Data Submission
              </h3>
              <p>
                Biometric face verification, video/audio queries, and other data
                submission features use secure transmission and storage
                practices.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">
                6. Third-Party Services & Integrations
              </h2>
              <p>
                The App may integrate with third-party services (e.g., APIs,
                payment gateways). RupeBeeApp is not liable for actions,
                content, or data breaches by third-party providers.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">
                7. Intellectual Property
              </h2>
              <p>
                All content, designs, workflows, and code (including the app's
                organization, calculators, educational material, illustrations,
                and UI elements) are the intellectual property of RupeBeeApp or
                its licensors.
              </p>
              <p>Unauthorized reproduction or reuse is prohibited.</p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">
                8. Limitation of Liability
              </h2>
              <p>
                RupeBeeApp is provided "as is" without warranties of any kind.
                Use of calculators, educational content, security features, and
                support modules is at your own risk.
              </p>
              <p>
                The App does not guarantee financial outcomes, successful fraud
                prevention, or uninterrupted service.
              </p>
              <p>
                RupeBeeApp is not responsible for losses, damages, or
                liabilities arising from use or reliance on any content or
                feature of the App.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">
                9. User Responsibilities
              </h2>
              <p>
                You agree to use the App in compliance with applicable laws and
                regulations.
              </p>
              <p>
                You agree not to use the App for any unlawful, fraudulent, or
                abusive purposes.
              </p>
              <p>
                You agree not to attempt unauthorized access, reverse
                engineering, or disrupt the App's operation.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">
                10. Updates & Modifications
              </h2>
              <p>
                The Terms and Conditions may be updated periodically. Continued
                use of the App after updates constitutes acceptance of the
                revised Terms.
              </p>
              <p>
                Significant changes will be notified inside the App or via
                registered email.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">
                11. Support & Contact
              </h2>
              <p>
                For customer service or technical support, please use the
                support module inside the App, or contact our official support
                channel.
              </p>
              <p>
                For complaints related to security, fraud, or grievances, use
                the Shield module's complaint filing feature.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">
                12. Termination
              </h2>
              <p>
                RupeBeeApp reserves the right to restrict or terminate access
                for violation of these Terms or other misuse.
              </p>
              <p>
                On termination, all user data retained by the App will be
                handled as per our Privacy Policy.
              </p>

              <p className="font-medium mt-8">
                By continuing to use RupeBeeApp, you confirm that you have read,
                understood, and agreed to these Terms and Conditions.
              </p>
            </div>
          </div>
        </div>
      </TermsBackgroundLines>
    </main>
  );
}
