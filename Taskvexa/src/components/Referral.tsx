import { motion } from "motion/react";
import { Section } from "./ui/Section";
import { Button } from "./ui/Button";
import { Share2, Users, Coins } from "lucide-react";
import { Link } from "react-router-dom";

export function Referral() {
  return (
    <Section>
      <div className="glass-card rounded-[2.5rem] p-8 md:p-16 overflow-hidden relative">
        {/* Background Glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[100px] -z-10" />
        
        <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-purple-500/30 text-purple-300 text-sm font-medium mb-6">
              <Share2 size={14} />
              <span>Refer & Earn</span>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
              Invite Friends, <br />
              <span className="text-gradient from-purple-400 to-pink-500">Earn 10% for Life</span>
            </h2>
            
            <p className="text-gray-400 text-lg mb-8">
              Share your unique referral link with friends and family. When they sign up and complete tasks, you earn 10% of their earnings forever. No limits!
            </p>
            
            <ul className="space-y-4 mb-8">
              {[
                { icon: Share2, text: "Share your unique link or code" },
                { icon: Users, text: "Friends sign up and start earning" },
                { icon: Coins, text: "You get 10% of their task earnings instantly" },
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400">
                    <item.icon size={16} />
                  </div>
                  <span className="text-gray-300">{item.text}</span>
                </li>
              ))}
            </ul>
            
            <Link to="/register">
              <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-purple-500/25">
                Get Referral Link
              </Button>
            </Link>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            {/* Abstract Illustration */}
            <div className="relative w-full aspect-square max-w-[400px] mx-auto">
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-brand-500/20 rounded-full animate-pulse" />
              
              {/* Central Node */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-dark-800 rounded-full border-4 border-purple-500 flex items-center justify-center shadow-[0_0_30px_rgba(168,85,247,0.4)] z-20">
                <img src="https://i.pravatar.cc/150?img=11" alt="You" className="w-full h-full rounded-full object-cover" />
              </div>
              
              {/* Connecting Nodes */}
              {[
                { top: "10%", left: "20%", img: "1" },
                { top: "20%", right: "10%", img: "5" },
                { bottom: "15%", left: "15%", img: "9" },
                { bottom: "25%", right: "15%", img: "12" },
                { top: "50%", left: "5%", img: "15" },
              ].map((pos, i) => (
                <motion.div 
                  key={i}
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 3 + i, ease: "easeInOut" }}
                  className="absolute w-16 h-16 bg-dark-800 rounded-full border-2 border-brand-500 flex items-center justify-center shadow-lg z-20"
                  style={pos}
                >
                  <img src={`https://i.pravatar.cc/150?img=${pos.img}`} alt="Friend" className="w-full h-full rounded-full object-cover" />
                  <div className="absolute -bottom-2 bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                    +$0.50
                  </div>
                </motion.div>
              ))}
              
              {/* Connecting Lines (SVG) */}
              <svg className="absolute inset-0 w-full h-full z-10" style={{ filter: "drop-shadow(0 0 4px rgba(168,85,247,0.5))" }}>
                <line x1="50%" y1="50%" x2="28%" y2="18%" stroke="#a855f7" strokeWidth="2" strokeDasharray="4 4" />
                <line x1="50%" y1="50%" x2="82%" y2="28%" stroke="#a855f7" strokeWidth="2" strokeDasharray="4 4" />
                <line x1="50%" y1="50%" x2="23%" y2="77%" stroke="#a855f7" strokeWidth="2" strokeDasharray="4 4" />
                <line x1="50%" y1="50%" x2="77%" y2="67%" stroke="#a855f7" strokeWidth="2" strokeDasharray="4 4" />
                <line x1="50%" y1="50%" x2="13%" y2="58%" stroke="#a855f7" strokeWidth="2" strokeDasharray="4 4" />
              </svg>
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}
