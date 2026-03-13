import { ExternalLink } from "lucide-react";
import { motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { API_BASE_URL } from "../api-config";

interface PortfolioItem {
  _id: string;
  title: string;
  description: string;
  category: string;
  tag: string;
  image: string;
  projectUrl?: string;
}

export default function PortfolioSection() {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Fetch portfolio from API
  useEffect(() => {
    fetch(`${API_BASE_URL}/portfolio`)
      .then(res => res.json())
      .then(data => setPortfolioItems(data))
      .catch(err => console.error('Error fetching portfolio:', err));
  }, []);

const cardVariants = {
  hidden: { opacity: 0, scale: 0.85, filter: "blur(8px)" },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.6,
      delay: i * 0.1,
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
    },
  }),
};

  return (
    <section
      id="portfolio"
      className="py-24 px-4 sm:px-6 relative overflow-hidden"
    >
      {/* BG elements — gold only */}
      <div
        className="absolute left-1/4 top-0 w-96 h-96 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, oklch(0.78 0.17 75 / 0.06) 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
      />

      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="text-gold text-sm font-semibold uppercase tracking-widest mb-3">
            Our Work
          </p>
          <h2 className="text-4xl md:text-5xl font-display font-black">
            <span className="text-foreground">Featured </span>
            <span className="text-gradient-gold">Portfolio</span>
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
          <p className="text-muted-foreground mt-4 text-lg max-w-2xl mx-auto">
            A glimpse into the digital transformations we've delivered for our
            clients.
          </p>
        </motion.div>

        <div
          ref={ref}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
        >
          {portfolioItems.map((item, i) => (
            <motion.div
              key={item.title}
              data-ocid={`portfolio.item.${i + 1}`}
              className="relative rounded-2xl overflow-hidden cursor-pointer group"
              style={{ aspectRatio: "4/3" }}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              onHoverStart={() => setHoveredIndex(i)}
              onHoverEnd={() => setHoveredIndex(null)}
              whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
              onClick={() => {
                if (item.projectUrl) {
                  window.open(item.projectUrl, '_blank', 'noopener,noreferrer');
                }
              }}
            >
              {/* Real image */}
              <img
                src={item.image}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Dark base overlay */}
              <div className="absolute inset-0 bg-background/40" />

              {/* Category tag */}
              <div className="absolute top-4 left-4 z-10">
                <span
                  className="px-3 py-1 rounded-full text-xs font-bold text-foreground/90"
                  style={{
                    background: "oklch(0 0 0 / 0.5)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid oklch(0.78 0.17 75 / 0.3)",
                  }}
                >
                  {item.tag}
                </span>
              </div>

              {/* Hover overlay with gold accent */}
              <motion.div
                className="absolute inset-0 flex flex-col justify-end p-6 z-20"
                style={{
                  background:
                    "linear-gradient(to top, oklch(0.05 0.01 260 / 0.97) 0%, oklch(0.05 0.01 260 / 0.7) 50%, transparent 100%)",
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={
                  hoveredIndex === i
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 20 }
                }
                transition={{ duration: 0.3 }}
              >
                <h3 className="font-heading font-bold text-xl text-foreground mb-1">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {item.description}
                </p>
                <motion.div
                  className="flex items-center gap-2 text-sm font-semibold text-gold"
                  whileHover={{ x: 4 }}
                >
                  <ExternalLink size={14} />
                  View Project
                </motion.div>
              </motion.div>

              {/* Always visible bottom gradient */}
              <div
                className="absolute bottom-0 left-0 right-0 h-16 z-10"
                style={{
                  background:
                    "linear-gradient(to top, oklch(0.05 0.01 260 / 0.6), transparent)",
                }}
              />

              {/* Gold border glow on hover */}
              <motion.div
                className="absolute inset-0 rounded-2xl pointer-events-none z-20"
                animate={
                  hoveredIndex === i
                    ? { boxShadow: "inset 0 0 0 1px oklch(0.78 0.17 75 / 0.4)" }
                    : { boxShadow: "inset 0 0 0 1px transparent" }
                }
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
