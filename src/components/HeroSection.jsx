import { useState, useRef } from "react";
import { ArrowRight, Cpu, Activity, ShieldCheck, CheckCircle2 } from "lucide-react";
import irLogoMark from "../assets/ir_logo_mark.png";
import industrialHeroImg from "../assets/ir.png";
import "../styles/HeroSection.css";

export default function HeroSection() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);

  // Subtle 3D mouse parallax tilt for the right visual on desktop
  const handleMouseMove = (e) => {
    if (typeof window === "undefined" || window.innerWidth < 1024) return;
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 16;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  const scrollTo = (id) => {
    if (id === "projects") {
      if (typeof window.__scrollToProject === "function") {
        window.__scrollToProject(0);
        return;
      }
      const st = window.__projectsScrollTrigger;
      if (st && typeof st.start === "number") {
        window.scrollTo({ top: st.start, behavior: "smooth" });
        return;
      }
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section 
      id="home" 
      className="hero-section-light" 
      ref={heroRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Dynamic Background Gradients & Light Rays */}
      <div className="hero-bg-container" aria-hidden="true">
        <div className="hero-radial-glow" />
        <div className="hero-diagonal-beam" />
        <div className="hero-grid-lines" />
      </div>

      <div className="hero-container-inner">
        {/* Left Column: Brand Information & Call to Actions */}
        <div className="hero-content-col">
          {/* Top Eyebrow */}
          <div className="hero-eyebrow-pill">
            <span className="eyebrow-text">INDUSTRIAL AUTOMATION &nbsp;/&nbsp; ENTERPRISE IoT &nbsp;/&nbsp; SAFETY SYSTEMS</span>
          </div>

          {/* Main Title Lockup */}
          <div className="hero-brand-lockup">
            <div className="hero-brand-header">
              <div className="hero-logo-icon-box">
                <img 
                  src={industrialHeroImg} 
                  alt="IR Solutions Emblem" 
                  className="hero-logo-img" 
                  width="32"
                  height="42"
                />
              </div>
              <h1 className="hero-main-title">IR SOLUTIONS</h1>
            </div>
            <p className="hero-subtitle">Smart Industrial Automation &amp; IoT Solutions</p>
          </div>

          {/* Value Proposition Description */}
          <p className="hero-description">
            We engineer cutting-edge industrial automation, IoT telemetry monitoring, 
            AI-powered safety systems, and automated access controls tailored for 
            modern industrial enterprises.
          </p>

          {/* Focus Capability Chips */}
          <div className="hero-focus-tags">
            <span className="focus-tag"><Cpu size={14} /> Automation Systems</span>
            <span className="focus-tag"><Activity size={14} /> IoT Telemetry</span>
            <span className="focus-tag"><ShieldCheck size={14} /> AI Industrial Safety</span>
          </div>

          {/* Dual Action Buttons */}
          <div className="hero-actions-group">
            <button 
              type="button" 
              className="btn-hero-primary"
              onClick={() => scrollTo("projects")}
              aria-label="Explore our industrial engineering projects and solutions"
            >
              <span>Explore Industrial Solutions</span>
              <ArrowRight size={17} className="btn-arrow-icon" />
            </button>

            <button 
              type="button" 
              className="btn-hero-secondary"
              onClick={() => scrollTo("contact")}
              aria-label="Get in touch for industrial solutions and quotation"
            >
              <span>Get in Touch</span>
            </button>
          </div>
        </div>

        {/* Right Column: Industrial Automation & IoT Visual Showcase */}
        <div className="hero-visual-col">
          <div 
            className="hero-3d-stage"
            style={{
              transform: `perspective(1000px) rotateY(${mousePos.x}deg) rotateX(${-mousePos.y}deg)`
            }}
          >
            {/* Ambient Blue Backlight Aura */}
            <div className="emblem-ambient-glow" aria-hidden="true" />

            {/* Industrial Automation Composition */}
            <div className="emblem-img-wrapper">
              <img 
                src={industrialHeroImg} 
                alt="Modern Industrial Automation, IoT Telemetry Hub, and Automated Systems" 
                className="emblem-main-img"
                loading="eager"
              />
              <div className="emblem-specular-highlight" aria-hidden="true" />
            </div>

            {/* Floating Tech Pill Badge */}
            <div className="floating-badge-capsule">
              <ShieldCheck size={14} className="badge-sparkle-icon" />
              <span>Enterprise Industrial IoT</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

