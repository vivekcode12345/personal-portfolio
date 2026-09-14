import React, { useEffect, useRef, useState } from "react";
import "./Hero.scss";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { scrollIndicator } from "../../constants/landingPageConstants";
import { email } from "../../constants/contactConstants";

gsap.registerPlugin(ScrollTrigger);

const roles = ["Full-Stack Development", "AI/ML", "AI Automation Engineering"];

/**
 * @author Vivek Verma
 * @returns Hero component that serves as the landing section of the portfolio website. It features a zoom-out animation on the hero title and tagline as the user scrolls down. The animation is responsive, with different scaling factors and scroll distances for mobile, tablet, and desktop screens. The component uses GSAP for scroll-triggered animations, creating an engaging introduction to the portfolio.
 */
const Hero = () => {
  const heroRef = useRef(null);
  const zoomRef = useRef(null);
  const visualRef = useRef(null);
  const stRef = useRef(null);
  const [roleIndex, setRoleIndex] = useState(0);
  const [typedRole, setTypedRole] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    const isComplete = typedRole === currentRole;
    const isEmpty = typedRole === "";
    const delay = isComplete ? 1600 : isEmpty && isDeleting ? 400 : isDeleting ? 45 : 85;

    const timer = window.setTimeout(() => {
      if (!isDeleting && isComplete) {
        setIsDeleting(true);
        return;
      }

      if (isDeleting && isEmpty) {
        setIsDeleting(false);
        setRoleIndex((currentIndex) => (currentIndex + 1) % roles.length);
        return;
      }

      setTypedRole((currentText) => currentText.slice(0, -1));
      if (!isDeleting) setTypedRole(currentRole.slice(0, typedRole.length + 1));
    }, delay);

    return () => window.clearTimeout(timer);
  }, [isDeleting, roleIndex, typedRole]);

  const scrollToSection = (id) => (e) => {
    if (e) e.preventDefault();

    const el = document.getElementById(id);
    if (!el) return;

    try {
      window.history.pushState(null, "", `#${id}`);
    } catch {
      window.location.hash = id;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    gsap.to(window, {
      duration: prefersReducedMotion ? 0 : 1,
      ease: prefersReducedMotion ? "none" : "power3.out",
      scrollTo: { y: el, offsetY: 96 },
    });
  };

  useGSAP(() => {
    const heroEl = heroRef.current;
    const zoomEl = zoomRef.current;
    const visualEl = visualRef.current;
    if (!heroEl || !zoomEl) return;

    const mm = gsap.matchMedia();

    mm.add(
      {
        mobile: "(max-width: 767px)",
        tablet: "(min-width: 768px) and (max-width: 1023px)",
        desktop: "(min-width: 1024px)",
        reduce: "(prefers-reduced-motion: reduce)",
        short: "(max-height: 650px)",
      },
      (ctx) => {
        const { mobile, tablet, reduce, short } = ctx.conditions;

        if (reduce) {
          gsap.set(zoomEl, { clearProps: "transform,opacity" });
          if (visualEl) gsap.set(visualEl, { clearProps: "transform,opacity" });
          return;
        }

        // Entrance animation
        const entranceTl = gsap.timeline({ defaults: { ease: "power3.out" } });

        entranceTl
          .from(".hero-title", {
            y: 60,
            opacity: 0,
            duration: 1.2,
          })
          .from(".hero-sub", {
            y: 40,
            opacity: 0,
            duration: 1,
          }, "-=0.8")
          .from(".hero-tagline", {
            y: 30,
            opacity: 0,
            duration: 1,
          }, "-=0.6")
          .from(".hero-buttons", {
            y: 20,
            opacity: 0,
            duration: 0.8,
          }, "-=0.5")
          .from(".hero-visual", {
            x: 40,
            opacity: 0,
            duration: 1,
          }, "-=0.9")
          .from(".scroll-down-indicator", {
            opacity: 0,
            duration: 0.8,
          }, "-=0.3");

        // tune these per screen so it feels consistent
        const scaleTo = mobile ? 6 : tablet ? 8 : 10;
        const endDist = short ? "+=55%" : mobile ? "+=70%" : "+=80%";

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: heroEl,
            start: "top top",
            end: endDist,
            scrub: 1.2,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            id: "heroPin",
          },
        });

        // make sure we start clean when switching breakpoints
        gsap.set(zoomEl, { scale: 1, opacity: 1, force3D: true });
        if (visualEl) gsap.set(visualEl, { scale: 1, opacity: 1, force3D: true });

        tl.to(zoomEl, { scale: scaleTo, opacity: 0 }, 0).to(visualEl, { scale: 1.25, opacity: 0 }, 0);

        stRef.current = tl.scrollTrigger;
        return () => {
          tl.scrollTrigger?.kill();
          tl.kill();
        };
      }
    );

    return () => mm.revert();
  }, []);


  return (
    <section className="hero" id="home" ref={heroRef}>
      <div className="hero-overlay" />
      <div className="hero-content">
        <div ref={zoomRef} className="hero-zoom">
          <h1 className="hero-title">
            <span className="hero-title-greeting">Hi There,</span>
            <span className="hero-title-name">I'm Vivek <span className="hero-title-accent">Verma</span></span>
          </h1>
          <div className="hero-tagline" aria-live="polite">
            <span>i am into </span>
            <span className="hero-typed-role">{typedRole}</span>
            <span className="hero-cursor" aria-hidden="true">|</span>
          </div>
          <div className="hero-buttons">
            <a
              className="about-button"
              href="#aboutMe"
              onClick={scrollToSection("aboutMe")}
            >
              About Me
              <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M8 2v11M4 9l4 4 4-4" /></svg>
            </a>
            <a className="view-projects-button" href="#projects" onClick={scrollToSection("projects")}>
              View Projects
              <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M5.5 4 2.5 8l3 4M10.5 4l3 4-3 4M9 3.5 7 12.5" /></svg>
            </a>
          </div>
          <div className="hero-socials" aria-label="Social profiles">
            <a href="https://www.linkedin.com/in/vivekcode12345/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 8.5V18M6 5.5v.01M10 18v-5.2a3 3 0 0 1 6 0V18M10 10v8" /></svg>
            </a>
            <a href="https://github.com/vivekcode12345" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 19c-4 .9-4-2-5-2m10 4v-3.5c0-1 .1-1.4-.5-2 1.8-.2 3.5-.9 3.5-4a3 3 0 0 0-.8-2.2A2.8 2.8 0 0 0 16 7s-.7-1.2-3 0a8 8 0 0 0-4 0C6.7 5.8 6 7 6 7a2.8 2.8 0 0 0-.2 2.3A3 3 0 0 0 5 12c0 3.1 1.7 3.8 3.5 4-.6.5-.6 1.1-.5 2V21" /></svg>
            </a>
            <a href="https://github.com/vivekcode12345" target="_blank" rel="noopener noreferrer" aria-label="Coding profile">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m8 7-5 5 5 5M16 7l5 5-5 5M14 4l-4 16" /></svg>
            </a>
            <a href={`mailto:${email}`} aria-label="Email Vivek Verma">
              <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 7 8 6 8-6" /></svg>
            </a>
          </div>
          <div className="scroll-down-indicator">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M4 8l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <p>{scrollIndicator}</p>
          </div>
        </div>

        <div ref={visualRef} className="hero-visual" aria-label="Vivek Verma portrait" role="img">
          <div className="hero-photo-frame">
            <img src="/assets/images/hero-photo.png" alt="Illustrated portrait of Vivek Verma" className="hero-photo" />
            <div className="hero-role-badge">Full-Stack · AI/ML</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;