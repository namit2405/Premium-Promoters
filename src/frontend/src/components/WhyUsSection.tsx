import { HeadphonesIcon, Users, Zap } from "lucide-react";
import { motion, useInView } from "motion/react";
import { useRef } from "react";

const features = [
  {
    icon: Users,
    title: "Expert Team",
    description:
      "Our certified professionals bring years of experience across design, development, and marketing. Every project is handled by specialists who truly understand your industry.",
  },
  {
    icon: Zap,
    title: "Fast Delivery",
    description:
      "We deliver projects on time, every time. Our agile workflow ensures quick turnarounds without compromising quality — precise, reliable, and built to your deadline.",
  },
  {
    icon: HeadphonesIcon,
    title: "24/7 Support",
    description:
      "We're always available when you need us. Our dedicated support team ensures your digital presence is always optimized, protected, and performing at its best.",
  },
];

export default function WhyUsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="why-us"
      className="py-24 px-4 sm:px-6 relative overflow-hidden"
    >
      {/* BG glow */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, oklch(0.78 0.17 75 / 0.06) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <div ref={ref} className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="text-gold text-sm font-semibold uppercase tracking-widest mb-3">
            Why Us
          </p>
          <h2 className="text-4xl md:text-5xl font-display font-black">
            <span className="text-foreground">Why Choose </span>
            <span className="text-gradient-gold">Premium Promoters</span>
          </h2>
          <motion.div
            className="mx-auto mt-4 h-1 rounded-full"
            style={{
              background:
                "linear-gradient(90deg, oklch(0.87 0.19 78), oklch(0.68 0.14 72))",
            }}
            initial={{ width: 0 }}
            animate={inView ? { width: 120 } : {}}
            transition={{ duration: 0.9, delay: 0.3 }}
          />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Features */}
          <div className="flex flex-col gap-8">
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  className="flex gap-5 group"
                  initial={{ opacity: 0, x: -60 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.7, delay: i * 0.15 + 0.2 }}
                >
                  <motion.div
                    className="flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center"
                    style={{
                      background: "oklch(0.78 0.17 75 / 0.12)",
                      border: "1px solid oklch(0.78 0.17 75 / 0.25)",
                    }}
                    whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                    transition={{ duration: 0.4 }}
                  >
                    <Icon size={24} className="text-gold" />
                  </motion.div>
                  <div>
                    <h3 className="font-heading font-bold text-xl text-foreground mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground text-base leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Team Image Block */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="relative"
          >
            {/* Main image */}
            <motion.div
              className="relative rounded-2xl overflow-hidden"
              whileHover={{
                boxShadow:
                  "0 0 40px oklch(0.78 0.17 75 / 0.25), 0 20px 60px oklch(0 0 0 / 0.5)",
              }}
              transition={{ duration: 0.3 }}
            >
              <img
                src="/assets/images/about-team.dim_800x600.jpg"
                alt="Premium Promoters Team"
                className="w-full h-auto object-cover rounded-2xl"
                style={{ border: "1px solid oklch(0.78 0.17 75 / 0.15)" }}
              />
              {/* Subtle gold overlay on hover */}
              <div
                className="absolute inset-0 rounded-2xl pointer-events-none"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.78 0.17 75 / 0.05) 0%, transparent 60%)",
                }}
              />
            </motion.div>

            {/* Floating stat badges */}
            {[
              { text: "5+ Years", x: "2%", y: "10%", delay: 0 },
              { text: "500+ Projects", x: "62%", y: "5%", delay: 0.5 },
              { text: "99% Satisfaction", x: "58%", y: "78%", delay: 1 },
              { text: "Global Clients", x: "2%", y: "75%", delay: 1.5 },
            ].map((badge) => (
              <motion.div
                key={badge.text}
                className="absolute glass-card px-3 py-1.5 rounded-full text-xs font-semibold text-foreground whitespace-nowrap z-10"
                style={{
                  left: badge.x,
                  top: badge.y,
                  border: "1px solid oklch(0.78 0.17 75 / 0.3)",
                }}
                animate={{ y: [0, -6, 0] }}
                transition={{
                  duration: 3 + badge.delay,
                  delay: badge.delay,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              >
                <span className="text-gold mr-1">✦</span>
                {badge.text}
              </motion.div>
            ))}

            {/* Gold corner accent */}
            <div
              className="absolute -top-3 -right-3 w-24 h-24 rounded-full pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle, oklch(0.78 0.17 75 / 0.15) 0%, transparent 70%)",
                filter: "blur(10px)",
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
