import React from "react";
import Education from "../Education/Education";
import Experience from "../Experience/Experience";

/**
 * Journey – Renders the intro block and both Education and Experience
 * timelines as two always-visible, stacked sections.
 *
 * No toggle state. No tabs. Both lists render at once.
 */
export default function Journey() {
  return (
    <section className="journey" id="timeline">
      {/* Intro block — description appears once, at the very top */}
      <div className="journey-hero">
        <p className="journey-sub">
          A timeline of key milestones—education, internships, and projects
          focused on building scalable web platforms.
        </p>
      </div>

      {/* Education block */}
      <h2 className="journey-dynamic-heading">
        My <span className="accent">Education</span>
      </h2>
      <Education />

      {/* Experience block */}
      <h2 className="journey-dynamic-heading">
        My <span className="accent">Experience</span>
      </h2>
      <Experience />
    </section>
  );
}