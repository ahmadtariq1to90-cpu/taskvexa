import React from "react";
import { motion } from "motion/react";
import { cn } from "../../lib/utils";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  id?: string;
  className?: string;
}

export function Section({ children, id, className, ...props }: SectionProps) {
  return (
    <section id={id} className={cn("py-20 md:py-32 relative", className)} {...props}>
      <div className="container mx-auto px-4 md:px-6 max-w-7xl relative z-10">
        {children}
      </div>
    </section>
  );
}

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeader({ title, subtitle, align = "center", className }: SectionHeaderProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
      className={cn(
        "mb-16",
        align === "center" ? "text-center mx-auto max-w-3xl" : "text-left max-w-2xl",
        className
      )}
    >
      <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">{title}</h2>
      {subtitle && <p className="text-gray-400 text-lg md:text-xl">{subtitle}</p>}
    </motion.div>
  );
}
