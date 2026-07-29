import React, { useState } from "react";
import "./Projects.scss";

const PROJECTS = [
  {
    title: "CareerClarity — AI-Powered Career Guidance",
    desc: "An AI-driven full-stack platform that empowers students to make data-informed career decisions. The system analyzes skills, interests, and academic profiles to generate personalized career recommendations, AI roadmaps, CV gap analysis, and real-time opportunity alerts — all within a unified dashboard.",
    subtitle: "AI-Powered Career Guidance for Students",
    image: "/assets/images/common/career-clarity.png",
    tags: ["React", "Django", "PostgreSQL", "Tailwind CSS", "REST API", "JWT", "Python", "Vite", "Axios"],
    links: [
      { label: "Live Demo", href: "https://career-clarity-three.vercel.app/", icon: "↗" },
      { label: "Source Code", href: "https://github.com/vivekcode12345/career-clarity", icon: "⌂" },
    ],
    isTeamProject: true,
    contributions: [
      "Architected and developed the React frontend — built 15+ reusable components including auth flows, dynamic dashboards, AI chatbot UI, and alert management system",
      "Implemented Google OAuth + JWT authentication pipeline connecting React frontend to Django REST backend, securing user sessions across the platform",
      "Designed and integrated the CV Analysis module, leveraging EasyOCR + spaCy for automated skill extraction, and built the front-end visualization for skill-gap reporting",
      "Engineered real-time opportunity alerts module with full CRUD operations, connecting the alerts dashboard to Django REST endpoints with pagination and filters"
    ]
  },
  {
    title: "GSAP Portfolio — React + GSAP",
    desc: "Designed and built a high-performance animated portfolio using React and GSAP. Implemented ScrollTrigger-based section pinning, scrubbed timelines, parallax/zoom effects, and smooth anchor navigation. Built reusable motion patterns, responsive layouts, and optimized rendering with will-change, transform-based animations, and cleanup-safe GSAP hooks for consistent behavior across refresh/resize.",
    image: "/assets/images/common/portfolio-image.png",
    tags: ["React", "GSAP", "ScrollTrigger", "SCSS", "Vite"],
    links: [
      { label: "Live Demo", href: "https://sisvanth-gsap-portfolio.vercel.app/", icon: "↗" },
      { label: "Source Code", href: "https://github.com/SisvanthkumarS/GSAP-Portfolio", icon: "⌂" },
    ]
  },
  {
    title: "Dining Concierge Chatbot — AWS",
    desc: "Built a production-style serverless dining recommendation system leveraging AWS cloud-native services. Implemented a decoupled microservices architecture using API Gateway, Lex, Lambda, SQS, OpenSearch, DynamoDB, SES, and EventBridge.",
    image: "/assets/images/common/chatbot-cover.png",
    tags: ["AWS", "Lex", "Lambda", "API Gateway", "SQS", "DynamoDB", "OpenSearch"],
    links: [
      { label: "Live Demo", href: "https://amanns-dining-concierge-nyc.s3.us-east-1.amazonaws.com/index.html", icon: "↗" },
      { label: "Source Code", href: "https://github.com/SisvanthkumarS/dining-concierge-chatbot", icon: "⌂" },
    ],
  },
];

export default function Projects() {
  const [expanded, setExpanded] = useState({});

  const toggleExpand = (title) => {
    setExpanded((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  return (
    <section className="projects" id="projects">
      {/* Header */}
      <div className="sectionHeader">
        <p className="sectionKicker">04. PROJECTS</p>
        <h2 className="sectionTitle">PROJECTS </h2>
        <p className="sectionSub">
          A selection of builds that showcase frontend motion craft and cloud-first architecture.
        </p>
      </div>

      {/* Cards */}
      <div className="projectsGrid">
        {PROJECTS.map((p) => (
          <article className="projectCard" key={p.title}>
            <div className="projectMedia">
              <img src={p.image} alt={p.title} loading="lazy" />
              <div className="projectMediaOverlay" />
            </div>

            <div className="projectBody">
              <h3 className="projectTitle">{p.title}</h3>

              {p.subtitle && (
                <p className="projectSubtitle">{p.subtitle}</p>
              )}

              <p className="projectDesc">{p.desc}</p>

              <div className="projectTags">
                {p.tags.map((t) => (
                  <span className="tag" key={t}>
                    {t}
                  </span>
                ))}
              </div>

              {/* Team Project: My Contributions */}
              {p.isTeamProject && p.contributions && (
                <div className="projectContributions">
                  <button
                    className="contribToggle"
                    onClick={() => toggleExpand(p.title)}
                    aria-expanded={expanded[p.title]}
                  >
                    {expanded[p.title] ? "▲" : "▼"} My Contributions
                  </button>
                  {expanded[p.title] && (
                    <div className="contribContent">
                      <p className="contribNote">
                        Team project — what I built:
                      </p>
                      <ul className="contribList">
                        {p.contributions.map((c, i) => (
                          <li key={i} className="contribItem">
                            {c}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              <div className="projectFooter">
                {p.links.map((l) => (
                  <a
                    key={l.label}
                    className="projectLink"
                    href={l.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span className="icon">{l.icon}</span>
                    {l.label}
                  </a>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
