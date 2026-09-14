import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

/**
 * Scroll handler matching the Navbar's goTo behaviour.
 * Returns an onClick handler that smooth-scrolls to the section
 * (offset for the sticky navbar) and updates the URL hash.
 *
 * Usage: <a href="#home" onClick={scrollToSection("home")}>
 */
export const scrollToSection = (id) => (e) => {
  if (e) e.preventDefault();

  const el = document.getElementById(id);
  if (!el) return;

  try {
    window.history.pushState(null, "", `#${id}`);
  } catch {
    window.location.hash = id;
  }

  ScrollTrigger.refresh();

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  gsap.to(window, {
    duration: prefersReducedMotion ? 0 : 1,
    ease: prefersReducedMotion ? "none" : "power3.out",
    scrollTo: { y: el, offsetY: 96 },
  });
};
