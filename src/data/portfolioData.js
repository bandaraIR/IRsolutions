import envMonitorImg from "../assets/projects/env_monitor.png";
import speedWarningImg from "../assets/projects/speed_warning.jpg";
import forkliftSafetyImg from "../assets/projects/forklift_safety.jpg";
import barrierGateImg from "../assets/projects/barrier_gate.jpg";
import equipmentSourcingImg from "../assets/projects/equipment_sourcing.jpg";
import auriImg from "../assets/projects/auri.png";
import yoloImg from "../assets/projects/yolo.png";

export const PERSONAL_INFO = {
  fullName: "Liyana Waduge Imal Ravindu Bandara",
  shortName: "Imal Ravindu",
  role: "Industrial Automation & IoT Systems Engineer",
  tagline: "Engineering robust industrial automation, IoT telemetry monitoring, and AI-powered safety solutions.",
  location: "Colombo, Sri Lanka",
  email: "imalbandara624@gmail.com",
  github: "https://github.com/bandaraIR",
  linkedin: "https://www.linkedin.com/in/imal-ravindu-2ab2123a3/",
  degree: "BSc (Hons) in Software Engineering",
  university: "NSBM Green University",
  graduationYear: "2026",
  status: "Available for enterprise deployments & industrial commissions",
  bio: [
    "Specialized in industrial automation systems, enterprise IoT telemetry, and AI-powered workplace safety engineering.",
    "Experienced in deploying real-time environmental monitoring grids, automated barrier gate controllers, vehicle speed radar systems, and forklift blind-spot pedestrian safety nets.",
    "Backed by comprehensive software engineering fundamentals across cloud dashboards and cross-platform mobile telemetry apps for seamless hardware-to-cloud integration."
  ]
};

