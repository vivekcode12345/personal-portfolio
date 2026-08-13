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
    let lineTrigger = null;
    if (lineFill) {
      gsap.set(lineFill, { scaleY: 0, transformOrigin: "top" });
      lineTrigger = ScrollTrigger.create({
        trigger: timeline,
        start: "top 60%",
        end: "bottom 60%",
        scrub: true,
        onUpdate: (self) => {
          gsap.set(lineFill, { scaleY: self.progress });
        },
      });
    }

    // ── Item activation on scroll ──
    const itemTriggers = [];
    items.forEach((item) => {
      const card = item.querySelector(".tl-card");
      const dot = item.querySelector(".tl-dot");

      const st = ScrollTrigger.create({
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
      itemTriggers.push(st);
    });

    // (lineTrigger already created above)

    ScrollTrigger.refresh();

    // ── Cleanup ──
    return () => {
      // Kill ONLY the ScrollTriggers created by this timeline
      itemTriggers.forEach((st) => st.kill());
      if (lineTrigger) lineTrigger.kill();
      
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