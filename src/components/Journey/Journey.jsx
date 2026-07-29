import React from "react";
import Education from "../Education/Education";
import Experience from "../Experience/Experience";

/**
 * Journey – Parent component that renders the hero heading
 * and composes both Education and Experience timelines.
 *
 * Strictly presentational at this level.
 * No refs. No GSAP. No timeline data.
 */
export default function Journey() {
  return (
    <section className="journey" id="timeline">
      {/* Hero heading like your video */}
      <div className="journey-hero">
        <p className="journey-kicker">02. JOURNEY</p>
        <h2 className="journey-title">Professional Path</h2>
        <p className="journey-sub">
          A timeline of key milestones—education, internships, and projects
          focused on building scalable web platforms.
        </p>
      </div>

      {/* Education Timeline */}
      <Education />

      {/* Experience Timeline */}
      <Experience />
    </section>
  );
}