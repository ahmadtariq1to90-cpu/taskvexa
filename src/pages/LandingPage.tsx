import { motion, useScroll, useSpring, AnimatePresence } from "motion/react";
import { ArrowUp, CheckCircle2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

import { useNavigate } from "react-router-dom";

import { Hero } from "../components/Hero";
import { Features } from "../components/Features";
import { HowItWorks } from "../components/HowItWorks";
import { TaskCategories } from "../components/TaskCategories";
import { Statistics } from "../components/Statistics";
import { Screenshots } from "../components/Screenshots";
import { Testimonials } from "../components/Testimonials";
import { Referral } from "../components/Referral";
import { FAQ } from "../components/FAQ";
import { Newsletter } from "../components/Newsletter";

export function LandingPage() {
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [showBackToTop, setShowBackToTop] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Check if user just logged in via OAuth
    const checkAuthAndRegister = async () => {
      // Check for OAuth errors in URL
      const hashParams = new URLSearchParams(window.location.hash.substring(1));
      const searchParams = new URLSearchParams(window.location.search);
      const errorDesc = hashParams.get('error_description') || searchParams.get('error_description');
      
      if (errorDesc) {
        alert("Login Error: " + errorDesc.replace(/\+/g, ' '));
        window.history.replaceState(null, '', window.location.pathname);
        return;
      }

      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        const { data: { user: authUser }, error: authError } = await supabase.auth.getUser();
        if (authError || !authUser) {
          await supabase.auth.signOut();
          return;
        }

        // Check if user is already in our users table
        const { data: user } = await supabase
          .from('users')
          .select('id')
          .eq('id', session.user.id)
          .maybeSingle();
          
        if (!user) {
          // User logged in via Google or Email but isn't in our DB yet.
          // Redirect them to the register page to complete their profile.
          navigate('/register');
        } else {
          // If they just logged in and already exist, we can also show a welcome back or just the popup
          // We'll show it if there's a hash in the URL indicating a recent login
          if (window.location.hash.includes('access_token')) {
            setShowSuccessPopup(true);
            window.history.replaceState(null, '', window.location.pathname);
          }
        }
      }
    };
    
    checkAuthAndRegister();

    // Also listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        checkAuthAndRegister();
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-brand-500 origin-left z-[60]"
        style={{ scaleX }}
      />

      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <TaskCategories />
        <Statistics />
        <Screenshots />
        <Testimonials />
        <Referral />
        <FAQ />
        <Newsletter />
      </main>

      {/* Success Popup */}
      <AnimatePresence>
        {showSuccessPopup && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="glass-card rounded-3xl p-8 max-w-md w-full relative text-center"
            >
              <button 
                onClick={() => setShowSuccessPopup(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
              
              <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 size={40} className="text-green-400" />
              </div>
              <h2 className="text-3xl font-display font-bold mb-4">Congratulations!</h2>
              <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                You are now part of our family. Download the application, log in, and start earning.
              </p>
              <button 
                onClick={() => {
                  setShowSuccessPopup(false);
                  navigate('/download');
                }}
                className="w-full h-12 rounded-xl bg-gradient-primary text-white font-medium hover:shadow-lg hover:shadow-brand-500/25 transition-all"
              >
                Download App
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Back to Top Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ 
          opacity: showBackToTop ? 1 : 0, 
          scale: showBackToTop ? 1 : 0,
          pointerEvents: showBackToTop ? "auto" : "none"
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-brand-500 text-white flex items-center justify-center shadow-lg shadow-brand-500/30 hover:bg-brand-400 transition-colors"
      >
        <ArrowUp size={24} />
      </motion.button>
    </>
  );
}
