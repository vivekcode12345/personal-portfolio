// 

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import "./Experience.scss";

gsap.registerPlugin(ScrollTrigger);

const EDUCATION = [
  {
    date: "2024 – 2028 (Expected)",
    title: "Bachelor of Technology (B.Tech)",
    org: "SRM University AP",
    desc:
      "Computer Science and Engineering. Expected Graduation: 2028. Current CGPA: 9.62. Building strong foundations in Full Stack Development, AI/ML, Backend Engineering, Cloud Computing, System Design, and Data Structures & Algorithms.",
  },
  {
    date: "2022 – 2024",
    title: "Senior Secondary (Class XII)",
    org: "VidyaGyan School",
    desc:
      "Completed Higher Secondary Education. Percentage: 91.8%",
  },
  {
    date: "2020 – 2022",
    title: "Secondary (Class X)",
    org: "VidyaGyan School",
    desc:
      "Completed Secondary Education. Percentage: 98%",
  },
];

const EXPERIENCE = [
  {
    date: "Aug 2023 – Sep 2023",
    title: "Web Development Intern",
    org: "Bharat Intern",
    desc:
      "Developed a responsive Netflix clone using HTML, CSS, and JavaScript. Implemented UI components including navigation bar, banner section, and movie cards. Strengthened frontend development skills and understanding of project structuring.",
  },
  {
    date: "June 2022 – July 2022",
    title: "Sustainability Intern",
    org: "Blue Planet Environmental Solutions",
    desc:
      "Completed the 'Sustainability Heroes' internship under the Blue Nudge initiative. Participated in community engagement and environmental awareness activities. Gained exposure to research work, industrial visits, and sustainable development practices.",
  },
];

/**
 * @author Sisvanthkumar Sathivadivel
 * @returns Experience component that renders a vertical timeline of professional milestones. Each timeline item animates into view as the user scrolls, with a line that fills up to indicate progress through the timeline. The component uses GSAP for scroll-triggered animations, creating an engaging way to showcase career highlights and achievements.
 */