export const PROJECTS_DATA = [
  {
    id: 1,
    title: "Industrial Temperature & Humidity Monitoring System",
    subtitle: "Developed a real-time environmental monitoring solution for a multinational company to monitor temperature and humidity conditions within industrial facilities.",
    category: "Environmental Monitoring",
    year: "Enterprise Solution",
    status: "Operational",
    image: envMonitorImg,
    overview: "Developed a real-time environmental monitoring solution for a multinational company to monitor temperature and humidity conditions within industrial facilities.\n\nThe system displays live environmental readings, records historical data, allows users to configure acceptable operating limits, and provides alerts when conditions exceed predefined thresholds. It also supports periodic data exports for reporting and record-keeping.",
    purpose: "Maintains critical facility climate parameters strictly within safe operating boundaries, safeguarding sensitive goods, preventing environmental damage, and guaranteeing regulatory compliance across industrial facilities.",
    benefits: [
      "Continuous live visibility into facility environmental conditions",
      "Immediate automated alerts when conditions exceed safe operating limits",
      "Centralized historical data logging for audit-ready compliance reporting",
      "Configurable thresholds tailored to specific facility operational requirements",
      "Convenient periodic data export capabilities for management review"
    ],
    features: [
      "Real-time environmental monitoring",
      "Live data visualization",
      "Configurable operating limits",
      "Automatic data logging and historical records",
      "Alerts for abnormal environmental conditions",
      "Periodic data export for reporting"
    ],
    impact: "Provides facility managers with round-the-clock environmental awareness, eliminating manual logging and mitigating operational risks before threshold breaches impact facility operations.",
    techStack: ["IoT Sensor Grid", "Real-Time Telemetry", "Automated Data Logging", "Threshold Alerts Engine", "CSV/PDF Export"],
    tags: ["Industrial IoT", "Enterprise", "Monitoring"]
  },
  {
    id: 2,
    title: "Vehicle Speed Detection & Warning System",
    subtitle: "Developed a vehicle speed monitoring and warning solution for a multinational company to improve traffic safety within industrial premises.",
    category: "Traffic Safety",
    year: "Enterprise Solution",
    status: "Operational",
    image: speedWarningImg,
    overview: "Developed a vehicle speed monitoring and warning solution for a multinational company to improve traffic safety within industrial premises.\n\nThe system monitors vehicle speeds and displays visual warnings when vehicles exceed predefined speed limits. Its purpose is to encourage drivers to maintain safe speeds and reduce potential risks in vehicle operating areas.",
    purpose: "Promotes responsible vehicular operations on industrial facility roadways and loading grounds, actively reducing collision risks and enhancing workplace safety for both drivers and pedestrians.",
    benefits: [
      "Proactive reduction of speed-related collision risks on industrial premises",
      "Immediate visual driver feedback to encourage voluntary compliance",
      "Fully configurable speed thresholds tailored to different plant zones",
      "Heightened driver awareness across high-risk pedestrian and loading corridors",
      "Measurable improvement in overall facility road safety culture"
    ],
    features: [
      "Real-time vehicle speed monitoring",
      "Automatic overspeed detection",
      "Visual warnings for drivers",
      "Configurable speed limits",
      "Improved driver awareness",
      "Enhanced traffic safety within industrial premises"
    ],
    impact: "Significantly decreases speeding incidents across active industrial thoroughfares, establishing a disciplined traffic environment that safeguards workers and visitors.",
    techStack: ["Radar / Sensor Interfacing", "Speed Tracking Algorithm", "LED Driver Feedback Display", "Industrial Threshold Logic"],
    tags: ["Traffic Safety", "Enterprise", "Hardware Integration"]
  },
  {
    id: 3,
    title: "AI-Powered Forklift Blind Spot & Pedestrian Safety System",
    subtitle: "Developed an intelligent pedestrian safety solution for a multinational company to help reduce the risk of accidents involving forklifts and nearby workers.",
    category: "Intelligent Safety System",
    year: "Enterprise Solution",
    status: "Operational",
    image: forkliftSafetyImg,
    overview: "Developed an intelligent pedestrian safety solution for a multinational company to help reduce the risk of accidents involving forklifts and nearby workers.\n\nThe system monitors designated safety zones around the forklift. A clearly defined red zone indicates a restricted area. When a person enters or crosses this zone, the system detects the intrusion and activates audible and visual alarms to warn the operator and nearby personnel.",
    purpose: "Eliminates dangerous forklift blind spots in active warehouse and factory environments, preventing pedestrian-vehicle collisions through automated safety zone surveillance and instant dual-alarm intervention.",
    benefits: [
      "Reliable intelligent detection of pedestrians entering forklift operating zones",
      "Clear, visible restricted safety boundary establishing an unmistakable danger perimeter",
      "Instant simultaneous visual and audible alerts to warn both driver and workers",
      "Effective mitigation of blind-spot collision risks in high-density facilities",
      "Substantial elevation of organizational occupational health and safety standards"
    ],
    features: [
      "Intelligent pedestrian detection",
      "Safety-zone monitoring around forklifts",
      "Clearly defined restricted safety zones",
      "Automatic detection of safety-zone intrusions",
      "Audible and visual safety alerts",
      "Improved awareness of forklift blind spots",
      "Enhanced workplace safety"
    ],
    impact: "Creates an active safety shield around heavy material handling machinery, preventing catastrophic workplace injuries and cultivating an accident-free warehouse environment.",
    techStack: ["Computer Vision", "Perimeter Intrusion Detection", "Audio-Visual Signaling", "Industrial Embedded Systems"],
    tags: ["AI & Vision", "Industrial Safety", "Enterprise"]
  },
  {
    id: 4,
    title: "Automatic Vehicle Recognition & Barrier Gate Automation",
    subtitle: "Developed an automated vehicle access control solution that simplifies entry and exit management at company premises.",
    category: "Access Automation",
    year: "Enterprise Solution",
    status: "Operational",
    image: barrierGateImg,
    overview: "Developed an automated vehicle access control solution that simplifies entry and exit management at company premises.\n\nThe system identifies registered employee vehicles and automatically opens the barrier gate for authorized vehicles. Vehicle movements are recorded digitally, providing a convenient way to review access history and improve entrance security.",
    purpose: "Streamlines vehicular ingress and egress across enterprise gates, combining rapid automated barrier operation with digital access verification for optimized security and traffic flow.",
    benefits: [
      "Hands-free, frictionless entry for registered employees and authorized vehicles",
      "Substantial reduction in entrance gate queues and bottleneck delays during shift peaks",
      "Comprehensive digital logs of all vehicle movements for effortless audit trails",
      "Heightened perimeter security with immediate prevention of unauthorized vehicle entry",
      "Reduced dependency on manual checkpoint administration and personnel overhead"
    ],
    features: [
      "Automatic vehicle number plate recognition",
      "Registered vehicle verification",
      "Automatic barrier gate operation",
      "Digital vehicle access records",
      "Improved entrance security",
      "Reduced manual intervention",
      "More efficient vehicle access management"
    ],
    impact: "Optimizes vehicular transit speed while reinforcing facility security protocols with precise, tamper-proof electronic vehicle logs.",
    techStack: ["ANPR / ALPR Recognition", "Barrier Gate PLC/Relay Control", "Employee Vehicle Database", "Automated Security Logs"],
    tags: ["Access Automation", "Computer Vision", "Enterprise"]
  },
  {
    id: 5,
    title: "Industrial Equipment & Technology Sourcing",
    subtitle: "Providing customized equipment sourcing services to help businesses find suitable products according to their specific requirements and budgets.",
    category: "Equipment Sourcing",
    year: "Client Services",
    status: "Active Service",
    image: equipmentSourcingImg,
    overview: "Providing customized equipment sourcing services to help businesses find suitable products according to their specific requirements and budgets.\n\nThe service includes identifying suitable products, coordinating with suppliers, comparing quotations, checking product specifications, and assisting customers with warranty arrangements where available.",
    purpose: "Empowers enterprises to acquire the right industrial machinery and technology solutions through dependable market procurement, technical diligence, and commercial negotiation.",
    benefits: [
      "Tailored sourcing matching client-specific operational and budgetary needs",
      "Comprehensive supplier coordination and transparent quotation comparisons",
      "Independent technical specification checks ensuring fit-for-purpose acquisition",
      "Significant procurement cost optimization and lead-time reductions",
      "Dedicated facilitation with supplier warranty protections and after-sales terms"
    ],
    features: [
      "Customized product sourcing",
      "Supplier coordination",
      "Competitive quotation comparisons",
      "Product specification verification",
      "Solutions tailored to customer requirements",
      "Assistance with warranty arrangements",
      "Support for industrial and business requirements"
    ],
    impact: "Delivers substantial cost savings and eliminates purchasing uncertainties, providing corporate clients with dependable, specification-verified industrial solutions.",
    techStack: ["Technical Specification Analysis", "Global Supplier Coordination", "Cost & Quotation Optimization", "Warranty & Compliance Review"],
    tags: ["Technology Sourcing", "Consulting", "Industrial Hardware"]
  },
  {
    id: 6,
    title: "SafeRoad – AI-Powered Red-Light Violation Detection & Traffic Management",
    subtitle: "An automated traffic violation detection and fine management solution developed to improve road safety through computer vision.",
    category: "Traffic Safety & Computer Vision",
    year: "Enterprise / Capstone",
    status: "Operational",
    image: yoloImg,
    overview: "SafeRoad is an intelligent road safety solution developed to automate vehicle monitoring, speed tracking, red-light compliance, and automated traffic management.\n\nThe system identifies vehicles that cross designated safety zones, captures vehicle registration numbers via OCR, and records detected violations for instant operational processing.",
    purpose: "Improve facility and roadway safety enforcement through automated computer vision, vehicle tracking, and real-time electronic processing.",
    benefits: [
      "Automated identification of vehicles violating safety rules and red signals",
      "Accurate vehicle registration number recognition with captured image evidence",
      "Centralized incident logs and electronic case management",
      "Real-time processing for quick law enforcement and administrative oversight",
      "Demonstrated reduction in reckless vehicular maneuvers and speed infractions"
    ],
    features: [
      "Automated vehicle violation detection",
      "Real-time vehicle number plate recognition (ANPR)",
      "Safety-line intrusion surveillance",
      "Image and telemetry evidence recording",
      "Administrative monitoring dashboard",
      "Mobile alert and status notification support"
    ],
    impact: "Enhances roadway and facility traffic enforcement, supporting disciplined driving and accident reduction across controlled premises.",
    techStack: ["Python", "YOLOv8", "OpenCV", "EasyOCR", "Flutter (Mobile)", "Node.js", "Firebase"],
    tags: ["AI & Vision", "Vehicle Detection", "Safety Systems"]
  },
  {
    id: 7,
    title: "AURI – E-Commerce Platform",
    subtitle: "A modern commercial web application with cloud product cataloging, order workflows, and administrative dashboards.",
    category: "Full-Stack Web Development",
    year: "Commercial Platform",
    status: "Operational",
    image: auriImg,
    overview: "AURI is a modern full-stack web e-commerce platform designed to demonstrate robust digital product management, online order placement, and seamless transaction workflows.\n\nThe system features an administrative dashboard for inventory, orders, and payment tracking, showcasing full-stack web and cloud backend integration capabilities.",
    purpose: "Provide a seamless online shopping experience while illustrating robust full-stack software and cloud architecture.",
    benefits: [
      "Smooth, responsive user experience across desktop and mobile devices",
      "Flexible multi-method payment workflows",
      "Streamlined administrative product and inventory management",
      "Centralized order fulfillment tracking"
    ],
    features: [
      "Modern responsive web application",
      "Product browsing and detail management",
      "Shopping cart and checkout workflows",
      "Admin dashboard with telemetry and sales reports",
      "Secure Google OAuth authentication"
    ],
    impact: "Showcases complementary web and cloud software architecture that interfaces with enterprise systems.",
    techStack: ["React", "Node.js", "Express", "REST API", "Google OAuth", "Cloud Storage"],
    tags: ["Web Systems", "Cloud Architecture", "Secondary Focus"]
  }
];

