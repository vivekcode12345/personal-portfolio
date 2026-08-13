import { useEffect, useRef } from "react";
import gsap from "gsap";
import "./Cursor.scss";

export default function Cursor() {
  const dotRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    if (!dotRef.current || !glowRef.current) return;

    // ── Device detection ──
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const hasHoverSupport = window.matchMedia("(hover: hover)").matches;

    // Disable custom cursor on touch-only devices or reduced motion
    if (!hasHoverSupport || prefersReducedMotion) {
      gsap.set([dotRef.current, glowRef.current], { opacity: 0 });
      return;
    }

    // Center both cursor elements on pointer
    gsap.set([dotRef.current, glowRef.current], {
      xPercent: -50,
      yPercent: -50,
      opacity: 1,
      willChange: "transform, opacity",
    });

    // ── Fast dot movement ──
    const moveDotX = gsap.quickTo(dotRef.current, "x", {
      duration: 0.12,
      ease: "power3.out",
    });
    const moveDotY = gsap.quickTo(dotRef.current, "y", {
      duration: 0.12,
      ease: "power3.out",
    });

    // ── Slow, laggy glow movement ──
    const moveGlowX = gsap.quickTo(glowRef.current, "x", {
      duration: 0.6,
      ease: "power3.out",
    });
    const moveGlowY = gsap.quickTo(glowRef.current, "y", {
      duration: 0.6,
      ease: "power3.out",
    });

    // ── Interactive element detection ──
    const isInteractive = (el) => {
      if (!el) return false;
      const tag = el.tagName?.toLowerCase();
      return (
        tag === "a" ||
        tag === "button" ||
        tag === "input" ||
        tag === "textarea" ||
        tag === "select" ||
        el.getAttribute("role") === "button"
      );
    };

    // ── State ──
    let isVisible = true;
    let isInteractiveHover = false;

    const showCursor = () => {
      if (isVisible) return;
      isVisible = true;
      gsap.to([dotRef.current, glowRef.current], {
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const hideCursor = () => {
      if (!isVisible) return;
      isVisible = false;
      gsap.to([dotRef.current, glowRef.current], {
        opacity: 0,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const setInteractive = (active) => {
      if (isInteractiveHover === active) return;
      isInteractiveHover = active;

      gsap.to(dotRef.current, {
        scale: active ? 1.6 : 1,
        duration: 0.25,
        ease: "power3.out",
      });

      gsap.to(glowRef.current, {
        opacity: active ? 0.5 : 0.25,
        scale: active ? 1.2 : 1,
        duration: 0.35,
        ease: "power3.out",
      });
    };

    // ── Event handlers ──
    const handleMove = (e) => {
      if (!isVisible) showCursor();

      moveDotX(e.clientX);
      moveDotY(e.clientY);

      moveGlowX(e.clientX);
      moveGlowY(e.clientY);

      // Detect interactive element under cursor
      const el = document.elementFromPoint(e.clientX, e.clientY);
      setInteractive(isInteractive(el));
    };

    const handleLeave = () => {
      // Only hide when the pointer genuinely leaves the viewport.
      // Do NOT hide during scroll operations.
      if (document.visibilityState === "visible") {
        hideCursor();
        setInteractive(false);
      }
    };

    const handleEnter = () => {
      showCursor();
    };

    // ── Listeners ──
    window.addEventListener("mousemove", handleMove, { passive: true });
    document.addEventListener("mouseleave", handleLeave);
    document.addEventListener("mouseenter", handleEnter);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseleave", handleLeave);
      document.removeEventListener("mouseenter", handleEnter);
    };
  }, []);

  return (
    <>
      <div ref={glowRef} className="cursor-glow" />
      <div ref={dotRef} className="cursor-dot" />
    </>
  );
}