import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Section, SectionHeader } from "./ui/Section";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Is this app really free?",
    answer: "Yes, Taskvexa is 100% free to download and use. We will never ask you for money or credit card details to complete tasks or withdraw your earnings.",
  },
  {
    question: "How do I earn money?",
    answer: "You earn coins by completing various simple tasks like watching short video ads, following social media accounts, signing up for newsletters, or testing new apps. These coins can then be converted into real cash.",
  },
  {
    question: "How can I withdraw my earnings?",
    answer: "Once you reach the minimum withdrawal threshold ($5), you can request a payout. We support multiple payment methods including PayPal, Payoneer, Crypto (USDT), and direct bank transfers in select countries.",
  },
  {
    question: "Is the app safe and secure?",
    answer: "Absolutely. We use industry-standard encryption to protect your data. We only partner with verified advertisers, and we never sell your personal information to third parties.",
  },
  {
    question: "How long does a withdrawal take?",
    answer: "Most withdrawals are processed instantly or within 24 hours. Bank transfers might take 2-3 business days depending on your location and bank.",
  },
  {
    question: "Can I use multiple accounts?",
    answer: "No, using multiple accounts is strictly prohibited and will result in a permanent ban of all associated accounts and forfeiture of earnings. One account per person/device is allowed.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <Section id="faq">
      <SectionHeader 
        title="Frequently Asked Questions" 
        subtitle="Got questions? We've got answers. If you need more help, our support team is available 24/7."
      />
      
      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="glass-card rounded-2xl overflow-hidden"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
            >
              <span className="font-semibold text-lg pr-8">{faq.question}</span>
              <ChevronDown 
                size={20} 
                className={`text-brand-400 transition-transform duration-300 flex-shrink-0 ${openIndex === index ? "rotate-180" : ""}`} 
              />
            </button>
            
            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="px-6 pb-5 text-gray-400 leading-relaxed border-t border-white/5 pt-4">
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
