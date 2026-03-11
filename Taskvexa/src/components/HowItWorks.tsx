import { motion } from "motion/react";
import { Section, SectionHeader } from "./ui/Section";
import { Download, CheckCircle2, Coins, Wallet } from "lucide-react";

const steps = [
  {
    title: "Download the App",
    description: "Get the app from the Play Store and create your free account in seconds.",
    icon: Download,
    color: "text-blue-400",
  },
  {
    title: "Complete Simple Tasks",
    description: "Choose from hundreds of daily tasks like watching ads or following pages.",
    icon: CheckCircle2,
    color: "text-brand-400",
  },
  {
    title: "Earn Coins",
    description: "Get rewarded instantly with coins for every task you successfully complete.",
    icon: Coins,
    color: "text-yellow-400",
  },
  {
    title: "Withdraw Your Earnings",
    description: "Convert your coins to real cash and withdraw to your preferred wallet.",
    icon: Wallet,
    color: "text-green-400",
  },
];

export function HowItWorks() {
  return (
    <Section id="how-it-works" className="bg-dark-800/50">
      <SectionHeader 
        title="How It Works" 
        subtitle="Start earning money in four simple steps. No experience required."
      />
      
      <div className="relative max-w-5xl mx-auto">
        {/* Connecting Line */}
        <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-blue-500/20 via-brand-500/20 to-green-500/20 -translate-y-1/2 rounded-full" />
        
        <div className="grid md:grid-cols-4 gap-8 relative z-10">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="relative"
            >
              <div className="glass-card rounded-2xl p-6 h-full flex flex-col items-center text-center relative z-10 bg-dark-900">
                <div className="w-16 h-16 rounded-full glass flex items-center justify-center mb-6 relative">
                  <div className="absolute inset-0 rounded-full bg-gradient-glow opacity-50" />
                  <step.icon size={32} className={step.color} />
                  
                  {/* Step Number Badge */}
                  <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-brand-500 text-white text-xs font-bold flex items-center justify-center shadow-lg">
                    {index + 1}
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
