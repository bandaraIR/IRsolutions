import { useState, useEffect } from "react";
import Navigation from "./components/Navigation";
import CircularProjectShowcase from "./components/CircularProjectShowcase";
import AboutSection from "./components/AboutSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  const [activeSection, setActiveSection] = useState("welcome");

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;

      // 1. Check Contact Section
      const contactEl = document.getElementById("contact");
      if (contactEl && contactEl.getBoundingClientRect().top <= windowHeight * 0.4) {
        setActiveSection("contact");
        return;
      }

      // 2. Check About Section
      const aboutEl = document.getElementById("about");
      if (aboutEl && aboutEl.getBoundingClientRect().top <= windowHeight * 0.4) {
        setActiveSection("about");
        return;
      }

      // 3. Check Hello vs Projects within the master pinned showcase
      const st = window.__projectsScrollTrigger;
      const isMobile = window.innerWidth < 768;
      if (st) {
        const threshold = isMobile ? 0.05 : 0.12;
        if (st.progress > threshold) {
          setActiveSection("projects");
        } else {
          setActiveSection("welcome");
        }
      } else {
        if (window.scrollY > windowHeight * (isMobile ? 0.35 : 0.5)) {
          setActiveSection("projects");
        } else {
          setActiveSection("welcome");
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="App">
      {/* Subtle organic noise overlay */}
      <div className="noise-overlay" aria-hidden="true" />

      {/* Floating Apple capsule navigation */}
      <Navigation activeSection={activeSection} />

      {/* 1 & 2. Synchronized Sequence: Initial "Hello" -> Apple 3D Circular Projects */}
      <CircularProjectShowcase />

      {/* 3. About Section: AI Correspondent Tab + Horizontal Text Deck */}
      <AboutSection />

      {/* 4. Contact & Correspondence Desk */}
      <ContactSection />

      {/* Minimalist Dark Footer */}
      <Footer />
    </div>
  );
}

export default App;