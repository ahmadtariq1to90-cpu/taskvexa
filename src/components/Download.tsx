import { motion } from "motion/react";
import { Section } from "./ui/Section";
import { Button } from "./ui/Button";
import { Download as DownloadIcon, Smartphone, Apple } from "lucide-react";
import { Link } from "react-router-dom";

export function Download() {
  return (
    <Section id="download" className="bg-brand-900/20 border-y border-brand-500/10 overflow-hidden relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-500/10 rounded-full blur-[80px] -z-10" />
      
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center lg:text-left"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
            Ready to Start <br className="hidden lg:block" />
            <span className="text-gradient">Earning Today?</span>
          </h2>
          
          <p className="text-lg md:text-xl text-gray-400 mb-8 max-w-2xl mx-auto lg:mx-0">
            Join over 500,000 users who are already making money online. Download the Taskvexa app now and get a $5 sign-up bonus!
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <Button size="lg" className="w-full sm:w-auto gap-3 bg-white text-dark-900 hover:bg-gray-100 shadow-white/20">
              <Smartphone size={24} />
              <div className="text-left">
                <div className="text-[10px] uppercase tracking-wider font-bold opacity-70">Download for</div>
                <div className="text-base font-bold leading-none">Android</div>
              </div>
            </Button>
            
            <Button variant="outline" size="lg" className="w-full sm:w-auto gap-3 opacity-50 cursor-not-allowed" disabled>
              <Apple size={24} />
              <div className="text-left">
                <div className="text-[10px] uppercase tracking-wider font-bold opacity-70">Coming Soon</div>
                <div className="text-base font-bold leading-none">iOS App</div>
              </div>
            </Button>
          </div>
          
          <div className="mt-8 flex items-center justify-center lg:justify-start gap-4 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <DownloadIcon size={16} className="text-brand-400" />
              <span>1M+ Downloads</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-gray-600" />
            <div className="flex items-center gap-2">
              <span className="font-bold text-white">4.8</span>
              <span>App Rating</span>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative mx-auto w-full max-w-[400px] lg:max-w-none flex justify-center"
        >
          {/* Floating Phone Image */}
          <div className="relative w-[300px] h-[600px] bg-dark-800 rounded-[3rem] border-[8px] border-dark-700 shadow-[0_20px_50px_rgba(45,212,191,0.2)] overflow-hidden z-10 transform lg:translate-x-10 lg:-translate-y-10">
            <div className="absolute top-0 inset-x-0 h-6 bg-dark-700 rounded-b-3xl w-40 mx-auto z-20" />
            <img 
              src="https://images.unsplash.com/photo-1616077168079-7e09a677fb2c?q=80&w=800&auto=format&fit=crop" 
              alt="App Interface" 
              className="w-full h-full object-cover opacity-90"
              referrerPolicy="no-referrer"
            />
            {/* Download Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-brand-900/90 via-transparent to-transparent flex flex-col justify-end p-8">
              <div className="w-16 h-16 rounded-2xl bg-brand-500 flex items-center justify-center mb-4 shadow-lg shadow-brand-500/50 mx-auto overflow-hidden">
                <img src="https://i.ibb.co/Gv8NMNnk/4efd2045-0146-46fd-9937-90b81ddcd94f-removebg-preview.png" alt="Taskvexa Logo" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <h3 className="text-2xl font-bold text-white text-center mb-2">Taskvexa</h3>
              <p className="text-brand-100 text-center text-sm">Make Money Online</p>
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
