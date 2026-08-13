import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import "./Certifications.scss";

gsap.registerPlugin(ScrollTrigger);

const CERTIFICATIONS = [
  {
    title: "MongoDB Certified Developer, Associate",
    image: "/assets/images/certificates/mongodb-associate-developer.jpg",
    alt: "MongoDB Certified Developer, Associate (C100DEV) certification badge",
  },
  {
    title: "Dynamic Programming",
    image: "/assets/images/certificates/dynamic-programming.jpeg",
    alt: "Dynamic Programming certification",
  },
  {
    title: "Naukri Campus",
    image: "/assets/images/certificates/naukri-campus.jpg",
    alt: "Naukri Campus certification",
  },
  {
    title: "Oracle Certified Foundations Associate",
    image: "/assets/images/certificates/oracel-certified-foundations-associate.jpg",
    alt: "Oracle Certified Foundations Associate certification",
  },
];

/**
 * @author Vivek Verma
 * Certifications component that showcases professional certifications with an interactive scroll + hover experience.
 * @returns {JSX.Element} The rendered Certifications component.
 */
const Certifications = () => {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      const root = sectionRef.current;
      if (!root) return;

      const imgs = gsap.utils.toArray(".right .slide img", root);
      const cleanups = [];

      // ── 3D pointer tilt on certificate images ──
      imgs.forEach((img) => {
        gsap.set(img, {
          transformPerspective: 650,
          transformOrigin: "50% 50%",
          willChange: "transform",
        });

        const rx = gsap.quickTo(img, "rotationX", { duration: 0.25, ease: "power3.out" });
        const ry = gsap.quickTo(img, "rotationY", { duration: 0.25, ease: "power3.out" });
        const tx = gsap.quickTo(img, "x", { duration: 0.25, ease: "power3.out" });
        const ty = gsap.quickTo(img, "y", { duration: 0.25, ease: "power3.out" });

        const onMove = (e) => {
          const r = img.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width;
          const py = (e.clientY - r.top) / r.height;

          rx(gsap.utils.interpolate(15, -15, py));
          ry(gsap.utils.interpolate(-15, 15, px));
          tx(gsap.utils.interpolate(-30, 30, px));
          ty(gsap.utils.interpolate(-30, 30, py));
        };

        const onLeave = () => {
          rx(0);
          ry(0);
          tx(0);
          ty(0);
        };

        img.addEventListener("pointermove", onMove);
        img.addEventListener("pointerleave", onLeave);

        cleanups.push(() => {
          img.removeEventListener("pointermove", onMove);
          img.removeEventListener("pointerleave", onLeave);
        });
      });

      const list = root.querySelector(".certification-list");
      const fill = root.querySelector(".fill");
      if (!list) return;

      const listItems = gsap.utils.toArray("li", list);
      const slides = gsap.utils.toArray(".slide", root);

      const count = Math.min(listItems.length, slides.length);
      if (!count) return;

      // ── Initial state: first certificate visible ──
      gsap.set(slides, { autoAlpha: 0 });
      listItems.forEach((li) => li.classList.remove("active"));

      listItems[0]?.classList.add("active");
      slides[0] && gsap.set(slides[0], { autoAlpha: 1 });

      const minScale = 1 / count;
      const setFillScale = fill ? gsap.quickSetter(fill, "scaleY") : null;
      if (fill) gsap.set(fill, { transformOrigin: "top left", scaleY: minScale });

      let activeIndex = 0;

      const showIndex = (next) => {
        if (next === activeIndex) return;
        if (next < 0 || next >= count) return;

        listItems[activeIndex]?.classList.remove("active");
        listItems[next]?.classList.add("active");

        slides[activeIndex] &&
          gsap.to(slides[activeIndex], { autoAlpha: 0, duration: 0.2, overwrite: true });
        slides[next] && gsap.to(slides[next], { autoAlpha: 1, duration: 0.2, overwrite: true });

        activeIndex = next;
      };

      // ── Hover interaction: hover a list item → show its certificate ──
      listItems.forEach((li, index) => {
        const onHover = () => showIndex(index);
        const onLeave = () => {
          // Keep the last hovered certificate visible
        };

        li.addEventListener("mouseenter", onHover);
        li.addEventListener("click", onHover);
        li.addEventListener("mouseleave", onLeave);

        cleanups.push(() => {
          li.removeEventListener("mouseenter", onHover);
          li.removeEventListener("click", onHover);
          li.removeEventListener("mouseleave", onLeave);
        });
      });

      // ── Scroll-driven experience (kept for desktop) ──
      const st = ScrollTrigger.create({
        trigger: root,
        start: "top top",
        end: () => "+=" + count * 0.8 * window.innerHeight,
        pin: true,
        scrub: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate(self) {
          if (setFillScale) setFillScale(minScale + self.progress * (1 - minScale));
          showIndex(Math.round(self.progress * (count - 1)));
        },
      });

      return () => {
        cleanups.forEach((fn) => fn());
        st.kill();
      };
    },
    { scope: sectionRef }
  );

  return (
    <section className="section pin-section" id="certification" ref={sectionRef}>
      <div className="certification-header">
        <p className="sub-heading">05. CERTIFICATIONS</p>
        <h2>CERTIFICATIONS AND HONORS</h2>
        <p className="certification-description">
          Skill milestones that back up the work—verified knowledge in development, architecture, and deployment best
          practices.
        </p>
      </div>

      <div className="content">
        <ul className="certification-list">
          {CERTIFICATIONS.map((cert, index) => (
            <li key={index}>{cert.title}</li>
          ))}
        </ul>

        <div className="fill" />

        <div className="right">
          {CERTIFICATIONS.map((cert, index) => (
            <div key={index} className="slide center">
              <img src={cert.image} alt={cert.alt} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;