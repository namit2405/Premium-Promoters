import {
  Briefcase,
  Code2,
  Film,
  Megaphone,
  Palette,
  PenTool,
  Search,
  Smartphone,
} from "lucide-react";
import { motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { API_BASE_URL } from "../api-config";

// Icon mapping
const iconMap: Record<string, any> = {
  Code2,
  PenTool,
  Megaphone,
  Search,
  Smartphone,
  Palette,
  Briefcase,
  Film,
};

interface Service {
  _id: string;
  title: string;
  description: string;
  icon: string;
  image: string;
  category: 'featured' | 'additional';
  benefits: string[];
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.92 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
    },
  },
};

export default function ServicesSection() {
  const [services, setServices] = useState<Service[]>([]);
  const [flippedCards, setFlippedCards] = useState<Set<string>>(new Set());
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, margin: "-80px" });

  const bottomRef = useRef<HTMLDivElement>(null);
  const bottomInView = useInView(bottomRef, { once: true, margin: "-80px" });

  const toggleFlip = (id: string) => {
    setFlippedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  // Fetch services from API
  useEffect(() => {
    fetch(`${API_BASE_URL}/services`)
      .then(res => res.json())
      .then(data => setServices(data))
      .catch(err => console.error('Error fetching services:', err));
  }, []);

  const featuredServices = services.filter(s => s.category === 'featured');
  const additionalServices = services.filter(s => s.category === 'additional');

  return (
    <section
      id="services"
      className="py-24 px-4 sm:px-6 relative overflow-hidden"
    >
      {/* Subtle BG decoration */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, oklch(0.78 0.17 75 / 0.06) 0%, transparent 70%)",
          filter: "blur(40px)",
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
            What We Offer
          </p>
          <h2 className="text-4xl md:text-5xl font-display font-black">
            <span className="text-foreground">Our </span>
            <span className="text-gradient-gold">Premium Services</span>
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
            From concept to launch — we deliver end-to-end digital solutions
            that transform businesses.
          </p>
        </motion.div>

        {/* Featured Services — 4 cards with images */}
        <motion.div
          ref={containerRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-4 sm:mb-6"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {featuredServices.map((service, i) => {
            const Icon = iconMap[service.icon] || Code2;
            const isFlipped = flippedCards.has(service._id);
            return (
              <motion.div
                key={service.title}
                data-ocid={`services.item.${i + 1}`}
                className="glass-card rounded-2xl overflow-hidden cursor-pointer"
                variants={cardVariants}
                style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
              >
                <motion.div
                  className="relative w-full h-full"
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Front Side */}
                  <div
                    className="absolute inset-0 flex flex-col group"
                    style={{ backfaceVisibility: "hidden" }}
                  >
                    {/* Image */}
                    <div className="relative h-44 overflow-hidden">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-transparent to-transparent" />
                      {/* Icon badge */}
                      <div
                        className="absolute bottom-3 left-3 w-9 h-9 rounded-lg flex items-center justify-center"
                        style={{
                          background: "oklch(0.78 0.17 75 / 0.2)",
                          border: "1px solid oklch(0.78 0.17 75 / 0.35)",
                          backdropFilter: "blur(8px)",
                        }}
                      >
                        <Icon size={16} className="text-gold" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 flex flex-col gap-3 flex-1">
                      <h3 className="font-heading font-bold text-base text-foreground leading-snug">
                        {service.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed flex-1">
                        {service.description}
                      </p>
                      <button
                        onClick={() => toggleFlip(service._id)}
                        className="flex items-center gap-1 text-xs font-semibold text-gold hover:gap-2 transition-all"
                      >
                        See Benefits →
                      </button>
                    </div>
                  </div>

                  {/* Back Side */}
                  <div
                    className="absolute inset-0 flex flex-col p-5 glass-card-hover"
                    style={{
                      backfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                    }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-heading font-bold text-base text-foreground">
                        Benefits
                      </h3>
                      <button
                        onClick={() => toggleFlip(service._id)}
                        className="text-gold text-xs font-semibold hover:text-gold/80"
                      >
                        ← Back
                      </button>
                    </div>
                    <ul className="space-y-2 flex-1 overflow-y-auto">
                      {service.benefits && service.benefits.length > 0 ? (
                        service.benefits.map((benefit, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <span className="text-gold mt-1">✓</span>
                            <span>{benefit}</span>
                          </li>
                        ))
                      ) : (
                        <li className="text-sm text-muted-foreground italic">
                          No benefits listed yet
                        </li>
                      )}
                    </ul>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Additional Services — 4 icon-only cards */}
        <motion.div
          ref={bottomRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={bottomInView ? "visible" : "hidden"}
        >
          {additionalServices.map((service, i) => {
            const Icon = iconMap[service.icon] || Smartphone;
            const isFlipped = flippedCards.has(service._id);
            return (
              <motion.div
                key={service.title}
                data-ocid={`services.item.${i + 5}`}
                className="glass-card rounded-2xl overflow-hidden cursor-pointer"
                variants={cardVariants}
                style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
              >
                <motion.div
                  className="relative w-full h-full"
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Front Side */}
                  <div
                    className="absolute inset-0 flex flex-col group"
                    style={{ backfaceVisibility: "hidden" }}
                  >
                    {/* Image */}
                    <div className="relative h-36 overflow-hidden">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-transparent to-transparent" />
                      {/* Icon badge */}
                      <div
                        className="absolute bottom-2 left-2 w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{
                          background: "oklch(0.78 0.17 75 / 0.2)",
                          border: "1px solid oklch(0.78 0.17 75 / 0.35)",
                          backdropFilter: "blur(8px)",
                        }}
                      >
                        <Icon size={14} className="text-gold" />
                      </div>
                    </div>

                    <div className="p-5 flex flex-col gap-3 flex-1">
                      <h3 className="font-heading font-bold text-base text-foreground leading-snug">
                        {service.title}
                      </h3>

                      <p className="text-muted-foreground text-sm leading-relaxed flex-1">
                        {service.description}
                      </p>

                      <button
                        onClick={() => toggleFlip(service._id)}
                        className="flex items-center gap-1 text-xs font-semibold text-gold hover:gap-2 transition-all"
                      >
                        See Benefits →
                      </button>
                    </div>
                  </div>

                  {/* Back Side */}
                  <div
                    className="absolute inset-0 flex flex-col p-5 glass-card-hover"
                    style={{
                      backfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                    }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-heading font-bold text-base text-foreground">
                        Benefits
                      </h3>
                      <button
                        onClick={() => toggleFlip(service._id)}
                        className="text-gold text-xs font-semibold hover:text-gold/80"
                      >
                        ← Back
                      </button>
                    </div>
                    <ul className="space-y-2 flex-1 overflow-y-auto">
                      {service.benefits && service.benefits.length > 0 ? (
                        service.benefits.map((benefit, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <span className="text-gold mt-1">✓</span>
                            <span>{benefit}</span>
                          </li>
                        ))
                      ) : (
                        <li className="text-sm text-muted-foreground italic">
                          No benefits listed yet
                        </li>
                      )}
                    </ul>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
