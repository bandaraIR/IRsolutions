import { ArrowUp, Sparkles, Heart } from "lucide-react";
import "../styles/Footer.css";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="apple-portfolio-footer">
      <div className="footer-content-container">

        {/* Top Rule with Back-to-Top */}
        <div className="footer-top-row">
          <div className="footer-brand">
            <span className="footer-monogram">IR Solutions</span>
            <span className="footer-name"></span>
          </div>

          <button
            className="footer-back-to-top"
            onClick={scrollToTop}
            aria-label="Back to top of portfolio"
          >
            <span>Back to top</span>
            <ArrowUp size={14} />
          </button>
        </div>

        {/* Middle Meta */}
        <div className="footer-middle-row">
          <p className="footer-tagline">
            Crafted with architectural precision, scroll-linked choreography, and Apple-inspired aesthetics.
          </p>
          <div className="footer-tech-stack-note">
            <span>React</span>
            <span className="sep">·</span>
            <span>GSAP ScrollTrigger</span>
            <span className="sep">·</span>
            <span>Modern CSS</span>
            <span className="sep">·</span>
            <span>Vite</span>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="footer-bottom-row">
          <span>&copy; {new Date().getFullYear()} Imal Ravindu. All rights reserved.</span>
          <span>BSc (Hons) Software Engineering · NSBM Green University</span>
        </div>

      </div>
    </footer>
  );
}
