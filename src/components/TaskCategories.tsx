import { motion } from "motion/react";
import { Section, SectionHeader } from "./ui/Section";
import { Play, Mail, ThumbsUp, UserPlus, Smartphone, ClipboardList, Sparkles } from "lucide-react";

const categories = [
  {
    title: "Ad Watching",
    reward: "Up to $0.05 / ad",
    icon: Play,
    color: "from-blue-500/20 to-blue-600/5",
    iconColor: "text-blue-400",
  },
  {
    title: "Gmail Signup Tasks",
    reward: "Up to $0.50 / task",
    icon: Mail,
    color: "from-red-500/20 to-red-600/5",
    iconColor: "text-red-400",
  },
  {
    title: "Facebook Like / Follow",
    reward: "Up to $0.10 / task",
    icon: ThumbsUp,
    color: "from-blue-600/20 to-blue-700/5",
    iconColor: "text-blue-500",
  },
  {
    title: "Instagram Follow",
    reward: "Up to $0.15 / task",
    icon: UserPlus,
    color: "from-pink-500/20 to-pink-600/5",
    iconColor: "text-pink-500",
  },
  {
    title: "App Install Tasks",
    reward: "Up to $2.00 / app",
    icon: Smartphone,
    color: "from-green-500/20 to-green-600/5",
    iconColor: "text-green-400",
  },
  {
    title: "Survey Tasks",
    reward: "Up to $5.00 / survey",
    icon: ClipboardList,
    color: "from-purple-500/20 to-purple-600/5",
    iconColor: "text-purple-400",
  },
  {
    title: "Other Micro Tasks",
    reward: "Varies",
    icon: Sparkles,
    color: "from-brand-500/20 to-brand-600/5",
    iconColor: "text-brand-400",
  },
];

export function TaskCategories() {
  return (
    <Section id="tasks">
      <SectionHeader 
        title="High Paying Task Categories" 
        subtitle="Explore a variety of tasks tailored to your skills and interests. Earn more by completing higher-paying categories."
      />
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {categories.map((category, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className={`glass-card p-6 rounded-2xl bg-gradient-to-br ${category.color} border-t border-l border-white/10 hover:-translate-y-2 transition-transform duration-300 cursor-pointer`}
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`w-12 h-12 rounded-full glass flex items-center justify-center ${category.iconColor}`}>
                <category.icon size={24} />
              </div>
              <div className="px-3 py-1 rounded-full bg-dark-900/50 text-xs font-semibold text-gray-300 border border-white/5">
                {category.reward}
              </div>
            </div>
            <h3 className="text-lg font-semibold mb-2">{category.title}</h3>
            <p className="text-sm text-gray-400">Hundreds of new tasks added daily. Start earning now.</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
