import { FolderCheck, Star, TrendingUp, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { API_BASE_URL } from "../api-config";

interface Stat {
  value: number;
  suffix: string;
  prefix: string;
  label: string;
  Icon: LucideIcon;
}

interface StatsData {
  projectsCount: number;
  happyClients: number;
  yearsExperience: number;
  avgRating: number;
}

function AnimatedCounter({
  value,
  suffix,
  prefix,
  trigger,
  isDecimal,
}: {
  value: number;
  suffix: string;
  prefix: string;
  trigger: boolean;
  isDecimal?: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!trigger) return;
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(current);
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [trigger, value]);

  const display = isDecimal ? count.toFixed(1) : Math.floor(count).toString();

  return (
    <span>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

export default function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [statsData, setStatsData] = useState<StatsData>({
    projectsCount: 500,
    happyClients: 40,
    yearsExperience: 5,
    avgRating: 4.9,
  });

  useEffect(() => {
    fetch(`${API_BASE_URL}/stats`)
      .then((res) => res.json())
      .then((data) => setStatsData(data))
      .catch((err) => console.error("Error fetching stats:", err));
  }, []);

  const stats: Stat[] = [
    {
      value: 100,
      suffix: "+",
      prefix: "",
      label: "Projects Done",
      Icon: FolderCheck,
    },
    {
      value: statsData.happyClients,
      suffix: "+",
      prefix: "",
      label: "Happy Clients",
      Icon: Users,
    },
    {
      value: statsData.yearsExperience,
      suffix: "+",
      prefix: "",
      label: "Years Experience",
      Icon: TrendingUp,
    },
    {
      value: statsData.avgRating,
      suffix: "★",
      prefix: "",
      label: "Average Rating",
      Icon: Star,
    },
  ];

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Dark bg — charcoal only, no purple */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.07 0.006 260) 0%, oklch(0.10 0.010 260) 50%, oklch(0.07 0.006 260) 100%)",
        }}
      />

      {/* Decorative orbs — gold only */}
      <div
        className="absolute left-10 top-10 w-64 h-64 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, oklch(0.78 0.17 75 / 0.10) 0%, transparent 70%)",
          filter: "blur(30px)",
        }}
      />
      <div
        className="absolute right-10 bottom-10 w-80 h-80 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, oklch(0.87 0.19 78 / 0.08) 0%, transparent 70%)",
          filter: "blur(30px)",
        }}
      />

      {/* Animated lines — gold only */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.div
            key={`line-${i}`}
            className="absolute h-px w-full"
            style={{
              top: `${20 + i * 15}%`,
              background:
                "linear-gradient(90deg, transparent, oklch(0.78 0.17 75), transparent)",
            }}
            animate={{ x: ["-100%", "100%"] }}
            transition={{
              duration: 4 + i,
              delay: i * 0.5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        ))}
      </div>

      <div ref={ref} className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-gold text-sm font-semibold uppercase tracking-widest mb-3">
            Our Numbers
          </p>
          <h2 className="text-4xl md:text-5xl font-display font-black text-foreground">
            Results That <span className="text-gradient-gold">Speak</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="glass-card rounded-2xl p-5 sm:p-6 md:p-8 text-center group"
              initial={{ opacity: 0, scale: 0.8, y: 30 }}
              animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
            >
              <motion.div
                className="flex justify-center mb-4"
                animate={inView ? { scale: [0.7, 1.15, 1] } : {}}
                transition={{ duration: 0.6, delay: i * 0.12 + 0.4 }}
              >
                <stat.Icon
                  size={30}
                  strokeWidth={1.5}
                  className="text-amber-400"
                  style={{ color: "oklch(0.78 0.17 75)" }}
                  {...(stat.Icon === Star
                    ? { fill: "oklch(0.78 0.17 75 / 0.25)" }
                    : {})}
                />
              </motion.div>
              <div className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-gradient-gold mb-2">
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  prefix={stat.prefix}
                  trigger={inView}
                  isDecimal={stat.value % 1 !== 0}
                />
              </div>
              <p className="text-muted-foreground text-sm font-medium">
                {stat.label}
              </p>

              {/* Decorative line — gold only */}
              <motion.div
                className="mt-4 mx-auto h-0.5 rounded-full"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, oklch(0.78 0.17 75), transparent)",
                }}
                initial={{ width: 0 }}
                animate={inView ? { width: "60%" } : {}}
                transition={{ duration: 0.8, delay: i * 0.12 + 0.5 }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