export const SKILLS_CATEGORIES = [
  {
    id: "frontend",
    title: "Frontend Engineering",
    icon: "Layout",
    description: "Designing fluid, responsive, and pixel-precise user interfaces with modern reactive component architectures.",
    skills: [
      { name: "React", level: 92, highlight: true },
      { name: "TypeScript", level: 86, highlight: true },
      { name: "Next.js", level: 84 },
      { name: "JavaScript (ES6+)", level: 94, highlight: true },
      { name: "HTML5 / Modern CSS", level: 95 },
      { name: "GSAP / Framer Motion", level: 88, highlight: true },
      { name: "Tailwind CSS", level: 85 }
    ]
  },
  {
    id: "mobile",
    title: "Mobile Architecture",
    icon: "Smartphone",
    description: "Building cross-platform iOS and Android applications with native-tier performance and silky user journeys.",
    skills: [
      { name: "Flutter", level: 88, highlight: true },
      { name: "Dart", level: 86, highlight: true },
      { name: "State Management (Bloc/Riverpod)", level: 84 },
      { name: "Firebase Mobile SDK", level: 90 },
      { name: "Mobile UI / Cupertino Design", level: 88 }
    ]
  },
  {
    id: "backend",
    title: "Backend & Cloud Systems",
    icon: "Server",
    description: "Constructing robust RESTful and real-time APIs, distributed data schemas, and authenticated cloud microservices.",
    skills: [
      { name: "Node.js", level: 88, highlight: true },
      { name: "Express.js", level: 86 },
      { name: "Firebase / Firestore", level: 90, highlight: true },
      { name: "MongoDB", level: 85 },
      { name: "PostgreSQL & SQL", level: 82 },
      { name: "REST APIs & WebSockets", level: 90 }
    ]
  },
  {
    id: "ai_tools",
    title: "AI, Vision & Developer Tools",
    icon: "Cpu",
    description: "Applying computer vision pipelines, IoT embedded integrations, and continuous deployment workflows.",
    skills: [
      { name: "Python", level: 84, highlight: true },
      { name: "YOLOv8 & OpenCV", level: 82, highlight: true },
      { name: "EasyOCR", level: 80 },
      { name: "Git & GitHub CI", level: 90 },
      { name: "Docker", level: 78 },
      { name: "Figma (UI/UX Design)", level: 85 }
    ]
  }
];

export const TIMELINE_MILESTONES = [
  {
    year: "2026",
    title: "BSc (Hons) in Software Engineering",
    institution: "NSBM Green University",
    description: "Graduated with honors, presenting final year capstone on AI computer vision traffic violation detection and tri-role Flutter architecture."
  },
  {
    year: "2025 - 2026",
    title: "Full Stack & IoT Capstone Lead",
    institution: "University Projects",
    description: "Architected RoomCraft 3D visualization platform and Auri fashion e-commerce platform for boutique brand in Colombo."
  },
  {
    year: "2023 - 2024",
    title: "Web & Mobile Developer Practice",
    institution: "Freelance & University",
    description: "Built AutoCare rental booking engine, vehicle management workflows, and full-stack API architectures."
  },
  {
    year: "2022",
    title: "Commenced Software Engineering Degree",
    institution: "NSBM Green University",
    description: "Began rigorous engineering curriculum in software architecture, algorithms, database management, and UI design."
  }
];
