import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Custom hook that sets up GSAP scroll-triggered animations for a timeline.
 * @param {React.RefObject} timelineRef - Ref attached to the .timeline container
 */
const useTimelineAnimation = (timelineRef) => {
  useEffect(() => {
    const timeline = timelineRef.current;
    if (!timeline) return;

    const items = gsap.utils.toArray(".tl-item", timeline);
    const lineFill = timeline.querySelector(".timeline-line-fill");

    // ── Initial states ──
    items.forEach((item) => {
      const card = item.querySelector(".tl-card");
      const dot = item.querySelector(".tl-dot");

      gsap.set(card, { opacity: 0.18, y: 60, filter: "blur(10px)" });
      gsap.set(dot, { scale: 0.9, opacity: 0.55 });
    });

    // ── Line fill animation ──
    if (lineFill) {
      gsap.set(lineFill, { scaleY: 0, transformOrigin: "top" });
      gsap.to(lineFill, {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: timeline,
          start: "top 60%",
          end: "bottom 60%",
          scrub: true,
        },
      });
    }

    // ── Item activation on scroll ──
    items.forEach((item) => {
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

    ScrollTrigger.refresh();

    // ── Cleanup ──
    return () => {
      // Only kill ScrollTriggers created by this timeline
      items.forEach((item) => {
        const card = item.querySelector(".tl-card");
        const dot = item.querySelector(".tl-dot");
        
        gsap.killTweensOf(card);
        gsap.killTweensOf(dot);
      });
      
      if (lineFill) {
        gsap.killTweensOf(lineFill);
      }
    };
  }, [timelineRef]);
};

export default useTimelineAnimation;