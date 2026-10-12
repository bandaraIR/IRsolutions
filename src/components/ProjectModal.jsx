import { useEffect } from "react";
import { X, CheckCircle2, Calendar, Tag, ArrowRight, ShieldCheck } from "lucide-react";
import "../styles/ProjectModal.css";

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [onClose]);

  if (!project) return null;

  return (
    <div className="project-modal-backdrop" onClick={onClose}>
      <div 
        className="project-modal-container"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-project-title"
      >
        {/* Sticky Modal Header Bar */}
        <div className="modal-header-bar">
          <div className="modal-header-meta">
            <span className="modal-tag-badge">
              <Tag size={12} />
              {project.category}
            </span>
            <span className="modal-status-badge">
              <CheckCircle2 size={12} />
              {project.status}
            </span>
          </div>

          <button 
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="modal-body-scroll">
          
          {/* Project Title & Context Header */}
          <div className="modal-header-text-block">
            <h2 id="modal-project-title" className="modal-project-title">{project.title}</h2>
            <p className="modal-project-subtitle">{project.subtitle}</p>
          </div>

          {/* Dedicated Showcase Visual: Zero cropping, full diagram and metrics completely visible */}
          <div className="modal-hero-visual">
            <img 
              src={project.image} 
              alt="" 
              aria-hidden="true"
              className="modal-hero-img-backdrop"
            />
            <img 
              src={project.image} 
              alt={project.title} 
              className="modal-hero-img"
            />
            <div className="modal-hero-vignette" />
          </div>

          {/* Quick Action Ribbon */}
          <div className="modal-actions-ribbon">
            <div className="modal-timeline-pill">
              <Calendar size={14} />
              <span>{project.year}</span>
            </div>

            <div className="modal-action-buttons">
              <a 
                href="#contact" 
                className="modal-btn-primary"
                onClick={onClose}
              >
                <span>Inquire About Project</span>
                <ArrowRight size={15} />
              </a>
            </div>
          </div>

          {/* Two Column Architectural Breakdown */}
          <div className="modal-content-grid">
            
            {/* Left Column: Overview & Purpose/Benefits */}
            <div className="modal-col-primary">
              <section className="modal-section-block">
                <div className="modal-section-heading">
                  <span className="section-num">01</span>
                  <h3>Project Overview</h3>
                </div>
                {project.overview.split("\n\n").map((para, i) => (
                  <p key={i} className="modal-paragraph" style={{ marginBottom: i === 0 ? "0.85rem" : 0 }}>
                    {para}
                  </p>
                ))}
              </section>

              <section className="modal-section-block">
                <div className="modal-section-heading">
                  <span className="section-num">02</span>
                  <h3>Purpose &amp; Benefits</h3>
                </div>
                {project.purpose && (
                  <p className="modal-paragraph" style={{ marginBottom: "1rem" }}>
                    {project.purpose}
                  </p>
                )}
                {project.benefits && (
                  <ul className="modal-features-list">
                    {project.benefits.map((benefit, index) => (
                      <li key={index} className="modal-feature-item">
                        <span className="feature-bullet-diamond">✦</span>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            </div>

            {/* Right Column: Key Features & Operational Impact */}
            <div className="modal-col-secondary">
              <section className="modal-section-block">
                <div className="modal-section-heading">
                  <span className="section-num">03</span>
                  <h3>Key Features</h3>
                </div>
                <ul className="modal-features-list">
                  {project.features.map((feat, index) => (
                    <li key={index} className="modal-feature-item">
                      <span className="feature-bullet-diamond">✦</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {project.impact && (
                <section className="modal-section-block challenges-card">
                  <div className="modal-section-heading">
                    <span className="section-num">04</span>
                    <h3>Operational Impact &amp; Results</h3>
                  </div>
                  <div className="challenge-item" style={{ marginBottom: 0 }}>
                    <div className="solution-label">
                      <ShieldCheck size={16} className="solution-icon" />
                      <span>Business &amp; Safety Value</span>
                    </div>
                    <p className="modal-paragraph">{project.impact}</p>
                  </div>
                </section>
              )}
            </div>

          </div>

          {/* Modal Footer */}
          <div className="modal-footer-bar">
            <span>Enterprise Solutions Portfolio · Imal Ravindu</span>
            <button className="modal-dismiss-btn" onClick={onClose}>
              Back to Showcase
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
