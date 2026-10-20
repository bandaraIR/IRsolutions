import { useState, useEffect } from "react";
import Navigation from "./components/Navigation";
import HeroSection from "./components/HeroSection";
import CircularProjectShowcase from "./components/CircularProjectShowcase";
import ServicesSection from "./components/ServicesSection";
import AboutSection from "./components/AboutSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const scrollY = window.scrollY;

      // If near the top, highlight home
      if (scrollY < windowHeight * 0.3) {
        setActiveSection("home");
        return;
      }

      // 1. Check Contact Section
      const contactEl = document.getElementById("contact");
      if (contactEl && contactEl.getBoundingClientRect().top <= windowHeight * 0.45) {
        setActiveSection("contact");
        return;
      }

      // 2. Check About Section
      const aboutEl = document.getElementById("about");
      if (aboutEl && aboutEl.getBoundingClientRect().top <= windowHeight * 0.45) {
        setActiveSection("about");
        return;
      }

      // 3. Check Services Section
      const servicesEl = document.getElementById("services");
      if (servicesEl && servicesEl.getBoundingClientRect().top <= windowHeight * 0.45) {
        setActiveSection("services");
        return;
      }

      // 4. Check Projects Section
      const projectsEl = document.getElementById("projects");
      if (projectsEl && projectsEl.getBoundingClientRect().top <= windowHeight * 0.5) {
        setActiveSection("projects");
        return;
      }

      setActiveSection("home");
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="App">
      {/* Subtle organic noise overlay */}
      <div className="noise-overlay" aria-hidden="true" />

      {/* Modern navigation header */}
      <Navigation activeSection={activeSection} />

      {/* 1. Landing Page: New Hero Section matching reference design */}
      <HeroSection />

      {/* 2. Projects Section: 3D Circular Project Showcase */}
      <CircularProjectShowcase />

      {/* 3. Services Section: Engineering Capabilities & Pillars */}
      <ServicesSection />

      {/* 4. About Section: The Engineer's Story & AI Assistant */}
      <AboutSection />

      {/* 5. Contact Section: Inquiries & Correspondence Desk */}
      <ContactSection />

      {/* Clean Modern Footer */}
      <Footer />
    </div>
  );
}

export default App;