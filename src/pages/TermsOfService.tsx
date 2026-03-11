import { Section, SectionHeader } from "../components/ui/Section";

export function TermsOfService() {
  return (
    <Section className="pt-32 pb-20">
      <SectionHeader title="Terms and Conditions" align="left" />
      <div className="prose prose-invert max-w-none text-gray-300">
        <p className="mb-4">Last updated: March 2026</p>
        
        <h3 className="text-xl font-bold text-white mt-8 mb-4">1. Agreement to Terms</h3>
        <p className="mb-4">
          By accessing or using Taskvexa, you agree to be bound by these Terms and Conditions. 
          If you disagree with any part of the terms, then you may not access the service.
        </p>

        <h3 className="text-xl font-bold text-white mt-8 mb-4">2. User Accounts</h3>
        <p className="mb-4">
          When you create an account with us, you must provide us information that is accurate, complete, and current at all times. 
          Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.
        </p>
        <p className="mb-4">
          You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password.
          You agree not to disclose your password to any third party. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.
        </p>

        <h3 className="text-xl font-bold text-white mt-8 mb-4">3. Earning and Withdrawals</h3>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>Earnings are accumulated in the form of coins which can be converted to real currency.</li>
          <li>The conversion rate and minimum withdrawal threshold are subject to change at our discretion.</li>
          <li>We reserve the right to withhold payments if we suspect fraudulent activity, use of bots, or violation of task guidelines.</li>
          <li>Users are responsible for any taxes associated with their earnings.</li>
        </ul>

        <h3 className="text-xl font-bold text-white mt-8 mb-4">4. Prohibited Activities</h3>
        <p className="mb-4">
          You agree not to engage in any of the following prohibited activities:
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>Creating multiple accounts per person or device.</li>
          <li>Using VPNs, proxies, or other methods to mask your location.</li>
          <li>Using automated scripts, bots, or macros to complete tasks.</li>
          <li>Providing false information during registration or task completion.</li>
        </ul>
      </div>
    </Section>
  );
}
