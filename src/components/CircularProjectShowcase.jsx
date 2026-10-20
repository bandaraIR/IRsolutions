import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { PROJECTS_DATA } from "../data/portfolioData";
import ProjectModal from "./ProjectModal";
import "../styles/CircularProjectShowcase.css";

gsap.registerPlugin(ScrollTrigger);

export default function CircularProjectShowcase() {
  const sectionRef = useRef(null);
  const viewportRef = useRef(null);
  const cardsRef = useRef([]);

  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [selectedModalProject, setSelectedModalProject] = useState(null);
  const totalProjects = PROJECTS_DATA.length;

  // Touch Swipe Gesture detection for mobile
  const touchStartXRef = useRef(0);
  const touchStartYRef = useRef(0);
  const isSwipingRef = useRef(false);

  // Compute circular 3D transform positions for project cards
  const updateCardPositions = useCallback((continuousIndex) => {
    const currentIndex = Math.min(
      totalProjects - 1,
      Math.max(0, Math.round(continuousIndex))
    );
    setActiveProjectIndex(currentIndex);

    const winW = typeof window !== "undefined" ? window.innerWidth : 1200;
    const isMobile = winW < 768;
    const isTablet = winW >= 768 && winW < 1024;

    cardsRef.current.forEach((card, index) => {
      if (!card) return;

      const delta = index - continuousIndex;
      const absDelta = Math.abs(delta);

      // Cull far cards for optimal mobile GPU performance
      const cullingThreshold = isMobile ? 1.4 : 2.5;
      if (absDelta > cullingThreshold) {
        card.style.display = "none";
        return;
      } else {
        card.style.display = "block";
      }

      // Responsive 3D Arc Geometry
      const angleRad = (delta * (isMobile ? 18 : 26) * Math.PI) / 180;
      const radiusX = isMobile ? 24 : (isTablet ? 85 : 160);
      const radiusY = isMobile ? 65 : (isTablet ? 105 : 135);
      const deltaYFactor = isMobile ? 85 : (isTablet ? 110 : 135);
      const depthZFactor = isMobile ? 160 : (isTablet ? 210 : 260);

      const posX = Math.sin(angleRad) * radiusX;
      const posY = delta * deltaYFactor + (1 - Math.cos(angleRad)) * (delta > 0 ? radiusY : -radiusY);
      const posZ = -absDelta * depthZFactor;

      const rotateY = -delta * (isMobile ? 8 : 20);
      const rotateZ = delta * (isMobile ? 1.2 : 3.5);
      const rotateX = delta > 0 ? (isMobile ? 3 : 8) : (isMobile ? -3 : -8);

      const scale = Math.max(isMobile ? 0.76 : 0.68, 1 - absDelta * (isMobile ? 0.12 : 0.18));
      const opacity = Math.max(0, 1 - absDelta * (isMobile ? 0.65 : 0.55));
      
      const isFocused = index === currentIndex;
      const zIndex = isFocused ? 100 : Math.max(1, Math.round(50 - absDelta * 10));

      card.style.transform = `translate3d(${posX.toFixed(1)}px, ${posY.toFixed(1)}px, ${posZ.toFixed(1)}px) rotateY(${rotateY.toFixed(1)}deg) rotateX(${rotateX.toFixed(1)}deg) rotateZ(${rotateZ.toFixed(1)}deg) scale(${scale.toFixed(3)})`;
      card.style.opacity = opacity.toFixed(2);
      card.style.zIndex = zIndex;
      card.style.pointerEvents = isFocused ? "auto" : (absDelta < 1.8 ? "auto" : "none");

      if (isFocused) {
        card.classList.add("is-in-focus");
      } else {
        card.classList.remove("is-in-focus");
      }
    });
  }, [totalProjects]);

  // Navigate directly to a specific project by scrolling
  const scrollToProject = useCallback((index) => {
    const st = window.__projectsScrollTrigger;
    if (!st || !st.end || st.end <= st.start) {
      updateCardPositions(index);
      return;
    }

    const targetProgress = index / (totalProjects - 1);
    const targetScroll = st.start + targetProgress * (st.end - st.start);
    window.scrollTo({
      top: targetScroll,
      behavior: "smooth"
    });
  }, [totalProjects, updateCardPositions]);

  const handleNext = () => {
    if (activeProjectIndex < totalProjects - 1) {
      scrollToProject(activeProjectIndex + 1);
    }
  };

  const handlePrev = () => {
    if (activeProjectIndex > 0) {
      scrollToProject(activeProjectIndex - 1);
    }
  };

  // ScrollTrigger Setup
  useEffect(() => {
    window.__scrollToProject = scrollToProject;

    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 768;

      const st = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: isMobile ? "+=280%" : "+=420%",
        pin: viewportRef.current,
        anticipatePin: 1,
        scrub: isMobile ? true : 0.8,
        fastScrollEnd: true,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const continuousIndex = self.progress * (totalProjects - 1);
          updateCardPositions(continuousIndex);
        }
      });

      window.__projectsScrollTrigger = st;
    }, sectionRef.current);

    // Initial pass
    updateCardPositions(0);

    return () => {
      window.__projectsScrollTrigger = null;
      window.__scrollToProject = null;
      ctx.revert();
    };
  }, [scrollToProject, updateCardPositions, totalProjects]);

  // Touch Swipe Gesture detection
  const handleTouchStart = (e) => {
    if (e.touches && e.touches.length === 1) {
      touchStartXRef.current = e.touches[0].clientX;
      touchStartYRef.current = e.touches[0].clientY;
      isSwipingRef.current = false;
    }
  };

  const handleTouchMove = (e) => {
    if (e.touches && e.touches.length === 1) {
      const diffX = e.touches[0].clientX - touchStartXRef.current;
      const diffY = e.touches[0].clientY - touchStartYRef.current;
      if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 18) {
        isSwipingRef.current = true;
      }
    }
  };

  const handleTouchEnd = (e) => {
    if (isSwipingRef.current && e.changedTouches && e.changedTouches.length === 1) {
      const diffX = e.changedTouches[0].clientX - touchStartXRef.current;
      if (diffX < -35) {
        handleNext();
      } else if (diffX > 35) {
        handlePrev();
      }
    }
    isSwipingRef.current = false;
  };

  return (
    <>
      <section id="projects" className="circular-showcase-section" ref={sectionRef}>
        {/* Pinned Viewport Stage */}
        <div className="circular-pinned-viewport" ref={viewportRef}>
          
          <div className="projects-showcase-layer">
            {/* Ambient Background Glows */}
            <div className="showcase-ambient-aura" aria-hidden="true" />
            <div className="showcase-orbital-ring" aria-hidden="true" />

            {/* Section Header */}
            <div className="showcase-top-header">
              <div className="showcase-eyebrow">
                <Sparkles size={13} className="sparkle-icon" />
                <span>Industrial Engineering Showcase</span>
              </div>
              <h2 className="showcase-headline">Industrial Automation &amp; IoT Systems</h2>
              <p className="showcase-subtext">
                Glide through our specialized deployments in industrial telemetry, automated access controls, and AI safety solutions.
              </p>
            </div>

            {/* 3D Circular Orbit Stage */}
            <div 
              className="circular-stage-3d"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {PROJECTS_DATA.map((project, index) => {
                const isFocused = index === activeProjectIndex;
                return (
                  <article
                    key={project.id}
                    ref={(el) => (cardsRef.current[index] = el)}
                    className={`circular-project-card ${isFocused ? "is-in-focus" : ""}`}
                    onClick={() => {
                      if (isFocused) {
                        setSelectedModalProject(project);
                      } else {
                        scrollToProject(index);
                      }
                    }}
                    tabIndex={0}
                    role="button"
                    aria-label={`${project.title} - ${project.category}. Click to explore details.`}
                  >
                    {/* Card Outer Glow Border */}
                    <div className="card-outer-glow" aria-hidden="true" />

                    {/* Card Content Shell */}
                    <div className="card-shell-inner">

                      {/* Top Meta Strip */}
                      <div className="card-meta-strip">
                        <span className="card-num-badge">
                          0{index + 1} / 0{totalProjects}
                        </span>
                        <span className="card-cat-badge">
                          {project.category}
                        </span>
                        <span className="card-year-badge">
                          {project.year}
                        </span>
                      </div>

                      {/* Project Visual / Image Container: Zero Cropping */}
                      <div className="card-visual-container">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="card-project-img"
                          loading={index <= 2 ? "eager" : "lazy"}
                        />
                      </div>

                      {/* Project Information */}
                      <div className="card-info-pane">
                        <h3 className="card-project-title">{project.title}</h3>
                        <p className="card-project-desc">{project.subtitle}</p>

                        {/* Interactive Buttons */}
                        <div className="card-actions-cluster">
                          <button
                            type="button"
                            id={isFocused ? "active-explore-project-btn" : undefined}
                            className="btn-view-project"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedModalProject(project);
                            }}
                            aria-label={`Explore project details for ${project.title}`}
                          >
                            <span>Explore Project</span>
                            <ArrowRight size={15} />
                          </button>
                        </div>
                      </div>

                    </div>
                  </article>
                );
              })}
            </div>

            {/* Bottom Scrubber & Controls */}
            <div className="showcase-bottom-controls">
              <button
                type="button"
                className="orbital-nav-arrow"
                onClick={handlePrev}
                disabled={activeProjectIndex === 0}
                aria-label="Previous project"
              >
                <ChevronLeft size={18} />
              </button>

              <div className="orbital-pagination-bar">
                {PROJECTS_DATA.map((item, i) => (
                  <button
                    key={item.id}
                    type="button"
                    className={`orbital-dot-pill ${i === activeProjectIndex ? "active" : ""}`}
                    onClick={() => scrollToProject(i)}
                    aria-label={`Go to ${item.title}`}
                  >
                    <span className="dot-fill" />
                    {i === activeProjectIndex && (
                      <span className="dot-title-tooltip">{item.title}</span>
                    )}
                  </button>
                ))}
              </div>

              <button
                type="button"
                className="orbital-nav-arrow"
                onClick={handleNext}
                disabled={activeProjectIndex === totalProjects - 1}
                aria-label="Next project"
              >
                <ChevronRight size={18} />
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* Full Architectural Details Modal */}
      {selectedModalProject && (
        <ProjectModal
          project={selectedModalProject}
          allProjects={PROJECTS_DATA}
          onSelectProject={(proj) => setSelectedModalProject(proj)}
          onClose={() => setSelectedModalProject(null)}
          onInquire={(proj) => {
            setSelectedModalProject(null);
            setTimeout(() => {
              const contactEl = document.getElementById("contact");
              if (contactEl) {
                contactEl.scrollIntoView({ behavior: "smooth" });
                window.dispatchEvent(
                  new CustomEvent("prefill-contact-subject", {
                    detail: { subject: `Inquiry regarding ${proj.title}` }
                  })
                );
              }
            }, 100);
          }}
        />
      )}
    </>
  );
}
