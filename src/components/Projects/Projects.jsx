import React from "react";
import { useTiltHover } from "../../hooks/useTiltHover";
import "./Projects.scss";

const PROJECTS = [
  {
    title: "DealDrop",
    subtitle: "Automated Price-Drop Monitoring Platform",
    desc: "Automated price-monitoring platform built on Next.js 16 (App Router) and React 19 that tracks product links, scrapes live listings with Firecrawl, and stores users, products, and price history in Supabase through the @supabase/ssr client/server split. A scheduled API route (app/api/cron/check_prices) re-checks tracked products and fires real-time email drop alerts via Resend, while Recharts renders the price-trend charts and server actions handle mutations behind Supabase session middleware. Ships a shadcn/ui + Tailwind CSS v4 interface with dark-mode theming, route-level auth callbacks, and Sonner toast feedback.",
    image: "/assets/images/common/dealdrop.png",
    tags: ["Next.js", "Supabase", "Firecrawl", "Tailwind CSS"],
    links: [
      { label: "GitHub", href: "https://github.com/vivekcode12345/DealDrop" },
    ],
  },

  {
    title: "AI Article Summarizer",
    subtitle: "Gemini-Powered Chrome Extension",
    desc: "Manifest V3 Chrome extension that extracts readable text from any web page and streams AI summaries straight from the browser toolbar in three modes: brief, detailed, or 5-7 bullet takeaways. Falls back through semantic elements, common content containers, and paragraph-density heuristics for extraction, then dispatches through a pluggable provider layer for Gemini, OpenAI, and Anthropic with live token streaming, word count, and one-click copy. Persists history and favorites in chrome.storage, triggers from a Ctrl+Shift+S / Cmd+Shift+S global shortcut, and requires no build step.",
    image: "/assets/images/common/ai-article-summarizer.png",
    tags: ["JavaScript", "Chrome Extension", "Gemini API", "Manifest V3"],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/vivekcode12345/gemini-chrome-article-summarizer",
      },
    ],
  },

  {
    title: "ReviewRank",
    subtitle: "Review-Volume Ranking Browser Extension",
    desc: "Manifest V3 Chrome extension that reads the live search-results DOM on Amazon, Flipkart, Meesho, and Myntra through per-site adapters, deduplicates and validates every product, then re-ranks them by customer review volume inside a tab-specific Chrome Side Panel. Adds Min/Max budget filtering in rupees, sponsored-result detection, conservative category-relevance filtering, Price Insights, and 4-per-page results with Previous/Next navigation plus Load More and next-page analysis without leaving the tab. Ships 11 node test suites covering extraction, validation, relevance, sponsored detection, pagination, Price Insights, and Side Panel state.",
    image: "/assets/images/common/review-rank.png",
    tags: ["JavaScript", "Chrome Extension", "Manifest V3", "Chrome Side Panel"],
    links: [
      { label: "GitHub", href: "https://github.com/vivekcode12345/reviewrank" },
    ],
  },

  {
    title: "CareerClarity",
    subtitle: "AI-Powered Career Guidance Platform",
    desc: "Full-stack platform pairing a React frontend with a Django REST API and PostgreSQL database, secured by JWT authentication and Google OAuth. Uses EasyOCR and spaCy to extract skills from uploaded CVs, then runs a recommendation engine that maps detected skills to career paths. Implements RESTful CRUD operations for user profiles, assessments, alerts, and college data with pagination and role-based access.",
    image: "/assets/images/common/career-clarity.png",
    tags: ["React", "PostgreSQL", "Tailwind CSS"],
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
    tags: ["Node.js", "Express.js", "MySQL", "HTML5", "CSS3"],
    links: [
      { label: "Live Demo", href: "https://foodxpress-platform.onrender.com" },
      { label: "GitHub", href: "https://github.com/vivekcode12345/foodxpress-platform" },
    ],
  },
  {
    title: "LearnHub LMS",
    subtitle: "Full-Stack Learning Management System",
    desc: "Architected a full-stack Learning Management System with 3 role-based access tiers, 22 backend modules, and 121 REST API endpoints using Node.js, Express, and MongoDB/Mongoose. Engineered real-time collaboration via Socket.io (37 event types) and Agora RTC SDK for video calls and messaging. Designed 21 normalized MongoDB schemas with a React 19 + Redux Toolkit frontend spanning 46 role-specific pages. Implemented JWT authentication, Google OAuth 2.0, bcrypt hashing, RBAC middleware, and Helmet security hardening.",
    image: "/assets/images/common/lms.png",
    tags: ["React.js", "Node.js", "Express.js", "MongoDB", "Socket.IO"],
    links: [
      { label: "GitHub", href: "https://github.com/vivekcode12345/learnhub-lms" },
    ],
  },
  {
    title: "Book Discovery",
    subtitle: "Google Books API Integration Platform",
    desc: "Built a React 19 + Tailwind CSS book discovery platform integrating the Google Books API to surface up to 12 search results per query. Engineered lazy-loaded book cover images, live loading-skeleton states, and an accessible book-detail modal with escape-to-close and click-outside dismissal. Curated 5 quick-pick discovery chips and implemented a responsive 2–3 column grid for an editorial-style browsing experience. Deployed to production on Vercel.",
    image: "/assets/images/common/book.png",
    tags: ["React.js", "Tailwind CSS"],
    links: [
      { label: "Live Demo", href: "https://book-discovery-one.vercel.app" },
      { label: "GitHub", href: "https://github.com/vivekcode12345/book-discovery" },
    ],
  },
];

function ProjectCard({ project, featured }) {
  const tiltRef = useTiltHover({ max: 6, scale: 1.02, liftY: -6 });
  const cardClass = `projectCard${featured ? " featured" : ""}${
    project.imageFit === "contain" ? " containMedia" : ""
  }`;

  return (
    <article
      ref={tiltRef}
      className={cardClass}
      key={project.title}
    >
      <div className="card-spotlight" />
      <div className="projectMedia">
        <img src={project.image} alt={project.title} loading="lazy" />
        <div className="projectMediaOverlay" />
      </div>

      <div className="projectBody">
        <h3 className="projectTitle">{project.title}</h3>
        <p className="projectSubtitle">{project.subtitle}</p>
        <p className="projectDesc">{project.desc}</p>

        <div className="projectTags">
          {project.tags.map((t) => (
            <span className="tag" key={t}>
              {t}
            </span>
          ))}
        </div>

        <div className="projectFooter">
          {project.links.map((link) => {
            const isLiveDemo = link.label === "Live Demo";
            return (
              <a
                key={`${project.title}-${link.label}`}
                className="projectLink"
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {isLiveDemo ? "↗ Live Demo" : "</> GitHub"}
              </a>
            );
          })}
        </div>
      </div>
    </article>
  );
}

export default function Projects() {
  return (
    <section className="projects" id="projects">
      <div className="sectionHeader">
        <h2 className="sectionTitle">Projects</h2>
        <p className="sectionSub">
          A selection of builds showcasing full-stack development, cloud architecture, and motion design.
        </p>
      </div>

      <div className="projectsGrid">
        {PROJECTS.map((p, index) => (
          <ProjectCard key={p.title} project={p} featured={index === 0} />
        ))}
      </div>
    </section>
  );
}