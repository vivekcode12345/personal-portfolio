import React, { useState } from "react";
import "./TechStack.scss";

const TECH_DATA = {
    C: { slug: "c", color: "#A8B9CC" },
    "C++": { slug: "cplusplus", color: "#00599C" },
    Java: { slug: "openjdk", color: "#ED8B00" },
    Python: { slug: "python", color: "#3776AB" },
    JavaScript: { slug: "javascript", color: "#F7DF1E" },
    TypeScript: { slug: "typescript", color: "#3178C6" },
    SQL: { slug: "sqlite", color: "#003B57" },
    HTML5: { slug: "html5", color: "#E34F26" },
    CSS3: { slug: "css", color: "#663399" },
    "React.js": { slug: "react", color: "#61DAFB" },
    "Next.js": { slug: "nextdotjs", color: "#000000" },
    "Tailwind CSS": { slug: "tailwindcss", color: "#06B6D4" },
    "Node.js": { slug: "nodedotjs", color: "#5FA04E" },
    "Express.js": { slug: "express", color: "#000000" },
    "REST APIs": { slug: "fastapi", color: "#009688" },
    PostgreSQL: { slug: "postgresql", color: "#4169E1" },
    MongoDB: { slug: "mongodb", color: "#47A248" },
    MySQL: { slug: "mysql", color: "#4479A1" },
    NumPy: { slug: "numpy", color: "#013243" },
    Pandas: { slug: "pandas", color: "#150458" },
    "Scikit-learn": { slug: "scikitlearn", color: "#F7931E" },
    AWS: { color: "#232F3E", fallback: true },
    Docker: { slug: "docker", color: "#2496ED" },
    Git: { slug: "git", color: "#F05032" },
    GitHub: { slug: "github", color: "#181717" },
    Postman: { slug: "postman", color: "#FF6C37" },
    "VS Code": { color: "#007ACC", fallback: true },
    Vercel: { slug: "vercel", color: "#000000" },
};

const SECTIONS = [
    {
        label: "Languages",
        techs: ["C", "C++", "Java", "Python", "JavaScript", "TypeScript", "SQL"],
    },
    {
        label: "Frontend",
        techs: ["HTML5", "CSS3", "React.js", "Next.js", "Tailwind CSS"],
    },
    {
        label: "Backend & APIs",
        techs: ["Node.js", "Express.js", "REST APIs"],
    },
    {
        label: "Databases",
        techs: ["PostgreSQL", "MongoDB", "MySQL"],
    },
    {
        label: "AI / ML",
        techs: ["NumPy", "Pandas", "Scikit-learn"],
    },
    {
        label: "Cloud, DevOps & Tools",
        techs: ["AWS", "Docker", "Git", "GitHub", "Postman", "VS Code", "Vercel"],
    },
];

function SkillIcon({ tech, details }) {
    const [hasError, setHasError] = useState(details.fallback || false);

    if (hasError) {
        return (
            <span
                className="hs-skill-icon hs-skill-icon-fallback"
                style={{ "--brand": details.color }}
                aria-label={`${tech} icon fallback`}
            >
                {tech.charAt(0)}
            </span>
        );
    }

    return (
        <img
            className="hs-skill-icon"
            src={`https://cdn.simpleicons.org/${details.slug}/${details.color.slice(1)}`}
            alt={`${tech} icon`}
            loading="lazy"
            onError={() => setHasError(true)}
        />
    );
}

export default function TechStack() {
    return (
        <section className="hs-section" id="skills">
            <div className="hs-header">
                <h2 className="hs-title">
                    <svg className="hs-title-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="m8 7-5 5 5 5M16 7l5 5-5 5M14 4l-4 16" />
                    </svg>
                    <span>Skills &amp; <span className="hs-title-accent">Abilities</span></span>
                </h2>
            </div>

            <div className="hs-groups">
                {SECTIONS.map((section) => (
                    <div className="hs-group" key={section.label}>
                        <h3 className="hs-group-title">{section.label}</h3>
                        <ul className="hs-skill-list">
                            {section.techs.map((tech) => {
                                const details = TECH_DATA[tech];

                                return (
                                    <li
                                        className={`hs-skill-item${tech === "C" ? " hs-skill-item--c" : ""}`}
                                        key={tech}
                                        style={{ "--brand": details.color }}
                                    >
                                        <div className="icon-wrap">
                                            <SkillIcon tech={tech} details={details} />
                                        </div>
                                        <span>{tech}</span>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                ))}
            </div>
        </section>
    );
}