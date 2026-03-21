import { motion } from "motion/react";
import { Mail, Phone } from "lucide-react";
import { Link } from "react-router-dom";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark-900 border-t border-white/5 pt-20 pb-10 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-brand-500/50 to-transparent" />
      
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand & Description */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center text-white shadow-lg shadow-brand-500/20 overflow-hidden">
                <img src="https://i.ibb.co/Gv8NMNnk/4efd2045-0146-46fd-9937-90b81ddcd94f-removebg-preview.png" alt="Taskvexa Logo" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <span className="font-display font-bold text-2xl tracking-tight">Taskvexa</span>
            </Link>
            <p className="text-gray-400 mb-6 leading-relaxed">
              The #1 task-based earning mobile application. Turn your free time into real cash by completing simple online tasks.
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">Quick Links</h4>
            <ul className="space-y-4">
              {["Home", "Features", "How it Works", "Tasks", "FAQ"].map((link, i) => (
                <li key={i}>
                  <a href={link === "Home" ? "/" : `/#${link.toLowerCase().replace(/\s+/g, '-')}`} className="text-gray-400 hover:text-brand-400 transition-colors flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-500/50" />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">Support</h4>
            <ul className="space-y-4">
              <li>
                <Link to="/support" className="text-gray-400 hover:text-brand-400 transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-500/50" />
                  Help & Support
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="text-gray-400 hover:text-brand-400 transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-500/50" />
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-of-service" className="text-gray-400 hover:text-brand-400 transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-500/50" />
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="text-gray-400 hover:text-brand-400 transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-500/50" />
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">Contact Us</h4>
            <ul className="space-y-4 mb-6">
              <li className="flex items-start gap-3 text-gray-400">
                <Mail size={20} className="text-brand-400 flex-shrink-0 mt-0.5" />
                <a href="mailto:support@taskvexa.app" className="hover:text-brand-400 transition-colors">support@taskvexa.app</a>
              </li>
              <li className="flex items-start gap-3 text-gray-400">
                <Phone size={20} className="text-brand-400 flex-shrink-0 mt-0.5" />
                <a href="tel:+15551234567" className="hover:text-brand-400 transition-colors">+1 (555) 123-4567</a>
              </li>
            </ul>
            <div className="flex items-center gap-4">
              <a href="https://wa.me/15551234567" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full glass flex items-center justify-center text-[#25D366] hover:bg-[#25D366]/10 transition-colors">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M12.031 0C5.396 0 .016 5.38.016 12.016c0 2.122.553 4.195 1.605 6.014L.03 24l6.125-1.605a11.96 11.96 0 005.876 1.53h.005c6.634 0 12.016-5.38 12.016-12.015C24.052 5.38 18.669 0 12.031 0zm0 21.94c-1.796 0-3.555-.483-5.093-1.395l-.365-.217-3.784.992.992-3.69-.238-.379a9.98 9.98 0 01-1.528-5.236c0-5.513 4.488-10.002 10.016-10.002 5.526 0 10.014 4.489 10.014 10.002 0 5.514-4.488 10.002-10.014 10.002zm5.494-7.513c-.301-.15-1.784-.881-2.061-.982-.276-.1-.477-.15-.678.15-.201.301-.778.982-.954 1.183-.176.201-.352.226-.653.076-.301-.15-1.273-.469-2.424-1.496-.896-.799-1.501-1.786-1.677-2.087-.176-.301-.019-.464.132-.614.135-.135.301-.351.452-.527.15-.176.201-.301.301-.502.1-.201.05-.376-.025-.527-.075-.15-.678-1.634-.928-2.236-.244-.588-.492-.508-.678-.517-.176-.008-.377-.008-.578-.008-.201 0-.527.075-.803.376-.276.301-1.054 1.029-1.054 2.51 0 1.481 1.079 2.912 1.23 3.113.15.201 2.122 3.238 5.14 4.54.718.309 1.278.494 1.716.632.72.228 1.375.196 1.893.119.581-.086 1.784-.73 2.035-1.435.251-.705.251-1.31.176-1.435-.075-.125-.276-.2-.578-.351z"/></svg>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full glass flex items-center justify-center text-[#1877F2] hover:bg-[#1877F2]/10 transition-colors">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full glass flex items-center justify-center text-[#E1306C] hover:bg-[#E1306C]/10 transition-colors">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
            </div>
          </div>
          
        </div>
        
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm text-center md:text-left">
            &copy; {currentYear} Taskvexa. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-gray-500">
            <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms-of-service" className="hover:text-white transition-colors">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
