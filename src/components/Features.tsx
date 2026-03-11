import { motion } from "motion/react";
import { Section, SectionHeader } from "./ui/Section";
import { PlaySquare, Mail, Facebook, Instagram, Gift, Wallet, Users, ShieldCheck } from "lucide-react";

const features = [
  {
    title: "Watch Ads and Earn",
    description: "Get paid for watching short video advertisements from our partners.",
    icon: PlaySquare,
    color: "text-blue-400",
    bg: "bg-blue-400/10",
  },
  {
    title: "Gmail Tasks",
    description: "Earn by creating accounts or reading promotional emails.",
    icon: Mail,
    color: "text-red-400",
    bg: "bg-red-400/10",
  },
  {
    title: "Facebook Tasks",
    description: "Like pages, share posts, and follow accounts to earn rewards.",
    icon: Facebook,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    title: "Instagram Tasks",
    description: "Follow profiles, like photos, and leave comments for quick cash.",
    icon: Instagram,
    color: "text-pink-500",
    bg: "bg-pink-500/10",
  },
  {
    title: "Daily Rewards",
    description: "Log in every day to claim your free daily bonus coins.",
    icon: Gift,
    color: "text-yellow-400",
    bg: "bg-yellow-400/10",
  },
  {
    title: "Instant Withdrawals",
    description: "Cash out your earnings instantly to your preferred payment method.",
    icon: Wallet,
    color: "text-green-400",
    bg: "bg-green-400/10",
  },
  {
    title: "Referral System",
    description: "Invite friends and earn a percentage of their lifetime earnings.",
    icon: Users,
    color: "text-purple-400",
    bg: "bg-purple-400/10",
  },
  {
    title: "Secure Payments",
    description: "100% safe and secure platform with verified payment gateways.",
    icon: ShieldCheck,
    color: "text-brand-400",
    bg: "bg-brand-400/10",
  },
];

export function Features() {
  return (
    <Section id="features">
      <SectionHeader 
        title="Everything You Need to Earn" 
        subtitle="We provide a wide variety of tasks so you never run out of ways to make money online."
      />
      
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="glass-card p-6 rounded-2xl group"
          >
            <div className={`w-14 h-14 rounded-xl ${feature.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
              <feature.icon size={28} className={feature.color} />
            </div>
            <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
            <p className="text-gray-400 leading-relaxed">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
