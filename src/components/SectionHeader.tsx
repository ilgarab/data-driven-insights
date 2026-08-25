import { ReactNode } from "react";
import { motion } from "framer-motion";

interface SectionHeaderProps {
  badge?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  as?: "h1" | "h2";
  children?: ReactNode;
}

export default function SectionHeader({ badge, title, subtitle, centered = true, as = "h2" }: SectionHeaderProps) {
  const Heading = as;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`mb-12 md:mb-16 ${centered ? "text-center" : ""}`}
    >
      {badge && (
        <span className="mb-4 inline-block rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
          {badge}
        </span>
      )}
      <Heading className="text-balance text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl" style={{ lineHeight: "1.1" }}>
        {title}
      </Heading>
      {subtitle && (
        <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground md:text-lg" style={{ lineHeight: "1.7" }}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
