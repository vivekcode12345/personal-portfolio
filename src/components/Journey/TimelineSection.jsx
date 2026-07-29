import React, { forwardRef } from "react";
import TimelineItem from "./TimelineItem";

/**
 * Reusable timeline section. Pure presentational – no refs, no animations.
 * @param {Object}   props
 * @param {string}   props.title   – Section heading ("📚 EDUCATION" / "💼 EXPERIENCE")
 * @param {Array}    props.items   – Timeline data array
 * @param {React.Ref} ref          – Forwarded ref attached to .timeline container
 */
const TimelineSection = forwardRef(({ title, items }, ref) => {
  return (
    <div className="timeline-section">
      <div className="timeline-heading">
        <h3 className="timeline-section-title">{title}</h3>
      </div>
      <div className="timeline" ref={ref}>
        <div className="timeline-line">
          <span className="timeline-line-bg" />
          <span className="timeline-line-fill" />
        </div>
        {items.map((item, index) => (
          <TimelineItem key={index} item={item} index={index} />
        ))}
      </div>
    </div>
  );
});

TimelineSection.displayName = "TimelineSection";

export default TimelineSection;