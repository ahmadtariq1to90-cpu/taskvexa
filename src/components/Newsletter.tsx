import { motion } from "motion/react";
import { Section } from "./ui/Section";
import { Button } from "./ui/Button";
import { Mail, ArrowRight } from "lucide-react";

export function Newsletter() {
  return (
    <Section className="py-12 md:py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="glass-card rounded-3xl p-8 md:p-12 text-center max-w-4xl mx-auto relative overflow-hidden"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-glow -z-10" />
        
        <div className="w-16 h-16 rounded-full glass flex items-center justify-center mx-auto mb-6 text-brand-400">
          <Mail size={32} />
        </div>
        
        <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
          Get High-Paying Task Alerts
        </h2>
        
        <p className="text-gray-400 mb-8 max-w-xl mx-auto">
          Subscribe to our newsletter and be the first to know when new, high-paying tasks are added to the platform. Don't miss out on easy money!
        </p>
        
        <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
          <div className="relative flex-grow">
            <input 
              type="email" 
              placeholder="Enter your email address" 
              className="w-full h-12 pl-4 pr-4 rounded-xl glass bg-dark-900/50 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-colors"
              required
            />
          </div>
          <Button type="submit" className="h-12 px-6 gap-2 whitespace-nowrap">
            Subscribe
            <ArrowRight size={18} />
          </Button>
        </form>
        <p className="text-xs text-gray-500 mt-4">We respect your privacy. Unsubscribe at any time.</p>
      </motion.div>
    </Section>
  );
}
