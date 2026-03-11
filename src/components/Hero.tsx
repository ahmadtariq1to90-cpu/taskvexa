import { motion } from "motion/react";
import { Button } from "./ui/Button";
import { ArrowRight, Star, Download } from "lucide-react";
import { Link } from "react-router-dom";

export function Hero() {
  return (
    <section id="home" className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-500/20 rounded-full blur-[80px] -z-10" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[80px] -z-10" />
      
      <div className="container mx-auto px-4 md:px-6 max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-brand-500/30 text-brand-300 text-sm font-medium mb-6">
              <Star size={14} className="fill-brand-300" />
              <span>#1 Task Earning App in 2026</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold leading-[1.1] mb-6">
              Earn Money Online by <span className="text-gradient">Completing Simple Tasks</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-400 mb-8 max-w-2xl mx-auto lg:mx-0">
              Turn your free time into real cash. Watch ads, follow social accounts, test apps, and get paid instantly to your favorite wallet.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Button size="lg" className="w-full sm:w-auto gap-2">
                <Download size={20} />
                Download App
              </Button>
              <a href="#features" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full gap-2">
                  Learn More
                  <ArrowRight size={20} />
                </Button>
              </a>
            </div>
            
            <div className="mt-10 flex items-center justify-center lg:justify-start gap-6 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span>Over 500k+ Active Users</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <img 
                      key={i}
                      src={`https://i.pravatar.cc/100?img=${i + 10}`}
                      alt="User" 
                      className="w-8 h-8 rounded-full border-2 border-dark-900"
                    />
                  ))}
                </div>
                <span>4.8/5 Rating</span>
              </div>
            </div>
          </motion.div>
          
          {/* Hero Image / Mockup */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative mx-auto w-full max-w-[400px] lg:max-w-none"
          >
            {/* Floating Elements */}
            <motion.div 
              animate={{ y: [-10, 10, -10] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute top-10 -left-10 glass-card p-4 rounded-2xl z-20 flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                <span className="text-green-400 font-bold">+$5</span>
              </div>
              <div>
                <p className="text-sm font-medium">Task Completed!</p>
                <p className="text-xs text-gray-400">Just now</p>
              </div>
            </motion.div>
            
            <motion.div 
              animate={{ y: [10, -10, 10] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-20 -right-8 glass-card p-4 rounded-2xl z-20 flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-full bg-brand-500/20 flex items-center justify-center">
                <Download size={20} className="text-brand-400" />
              </div>
              <div>
                <p className="text-sm font-medium">Instant Withdrawal</p>
                <p className="text-xs text-brand-400">Success</p>
              </div>
            </motion.div>

            {/* Phone Mockup Placeholder */}
            <div className="relative w-[300px] h-[600px] mx-auto bg-dark-800 rounded-[3rem] border-[8px] border-dark-700 shadow-2xl overflow-hidden z-10">
              <div className="absolute top-0 inset-x-0 h-6 bg-dark-700 rounded-b-3xl w-40 mx-auto z-20" />
              <img 
                src="https://images.unsplash.com/photo-1616077168079-7e09a677fb2c?q=80&w=800&auto=format&fit=crop" 
                alt="App Interface" 
                className="w-full h-full object-cover opacity-80"
                referrerPolicy="no-referrer"
              />
              {/* App UI Overlay Simulation */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-dark-900/90 flex flex-col justify-end p-6">
                <div className="glass-card p-4 rounded-2xl w-full mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-300">Total Balance</span>
                    <span className="text-xs text-brand-400">+12% today</span>
                  </div>
                  <div className="text-3xl font-bold">$1,248.50</div>
                </div>
                <Link to="/register" className="w-full">
                  <Button className="w-full">Withdraw Now</Button>
                </Link>
              </div>
            </div>
            
          </motion.div>
        </div>
      </div>
    </section>
  );
}
