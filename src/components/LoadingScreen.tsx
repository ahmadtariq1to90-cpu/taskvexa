import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";

export function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // 2 seconds loading time

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] bg-dark-900 flex flex-col items-center justify-center"
        >
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
            }}
            transition={{ 
              duration: 2, 
              ease: "easeInOut", 
              repeat: Infinity 
            }}
            className="w-24 h-24 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-[0_0_40px_rgba(45,212,191,0.5)] mb-8 overflow-hidden"
          >
            <img src="https://i.ibb.co/Gv8NMNnk/4efd2045-0146-46fd-9937-90b81ddcd94f-removebg-preview.png" alt="Taskvexa Logo" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-brand-400 font-medium tracking-widest uppercase text-sm"
          >
            Loading Taskvexa...
          </motion.div>
          
          {/* Progress Bar */}
          <div className="w-48 h-1 bg-dark-800 rounded-full mt-6 overflow-hidden">
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.8, ease: "easeInOut" }}
              className="h-full bg-brand-500 rounded-full"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
