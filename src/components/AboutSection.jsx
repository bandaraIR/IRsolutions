import { useState, useRef, useEffect } from "react";
import { 
  Bot, 
  Send, 
  Sparkles, 
  GraduationCap, 
  Compass, 
  Briefcase, 
  CheckCircle2, 
  User 
} from "lucide-react";
import { PERSONAL_INFO } from "../data/portfolioData";
import { 
  AI_SYSTEM_PROMPT, 
  PROMPT_SUGGESTIONS, 
  getOfflineBusinessResponse 
} from "../data/aiKnowledge";
import "../styles/AboutSection.css";

export default function AboutSection() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hello! I am Imal Ravindu's business assistant. How can I help you with industrial automation, customized software solutions, project inquiries, or quotation requests today?"
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatMessagesEndRef = useRef(null);

  useEffect(() => {
    chatMessagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSendMessage = async (textToSend) => {
    const query = typeof textToSend === "string" ? textToSend : input;
    if (!query.trim() || loading) return;

    const userMsg = { role: "user", content: query.trim() };
    const history = [...messages, userMsg];
    setMessages(history);
    setInput("");
    setLoading(true);

    try {
      const apiMessages = history
        .filter((m, i) => !(i === 0 && m.role === "assistant"))
        .map((m) => ({ role: m.role, content: m.content }));

      const res = await fetch("/groq/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_GROQ_API_KEY || ""}`
        },
        body: JSON.stringify({
          model: "qwen/qwen3.8-27b",
          max_tokens: 350,
          temperature: 0.5,
          messages: [{ role: "system", content: AI_SYSTEM_PROMPT }, ...apiMessages]
        })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error?.message || "API Error");
      }

      const reply = data.choices?.[0]?.message?.content?.trim();
      if (!reply) {
        throw new Error("Empty response");
      }

      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch (err) {
      console.warn("AI Assistant using offline business knowledge engine:", err.message);
      const fallbackAnswer = getOfflineBusinessResponse(query);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: fallbackAnswer }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <section id="about" className="about-apple-section">
      <div className="about-content-container">
        
        {/* Section Header */}
        <div className="about-header-block">
          <div className="about-badge">
            <Compass size={13} className="badge-compass" />
            <span>The Engineer's Story</span>
          </div>
          <h2 className="about-section-headline">
            Curiosity, Craft, and <span className="text-orange-glow">Commitment.</span>
          </h2>
          <p className="about-section-subtext">
            A developer shaped by rigorous software engineering fundamentals and a genuine enthusiasm for tactile, Apple-inspired human interfaces.
          </p>
        </div>

        {/* 1. Preserved AI Correspondent Terminal (Centered) */}
        <div className="about-ai-container">
          <div className="ai-chat-glass-terminal">
            
            {/* Terminal Header */}
            <div className="ai-terminal-header">
              <div className="terminal-traffic-lights">
                <span className="tl-dot red" />
                <span className="tl-dot yellow" />
                <span className="tl-dot green" />
              </div>
              
              <div className="terminal-title-center">
                <Bot size={15} className="bot-icon" />
                <span>AI Correspondent</span>
                <span className="terminal-live-badge">Online</span>
              </div>
            </div>

            {/* Messages Feed */}
            <div className="ai-messages-feed">
              {messages.map((msg, idx) => (
                <div key={idx} className={`ai-chat-bubble ${msg.role}`}>
                  <div className="bubble-avatar">
                    {msg.role === "assistant" ? (
                      <Bot size={14} />
                    ) : (
                      <User size={14} />
                    )}
                  </div>
                  <div className="bubble-body">
                    <span className="bubble-sender-name">
                      {msg.role === "assistant" ? "Imal's AI" : "You"}
                    </span>
                    <p className="bubble-text">{msg.content}</p>
                  </div>
                </div>
              ))}

              {loading && (
                <div className="ai-chat-bubble assistant">
                  <div className="bubble-avatar">
                    <Bot size={14} />
                  </div>
                  <div className="bubble-body">
                    <span className="bubble-sender-name">Imal's AI</span>
                    <p className="bubble-typing">
                      Thinking<span>.</span><span>.</span><span>.</span>
                    </p>
                  </div>
                </div>
              )}
              <div ref={chatMessagesEndRef} />
            </div>

            {/* Prompt Suggestions */}
            <div className="prompt-suggestions-row">
              {PROMPT_SUGGESTIONS.map((sug, i) => (
                <button
                  key={i}
                  className="suggestion-pill"
                  onClick={() => handleSendMessage(sug)}
                  disabled={loading}
                >
                  <span>{sug}</span>
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <div className="ai-input-bar">
              <input
                type="text"
                className="ai-text-input"
                placeholder="Ask about services, projects, warranty, or request a quote..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={loading}
              />
              <button 
                className="ai-send-btn"
                onClick={() => handleSendMessage()}
                disabled={loading || !input.trim()}
                aria-label="Send message"
              >
                <Send size={15} />
              </button>
            </div>

          </div>
        </div>

        {/* 2. Repositioned Text Block: Clean Horizontal Layout Directly Below the AI Tab */}
        <div className="about-horizontal-cards-row">
          
          {/* Card 1: Engineering Ethos */}
          <div className="about-horiz-card">
            <div className="horiz-card-header">
              <div className="horiz-icon-pill">
                <Sparkles size={16} />
              </div>
              <h3 className="horiz-card-title">Engineering Ethos</h3>
            </div>
            <p className="horiz-card-text">
              I am Imal Ravindu — an engineer from Colombo, Sri Lanka, driven by the belief that code should never simply work, but feel effortless to those who interact with it.
            </p>
            <p className="horiz-card-text">
              Comfortably bridging full-scale web architectures, responsive Flutter applications, and real-time machine-learning systems.
            </p>
          </div>

          {/* Card 2: Academic Background & Capstone */}
          <div className="about-horiz-card">
            <div className="horiz-card-header">
              <div className="horiz-icon-pill">
                <GraduationCap size={16} />
              </div>
              <h3 className="horiz-card-title">Education &amp; Degree</h3>
            </div>
            <p className="horiz-card-text">
              Graduated with a <strong>BSc (Hons) in Software Engineering</strong> from <strong>NSBM Green University</strong> (Class of 2026). Prior schooling completed at St. John's College, Nugegoda.
            </p>
            <p className="horiz-card-text">
              Final Year Capstone focused on AI computer vision traffic enforcement with YOLOv8, OCR detection, and cloud-synchronized mobile applications.
            </p>
          </div>

          {/* Card 3: Career Objectives & Availability */}
          <div className="about-horiz-card">
            <div className="horiz-card-header">
              <div className="horiz-icon-pill">
                <Briefcase size={16} />
              </div>
              <h3 className="horiz-card-title">Status &amp; Availability</h3>
            </div>
            <p className="horiz-card-text">
              Actively seeking my first professional role — open to full-time software engineering positions, high-impact remote teams, and selective freelance commissions.
            </p>
            <div className="horiz-goals-ribbon">
              <span className="horiz-goal-chip">Full-Time Role</span>
              <span className="horiz-goal-chip">Remote Global Teams</span>
              <span className="horiz-goal-chip">Open for Hire</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
