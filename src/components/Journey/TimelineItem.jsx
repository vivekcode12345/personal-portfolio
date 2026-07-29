import React from "react";

/**
 * Reusable timeline item component
 * @param {Object} item - Timeline item data
 * @param {number} index - Item index for alternating layout
 */
const TimelineItem = ({ item, index }) => {
  const side = index % 2 === 0 ? "left" : "right";

  return (
    <div className={`tl-item ${side}`} key={`${item.date}-${index}`}>
      <div className="tl-side tl-left">
        {side === "left" ? (
          <article className="tl-card">
            <div className="tl-date">{item.date}</div>
            <h3 className="tl-h">{item.title}</h3>
            <div className="tl-org">{item.org}</div>
            <p className="tl-desc">{item.desc}</p>
          </article>
        ) : null}
      </div>

      <div className="tl-center">
        <span className="tl-dot" aria-hidden="true" />
      </div>

      <div className="tl-side tl-right">
        {side === "right" ? (
          <article className="tl-card">
            <div className="tl-date">{item.date}</div>
            <h3 className="tl-h">{item.title}</h3>
            <div className="tl-org">{item.org}</div>
            <p className="tl-desc">{item.desc}</p>
          </article>
        ) : null}
      </div>
    </div>
  );
};

export default TimelineItem;