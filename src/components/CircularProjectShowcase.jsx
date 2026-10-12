import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles, ArrowDown } from "lucide-react";
import { PROJECTS_DATA } from "../data/portfolioData";
import ProjectModal from "./ProjectModal";
import "../styles/CircularProjectShowcase.css";

gsap.registerPlugin(ScrollTrigger);

// Proportion of pinned scroll distance dedicated to the Hello -> Projects transition
const TRANSITION_THRESHOLD = 0.16;

export default function CircularProjectShowcase() {
  const sectionRef = useRef(null);
  const viewportRef = useRef(null);
  const helloStageRef = useRef(null);
  const helloWordRef = useRef(null);
  const turbulenceRef = useRef(null);
  const displacementRef = useRef(null);
  const scrollIndicatorRef = useRef(null);
  const projectsStageRef = useRef(null);
  const cardsRef = useRef([]);

  const lastProgressRef = useRef(0);
  const rafIdRef = useRef(null);

  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [selectedModalProject, setSelectedModalProject] = useState(null);
  const totalProjects = PROJECTS_DATA.length;

  // Continuous Organic Liquid Wave Animation (active when Hello stage is visible)
  useEffect(() => {
    let isRunning = true;
    const isReduced = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!isReduced) {
      const startTime = performance.now();
      const tick = (now) => {
        if (!isRunning) return;

        // Modulate liquid turbulence when Hello is in or entering view
        if (lastProgressRef.current <= TRANSITION_THRESHOLD + 0.05) {
          const t = (now - startTime) * 0.001;
          const freqX = 0.013 + 0.0035 * Math.sin(t * 1.35);
          const freqY = 0.022 + 0.0045 * Math.cos(t * 1.05);

          if (turbulenceRef.current) {
            turbulenceRef.current.setAttribute("baseFrequency", `${freqX.toFixed(4)} ${freqY.toFixed(4)}`);
          }
        }

        rafIdRef.current = requestAnimationFrame(tick);
      };

      rafIdRef.current = requestAnimationFrame(tick);
    }

    return () => {
      isRunning = false;
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, []);

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

      // Responsive 3D Arc Geometry
      const angleRad = (delta * (isMobile ? 18 : 26) * Math.PI) / 180;
      const radiusX = isMobile ? 30 : (isTablet ? 85 : 160);
      const radiusY = isMobile ? 70 : (isTablet ? 105 : 135);
      const deltaYFactor = isMobile ? 90 : (isTablet ? 110 : 135);
      const depthZFactor = isMobile ? 170 : (isTablet ? 210 : 260);

      const posX = Math.sin(angleRad) * radiusX;
      const posY = delta * deltaYFactor + (1 - Math.cos(angleRad)) * (delta > 0 ? radiusY : -radiusY);
      const posZ = -absDelta * depthZFactor;

      const rotateY = -delta * (isMobile ? 10 : 20);
      const rotateZ = delta * (isMobile ? 1.5 : 3.5);
      const rotateX = delta > 0 ? (isMobile ? 4 : 8) : (isMobile ? -4 : -8);

      const scale = Math.max(isMobile ? 0.72 : 0.65, 1 - absDelta * (isMobile ? 0.14 : 0.18));
      const opacity = Math.max(0, 1 - absDelta * (isMobile ? 0.65 : 0.58));
      const zIndex = Math.round(100 - absDelta * 20);

      card.style.transform = `translate3d(${posX}px, ${posY}px, ${posZ}px) rotateY(${rotateY}deg) rotateX(${rotateX}deg) rotateZ(${rotateZ}deg) scale(${scale})`;
      card.style.opacity = opacity;
      card.style.zIndex = zIndex;
      card.style.pointerEvents = absDelta < 0.85 ? "all" : "none";

      if (absDelta < 0.45) {
        card.classList.add("is-in-focus");
      } else {
        card.classList.remove("is-in-focus");
      }
    });
  }, [totalProjects]);

  // Synchronized scroll update handler: controls both Hello and Projects smoothly
  const handleScrollProgress = useCallback((progress) => {
    lastProgressRef.current = progress;

    // ----------------------------------------------------
    // PHASE 1: Hello -> Projects Synchronized Transition
    // ----------------------------------------------------
    if (progress <= TRANSITION_THRESHOLD) {
      // Normalized progress for transition: 0 (initial) to 1 (projects full focus)
      const u = Math.min(1, Math.max(0, progress / TRANSITION_THRESHOLD));
      // Smooth Hermite ease-in-out curve for natural, organic motion
      const ease = u * u * (3 - 2 * u);

      // 1. "Hello" liquid text ascends smoothly, elongates with surface tension, and dissolves
      if (helloStageRef.current) {
        const helloY = -54 * ease; // 0vh to -54vh
        const stretchY = 1 + 0.28 * ease; // liquid elongation
        const pinchX = 1 - 0.14 * ease;   // liquid surface tension pinch
        const helloOpacity = Math.max(0, 1 - u * 1.28); // fades cleanly to 0
        const helloBlur = 9 * ease;

        helloStageRef.current.style.transform = `translate3d(0, ${helloY}vh, 0) scale(${pinchX}, ${stretchY})`;
        helloStageRef.current.style.opacity = helloOpacity;
        helloStageRef.current.style.filter = `blur(${helloBlur}px)`;
        helloStageRef.current.style.pointerEvents = u > 0.35 ? "none" : "all";
      }

      // Dynamic liquid distortion scale increases with scroll: letters liquefy and disperse as they ascend
      if (displacementRef.current) {
        const dynamicScale = 14 + ease * 42;
        displacementRef.current.setAttribute("scale", dynamicScale.toFixed(1));
      }

      // Scroll hint indicator fades immediately on initial scroll
      if (scrollIndicatorRef.current) {
        scrollIndicatorRef.current.style.opacity = Math.max(0, 1 - u * 3.5);
      }

      // 2. Projects stage rises smoothly from below into prominent focus
      if (projectsStageRef.current) {
        const projY = 32 * (1 - ease); // 32vh down to 0vh
        const projScale = 0.94 + 0.06 * ease; // 0.94 to 1.0
        // Opacity stays 0 briefly at the very beginning to prevent any premature flash, then fades up smoothly
        const projOpacity = u < 0.12 ? 0 : Math.min(1, (u - 0.12) / 0.88);

        projectsStageRef.current.style.transform = `translate3d(0, ${projY}vh, 0) scale(${projScale})`;
        projectsStageRef.current.style.opacity = projOpacity;
        projectsStageRef.current.style.pointerEvents = u > 0.75 ? "all" : "none";
      }

      // Project cards held at index 0 (first project ready in focus)
      updateCardPositions(0);
    }
    // ----------------------------------------------------
    // PHASE 2: Projects Fully in View -> 3D Circular Orbit
    // ----------------------------------------------------
    else {
      // Ensure Hello is completely hidden
      if (helloStageRef.current) {
        helloStageRef.current.style.opacity = 0;
        helloStageRef.current.style.pointerEvents = "none";
      }
      if (scrollIndicatorRef.current) {
        scrollIndicatorRef.current.style.opacity = 0;
      }
      if (displacementRef.current) {
        displacementRef.current.setAttribute("scale", "14");
      }

      // Projects stage is fully settled at center
      if (projectsStageRef.current) {
        projectsStageRef.current.style.transform = "translate3d(0, 0, 0) scale(1)";
        projectsStageRef.current.style.opacity = 1;
        projectsStageRef.current.style.pointerEvents = "all";
      }

      // Map remaining scroll distance to project index (0 to 4)
      const projProgress = (progress - TRANSITION_THRESHOLD) / (1 - TRANSITION_THRESHOLD);
      const continuousIndex = projProgress * (totalProjects - 1);
      updateCardPositions(continuousIndex);
    }
  }, [updateCardPositions, totalProjects]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial entrance reveal for "Hello" word
      if (helloWordRef.current) {
        gsap.fromTo(
          helloWordRef.current,
          { opacity: 0, scale: 0.88, y: 35, filter: "blur(12px)" },
          { opacity: 1, scale: 1, y: 0, filter: "blur(0px)", duration: 1.5, ease: "power3.out" }
        );

        // Subtle ambient floating micro-motion
        gsap.to(helloWordRef.current, {
          y: "+=10",
          rotationZ: 0.4,
          duration: 3.2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
      }

      if (scrollIndicatorRef.current) {
        gsap.fromTo(
          scrollIndicatorRef.current,
          { opacity: 0, y: 20 },
          { opacity: 0.85, y: 0, duration: 1.2, delay: 0.7, ease: "power2.out" }
        );
      }

      // Master Pinned ScrollTrigger Timeline
      const st = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=640%", // Generous scroll space for smooth 7-project pacing
        pin: viewportRef.current,
        anticipatePin: 1,
        scrub: 1.1, // Silky Apple scroll inertia
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          handleScrollProgress(self.progress);
        }
      });

      // Expose to window so Navigation can accurately target the projects scroll offset
      window.__projectsScrollTrigger = st;
    }, sectionRef);

    // Initial state pass (progress = 0)
    handleScrollProgress(0);

    return () => {
      window.__projectsScrollTrigger = null;
      ctx.revert();
    };
  }, [handleScrollProgress]);

  // Navigate directly to a specific project by scrolling the window
  const scrollToProject = (index) => {
    const st = window.__projectsScrollTrigger;
    if (!st) return;

    // Index 0 sits exactly at TRANSITION_THRESHOLD
    const targetProgress = TRANSITION_THRESHOLD + (index / (totalProjects - 1)) * (1 - TRANSITION_THRESHOLD);
    const targetScroll = st.start + targetProgress * (st.end - st.start) + 2;

    window.scrollTo({
      top: targetScroll,
      behavior: "smooth"
    });
  };

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

  return (
    <>
      <section id="welcome" className="circular-showcase-section" ref={sectionRef}>
        {/* Invisible anchor for projects navigation */}
        <div id="projects" className="projects-scroll-anchor" />

        {/* Master Pinned Viewport Stage */}
        <div className="circular-pinned-viewport" ref={viewportRef}>

          {/* =======================================================
              LAYER 1: "Hello" Initial Welcome Screen (Phase 1)
              ======================================================= */}
          <div className="hello-overlay-layer" ref={helloStageRef}>
            {/* Ambient Background Glows */}
            <div className="ambient-orange-glow" aria-hidden="true" />
            <div className="ambient-radial-grid" aria-hidden="true" />

            <div className="hello-text-container" ref={helloWordRef}>
              {/* Premium Liquid Text SVG with Organic Wave Distortion & Specular Sheen */}
              <svg
                viewBox="0 0 620 220"
                className="liquid-hello-svg"
                role="img"
                aria-label="Hello"
              >
                <defs>
                  {/* Dynamic Liquid Wave & Displacement Filter */}
                  <filter id="liquid-distortion" x="-25%" y="-25%" width="150%" height="150%" colorInterpolationFilters="sRGB">
                    <feTurbulence
                      ref={turbulenceRef}
                      type="fractalNoise"
                      baseFrequency="0.014 0.022"
                      numOctaves="2"
                      seed="3"
                      result="noise"
                    />
                    <feDisplacementMap
                      ref={displacementRef}
                      in="SourceGraphic"
                      in2="noise"
                      scale="14"
                      xChannelSelector="R"
                      yChannelSelector="G"
                      result="displaced"
                    />
                    <feGaussianBlur in="displaced" stdDeviation="0.6" result="softGlow" />
                    <feMerge>
                      <feMergeNode in="softGlow" />
                      <feMergeNode in="displaced" />
                    </feMerge>
                  </filter>

                  {/* Vibrant Liquid Orange Core Gradient */}
                  <linearGradient id="liquid-orange-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#FFB366" />
                    <stop offset="35%" stopColor="#FF7A1A" />
                    <stop offset="70%" stopColor="#FF5500" />
                    <stop offset="100%" stopColor="#D93800" />
                  </linearGradient>

                  {/* Surface Liquid Specular Sheen Gradient */}
                  <linearGradient id="liquid-sheen-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.45" />
                    <stop offset="45%" stopColor="#FFAA55" stopOpacity="0.12" />
                    <stop offset="100%" stopColor="#FF5500" stopOpacity="0" />
                  </linearGradient>
                </defs>

                {/* Ambient Liquid Aura Glow */}
                <text
                  x="50%"
                  y="62%"
                  textAnchor="middle"
                  className="liquid-text-aura"
                  filter="url(#liquid-distortion)"
                >
                  Hello
                </text>

                {/* Core Vibrant Fluid Hello Word */}
                <text
                  x="50%"
                  y="62%"
                  textAnchor="middle"
                  className="liquid-text-core"
                  fill="url(#liquid-orange-grad)"
                  filter="url(#liquid-distortion)"
                >
                  Hello
                </text>

                {/* Liquid Specular Reflection Sheen */}
                <text
                  x="50%"
                  y="62%"
                  textAnchor="middle"
                  className="liquid-text-sheen"
                  fill="url(#liquid-sheen-grad)"
                  filter="url(#liquid-distortion)"
                >
                  Hello
                </text>
              </svg>

              <h1 className="visually-hidden">Hello</h1>

              <span className="hello-sub-pill">
                <span className="hello-dot-pulse" />
                <span>IR Solutions</span>
              </span>
            </div>

            {/* Scroll Indicator Prompt */}
            <div
              className="initial-scroll-indicator"
              ref={scrollIndicatorRef}
              onClick={() => scrollToProject(0)}
              role="button"
              tabIndex={0}
              aria-label="Scroll to explore projects"
            >
              <span className="scroll-hint-label">Scroll to enter</span>
              <div className="scroll-chevron-box">
                <ArrowDown size={16} className="chevron-bounce" />
              </div>
            </div>
          </div>

          {/* =======================================================
              LAYER 2: Apple-Inspired Circular 3D Showcase (Phase 2)
              ======================================================= */}
          <div className="projects-showcase-layer" ref={projectsStageRef}>

            {/* Ambient Backdrops */}
            <div className="showcase-ambient-aura" aria-hidden="true" />
            <div className="showcase-orbital-ring" aria-hidden="true" />

            {/* Section Header */}
            <div className="showcase-top-header">
              <div className="showcase-eyebrow">
                <Sparkles size={13} className="sparkle-icon" />
                <span>Projects Showcase</span>
              </div>
              <h2 className="showcase-headline">Featured Works &amp; Systems</h2>
              <p className="showcase-subtext">
                Glide through projects along an interactive 3D circular presentation arc.
              </p>
            </div>

            {/* 3D Circular Orbit Stage */}
            <div className="circular-stage-3d">
              {PROJECTS_DATA.map((project, index) => {
                const isFocused = index === activeProjectIndex;
                return (
                  <article
                    key={project.id}
                    ref={(el) => (cardsRef.current[index] = el)}
                    className={`circular-project-card ${isFocused ? "is-in-focus" : ""}`}
                    onClick={() => !isFocused && scrollToProject(index)}
                    tabIndex={isFocused ? 0 : -1}
                    aria-label={`${project.title} - ${project.category}`}
                  >
                    {/* Card Glowing Outer Border */}
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

                      {/* Project Visual / Image Container: Zero Cropping with Ambient Aspect Preservation */}
                      <div className="card-visual-container">
                        <img
                          src={project.image}
                          alt=""
                          aria-hidden="true"
                          className="card-project-img-backdrop"
                          loading="lazy"
                        />
                        <img
                          src={project.image}
                          alt={project.title}
                          className="card-project-img"
                          loading={index <= 2 ? "eager" : "lazy"}
                        />
                        <div className="card-img-ambient-vignette" />
                      </div>

                      {/* Project Information */}
                      <div className="card-info-pane">
                        <h3 className="card-project-title">{project.title}</h3>
                        <p className="card-project-desc">{project.subtitle}</p>

                        {/* Interactive Buttons */}
                        <div className="card-actions-cluster">
                          <button
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

            {/* Bottom Apple-Styled Scrubber & Controls */}
            <div className="showcase-bottom-controls">

              {/* Step Arrow Prev */}
              <button
                className="orbital-nav-arrow"
                onClick={handlePrev}
                disabled={activeProjectIndex === 0}
                aria-label="Previous project"
              >
                <ChevronLeft size={18} />
              </button>

              {/* Pagination Dots / Progress Pills */}
              <div className="orbital-pagination-bar">
                {PROJECTS_DATA.map((item, i) => (
                  <button
                    key={item.id}
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

              {/* Step Arrow Next */}
              <button
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
          onClose={() => setSelectedModalProject(null)}
        />
      )}
    </>
  );
}
