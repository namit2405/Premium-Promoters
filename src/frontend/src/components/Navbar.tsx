import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Why Us", href: "#why-us" },
  { label: "Our Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact Us", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Intersection observer for active section tracking
  useEffect(() => {
    const sectionIds = navLinks.map((l) => l.href.replace("#", ""));

    const callback: IntersectionObserverCallback = (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      }
    };

    observerRef.current = new IntersectionObserver(callback, {
      root: null,
      rootMargin: "-30% 0px -60% 0px",
      threshold: 0,
    });

    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (el) observerRef.current.observe(el);
    }

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setActiveSection(href.replace("#", ""));
  };

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        animate={{
          backgroundColor: scrolled ? "rgba(11, 11, 13, 0.95)" : "rgba(11, 11, 13, 0)",
          backdropFilter: scrolled ? "blur(20px)" : "blur(0px)",
          borderBottom: scrolled
            ? "1px solid rgba(40, 40, 45, 1)"
            : "1px solid transparent",
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <motion.button
              type="button"
              className="flex items-center gap-2 cursor-pointer shrink-0"
              whileHover={{ scale: 1.02 }}
              onClick={() => handleNavClick("#home")}
            >
              <div className="h-9 w-9 rounded-full bg-gradient-to-br from-[#F4C430] to-[#D4AF37] flex items-center justify-center">
                <span className="text-[#0B0B0D] font-bold text-lg">PP</span>
              </div>
              <span className="font-display font-black text-base sm:text-lg leading-tight">
                <span className="text-gradient-gold">Premium</span>
                <span className="text-foreground"> Promoters</span>
              </span>
            </motion.button>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link, i) => {
                const isActive = activeSection === link.href.replace("#", "");
                return (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    data-ocid="nav.link"
                    className="relative px-3 py-1.5 text-sm font-medium transition-colors duration-200"
                    style={{
                      color: isActive
                        ? "oklch(0.87 0.19 78)"
                        : "oklch(0.65 0.012 260)",
                    }}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 + 0.2 }}
                    whileHover={{ color: "oklch(0.97 0.003 80)" }}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }}
                  >
                    {/* Active border box */}
                    <AnimatePresence>
                      {isActive && (
                        <motion.span
                          className="absolute inset-0 rounded-sm pointer-events-none"
                          style={{
                            border: "1.5px solid oklch(0.78 0.17 75 / 0.85)",
                            boxShadow: "0 0 10px oklch(0.78 0.17 75 / 0.2)",
                          }}
                          initial={{ opacity: 0, scale: 0.85 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.85 }}
                          transition={{ duration: 0.2 }}
                          layoutId="activeNavBorder"
                        />
                      )}
                    </AnimatePresence>
                    {link.label}
                  </motion.a>
                );
              })}
            </nav>

            {/* CTA Button */}
            <div className="hidden lg:flex items-center">
              <motion.button
                data-ocid="nav.primary_button"
                className="btn-gold px-5 py-2 rounded-full text-sm font-bold transition-all duration-300 uppercase tracking-wider"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 25px oklch(0.78 0.18 75 / 0.5)",
                }}
                whileTap={{ scale: 0.97 }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                onClick={() => handleNavClick("#contact")}
              >
                Get Started
              </motion.button>
            </div>

            {/* Hamburger */}
            <motion.button
              className="lg:hidden text-foreground p-2"
              whileTap={{ scale: 0.9 }}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <button
              type="button"
              aria-label="Close menu"
              className="absolute inset-0 bg-black/70 backdrop-blur-sm cursor-default"
              onClick={() => setMobileOpen(false)}
              onKeyDown={(e) => e.key === "Escape" && setMobileOpen(false)}
            />
            {/* Drawer */}
            <motion.div
              className="absolute right-0 top-0 bottom-0 w-[min(288px,85vw)] glass-card border-l border-border flex flex-col pt-20 pb-8 px-6"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
            >
              <nav className="flex flex-col gap-1">
                {navLinks.map((link, i) => {
                  const isActive = activeSection === link.href.replace("#", "");
                  return (
                    <motion.a
                      key={link.label}
                      href={link.href}
                      data-ocid="nav.link"
                      className="relative px-4 py-3 text-base font-medium rounded-lg transition-colors"
                      style={{
                        color: isActive
                          ? "oklch(0.87 0.19 78)"
                          : "oklch(0.75 0.012 260)",
                        background: isActive
                          ? "oklch(0.78 0.17 75 / 0.08)"
                          : "transparent",
                        border: isActive
                          ? "1px solid oklch(0.78 0.17 75 / 0.35)"
                          : "1px solid transparent",
                      }}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06 }}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(link.href);
                      }}
                    >
                      {link.label}
                    </motion.a>
                  );
                })}
              </nav>
              <div className="mt-6">
                <motion.button
                  data-ocid="nav.primary_button"
                  className="btn-gold w-full py-3 rounded-full font-bold text-base uppercase tracking-wider"
                  whileTap={{ scale: 0.97 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  onClick={() => handleNavClick("#contact")}
                >
                  Get Started
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
