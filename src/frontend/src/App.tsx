import { useEffect, useRef, useState } from "react";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import Navbar from "./components/Navbar";
import PortfolioSection from "./components/PortfolioSection";
import ServicesSection from "./components/ServicesSection";
import StatsSection from "./components/StatsSection";
import TestimonialsSection from "./components/TestimonialsSection";
import WhyUsSection from "./components/WhyUsSection";

export default function App() {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="relative min-h-screen bg-background overflow-x-hidden">
      {/* Cursor spotlight — gold only */}
      <div
        ref={cursorRef}
        className="fixed pointer-events-none z-0 rounded-full"
        style={{
          width: 600,
          height: 600,
          left: cursorPos.x - 300,
          top: cursorPos.y - 300,
          background:
            "radial-gradient(circle, oklch(0.78 0.17 75 / 0.07) 0%, oklch(0.78 0.17 75 / 0.02) 40%, transparent 70%)",
          transition: "left 0.15s ease, top 0.15s ease",
        }}
      />

      {/* Animated background gradient — warm gold only */}
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 20% 50%, oklch(0.25 0.05 75 / 0.12) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, oklch(0.78 0.1 75 / 0.06) 0%, transparent 40%)",
        }}
      />

      <div className="relative z-10">
        <Navbar />
        <main>
          <HeroSection />
          <ServicesSection />
          <StatsSection />
          <WhyUsSection />
          <PortfolioSection />
          <TestimonialsSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </div>
  );
}
