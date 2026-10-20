import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { 
  X, 
  CheckCircle2, 
  Calendar, 
  Tag, 
  ArrowRight, 
  ArrowLeft,
  ChevronLeft, 
  ChevronRight, 
  ShieldCheck, 
  Layers, 
  Sparkles,
  ExternalLink 
} from "lucide-react";
import "../styles/ProjectModal.css";

export default function ProjectModal({ 
  project, 
  allProjects = [], 
  onSelectProject, 
  onClose, 
  onInquire 
}) {
  const scrollContainerRef = useRef(null);

  // Find index of current project
  const currentIndex = allProjects.findIndex((p) => p.id === project?.id);
  const totalCount = allProjects.length;
  const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : null;
  const nextProject = currentIndex < totalCount - 1 ? allProjects[currentIndex + 1] : null;

  // Keyboard navigation: Escape to close, Left/Right arrow keys to switch projects
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft" && prevProject && onSelectProject) {
        onSelectProject(prevProject);
      } else if (e.key === "ArrowRight" && nextProject && onSelectProject) {
        onSelectProject(nextProject);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [onClose, prevProject, nextProject, onSelectProject]);

  // Reset scroll to top when project changes
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [project?.id]);

  if (!project) return null;

  const handleInquireClick = () => {
    if (onInquire) {
      onInquire(project);
    } else {
      onClose();
      const el = document.getElementById("contact");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return createPortal(
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
          <div className="modal-header-left">
            <span className="modal-counter-badge">
              0{currentIndex >= 0 ? currentIndex + 1 : 1} / 0{totalCount}
            </span>
            <span className="modal-tag-badge">
              <Tag size={12} />
              {project.category}
            </span>
            <span className="modal-status-badge">
              <CheckCircle2 size={12} />
              {project.status}
            </span>
          </div>

          {/* Quick Prev / Next Switchers & Close */}
          <div className="modal-header-controls">
            {allProjects.length > 1 && (
              <div className="modal-header-nav-group">
                <button
                  type="button"
                  className="modal-nav-btn prev"
                  onClick={() => prevProject && onSelectProject(prevProject)}
                  disabled={!prevProject}
                  aria-label="Previous project"
                  title={prevProject ? `Previous: ${prevProject.title}` : "First project"}
                >
                  <ChevronLeft size={16} />
                  <span className="nav-btn-text">Prev Project</span>
                </button>
                <button
                  type="button"
                  className="modal-nav-btn next"
                  onClick={() => nextProject && onSelectProject(nextProject)}
                  disabled={!nextProject}
                  aria-label="Next project"
                  title={nextProject ? `Next: ${nextProject.title}` : "Last project"}
                >
                  <span className="nav-btn-text">Next Project</span>
                  <ChevronRight size={16} />
                </button>
              </div>
            )}

            <button 
              type="button"
              className="modal-close-btn"
              onClick={onClose}
              aria-label="Close modal"
              title="Close (Esc)"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Project Switcher Navigation Strip */}
        {allProjects.length > 1 && (
          <div className="modal-switcher-strip" role="tablist" aria-label="Projects directory">
            <div className="switcher-strip-inner">
              {allProjects.map((p, i) => {
                const isActive = p.id === project.id;
                return (
                  <button
                    key={p.id}
                    className={`switcher-pill ${isActive ? "active" : ""}`}
                    onClick={() => onSelectProject && onSelectProject(p)}
                    role="tab"
                    aria-selected={isActive}
                    title={p.title}
                  >
                    <span className="switcher-num">0{i + 1}</span>
                    <span className="switcher-title">{p.title.split("–")[0].split("-")[0].trim()}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Modal Scrollable Body */}
        <div className="modal-body-scroll" ref={scrollContainerRef}>
          
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
            <div className="modal-timeline-cluster">
              <div className="modal-timeline-pill">
                <Calendar size={14} />
                <span>{project.year}</span>
              </div>
              <div className="modal-timeline-pill">
                <Layers size={14} />
                <span>Architecture Breakdown</span>
              </div>
            </div>

            <div className="modal-action-buttons">
              <button 
                type="button"
                className="modal-btn-primary"
                onClick={handleInquireClick}
              >
                <Sparkles size={15} />
                <span>Inquire About Project</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </div>

          {/* Tech Stack Badges Strip */}
          {project.techStack && project.techStack.length > 0 && (
            <div className="modal-tech-strip">
              <span className="tech-strip-label">Engineered With:</span>
              <div className="tech-chips-cluster">
                {project.techStack.map((tech, idx) => (
                  <span key={idx} className="tech-chip">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

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

          {/* Bottom Project-to-Project Navigation Footers */}
          {allProjects.length > 1 && (
            <div className="modal-footer-nav-grid">
              {prevProject ? (
                <button
                  type="button"
                  className="footer-nav-card prev"
                  onClick={() => onSelectProject(prevProject)}
                  aria-label={`Go to previous project: ${prevProject.title}`}
                >
                  <div className="nav-card-icon-frame">
                    <ArrowLeft size={18} />
                  </div>
                  <div className="footer-nav-text">
                    <span className="footer-nav-direction">Previous Project</span>
                    <span className="footer-nav-title">{prevProject.title}</span>
                  </div>
                </button>
              ) : <div className="footer-nav-placeholder" />}

              {nextProject ? (
                <button
                  type="button"
                  className="footer-nav-card next"
                  onClick={() => onSelectProject(nextProject)}
                  aria-label={`Go to next project: ${nextProject.title}`}
                >
                  <div className="footer-nav-text">
                    <span className="footer-nav-direction">Next Project</span>
                    <span className="footer-nav-title">{nextProject.title}</span>
                  </div>
                  <div className="nav-card-icon-frame">
                    <ArrowRight size={18} />
                  </div>
                </button>
              ) : <div className="footer-nav-placeholder" />}
            </div>
          )}

          {/* Modal Footer Bar */}
          <div className="modal-footer-bar">
            <span>Enterprise Solutions Portfolio · Imal Ravindu</span>
            <button className="modal-dismiss-btn" onClick={onClose}>
              Back to Showcase
            </button>
          </div>

        </div>
      </div>
    </div>,
    document.body
  );
}