export default function Experience() {
  const sectionRef = useRef(null);
  const eduTimelineRef = useRef(null);
  const expTimelineRef = useRef(null);

  useGSAP(
    () => {
      const root = sectionRef.current;
      
      // Animate Education Timeline
      const eduTimeline = eduTimelineRef.current;
      if (eduTimeline) {
        const eduItems = gsap.utils.toArray(".tl-item", eduTimeline);
        const eduLineFill = eduTimeline.querySelector(".timeline-line-fill");

        // Initial states
        eduItems.forEach((item) => {
          const card = item.querySelector(".tl-card");
          const dot = item.querySelector(".tl-dot");

          gsap.set(card, { opacity: 0.18, y: 60, filter: "blur(10px)" });
          gsap.set(dot, { scale: 0.9, opacity: 0.55 });
        });

        // Line fill
        if (eduLineFill) {
          gsap.set(eduLineFill, { scaleY: 0, transformOrigin: "top" });
          gsap.to(eduLineFill, {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: eduTimeline,
              start: "top 60%",
              end: "bottom 60%",
              scrub: true,
            },
          });
        }

        // Activate items
        eduItems.forEach((item) => {
          const card = item.querySelector(".tl-card");
          const dot = item.querySelector(".tl-dot");

          ScrollTrigger.create({
            trigger: item,
            start: "top 55%",
            end: "bottom 45%",
            onToggle: (self) => {
              if (self.isActive) {
                gsap.to(card, {
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                  duration: 0.9,
                  ease: "power3.out",
                });
                gsap.to(dot, {
                  scale: 1,
                  opacity: 1,
                  duration: 0.4,
                  ease: "power3.out",
                });
                item.classList.add("is-active");
              } else {
                gsap.to(card, {
                  opacity: 0.18,
                  y: 60,
                  filter: "blur(10px)",
                  duration: 0.7,
                  ease: "power3.out",
                });
                gsap.to(dot, {
                  scale: 0.9,
                  opacity: 0.55,
                  duration: 0.35,
                  ease: "power3.out",
                });
                item.classList.remove("is-active");
              }
            },
          });
        });
      }

      // Animate Experience Timeline
      const expTimeline = expTimelineRef.current;
      if (expTimeline) {
        const expItems = gsap.utils.toArray(".tl-item", expTimeline);
        const expLineFill = expTimeline.querySelector(".timeline-line-fill");

        // Initial states
        expItems.forEach((item) => {
          const card = item.querySelector(".tl-card");
          const dot = item.querySelector(".tl-dot");

          gsap.set(card, { opacity: 0.18, y: 60, filter: "blur(10px)" });
          gsap.set(dot, { scale: 0.9, opacity: 0.55 });
        });

        // Line fill
        if (expLineFill) {
          gsap.set(expLineFill, { scaleY: 0, transformOrigin: "top" });
          gsap.to(expLineFill, {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: expTimeline,
              start: "top 60%",
              end: "bottom 60%",
              scrub: true,
            },
          });
        }

        // Activate items
        expItems.forEach((item) => {
          const card = item.querySelector(".tl-card");
          const dot = item.querySelector(".tl-dot");

          ScrollTrigger.create({
            trigger: item,
            start: "top 55%",
            end: "bottom 45%",
            onToggle: (self) => {
              if (self.isActive) {
                gsap.to(card, {
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                  duration: 0.9,
                  ease: "power3.out",
                });
                gsap.to(dot, {
                  scale: 1,
                  opacity: 1,
                  duration: 0.4,
                  ease: "power3.out",
                });
                item.classList.add("is-active");
              } else {
                gsap.to(card, {
                  opacity: 0.18,
                  y: 60,
                  filter: "blur(10px)",
                  duration: 0.7,
                  ease: "power3.out",
                });
                gsap.to(dot, {
                  scale: 0.9,
                  opacity: 0.55,
                  duration: 0.35,
                  ease: "power3.out",
                });
                item.classList.remove("is-active");
              }
            },
          });
        });
      }
      
      ScrollTrigger.refresh();
    },
    { scope: sectionRef }
  );

  return (
    <section className="journey" ref={sectionRef} id="timeline">
      {/* Hero heading like your video */}
      <div className="journey-hero">
        <p className="journey-kicker">02. JOURNEY</p>
        <h2 className="journey-title">Professional Path</h2>
        <p className="journey-sub">
          A timeline of key milestones—education, internships, and projects
          focused on building scalable web platforms.
        </p>
      </div>

      {/* Education Timeline */}
      <div className="timeline-section">
        <div className="timeline-heading">
          <h3 className="timeline-section-title">📚 EDUCATION</h3>
        </div>
        <div className="timeline">
          <div className="timeline-line">
            <span className="timeline-line-bg" />
            <span className="timeline-line-fill" />
          </div>

          {EDUCATION.map((t, i) => {
            const side = i % 2 === 0 ? "left" : "right";
            return (
              <div className={`tl-item ${side}`} key={`edu-${t.date}-${i}`}>
                <div className="tl-side tl-left">
                  {side === "left" ? (
                    <article className="tl-card">
                      <div className="tl-date">{t.date}</div>
                      <h3 className="tl-h">{t.title}</h3>
                      <div className="tl-org">{t.org}</div>
                      <p className="tl-desc">{t.desc}</p>
                    </article>
                  ) : null}
                </div>

                <div className="tl-center">
                  <span className="tl-dot" aria-hidden="true" />
                </div>

                <div className="tl-side tl-right">
                  {side === "right" ? (
                    <article className="tl-card">
                      <div className="tl-date">{t.date}</div>
                      <h3 className="tl-h">{t.title}</h3>
                      <div className="tl-org">{t.org}</div>
                      <p className="tl-desc">{t.desc}</p>
                    </article>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Experience Timeline */}
      <div className="timeline-section">
        <div className="timeline-heading">
          <h3 className="timeline-section-title">💼 EXPERIENCE</h3>
        </div>
        <div className="timeline">
          <div className="timeline-line">
            <span className="timeline-line-bg" />
            <span className="timeline-line-fill" />
          </div>

          {EXPERIENCE.map((t, i) => {
            const side = i % 2 === 0 ? "left" : "right";
            return (
              <div className={`tl-item ${side}`} key={`exp-${t.date}-${i}`}>
                <div className="tl-side tl-left">
                  {side === "left" ? (
                    <article className="tl-card">
                      <div className="tl-date">{t.date}</div>
                      <h3 className="tl-h">{t.title}</h3>
                      <div className="tl-org">{t.org}</div>
                      <p className="tl-desc">{t.desc}</p>
                    </article>
                  ) : null}
                </div>

                <div className="tl-center">
                  <span className="tl-dot" aria-hidden="true" />
                </div>

                <div className="tl-side tl-right">
                  {side === "right" ? (
                    <article className="tl-card">
                      <div className="tl-date">{t.date}</div>
                      <h3 className="tl-h">{t.title}</h3>
                      <div className="tl-org">{t.org}</div>
                      <p className="tl-desc">{t.desc}</p>
                    </article>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
