import { 
  Cpu, 
  Activity, 
  ShieldAlert, 
  Gauge, 
  DoorClosed, 
  Layers, 
  Smartphone, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles 
} from "lucide-react";
import "../styles/ServicesSection.css";

export default function ServicesSection() {
  // Primary Focus: Industrial Engineering, IoT & Automation Systems
  const industrialServices = [
    {
      id: "access-automation",
      icon: <DoorClosed size={26} />,
      title: "Automated Gate & Access Control Systems",
      badge: "Access Automation",
      description: "Engineering robust vehicle access control, automatic barrier gate automation, and registered employee vehicle verification for industrial perimeters.",
      highlights: [
        "Automated barrier gate & access control controllers",
        "Automatic Number Plate Recognition (ANPR / ALPR) integration",
        "Registered employee vehicle verification & movement logging",
        "Industrial relay, safety beam & sensor interfacing"
      ]
    },
    {
      id: "iot-monitoring",
      icon: <Activity size={26} />,
      title: "IoT-Based Monitoring & Control Systems",
      badge: "Sensors & Telemetry",
      description: "Industrial-grade temperature and humidity monitoring systems providing live environmental telemetry, threshold alerting, and audit compliance data logging.",
      highlights: [
        "Industrial temperature & humidity telemetry grids",
        "24/7 threshold breach alerting & acoustic/visual triggers",
        "Automated audit-ready data logging & CSV/PDF exports",
        "ESP32, Arduino & Raspberry Pi industrial firmware engineering"
      ]
    },
    {
      id: "industrial-safety",
      icon: <ShieldAlert size={26} />,
      title: "AI-Powered Industrial Safety Solutions",
      badge: "Workplace Safety",
      description: "Computer vision and intelligent safety systems engineered to eliminate blind spots and prevent accidents around forklifts, machinery, and pedestrian lanes.",
      highlights: [
        "Forklift blind-spot & pedestrian safety boundary monitoring",
        "Red-zone restricted danger perimeter intrusion alarms",
        "Real-time dual audio-visual operator warning alerts",
        "Mitigation of collision risks in high-density warehouses"
      ]
    },
    {
      id: "speed-monitoring",
      icon: <Gauge size={26} />,
      title: "Vehicle Detection & Speed Monitoring Systems",
      badge: "Traffic & Radar",
      description: "Precision vehicle speed monitoring and visual driver warning systems designed to manage vehicular traffic and enforce safety limits on company premises.",
      highlights: [
        "Radar & sensor-based vehicle speed tracking",
        "Immediate visual LED driver overspeed warning feedback",
        "Configurable speed thresholds tailored for plant zones",
        "Facility traffic safety discipline & pedestrian protection"
      ]
    }
  ];

  // Secondary Focus: Supporting Web & Mobile Engineering Platforms
  const secondaryServices = [
    {
      id: "web-systems",
      icon: <Layers size={22} />,
      title: "Industrial Cloud & Web Dashboards",
      badge: "Secondary Focus",
      description: "High-performance centralized web platforms for monitoring facility telemetry, reviewing gate access history, and exporting compliance records.",
      tech: "React · Next.js · Node.js · Cloud Firestore"
    },
    {
      id: "mobile-apps",
      icon: <Smartphone size={22} />,
      title: "Mobile Telemetry & Controller Apps",
      badge: "Secondary Focus",
      description: "Cross-platform mobile applications for facility managers to receive instant sensor alerts, track equipment status, and manage controls on the go.",
      tech: "Flutter (iOS & Android) · Real-Time Notifications · BLoC"
    }
  ];

  const handleInquire = (serviceTitle) => {
    const contactEl = document.getElementById("contact");
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: "smooth" });
      window.dispatchEvent(
        new CustomEvent("prefill-contact-subject", {
          detail: { subject: `Inquiry regarding ${serviceTitle}` }
        })
      );
    }
  };

  return (
    <section id="services" className="services-section-light">
      <div className="services-container-inner">
        {/* Section Header */}
        <div className="services-header-pane">
          <div className="services-eyebrow-pill">
            <Sparkles size={13} className="eyebrow-sparkle" />
            <span>Core Engineering Focus</span>
          </div>
          <h2 className="services-headline">Industrial Automation, IoT &amp; Safety Engineering</h2>
          <p className="services-subtext">
            Our primary engineering practice focuses on industrial automation systems, IoT telemetry monitoring, 
            automated access control, and AI-powered industrial safety solutions.
          </p>
        </div>

        {/* Primary 4 Industrial Pillars Grid */}
        <div className="services-cards-grid">
          {industrialServices.map((item) => (
            <div key={item.id} className="service-card-item primary-industrial-card">
              <div className="service-card-top">
                <div className="service-icon-box">{item.icon}</div>
                <span className="service-badge-pill">{item.badge}</span>
              </div>

              <h3 className="service-card-title">{item.title}</h3>
              <p className="service-card-desc">{item.description}</p>

              <ul className="service-highlights-list">
                {item.highlights.map((feat, i) => (
                  <li key={i} className="service-highlight-bullet">
                    <CheckCircle2 size={16} className="bullet-check" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              <div className="service-card-action">
                <button
                  type="button"
                  className="service-inquire-btn"
                  onClick={() => handleInquire(item.title)}
                  aria-label={`Inquire about ${item.title}`}
                >
                  <span>Request Industrial Solution</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Secondary Services Strip: Supporting Web & Mobile Development */}
        <div className="secondary-services-banner">
          <div className="secondary-services-header">
            <span className="secondary-tag-label">Secondary Capabilities</span>
            <h4 className="secondary-title">Integrated Web &amp; Mobile Control Systems</h4>
            <p className="secondary-desc">
              Web and mobile application development serve as supporting interfaces for our industrial systems, 
              enabling cloud telemetry visualization, user administration, and mobile operational control.
            </p>
          </div>

          <div className="secondary-cards-row">
            {secondaryServices.map((sec) => (
              <div key={sec.id} className="secondary-card-item">
                <div className="secondary-icon-wrap">{sec.icon}</div>
                <div className="secondary-text-content">
                  <div className="secondary-card-title-row">
                    <h5 className="secondary-card-title">{sec.title}</h5>
                    <span className="secondary-badge">{sec.badge}</span>
                  </div>
                  <p className="secondary-card-desc">{sec.description}</p>
                  <span className="secondary-card-tech">{sec.tech}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
