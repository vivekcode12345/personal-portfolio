import React, { useRef } from "react";
import "./WhoAmi.scss";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import SplitType from "split-type";
import { tagline, tags } from "../../constants/aboutmeConstants";

gsap.registerPlugin(ScrollTrigger);

/**
 * About Me section with a scroll-triggered word animation powered by GSAP,
 * ScrollTrigger, and SplitType.
 */
const WhoAmI = () => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const tagsRef = useRef(null);

  useGSAP(() => {
    const root = sectionRef.current;
    const p = textRef.current;
    const tagsContainer = tagsRef.current;
    if (!root || !p) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Tags entrance animation
    if (tagsContainer && !prefersReducedMotion) {
      const tagElements = tagsContainer.querySelectorAll(".whoami-tag");
      gsap.set(tagElements, { opacity: 0, y: 20 });
      
      gsap.to(tagElements, {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.3,
      });
    }

    // SplitType word animation
    const split = new SplitType(p, {
      types: "words",
      wordClass: "whoami-word",
      tagName: "span",
    });

    // Force initial state RIGHT NOW
    if (!prefersReducedMotion) {
      gsap.set(split.words, { opacity: 0.15, yPercent: 20 });
    }

    const tween = gsap.to(split.words, {
      opacity: 1,
      yPercent: 0,
      stagger: 0.02,
      ease: "none",
      scrollTrigger: {
        trigger: root,
        start: "top 70%",
        end: "bottom 40%",
        scrub: true,
        invalidateOnRefresh: true,
      },
    });

    const img = root.querySelector("img");
    const refresh = () => ScrollTrigger.refresh();

    requestAnimationFrame(refresh);
    img?.addEventListener("load", refresh, { once: true });

    return () => {
      img?.removeEventListener("load", refresh);
      tween.scrollTrigger?.kill();
      tween.kill();
      split.revert();
    };
  }, { scope: sectionRef });


  return (
    <section className="whoami-section" id="aboutMe">
      <div className="whoami-content " ref={sectionRef}>
        <div className="whoami-inner">
          <div className="whoami-text">
            <h1 className="whoami-heading">
              <svg className="whoami-heading-icon" viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="12" cy="8" r="3.5" />
                <path d="M5.5 20c.7-3.5 3-5.5 6.5-5.5s5.8 2 6.5 5.5" />
              </svg>
              <span>About </span><span className="whoami-heading-accent">Me</span>
            </h1>
            <p className="whoami-tagline">{tagline}</p>
            <div className="whoami-tags" ref={tagsRef}>
              {tags.map((tag, index) => (
                <span key={index} className="whoami-tag">{tag}</span>
              ))}
            </div>
            <p className="split" ref={textRef}>
              I am Vivek Verma, a B.Tech Computer Science student at SRM University AP with a CGPA of 9.64. I build scalable web applications and AI-powered solutions across Full Stack Development, AI/ML, and System Design.
            </p>
            <div className="whoami-info-grid" aria-label="About Vivek Verma">
              <div className="whoami-info-item">
                <strong>Degree</strong>
                <span>B.Tech CSE · 2024–2028</span>
              </div>
              <div className="whoami-info-item">
                <strong>CGPA</strong>
                <span>9.64 / 10.0 · SRM University AP</span>
              </div>
              <div className="whoami-info-item">
                <strong>Focus</strong>
                <span>Full-Stack Development, AI/ML, System Design</span>
              </div>
              <div className="whoami-info-item">
                <strong>Experience</strong>
                <span>3 internships · Web, Sustainability, ML Research</span>
              </div>
            </div>
            <div className="whoami-actions">
              <a className="download-button" href="/assets/files/vivek_verma_resume.pdf" target="_blank" rel="noopener noreferrer">
                View Resume
              </a>
              <a className="whoami-download-button" href="/assets/files/vivek_verma_resume.pdf" download="vivek_verma_resume.pdf">
                Download
              </a>
            </div>
          </div>
          <div className="whoami-image-wrap">
            <img
              src="/assets/images/common/caricature.png"
              alt="Illustrated portrait of Vivek Verma"
              className="whoami-image"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoAmI;
