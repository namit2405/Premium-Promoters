import { ChevronDown } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useRef } from "react";

// ─── Network Canvas Background ───────────────────────────────────────────────
interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

function NetworkCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<Node[]>([]);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const GOLD_R = 201;
    const GOLD_G = 162;
    const GOLD_B = 39;
    const NODE_COUNT = 80;
    const MAX_DIST = 150;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    const initNodes = () => {
      nodesRef.current = Array.from({ length: NODE_COUNT }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        radius: Math.random() * 2 + 1,
      }));
    };

    resize();
    initNodes();

    const ro = new ResizeObserver(() => {
      resize();
    });
    ro.observe(canvas);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const nodes = nodesRef.current;

      // Update positions
      for (const node of nodes) {
        node.x += node.vx;
        node.y += node.vy;
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
      }

      // Draw edges
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAX_DIST) {
            const alpha = (1 - dist / MAX_DIST) * 0.18;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(${GOLD_R},${GOLD_G},${GOLD_B},${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      for (const node of nodes) {
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${GOLD_R},${GOLD_G},${GOLD_B},0.55)`;
        ctx.fill();

        // Glow
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${GOLD_R},${GOLD_G},${GOLD_B},0.06)`;
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 1 }}
    />
  );
}

// ─── Hero Section ──────────────────────────────────────────────────────────
const headline = "Elevate Your Online Presence with Our Experts.";
const headlineWords = headline.split(" ").map((word, idx) => ({
  word,
  id: `hw-${idx}`,
}));

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const wordVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" as const },
  },
};

