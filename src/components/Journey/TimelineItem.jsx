import React, { useRef } from "react";
import gsap from "gsap";

/**
 * Reusable timeline item component
 * @param {Object} item - Timeline item data
 * @param {number} index - Item index for stable item identity
 */
const TimelineItem = ({ item, index }) => {
  const cardRef = useRef(null);
  const cardClassName = `tl-card${item.image ? " has-photo" : ""}`;

  const renderPhoto = () => item.image ? (
    <div className="tl-photo-wrap">
      <img src={item.image} alt={item.title} className="tl-photo" />
    </div>
  ) : null;

  const renderDescription = () => {
    const highlights = item.highlights || [];

    if (!highlights.length) {
      return <p className="tl-desc">{item.desc}</p>;
    }

    const sortedHighlights = [...highlights].sort((a, b) => b.length - a.length);
    const escaped = sortedHighlights.map((value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
    const pattern = new RegExp(`(${escaped.join("|")})`, "gi");
    const formatted = item.desc.replace(pattern, "<mark>$1</mark>");

    return <p className="tl-desc" dangerouslySetInnerHTML={{ __html: formatted }} />;
  };

  // ── Hover lift via GSAP (to override inline styles from scroll animation) ──
  const handleEnter = () => {
    gsap.to(cardRef.current, {
      y: -6,
      boxShadow: "0 24px 60px rgba(18,19,26,0.12)",
      background: "var(--surface)",
      duration: 0.25,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  const handleLeave = () => {
    gsap.to(cardRef.current, {
      y: 0,
      boxShadow: "0 1px 2px rgba(18,19,26,0.04)",
      background: "var(--surface-2)",
      duration: 0.25,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  return (
    <div className="tl-item" key={`${item.date}-${index}`}>
      <article
        ref={cardRef}
        className={cardClassName}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
      >
        {renderPhoto()}
        <div className="tl-card-content">
          <h3 className="tl-h">{item.title}</h3>
          <div className="tl-org">{item.org}</div>
          <div className="tl-date">{item.date}</div>
          {renderDescription()}
        </div>
      </article>

      <div className="tl-center">
        <span className="tl-dot" aria-hidden="true" />
      </div>
    </div>
  );
};

export default TimelineItem;