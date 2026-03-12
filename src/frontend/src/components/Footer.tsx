import { motion } from "motion/react";
import { SiFacebook, SiInstagram, SiLinkedin, SiX } from "react-icons/si";

const companyLinks = [
  { label: "About Us", href: "#home" },
  { label: "Our Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

const serviceLinks = [
  { label: "Website Development", href: "#services" },
  { label: "Logo Design", href: "#services" },
  { label: "Social Media Marketing", href: "#services" },
  { label: "Mobile App Development", href: "#services" },
  { label: "SEO Optimization", href: "#services" },
];

const socialLinks = [
  { icon: SiFacebook, href: "https://www.facebook.com/people/Premium-promoters/61588581827416/?mibextid=wwXIfr&rdid=MCj1hfTosJBZX2HN&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1CK1r2u2MW%2F%3Fmibextid%3DwwXIfr", label: "Facebook" },
  { icon: SiInstagram, href: "https://www.instagram.com/premium_promoters/", label: "Instagram" },
];

export default function Footer() {
  const scrollToSection = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="relative overflow-hidden border-t border-border">
      {/* BG — deep charcoal, no purple */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, oklch(0.08 0.006 260) 0%, oklch(0.06 0.005 260) 100%)",
        }}
      />

      {/* Decorative top line */}
      <div className="section-divider" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-10 mb-12">
          {/* Brand Column */}
          <div className="sm:col-span-2 md:col-span-1">
            <motion.div
              className="flex items-center gap-2 mb-4"
              whileHover={{ scale: 1.02 }}
            >
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#F4C430] to-[#D4AF37] flex items-center justify-center">
                <span className="text-[#0B0B0D] font-bold text-base">PP</span>
              </div>
              <span className="font-display font-black text-lg">
                <span className="text-gradient-gold">Premium</span>
                <span className="text-foreground"> Promoters</span>
              </span>
            </motion.div>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              Elevating brands and businesses through premium digital solutions.
              Your success is our mission.
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-9 h-9 rounded-lg glass-card flex items-center justify-center text-muted-foreground hover:text-gold transition-colors"
                    whileHover={{ scale: 1.15, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon size={16} />
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-heading font-bold text-foreground mb-5 text-base">
              Company
            </h4>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <motion.a
                    href={link.href}
                    data-ocid="nav.link"
                    className="text-muted-foreground text-sm hover:text-gold transition-colors flex items-center gap-1.5 group"
                    whileHover={{ x: 4 }}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.href);
                    }}
                  >
                    <span className="w-1 h-1 rounded-full bg-muted-foreground group-hover:bg-gold transition-colors" />
                    {link.label}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="font-heading font-bold text-foreground mb-5 text-base">
              Services
            </h4>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <motion.a
                    href={link.href}
                    data-ocid="nav.link"
                    className="text-muted-foreground text-sm hover:text-gold transition-colors flex items-center gap-1.5 group"
                    whileHover={{ x: 4 }}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.href);
                    }}
                  >
                    <span className="w-1 h-1 rounded-full bg-muted-foreground group-hover:bg-gold transition-colors" />
                    {link.label}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-heading font-bold text-foreground mb-5 text-base">
              Contact Info
            </h4>
            <ul className="space-y-4">
              <li>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                  Email
                </p>
                <a
                  href="mailto:info@premiumpromoters.com"
                  className="text-sm text-foreground/80 hover:text-gold transition-colors"
                >
                  info@premiumpromoters.com
                </a>
              </li>
              <li>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                  Phone
                </p>
                <a
                  href="tel:+1 825-609-6137"
                  className="text-sm text-foreground/80 hover:text-gold transition-colors"
                >
                  +1 825-609-6137
                </a>
              </li>
              <li>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                  Location
                </p>
                <p className="text-sm text-foreground/80">Edmonton, alberta </p>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="section-divider mb-6" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
          <p className="text-muted-foreground">
            © {new Date().getFullYear()} Premium Promoters. All rights reserved.
          </p>
          <p className="text-muted-foreground">
            Built with ❤️{" "}
            <a
              href=""
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold hover:text-gold-bright transition-colors"
            >
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
