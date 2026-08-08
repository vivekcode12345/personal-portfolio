import React, { useRef } from "react";
import "./WhoAmi.scss";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import SplitType from "split-type";
import { aboutmeDescription, tagline, tags } from "../../constants/aboutmeConstants";

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
      <h1 className="whoami-sub-heading">01. About Me</h1>
      <div className="whoami-content " ref={sectionRef}>
        <div className="whoami-inner">
          <div className="whoami-text">
            <p className="whoami-tagline">{tagline}</p>
            <div className="whoami-tags" ref={tagsRef}>
              {tags.map((tag, index) => (
                <span key={index} className="whoami-tag">{tag}</span>
              ))}
            </div>
            <p className="split" ref={textRef}>
              {aboutmeDescription}
            </p>
          </div>
          <img
            src="/assets/images/common/caricature.png"
            alt="Illustrated portrait of Vivek Verma"
            className="whoami-image"
          />
        </div>
      </div>
    </section>
  );
};

export default WhoAmI;
