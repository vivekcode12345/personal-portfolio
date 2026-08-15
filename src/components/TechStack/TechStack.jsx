import React from "react";
import "./TechStack.scss";

const iconPath = (filename) => `/assets/images/tech-icons/${encodeURIComponent(filename)}`;

const TECH_ICONS = {
    C: iconPath("C.svg"),
    "C++": iconPath("C++.svg"),
    Java: iconPath("Java.svg"),
    Python: iconPath("Python.svg"),
    JavaScript: iconPath("JavaScript.svg"),
    TypeScript: iconPath("TypeScript.svg"),
    SQL: iconPath("PostgresSQL.svg"),
    "HTML5": iconPath("HTML5.svg"),
    "CSS3": iconPath("CSS3.svg"),
    "React.js": iconPath("React.svg"),
    "Next.js": iconPath("Next.js.svg"),
    "Tailwind CSS": iconPath("Tailwind CSS.svg"),
    "Node.js": iconPath("Node.js.svg"),
    "Express.js": iconPath("Express.svg"),
    "REST APIs": iconPath("Node.js.svg"),
    PostgreSQL: iconPath("PostgresSQL.svg"),
    MongoDB: iconPath("MongoDB.svg"),
    MySQL: iconPath("MySQL.svg"),
    NumPy: iconPath("NumPy.svg"),
    Pandas: iconPath("Pandas.svg"),
    "Scikit-learn": iconPath("scikit-learn.svg"),
    AWS: iconPath("AWS.svg"),
    Docker: iconPath("Docker.svg"),
    Git: iconPath("Git.svg"),
    GitHub: iconPath("GitHub.svg"),
    Postman: iconPath("Postman.svg"),
    "VS Code": iconPath("Visual Studio Code (VS Code).svg"),
    Vercel: iconPath("Vercel.svg"),
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

export default function TechStack() {
    return (
        <section className="hs-section" id="skills">
            <div className="hs-header">
                <p className="hs-kicker">03. TECHNICAL SKILLS</p>
                <h2 className="hs-title">TECH STACK</h2>
            </div>

            <div className="hs-groups">
                {SECTIONS.map((section) => (
                    <div className="hs-group" key={section.label}>
                        <h3 className="hs-group-title">{section.label}</h3>
                        <ul className="hs-skill-list">
                            {section.techs.map((tech) => (
                                <li className="hs-skill-item" key={tech}>
                                    <img
                                        className="hs-skill-icon"
                                        src={TECH_ICONS[tech]}
                                        alt={`${tech} icon`}
                                        loading="lazy"
                                    />
                                    <span>{tech}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </section>
    );
}
