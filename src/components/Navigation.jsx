import { useState, useEffect } from "react";
import { Search, Menu, X, ArrowRight, Sparkles } from "lucide-react";
import irLogoMark from "../assets/ir.png";
import { PROJECTS_DATA } from "../data/portfolioData";
import "../styles/Navigation.css";

export default function Navigation({ activeSection = "home" }) {
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      if (totalScroll > 0) {
        setScrollProgress((currentScroll / totalScroll) * 100);
      }
      setScrolled(currentScroll > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id) => {
    setMobileMenuOpen(false);
    setSearchOpen(false);

    if (id === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (id === "projects") {
      if (typeof window.__scrollToProject === "function") {
        window.__scrollToProject(0);
        return;
      }
      const st = window.__projectsScrollTrigger;
      if (st && st.end > st.start) {
        const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
        const targetProgress = isMobile ? 0.08 : 0.16;
        const targetScroll = st.start + targetProgress * (st.end - st.start);
        window.scrollTo({ top: targetScroll, behavior: "smooth" });
        return;
      }
    }

    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navItems = [
    { id: "home", label: "Home" },
    { id: "projects", label: "Projects" },
    { id: "services", label: "Services" },
    { id: "about", label: "About" },
    { id: "contact", label: "Contact" }
  ];

  // Filter projects for search modal
  const searchResults = searchQuery.trim() === ""
    ? PROJECTS_DATA.slice(0, 4)
    : PROJECTS_DATA.filter((p) =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
      );

  return (
    <>
      {/* Top scroll progress indicator bar */}
      <div 
        className="scroll-progress-line"
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      />

      <header className={`ir-nav-header ${scrolled ? "is-scrolled" : ""}`}>
        <div className="ir-nav-container">
          {/* Left: Brand Monogram & Name */}
          <button 
            type="button"
            className="ir-brand-logo-btn"
            onClick={() => scrollTo("home")}
            aria-label="IR Solutions home"
          >
            <div className="ir-nav-logo-box">
              <img 
                src={irLogoMark} 
                alt="" 
                aria-hidden="true" 
                className="ir-nav-logo-img"
              />
            </div>
            <span className="ir-brand-text">IR SOLUTIONS</span>
          </button>

          {/* Center: Desktop Navigation Links */}
          <nav className="ir-desktop-nav-links" aria-label="Main Navigation">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  className={`ir-nav-link-btn ${isActive ? "active" : ""}`}
                  onClick={() => scrollTo(item.id)}
                  aria-current={isActive ? "page" : undefined}
                >
                  <span>{item.label}</span>
                  {isActive && <span className="active-blue-underline" />}
                </button>
              );
            })}
          </nav>

          {/* Right Action Cluster */}
          <div className="ir-nav-right-cluster">
            {/* Search Icon Button */}
            <button
              type="button"
              className="ir-search-toggle-btn"
              onClick={() => setSearchOpen(true)}
              aria-label="Search projects and services"
            >
              <Search size={18} />
            </button>

            {/* Get in Touch Button (Primary Blue Pill) */}
            <button 
              type="button"
              className="ir-get-in-touch-btn"
              onClick={() => scrollTo("contact")}
              aria-label="Get in touch"
            >
              <span>Get in Touch</span>
              <ArrowRight size={15} className="btn-arrow" />
            </button>

            {/* Mobile Hamburger Toggle */}
            <button 
              type="button"
              className="ir-mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <div 
        className={`ir-mobile-drawer-overlay ${mobileMenuOpen ? "is-open" : ""}`}
        onClick={() => setMobileMenuOpen(false)}
        aria-hidden={!mobileMenuOpen}
      >
        <div 
          className="ir-mobile-drawer"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="ir-drawer-header">
            <div className="drawer-logo">
              <img src={irLogoMark} alt="" width="32" height="36" />
              <span>IR SOLUTIONS</span>
            </div>
            <button 
              type="button"
              className="drawer-close-btn"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <X size={22} />
            </button>
          </div>

          <div className="ir-drawer-links">
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`drawer-link-item ${activeSection === item.id ? "active" : ""}`}
                onClick={() => scrollTo(item.id)}
              >
                <span>{item.label}</span>
                {activeSection === item.id && <Sparkles size={16} className="active-dot" />}
              </button>
            ))}
          </div>

          <div className="ir-drawer-footer">
            <button
              type="button"
              className="drawer-cta-primary"
              onClick={() => scrollTo("contact")}
            >
              <span>Get in Touch</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Quick Search Spotlight Modal */}
      {searchOpen && (
        <div 
          className="ir-search-modal-backdrop"
          onClick={() => setSearchOpen(false)}
        >
          <div 
            className="ir-search-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="search-input-wrapper">
              <Search size={20} className="search-icon-inside" />
              <input
                type="text"
                autoFocus
                placeholder="Search projects, technologies, systems..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-field"
              />
              <button 
                type="button" 
                onClick={() => setSearchOpen(false)}
                className="search-close-key"
                aria-label="Close search"
              >
                <X size={18} />
              </button>
            </div>

            <div className="search-results-list">
              <div className="search-results-label">
                {searchQuery ? `Results (${searchResults.length})` : "Featured Projects"}
              </div>

              {searchResults.length === 0 ? (
                <div className="search-empty">No projects found matching &ldquo;{searchQuery}&rdquo;.</div>
              ) : (
                searchResults.map((project, idx) => (
                  <div
                    key={project.id}
                    className="search-result-row"
                    onClick={() => {
                      setSearchOpen(false);
                      if (typeof window.__scrollToProject === "function") {
                        const originalIdx = PROJECTS_DATA.findIndex((p) => p.id === project.id);
                        window.__scrollToProject(originalIdx !== -1 ? originalIdx : idx);
                      } else {
                        scrollTo("projects");
                      }
                    }}
                  >
                    <div className="result-img-thumb">
                      <img src={project.image} alt="" />
                    </div>
                    <div className="result-text-col">
                      <span className="result-title">{project.title}</span>
                      <span className="result-cat">{project.category} &bull; {project.year}</span>
                    </div>
                    <ArrowRight size={16} className="result-arrow" />
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
