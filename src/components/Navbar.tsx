import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { Button } from "./ui/Button";
import { Link, useLocation } from "react-router-dom";
import { supabase } from "../lib/supabase";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [session, setSession] = useState<any>(null);
  const [isLightMode, setIsLightMode] = useState(() => {
    return localStorage.getItem("theme") === "light";
  });
  const location = useLocation();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const { data: { user }, error } = await supabase.auth.getUser();
        if (error || !user) {
          await supabase.auth.signOut();
          setSession(null);
        } else {
          setSession(session);
        }
      } else {
        setSession(null);
      }
    };

    // Check initial session
    checkUser();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        checkUser();
      } else {
        setSession(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isLightMode) {
      document.body.classList.add("light-mode");
      localStorage.setItem("theme", "light");
    } else {
      document.body.classList.remove("light-mode");
      localStorage.setItem("theme", "dark");
    }
  }, [isLightMode]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Features", href: "/#features" },
    { name: "How it Works", href: "/#how-it-works" },
    { name: "Tasks", href: "/#tasks" },
    { name: "FAQ", href: "/#faq" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || location.pathname !== "/" ? "glass py-3" : "py-5 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center text-white shadow-lg shadow-brand-500/20 overflow-hidden">
              <img src="https://i.ibb.co/Gv8NMNnk/4efd2045-0146-46fd-9937-90b81ddcd94f-removebg-preview.png" alt="Taskvexa Logo" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
            <span className="font-display font-bold text-2xl tracking-tight">Taskvexa</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-gray-300 hover:text-brand-500 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <button 
              onClick={() => setIsLightMode(!isLightMode)}
              className="w-14 h-8 rounded-full glass flex items-center p-1 relative cursor-pointer mr-2"
            >
              <motion.div 
                animate={{ x: isLightMode ? 24 : 0 }}
                className="w-6 h-6 rounded-full bg-brand-500 flex items-center justify-center text-white shadow-md"
              >
                {isLightMode ? <Sun size={14} /> : <Moon size={14} />}
              </motion.div>
            </button>
            
            {session ? (
              <Link to="/download" className="text-sm font-medium text-gray-300 hover:text-brand-500 transition-colors mr-4">
                Login
              </Link>
            ) : (
              <Link to="/register">
                <span className="text-sm font-medium text-gray-300 hover:text-brand-500 transition-colors mr-4">
                  Register
                </span>
              </Link>
            )}
            <Link to="/download">
              <Button variant="primary" size="sm">Download App</Button>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center gap-4">
            <button 
              onClick={() => setIsLightMode(!isLightMode)}
              className="w-12 h-7 rounded-full glass flex items-center p-1 relative cursor-pointer"
            >
              <motion.div 
                animate={{ x: isLightMode ? 20 : 0 }}
                className="w-5 h-5 rounded-full bg-brand-500 flex items-center justify-center text-white shadow-md"
              >
                {isLightMode ? <Sun size={12} /> : <Moon size={12} />}
              </motion.div>
            </button>
            <button
              className="text-gray-300 hover:text-brand-500"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-white/5 mt-3 overflow-hidden"
          >
            <div className="flex flex-col px-4 py-6 gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-medium text-gray-300 hover:text-brand-500"
                >
                  {link.name}
                </a>
              ))}
              {session ? (
                <Link to="/download" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium text-gray-300 hover:text-brand-500 block mt-2">
                  Login
                </Link>
              ) : (
                <Link to="/register" onClick={() => setIsMobileMenuOpen(false)}>
                  <span className="text-lg font-medium text-gray-300 hover:text-brand-500 block mt-2">
                    Register
                  </span>
                </Link>
              )}
              <Link to="/download" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="primary" className="w-full mt-4">Download App</Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
