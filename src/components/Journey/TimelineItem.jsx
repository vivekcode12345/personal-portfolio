import React from "react";
import { useTiltHover } from "../../hooks/useTiltHover";

/**
 * Reusable timeline item component
 * @param {Object} item - Timeline item data
 * @param {number} index - Item index for stable item identity
 */
const TimelineItem = ({ item, index }) => {
  const tiltRef = useTiltHover({ max: 5, scale: 1.015, liftY: -4 });
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

  return (
    <div className="tl-item" key={`${item.date}-${index}`}>
      <article
        ref={tiltRef}
        className={cardClassName}
      >
        <div className="card-spotlight" />
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