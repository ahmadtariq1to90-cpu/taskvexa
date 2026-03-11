import { motion } from "motion/react";
import { Section } from "./ui/Section";
import CountUp from "react-countup";
import { Users, CheckCircle, DollarSign, Activity } from "lucide-react";

const stats = [
  {
    title: "Total Users",
    value: 500000,
    suffix: "+",
    icon: Users,
    color: "text-blue-400",
  },
  {
    title: "Tasks Completed",
    value: 12500000,
    suffix: "+",
    icon: CheckCircle,
    color: "text-brand-400",
  },
  {
    title: "Total Payments",
    value: 2500000,
    prefix: "$",
    suffix: "+",
    icon: DollarSign,
    color: "text-green-400",
  },
  {
    title: "Active Daily Users",
    value: 150000,
    suffix: "+",
    icon: Activity,
    color: "text-purple-400",
  },
];

export function Statistics() {
  return (
    <Section className="bg-brand-900/20 border-y border-brand-500/10">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="flex flex-col items-center text-center"
          >
            <div className={`w-12 h-12 rounded-full glass flex items-center justify-center mb-4 ${stat.color}`}>
              <stat.icon size={24} />
            </div>
            <div className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-2">
              {stat.prefix}
              <CountUp
                end={stat.value}
                duration={2.5}
                separator=","
                enableScrollSpy
                scrollSpyOnce
              />
              {stat.suffix}
            </div>
            <p className="text-sm md:text-base text-gray-400 font-medium uppercase tracking-wider">
              {stat.title}
            </p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