export default function HeroSection() {
  const scrollToSection = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col overflow-hidden bg-[#0a0a0a]"
    >
      {/* Network canvas background */}
      <div className="absolute inset-0 z-0">
        <NetworkCanvas />
      </div>

      {/* Radial glow overlay */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 20% 50%, oklch(0.25 0.06 75 / 0.12) 0%, transparent 55%), radial-gradient(ellipse at 80% 30%, oklch(0.78 0.12 75 / 0.07) 0%, transparent 40%)",
        }}
      />

      {/* Main content — two column split */}
      <div className="relative z-10 flex-1 flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-28 md:py-32">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
            {/* ── Left column (55%) ── */}
            <div className="flex-1 lg:w-[55%] flex flex-col items-start text-left">
              {/* Badge */}
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-7 border"
                style={{
                  background: "oklch(0.78 0.17 75 / 0.08)",
                  borderColor: "oklch(0.78 0.17 75 / 0.4)",
                }}
                initial={{ opacity: 0, scale: 0.88 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <span
                  className="w-2 h-2 rounded-full animate-pulse"
                  style={{ background: "oklch(0.87 0.19 78)" }}
                />
                <span
                  className="text-xs font-bold uppercase tracking-widest"
                  style={{ color: "oklch(0.87 0.19 78)" }}
                >
                  Your Digital Growth Partner
                </span>
              </motion.div>

              {/* Headline — word by word stagger */}
              <motion.h1
                className="font-display font-black text-4xl sm:text-5xl md:text-6xl lg:text-[3.8rem] xl:text-[4.2rem] leading-[1.1] text-white mb-6 flex flex-wrap gap-x-[0.3em] gap-y-1"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                aria-label={headline}
              >
                {headlineWords.map(({ word, id }) => (
                  <motion.span
                    key={id}
                    variants={wordVariant}
                    className="inline-block"
                    style={{
                      color:
                        word === "Elevate" ||
                        word === "Online" ||
                        word === "Presence"
                          ? "oklch(0.87 0.19 78)"
                          : "oklch(0.97 0.003 80)",
                    }}
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                className="text-base sm:text-lg leading-relaxed max-w-xl mb-10"
                style={{ color: "oklch(0.58 0.012 260)" }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.8 }}
              >
                Our team of expert designers, developers, and marketers is
                dedicated to helping you build a powerful online presence that
                converts visitors into loyal customers.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                className="flex flex-col sm:flex-row gap-4 items-start"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 1.0 }}
              >
                <motion.button
                  data-ocid="hero.primary_button"
                  className="btn-gold px-7 py-3.5 rounded-full text-sm font-bold transition-all duration-300 shadow-lg uppercase tracking-wide flex items-center gap-2"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 35px oklch(0.78 0.17 75 / 0.6)",
                  }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => scrollToSection("#contact")}
                >
                  GET STARTED
                  <span className="text-lg">→</span>
                </motion.button>
                <motion.button
                  data-ocid="hero.secondary_button"
                  className="px-7 py-3.5 rounded-full text-sm font-bold transition-all duration-300 uppercase tracking-wide"
                  style={{
                    border: "1.5px solid oklch(0.4 0.01 260)",
                    color: "oklch(0.97 0.003 80)",
                    background: "transparent",
                  }}
                  whileHover={{
                    scale: 1.03,
                    borderColor: "oklch(0.78 0.17 75 / 0.6)",
                    boxShadow: "0 0 18px oklch(0.78 0.17 75 / 0.15)",
                  }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => scrollToSection("#portfolio")}
                >
                  Our Work →
                </motion.button>
              </motion.div>
            </div>

            {/* ── Right column (45%) — Hero image card ── */}
            <motion.div
              className="lg:w-[45%] flex justify-center lg:justify-end"
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.85, delay: 0.3, ease: "easeOut" }}
            >
              {/* Outer decorative glow ring */}
              <div className="relative">
                {/* Gold accent corner */}
                <div
                  className="absolute -top-3 -right-3 w-16 h-16 rounded-tr-2xl pointer-events-none z-10"
                  style={{
                    border: "2px solid oklch(0.78 0.17 75 / 0.6)",
                    borderLeft: "none",
                    borderBottom: "none",
                  }}
                />
                <div
                  className="absolute -bottom-3 -left-3 w-16 h-16 rounded-bl-2xl pointer-events-none z-10"
                  style={{
                    border: "2px solid oklch(0.78 0.17 75 / 0.4)",
                    borderRight: "none",
                    borderTop: "none",
                  }}
                />

                {/* Glow behind card */}
                <div
                  className="absolute inset-0 rounded-2xl"
                  style={{
                    background:
                      "radial-gradient(ellipse at center, oklch(0.78 0.17 75 / 0.15) 0%, transparent 70%)",
                    filter: "blur(20px)",
                    transform: "scale(1.15)",
                  }}
                />

                {/* Photo card */}
                <motion.div
                  className="relative rounded-2xl overflow-hidden"
                  style={{
                    background: "oklch(0.14 0.01 260)",
                    border: "1px solid oklch(0.78 0.17 75 / 0.25)",
                    boxShadow:
                      "0 25px 60px oklch(0 0 0 / 0.6), 0 0 0 1px oklch(0.78 0.17 75 / 0.1)",
                    width: "clamp(260px, 40vw, 380px)",
                  }}
                  animate={{ y: [0, -12, 0] }}
                  transition={{
                    duration: 4,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                >
                  <img
                    src="/assets/images/hero-person.dim_600x750.png"
                    alt="Digital Growth Expert"
                    className="w-full h-auto object-cover block"
                    style={{ display: "block" }}
                  />

                  {/* Card overlay gradient at bottom */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(to top, oklch(0.1 0.008 260 / 0.9), transparent)",
                    }}
                  />

                  {/* Gold badge inside card */}
                  <div
                    className="absolute bottom-4 left-4 right-4 flex items-center gap-3 rounded-xl px-4 py-3"
                    style={{
                      background: "oklch(0.10 0.008 260 / 0.85)",
                      border: "1px solid oklch(0.78 0.17 75 / 0.3)",
                      backdropFilter: "blur(10px)",
                    }}
                  >
                    <div
                      className="w-2 h-2 rounded-full animate-pulse shrink-0"
                      style={{ background: "oklch(0.87 0.19 78)" }}
                    />
                    <span
                      className="text-xs font-bold uppercase tracking-wider"
                      style={{ color: "oklch(0.87 0.19 78)" }}
                    >
                      Digital Experts
                    </span>
                    <span
                      className="ml-auto text-xs"
                      style={{ color: "oklch(0.55 0.012 260)" }}
                    >
                      100+ Clients
                    </span>
                  </div>
                </motion.div>

                {/* Floating stat chips */}
                <motion.div
                  className="absolute -left-12 top-1/4 rounded-xl px-4 py-2.5 hidden xl:flex items-center gap-2"
                  style={{
                    background: "oklch(0.12 0.01 260 / 0.92)",
                    border: "1px solid oklch(0.78 0.17 75 / 0.3)",
                    backdropFilter: "blur(12px)",
                    boxShadow: "0 8px 24px oklch(0 0 0 / 0.4)",
                  }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.2, duration: 0.6 }}
                >
                  <span
                    style={{ color: "oklch(0.87 0.19 78)" }}
                    className="text-lg font-black"
                  >
                    98%
                  </span>
                  <span
                    style={{ color: "oklch(0.58 0.012 260)" }}
                    className="text-xs leading-tight"
                  >
                    Client
                    <br />
                    Satisfaction
                  </span>
                </motion.div>

                <motion.div
                  className="absolute -right-10 bottom-1/3 rounded-xl px-4 py-2.5 hidden xl:flex items-center gap-2"
                  style={{
                    background: "oklch(0.12 0.01 260 / 0.92)",
                    border: "1px solid oklch(0.78 0.17 75 / 0.3)",
                    backdropFilter: "blur(12px)",
                    boxShadow: "0 8px 24px oklch(0 0 0 / 0.4)",
                  }}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.4, duration: 0.6 }}
                >
                  <span
                    style={{ color: "oklch(0.87 0.19 78)" }}
                    className="text-lg font-black"
                  >
                    5+
                  </span>
                  <span
                    style={{ color: "oklch(0.58 0.012 260)" }}
                    className="text-xs leading-tight"
                  >
                    Years
                    <br />
                    Experience
                  </span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll to Explore */}
      <motion.div
        className="relative z-10 pb-8 flex flex-col items-center gap-2 cursor-pointer"
        style={{ color: "oklch(0.45 0.01 260)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        onClick={() => scrollToSection("#services")}
      >
        <span className="text-[10px] uppercase tracking-[0.2em] font-medium">
          Scroll to Explore
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{
            duration: 1.5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <ChevronDown size={18} style={{ color: "oklch(0.78 0.17 75)" }} />
        </motion.div>
      </motion.div>
    </section>
  );
}
