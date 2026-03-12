import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "../api-config";

interface Testimonial {
  _id: string;
  text: string;
  name: string;
  role: string;
  avatar: string;
  image?: string;
  rating: number;
}

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [current, setCurrent] = useState(0);

  // Fetch testimonials from API
  useEffect(() => {
    fetch(`${API_BASE_URL}/testimonials`)
      .then(res => res.json())
      .then(data => {
        console.log('Testimonials loaded:', data);
        setTestimonials(data);
      })
      .catch(err => console.error('Error:', err));
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    if (testimonials.length === 0) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials]);

  const next = () => setCurrent((c) => (c + 1) % testimonials.length);
  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);

  if (testimonials.length === 0) {
    return (
      <section id="testimonials" className="py-24 px-4 sm:px-6 bg-background">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-muted-foreground">Loading testimonials...</p>
        </div>
      </section>
    );
  }

  const testimonial = testimonials[current];

  return (
    <section id="testimonials" className="py-24 px-4 sm:px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-gold text-sm font-semibold uppercase tracking-widest mb-3">
            Testimonials
          </p>
          <h2 className="text-4xl md:text-5xl font-display font-black">
            <span className="text-foreground">What Clients </span>
            <span className="text-gradient-gold">Say About Us</span>
          </h2>
          <div
            className="mx-auto mt-4 h-1 rounded-full w-32"
            style={{
              background: "linear-gradient(90deg, oklch(0.87 0.19 78), oklch(0.68 0.14 72))",
            }}
          />
        </div>

        {/* Testimonial Card */}
        <div className="max-w-6xl mx-auto">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="glass-card rounded-2xl overflow-hidden"
          >
            <div className="grid md:grid-cols-2 gap-0">
              {/* Image Section */}
              <div className="relative h-80 md:h-[500px]">
                <motion.img
                  key={testimonial.image}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                  src={testimonial.image || '/assets/images/happy client.jpg'}
                  alt={testimonial.name}
                  className="w-full h-full object-cover"
                />
                <div 
                  className="absolute inset-0"
                  style={{
                    background: "linear-gradient(to right, transparent 0%, oklch(0.08 0.006 260 / 0.3) 100%)"
                  }}
                />
              </div>

              {/* Content Section */}
              <div className="p-8 md:p-12 flex flex-col justify-center min-h-[500px]">
                {/* Stars */}
                <div className="flex items-center gap-1 mb-6">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      fill="oklch(0.78 0.17 75)"
                      style={{ color: "oklch(0.78 0.17 75)" }}
                    />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-lg md:text-xl text-foreground/90 leading-relaxed mb-8">
                  "{testimonial.text}"
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm"
                    style={{
                      background: "linear-gradient(135deg, oklch(0.87 0.19 78), oklch(0.78 0.17 75))",
                      color: "oklch(0.08 0.006 260)",
                    }}
                  >
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="font-heading font-bold text-foreground">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200"
              style={{
                background: "oklch(0.10 0.008 260)",
                border: "1px solid oklch(0.78 0.17 75 / 0.25)",
                color: "oklch(0.78 0.17 75)",
              }}
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={18} />
            </button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className="transition-all duration-300"
                  aria-label={`Go to testimonial ${i + 1}`}
                >
                  <div
                    className="h-2 rounded-full"
                    style={{
                      width: i === current ? 28 : 8,
                      background: i === current
                        ? "linear-gradient(90deg, oklch(0.87 0.19 78), oklch(0.78 0.17 75))"
                        : "oklch(0.28 0.018 260)",
                    }}
                  />
                </button>
              ))}
            </div>

            <button
              onClick={next}
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200"
              style={{
                background: "oklch(0.10 0.008 260)",
                border: "1px solid oklch(0.78 0.17 75 / 0.25)",
                color: "oklch(0.78 0.17 75)",
              }}
              aria-label="Next testimonial"
            >
              <ChevronRight size={18} />
            </button>

            {/* Counter */}
            <div className="ml-4 text-sm text-muted-foreground font-medium tabular-nums">
              <span style={{ color: "oklch(0.78 0.17 75)" }}>
                {String(current + 1).padStart(2, "0")}
              </span>
              <span className="mx-1">/</span>
              {String(testimonials.length).padStart(2, "0")}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
