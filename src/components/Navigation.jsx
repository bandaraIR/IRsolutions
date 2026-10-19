import { useState, useEffect } from "react";
import { Sparkles, Menu, X, ArrowUpRight } from "lucide-react";
import "../styles/Navigation.css";

export default function Navigation({ activeSection = "welcome" }) {
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      if (totalScroll > 0) {
        setScrollProgress((currentScroll / totalScroll) * 100);
      }
      setScrolled(currentScroll > 40);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id) => {
    setMobileMenuOpen(false);
    if (id === "welcome") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    if (id === "projects") {
      if (typeof window.__scrollToProject === "function") {
        window.__scrollToProject(0);
        return;
      }
      const st = window.__projectsScrollTrigger;
      const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
      if (st && st.end > st.start) {
        const targetProgress = isMobile ? 0.08 : 0.16;
        const targetScroll = st.start + targetProgress * (st.end - st.start);
        window.scrollTo({ top: targetScroll, behavior: "smooth" });
        return;
      } else {
        window.scrollTo({ top: window.innerHeight * (isMobile ? 0.85 : 1.25), behavior: "smooth" });
        return;
      }
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navItems = [
    { id: "welcome", label: "Hello" },
    { id: "projects", label: "Projects" },
    { id: "about", label: "About" },
    { id: "contact", label: "Contact" }
  ];

  return (
    <>
      {/* Top scroll progress indicator bar */}
      <div 
        className="scroll-progress-line"
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      />

      <header className={`apple-nav-header ${scrolled ? "scrolled" : ""}`}>
        <nav className="apple-nav-capsule">
          {/* Logo / Monogram */}
          <button 
            className="nav-logo-btn"
            onClick={() => scrollTo("welcome")}
            aria-label="Scroll to top"
          >
            <span className="logo-monogram">IR</span>
            <span className="logo-dot" />
            <span className="logo-name">Solutions</span>
          </button>

          {/* Desktop Nav Links */}
          <div className="nav-links-cluster">
            {navItems.map((item) => (
              <button
                key={item.id}
                className={`nav-capsule-link ${activeSection === item.id ? "active" : ""}`}
                onClick={() => scrollTo(item.id)}
              >
                {item.label}
                {activeSection === item.id && <span className="active-pill-indicator" />}
              </button>
            ))}
          </div>

          {/* Right Action */}
          <div className="nav-right-cluster">
            <button 
              className="nav-cta-btn"
              onClick={() => scrollTo("contact")}
            >
              <span>Get in Touch</span>
              <ArrowUpRight size={14} />
            </button>

            {/* Mobile Hamburger */}
            <button 
              className="mobile-hamburger-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer */}
      <div className={`mobile-nav-drawer ${mobileMenuOpen ? "open" : ""}`}>
        <div className="mobile-drawer-content">
          <div className="mobile-drawer-header">
            <span className="mobile-drawer-title">Navigation</span>
            <button 
              className="mobile-drawer-close"
              onClick={() => setMobileMenuOpen(false)}
            >
              <X size={20} />
            </button>
          </div>
          <div className="mobile-links-list">
            {navItems.map((item) => (
              <button
                key={item.id}
                className={`mobile-nav-item ${activeSection === item.id ? "active" : ""}`}
                onClick={() => scrollTo(item.id)}
              >
                <span>{item.label}</span>
                {activeSection === item.id && <Sparkles size={16} className="active-star" />}
              </button>
            ))}
          </div>
          <div className="mobile-drawer-footer">
            <button 
              className="mobile-cta-full"
              onClick={() => scrollTo("contact")}
            >
              Contact Imal Ravindu
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
