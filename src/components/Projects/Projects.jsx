import React from "react";
import "./Projects.scss";

const PROJECTS = [
  {
    title: "CareerClarity",
    subtitle: "AI-Powered Career Guidance Platform",
    desc: "Full-stack platform pairing a React frontend with a Django REST API and PostgreSQL database, secured by JWT authentication and Google OAuth. Uses EasyOCR and spaCy to extract skills from uploaded CVs, then runs a recommendation engine that maps detected skills to career paths. Implements RESTful CRUD operations for user profiles, assessments, alerts, and college data with pagination and role-based access.",
    image: "/assets/images/common/career-clarity.png",
    tags: ["React", "Django", "PostgreSQL", "Tailwind CSS", "JWT"],
    links: [
      { label: "Live Demo", href: "https://career-clarity-three.vercel.app/" },
      { label: "GitHub", href: "https://github.com/vivekcode12345/career-clarity" },
    ],
  },
  {
    title: "FoodXpress",
    subtitle: "Food Delivery Management System",
    desc: "Engineered a secure full-stack monolith featuring JWT authentication with separate middleware for two user roles, a normalized MySQL schema spanning six tables with foreign-key constraints, and RESTful CRUD endpoints for restaurants, menus, orders, and payments. The backend follows an MVC architecture with six controller modules and supports a six-stage order lifecycle from placement to delivery. Deployed on Render.",
    image: "/assets/images/common/foodxpress.png",
    tags: ["Node.js", "Express.js", "MySQL", "JWT", "HTML/CSS"],
    links: [
      { label: "Live Demo", href: "https://foodxpress-platform.onrender.com" },
      { label: "GitHub", href: "https://github.com/vivekcode12345/foodxpress-platform" },
    ],
  },
];

export default function Projects() {
  return (
    <section className="projects" id="projects">
      <div className="sectionHeader">
        <p className="sectionKicker">04. PROJECTS</p>
        <h2 className="sectionTitle">Projects</h2>
        <p className="sectionSub">
          A selection of builds showcasing full-stack development, cloud architecture, and motion design.
        </p>
      </div>

      <div className="projectsGrid">
        {PROJECTS.map((p) => (
          <article className="projectCard" key={p.title}>
            <div className="projectMedia">
              <img src={p.image} alt={p.title} loading="lazy" />
              <div className="projectMediaOverlay" />
            </div>

            <div className="projectBody">
              <h3 className="projectTitle">{p.title}</h3>
              <p className="projectSubtitle">{p.subtitle}</p>
              <p className="projectDesc">{p.desc}</p>

              <div className="projectTags">
                {p.tags.map((t) => (
                  <span className="tag" key={t}>
                    {t}
                  </span>
                ))}
              </div>

              <div className="projectFooter">
                <a className="projectLink" href={p.links[0].href} target="_blank" rel="noreferrer">
                  ↗ Live Demo
                </a>
                <a className="projectLink" href={p.links[1].href} target="_blank" rel="noreferrer">
                  {"</>"} GitHub
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}