import { useState } from "react";
import { 
  Send, 
  Mail, 
  MapPin, 
  Copy, 
  Check, 
  FileText, 
  Sparkles, 
  ArrowUpRight 
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./BrandIcons";
import { PERSONAL_INFO } from "../data/portfolioData";
import "../styles/ContactSection.css";

const RECIPIENT_EMAIL = "imalbandara624@gmail.com";

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [copied, setCopied] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(RECIPIENT_EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setStatus({ type: "error", message: "Please fill out all required fields." });
      return;
    }

    setSubmitting(true);
    setStatus({ type: "", message: "" });

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${RECIPIENT_EMAIL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          Name: form.name,
          Email: form.email,
          Subject: form.subject || "Portfolio Contact Inquiry",
          Message: form.message
        })
      });

      const result = await response.json();

      if (response.ok && (result.success === "true" || result.success === true)) {
        setStatus({
          type: "success",
          message: "Message received! Thank you for getting in touch. I will reply to your email promptly."
        });
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        throw new Error(result.message || "Failed to deliver dispatch.");
      }
    } catch (err) {
      console.error(err);
      setStatus({
        type: "error",
        message: "Dispatch transmission failed. Please email directly at " + RECIPIENT_EMAIL
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="contact-apple-section">
      <div className="contact-content-container">
        
        {/* Section Header */}
        <div className="contact-header-block">
          <div className="contact-badge">
            <Mail size={13} className="badge-mail" />
            <span>Direct Dispatch</span>
          </div>
          <h2 className="contact-section-headline">
            Let's Build Something <span className="text-orange-glow">Extraordinary.</span>
          </h2>
          <p className="contact-section-subtext">
            Whether discussing full-time opportunities, engineering collaborations, or freelance commissions, my inbox is always open.
          </p>
        </div>

        {/* Contact Layout Grid */}
        <div className="contact-layout-grid">
          
          {/* Left Column: Form */}
          <div className="contact-form-card">
            <h3 className="form-card-title">Send a Direct Message</h3>
            <p className="form-card-desc">
              Fill out the form below to transmit a message directly to my email desk.
            </p>

            {status.message && (
              <div className={`status-feedback-banner ${status.type}`}>
                <p>{status.message}</p>
              </div>
            )}

            <form className="apple-styled-form" onSubmit={handleSubmit}>
              <div className="form-input-pair">
                <div className="form-field-group">
                  <label className="form-field-label">Your Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="e.g. Sarah Jenkins"
                    required
                    disabled={submitting}
                  />
                </div>

                <div className="form-field-group">
                  <label className="form-field-label">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="e.g. sarah@company.com"
                    required
                    disabled={submitting}
                  />
                </div>
              </div>

              <div className="form-field-group">
                <label className="form-field-label">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="e.g. Full-Stack Role / Project Inquiry"
                  disabled={submitting}
                />
              </div>

              <div className="form-field-group">
                <label className="form-field-label">Message *</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows="5"
                  placeholder="Share details regarding your project or open position..."
                  required
                  disabled={submitting}
                />
              </div>

              <button 
                type="submit" 
                className="form-transmit-btn" 
                disabled={submitting}
              >
                <Send size={16} />
                <span>{submitting ? "Transmitting..." : "Send Dispatch"}</span>
              </button>
            </form>
          </div>

          {/* Right Column: Cards & Social Links */}
          <div className="contact-channels-column">
            
            {/* Quick Email Copy Card */}
            <div className="channel-glass-card email-card">
              <div className="channel-icon-circle">
                <Mail size={20} />
              </div>
              <div className="channel-card-body">
  <span className="channel-card-tag">Primary Email</span>
  <a href="mailto:projects@irsolutions.company" className="channel-primary-val">
    projects@irsolutions.company
  </a>
  <p className="channel-sub-info">Typically reply within 24 hours.</p>
</div>
              <button 
                className="channel-copy-btn" 
                onClick={handleCopyEmail}
                aria-label="Copy email address"
              >
                {copied ? <Check size={16} className="text-green" /> : <Copy size={16} />}
                <span>{copied ? "Copied" : "Copy"}</span>
              </button>
            </div>

            {/* Location Card */}
            <div className="channel-glass-card">
              <div className="channel-icon-circle">
                <MapPin size={20} />
              </div>
              <div className="channel-card-body">
                <span className="channel-card-tag">Current Base</span>
                <span className="channel-primary-val">Colombo, Sri Lanka</span>
                <p className="channel-sub-info">Timezone: GMT+5:30 (Open to Remote Globally)</p>
              </div>
            </div>

            {/* Resume Download Card */}
            <div className="channel-glass-card">
              <div className="channel-icon-circle">
                <FileText size={20} />
              </div>
              <div className="channel-card-body">
                <span className="channel-card-tag">Curriculum Vitae</span>
                <span className="channel-primary-val">Imal_Ravindu_CV.pdf</span>
                <p className="channel-sub-info">Complete engineering history &amp; credentials.</p>
              </div>
              <a 
                href="/imal-cv.pdf" 
                download="Imal_Ravindu_CV.pdf"
                className="channel-link-btn"
              >
                <span>Download</span>
                <ArrowUpRight size={14} />
              </a>
            </div>

            {/* Social Channels */}
            <div className="social-links-grid">
              <a 
                href={PERSONAL_INFO.github} 
                target="_blank" 
                rel="noreferrer"
                className="social-glass-tile"
              >
                <GithubIcon size={20} />
                <div className="social-tile-text">
                  <span className="social-name">GitHub</span>
                  <span className="social-handle">@bandaraIR</span>
                </div>
                <ArrowUpRight size={15} className="social-arrow" />
              </a>

              <a 
                href={PERSONAL_INFO.linkedin} 
                target="_blank" 
                rel="noreferrer"
                className="social-glass-tile"
              >
                <LinkedinIcon size={20} />
                <div className="social-tile-text">
                  <span className="social-name">LinkedIn</span>
                  <span className="social-handle">Imal Ravindu</span>
                </div>
                <ArrowUpRight size={15} className="social-arrow" />
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
