import { CheckCircle, Mail, MapPin, Phone, Send } from "lucide-react";
import { motion, useInView } from "motion/react";
import { useRef, useState } from "react";
import { API_BASE_URL } from "../api-config";

const services = [
  "Website Development",
  "Logo Design",
  "Social Media Marketing",
  "Mobile App Development",
  "SEO Optimization",
  "Graphic Design",
  "Corporate Branding",
  "Video & Animation",
];

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "PremiumPromoters052@gmail.com",
    href: "PremiumPromoters052@gmail.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+1 825-609-6137",
    href: "tel:+18256096137",
  },
  { icon: MapPin, label: "Location", value: "Edmonton, Alberta", href: "#" },
];

export default function ContactSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      const response = await fetch(`${API_BASE_URL}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setSubmitted(true);
        setForm({ name: '', email: '', phone: '', service: '', message: '' });
      } else {
        alert(data.message || 'Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="py-24 px-4 sm:px-6 relative overflow-hidden"
    >
      {/* BG — gold only radial glows */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 0% 50%, oklch(0.25 0.05 75 / 0.10) 0%, transparent 50%), radial-gradient(ellipse at 100% 50%, oklch(0.78 0.17 75 / 0.06) 0%, transparent 50%)",
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
            Contact
          </p>
          <h2 className="text-4xl md:text-5xl font-display font-black">
            <span className="text-foreground">Get </span>
            <span className="text-gradient-gold">In Touch</span>
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
            Ready to elevate your digital presence? Let's talk about your
            project.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-start">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h3 className="font-heading font-bold text-2xl text-foreground mb-3">
                Let's Build Something{" "}
                <span className="text-gradient-gold">Extraordinary</span>
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Whether you need a stunning website, a powerful brand identity,
                or a results-driven marketing strategy — we're here to make it
                happen. Reach out today and let's start your journey to digital
                excellence.
              </p>
            </div>

            <div className="space-y-5">
              {contactInfo.map((info, i) => {
                const Icon = info.icon;
                return (
                  <motion.a
                    key={info.label}
                    href={info.href}
                    className="flex items-center gap-4 group"
                    initial={{ opacity: 0, x: -30 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: i * 0.1 + 0.4 }}
                    whileHover={{ x: 6 }}
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300"
                      style={{
                        background: "oklch(0.78 0.17 75 / 0.12)",
                        border: "1px solid oklch(0.78 0.17 75 / 0.25)",
                      }}
                    >
                      <Icon size={20} className="text-gold" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-0.5">
                        {info.label}
                      </p>
                      <p className="text-foreground font-medium group-hover:text-gold transition-colors">
                        {info.value}
                      </p>
                    </div>
                  </motion.a>
                );
              })}
            </div>

            {/* Decorative element */}
            <motion.div
              className="glass-card rounded-2xl p-6 mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.7 }}
            >
              <p className="text-sm text-muted-foreground mb-3">
                Response Time
              </p>
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
                <span className="text-foreground font-semibold">
                  We reply within 2 business hours
                </span>
              </div>
            </motion.div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            {submitted ? (
              <motion.div
                data-ocid="contact.success_state"
                className="glass-card rounded-2xl p-10 text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, type: "spring" }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                >
                  <CheckCircle size={64} className="text-gold mx-auto mb-4" />
                </motion.div>
                <h3 className="font-heading font-bold text-2xl text-foreground mb-3">
                  Message Sent! 🎉
                </h3>
                <p className="text-muted-foreground">
                  Thank you for reaching out. Our team will contact you within 2
                  business hours to discuss your project.
                </p>
                <motion.button
                  className="mt-6 btn-gold px-6 py-3 rounded-full font-bold"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    setSubmitted(false);
                    setForm({
                      name: "",
                      email: "",
                      phone: "",
                      service: "",
                      message: "",
                    });
                  }}
                >
                  Send Another Message
                </motion.button>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="glass-card rounded-2xl p-8 space-y-5"
              >
                <div className="grid sm:grid-cols-2 gap-5">
                  {/* Name */}
                  <div className="space-y-2">
                    <label
                      className="text-sm font-medium text-foreground/80"
                      htmlFor="name"
                    >
                      Full Name *
                    </label>
                    <motion.input
                      id="name"
                      name="name"
                      type="text"
                      data-ocid="contact.input"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="your name"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-border text-foreground placeholder:text-muted-foreground text-sm transition-all duration-300 outline-none focus:border-gold/50"
                      whileFocus={{ scale: 1.01 }}
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label
                      className="text-sm font-medium text-foreground/80"
                      htmlFor="email"
                    >
                      Email Address *
                    </label>
                    <motion.input
                      id="email"
                      name="email"
                      type="email"
                      data-ocid="contact.input"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="your email address"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-border text-foreground placeholder:text-muted-foreground text-sm transition-all duration-300 outline-none focus:border-gold/50"
                      whileFocus={{ scale: 1.01 }}
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  {/* Phone */}
                  <div className="space-y-2">
                    <label
                      className="text-sm font-medium text-foreground/80"
                      htmlFor="phone"
                    >
                      Phone Number
                    </label>
                    <motion.input
                      id="phone"
                      name="phone"
                      type="tel"
                      data-ocid="contact.input"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+1 (xxx) xxx-xxxx"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-border text-foreground placeholder:text-muted-foreground text-sm transition-all duration-300 outline-none focus:border-gold/50"
                      whileFocus={{ scale: 1.01 }}
                    />
                  </div>

                  {/* Service */}
                  <div className="space-y-2">
                    <label
                      className="text-sm font-medium text-foreground/80"
                      htmlFor="service"
                    >
                      Service Interested In *
                    </label>
                    <select
                      id="service"
                      name="service"
                      data-ocid="contact.select"
                      required
                      value={form.service}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground text-sm transition-all duration-300 outline-none focus:border-gold/50 cursor-pointer"
                    >
                      <option value="" className="bg-background">
                        Select a service
                      </option>
                      {services.map((s) => (
                        <option key={s} value={s} className="bg-background">
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label
                    className="text-sm font-medium text-foreground/80"
                    htmlFor="message"
                  >
                    Your Message *
                  </label>
                  <motion.textarea
                    id="message"
                    name="message"
                    data-ocid="contact.textarea"
                    required
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us about your project, goals, and timeline..."
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-border text-foreground placeholder:text-muted-foreground text-sm transition-all duration-300 outline-none focus:border-gold/50 resize-none"
                    whileFocus={{ scale: 1.01 }}
                  />
                </div>

                {/* Submit */}
                <motion.button
                  type="submit"
                  data-ocid="contact.submit_button"
                  disabled={submitting}
                  className="w-full btn-gold py-4 rounded-xl font-bold text-base flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  whileHover={{
                    scale: submitting ? 1 : 1.02,
                    boxShadow: "0 0 25px oklch(0.78 0.17 75 / 0.5)",
                  }}
                  whileTap={{ scale: submitting ? 1 : 0.98 }}
                >
                  {submitting ? (
                    <>
                      <motion.div
                        className="w-5 h-5 rounded-full border-2 border-background/30 border-t-background"
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 0.8,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "linear",
                        }}
                      />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Send Message
                    </>
                  )}
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
