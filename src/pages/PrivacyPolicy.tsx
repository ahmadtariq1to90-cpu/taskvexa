import { Section, SectionHeader } from "../components/ui/Section";

export function PrivacyPolicy() {
  return (
    <Section className="pt-32 pb-20">
      <SectionHeader title="Privacy Policy" align="left" />
      <div className="prose prose-invert max-w-none text-gray-300">
        <p className="mb-4">Last updated: March 2026</p>
        
        <h3 className="text-xl font-bold text-white mt-8 mb-4">1. Introduction</h3>
        <p className="mb-4">
          Welcome to Taskvexa. We respect your privacy and are committed to protecting your personal data. 
          This privacy policy will inform you as to how we look after your personal data when you visit our 
          website or use our mobile application and tell you about your privacy rights and how the law protects you.
        </p>

        <h3 className="text-xl font-bold text-white mt-8 mb-4">2. The Data We Collect About You</h3>
        <p className="mb-4">
          Personal data, or personal information, means any information about an individual from which that person can be identified. 
          We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li><strong>Identity Data</strong> includes first name, last name, username or similar identifier, marital status, title, date of birth and gender.</li>
          <li><strong>Contact Data</strong> includes billing address, delivery address, email address and telephone numbers.</li>
          <li><strong>Financial Data</strong> includes bank account and payment card details for processing withdrawals.</li>
          <li><strong>Transaction Data</strong> includes details about payments to and from you and other details of tasks you have completed.</li>
        </ul>

        <h3 className="text-xl font-bold text-white mt-8 mb-4">3. How We Use Your Personal Data</h3>
        <p className="mb-4">
          We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
          <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
          <li>Where we need to comply with a legal obligation.</li>
        </ul>

        <h3 className="text-xl font-bold text-white mt-8 mb-4">4. Data Security</h3>
        <p className="mb-4">
          We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorised way, altered or disclosed. 
          In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.
        </p>
      </div>
    </Section>
  );
}
