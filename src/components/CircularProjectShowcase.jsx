import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles, ArrowDown } from "lucide-react";
import { PROJECTS_DATA } from "../data/portfolioData";
import ProjectModal from "./ProjectModal";
import "../styles/CircularProjectShowcase.css";

gsap.registerPlugin(ScrollTrigger);

// Threshold definitions for synchronized transition
const HELLO_END_PROGRESS_DESKTOP = 0.14; // Hello fadeout completes here on desktop
const PROJECT_0_PLATEAU_DESKTOP = 0.18; // Project 0 rests cleanly centered from 0.14 to 0.18 on desktop

// Responsive thresholds for mobile: immediate, seamless glide with zero dead delay
const HELLO_END_PROGRESS_MOBILE = 0.075;
const PROJECT_0_PLATEAU_MOBILE = 0.085;

const getThresholds = () => {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  return {
    isMobile,
    helloEnd: isMobile ? HELLO_END_PROGRESS_MOBILE : HELLO_END_PROGRESS_DESKTOP,
    plateau: isMobile ? PROJECT_0_PLATEAU_MOBILE : PROJECT_0_PLATEAU_DESKTOP,
  };
};

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

  // Touch Swipe Gesture tracking refs
  const touchStartXRef = useRef(0);
  const touchStartYRef = useRef(0);
  const isSwipingRef = useRef(false);

  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [selectedModalProject, setSelectedModalProject] = useState(null);
  const totalProjects = PROJECTS_DATA.length;

  // Continuous Organic Liquid Wave Animation (active when Hello stage is visible on desktop)
  useEffect(() => {
    let isRunning = true;
    const isReduced = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobileDevice = typeof window !== "undefined" && (window.innerWidth < 768 || "ontouchstart" in window);

    // Set high-fidelity static baseline on all devices
    if (turbulenceRef.current) {
      turbulenceRef.current.setAttribute("baseFrequency", "0.014 0.022");
    }

    // Only run continuous SVG filter manipulation on desktop devices to prevent mobile CPU/GPU thermal lag
    if (!isReduced && !isMobileDevice) {
      const startTime = performance.now();
      const tick = (now) => {
        if (!isRunning) return;

        // Modulate liquid turbulence only when Hello is actually in or entering view
        if (lastProgressRef.current <= HELLO_END_PROGRESS_DESKTOP + 0.04) {
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

      // Mobile Performance: Cull cards beyond view to eliminate unnecessary 3D compositing
      const cullingThreshold = isMobile ? 1.35 : 2.4;
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

      const scale = Math.max(isMobile ? 0.74 : 0.65, 1 - absDelta * (isMobile ? 0.12 : 0.18));
      const opacity = Math.max(0, 1 - absDelta * (isMobile ? 0.65 : 0.58));
      
      // Strict stacking hierarchy: focused card is ALWAYS on top (z-index 100)
      const isFocused = index === currentIndex;
      const zIndex = isFocused ? 100 : Math.max(1, Math.round(50 - absDelta * 10));

      card.style.transform = `translate3d(${posX.toFixed(1)}px, ${posY.toFixed(1)}px, ${posZ.toFixed(1)}px) rotateY(${rotateY.toFixed(1)}deg) rotateX(${rotateX.toFixed(1)}deg) rotateZ(${rotateZ.toFixed(1)}deg) scale(${scale.toFixed(3)})`;
      card.style.opacity = opacity.toFixed(2);
      card.style.zIndex = zIndex;
      // Focused card is fully interactive; background cards accept clicks to focus only if within view range
      card.style.pointerEvents = isFocused ? "auto" : (absDelta < 1.8 ? "auto" : "none");

      if (isFocused) {
        card.classList.add("is-in-focus");
      } else {
        card.classList.remove("is-in-focus");
      }
    });
  }, [totalProjects]);

  // Synchronized scroll update handler: controls both Hello and Projects smoothly
  const handleScrollProgress = useCallback((progress) => {
    lastProgressRef.current = progress;

    const { isMobile, helloEnd, plateau } = getThresholds();

    // ----------------------------------------------------
    // PHASE 1: Hello -> Projects Synchronized Transition
    // ----------------------------------------------------
    if (progress < helloEnd) {
      // Normalized progress for transition: 0 (initial) to 1 (projects full focus)
      const u = Math.min(1, Math.max(0, progress / helloEnd));
      // Smooth Hermite ease-in-out curve for natural, organic motion
      const ease = u * u * (3 - 2 * u);

      // 1. "Hello" liquid text ascends smoothly, elongates with surface tension, and dissolves
      if (helloStageRef.current) {
        const helloY = isMobile ? -38 * ease : -54 * ease;
        const stretchY = isMobile ? 1 + 0.12 * ease : 1 + 0.28 * ease;
        const pinchX = isMobile ? 1 - 0.06 * ease : 1 - 0.14 * ease;
        const helloOpacity = Math.max(0, 1 - u * (isMobile ? 1.15 : 1.3));

        helloStageRef.current.style.display = "flex";
        helloStageRef.current.style.transform = `translate3d(0, ${helloY}vh, 0) scale(${pinchX}, ${stretchY})`;
        helloStageRef.current.style.opacity = helloOpacity;
        
        // High Performance: Only apply CSS blur on desktop; mobile relies strictly on GPU composite (opacity + transform)
        if (!isMobile) {
          const helloBlur = 9 * ease;
          helloStageRef.current.style.filter = `blur(${helloBlur}px)`;
        } else {
          helloStageRef.current.style.filter = "none";
        }

        // Release pointer events immediately as Hello begins dissolving so it never blocks project buttons
        helloStageRef.current.style.pointerEvents = u > 0.35 ? "none" : "all";
        helloStageRef.current.style.zIndex = u > 0.35 ? "10" : "40";
      }

      // Dynamic liquid distortion scale: update only on desktop to avoid SVG filter re-rasterization delays on mobile
      if (displacementRef.current) {
        if (!isMobile) {
          const dynamicScale = 14 + ease * 42;
          displacementRef.current.setAttribute("scale", dynamicScale.toFixed(1));
        } else {
          displacementRef.current.setAttribute("scale", "14");
        }
      }

      // Scroll hint indicator fades and disables pointer events immediately
      if (scrollIndicatorRef.current) {
        const indOpacity = Math.max(0, 1 - u * 3.0);
        scrollIndicatorRef.current.style.opacity = indOpacity;
        scrollIndicatorRef.current.style.pointerEvents = indOpacity > 0.1 ? "all" : "none";
        scrollIndicatorRef.current.style.display = indOpacity > 0.01 ? "flex" : "none";
      }

      // 2. Projects stage rises smoothly from below into prominent focus
      if (projectsStageRef.current) {
        const projY = isMobile ? 14 * (1 - ease) : 28 * (1 - ease);
        const projScale = isMobile ? 0.96 + 0.04 * ease : 0.94 + 0.06 * ease;
        // Immediate cross-fade on mobile eliminating dead scroll gap
        const projOpacity = isMobile
          ? Math.min(1, u * 1.25)
          : (u < 0.15 ? 0 : Math.min(1, (u - 0.15) / 0.85));

        projectsStageRef.current.style.display = "flex";
        projectsStageRef.current.style.transform = `translate3d(0, ${projY}vh, 0) scale(${projScale})`;
        projectsStageRef.current.style.opacity = projOpacity;
        projectsStageRef.current.style.pointerEvents = u > 0.4 ? "all" : "none";
        projectsStageRef.current.style.zIndex = "30";
      }

      // Project cards held at index 0 (first project ready in focus)
      updateCardPositions(0);
    }
    // ----------------------------------------------------
    // PHASE 2: Projects Fully in View -> 3D Circular Orbit
    // ----------------------------------------------------
    else {
      // Ensure Hello is completely hidden with display: none so it can never capture clicks
      if (helloStageRef.current) {
        helloStageRef.current.style.opacity = 0;
        helloStageRef.current.style.pointerEvents = "none";
        helloStageRef.current.style.display = "none";
        helloStageRef.current.style.zIndex = "0";
      }
      if (scrollIndicatorRef.current) {
        scrollIndicatorRef.current.style.opacity = 0;
        scrollIndicatorRef.current.style.pointerEvents = "none";
        scrollIndicatorRef.current.style.display = "none";
      }
      if (displacementRef.current) {
        displacementRef.current.setAttribute("scale", "14");
      }

      // Projects stage is fully settled at center
      if (projectsStageRef.current) {
        projectsStageRef.current.style.display = "flex";
        projectsStageRef.current.style.transform = "translate3d(0, 0, 0) scale(1)";
        projectsStageRef.current.style.opacity = 1;
        projectsStageRef.current.style.pointerEvents = "all";
        projectsStageRef.current.style.zIndex = "30";
      }

      // Map progress to project index:
      // Project 0 rests cleanly centered from helloEnd to plateau
      let continuousIndex = 0;
      if (progress <= plateau) {
        continuousIndex = 0;
      } else {
        const remainingProgress = (progress - plateau) / (1 - plateau);
        continuousIndex = Math.min(totalProjects - 1, Math.max(0, remainingProgress * (totalProjects - 1)));
      }
      updateCardPositions(continuousIndex);
    }
  }, [updateCardPositions, totalProjects]);

  // Navigate directly to a specific project by scrolling the window
  const scrollToProject = useCallback((index) => {
    const st = window.__projectsScrollTrigger;
    if (!st || !st.end || st.end <= st.start) {
      const fallbackTarget = window.innerHeight * (1.2 + (index / (totalProjects - 1)) * 3.5);
      window.scrollTo({
        top: fallbackTarget,
        behavior: "smooth"
      });
      return;
    }

    const { helloEnd, plateau } = getThresholds();

    let targetProgress;
    if (index === 0) {
      // Land cleanly in the middle of Project 0's resting plateau
      targetProgress = (helloEnd + plateau) / 2;
    } else {
      // Map index (1 to totalProjects - 1) to progress range (plateau to 1.0)
      targetProgress = plateau + (index / (totalProjects - 1)) * (1 - plateau);
    }

    const targetScroll = st.start + targetProgress * (st.end - st.start);
    window.scrollTo({
      top: targetScroll,
      behavior: "smooth"
    });
  }, [totalProjects]);

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

  useEffect(() => {
    // Expose helpers globally so Navigation bar can accurately target projects
    window.__scrollToProject = scrollToProject;

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

      // Responsive Scroll distance & scrub feel
      const isMobile = window.innerWidth < 768;

      // Master Pinned ScrollTrigger Timeline
      const st = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: isMobile ? "+=340%" : "+=600%", // Compact & snappy on mobile devices
        pin: viewportRef.current,
        anticipatePin: 1,
        scrub: isMobile ? true : 0.8, // Instant 1:1 touch response on mobile; silky scrub on desktop
        fastScrollEnd: true,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          handleScrollProgress(self.progress);
        }
      });

      // Expose to window so Navigation can accurately target the projects scroll offset
      window.__projectsScrollTrigger = st;
    }, sectionRef.current);

    // Initial state pass (progress = 0)
    handleScrollProgress(0);

    return () => {
      window.__projectsScrollTrigger = null;
      window.__scrollToProject = null;
      ctx.revert();
    };
  }, [handleScrollProgress, scrollToProject]);

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
        // Swiped Left -> Advance to next project
        handleNext();
      } else if (diffX > 35) {
        // Swiped Right -> Go to previous project
        handlePrev();
      }
    }
    isSwipingRef.current = false;
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
          allProjects={PROJECTS_DATA}
          onSelectProject={(proj) => setSelectedModalProject(proj)}
          onClose={() => setSelectedModalProject(null)}
          onInquire={(proj) => {
            setSelectedModalProject(null);
            setTimeout(() => {
              const contactEl = document.getElementById("contact");
              if (contactEl) {
                contactEl.scrollIntoView({ behavior: "smooth" });
                // Also trigger custom event to prefill subject in contact form!
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
