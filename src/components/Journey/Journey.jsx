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
        <h2 className="journey-title">
          <svg className="journey-title-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="m3 9 9-5 9 5-9 5-9-5Z" />
            <path d="M7 11.2V15c2.8 2.4 7.2 2.4 10 0v-3.8M21 10v5" />
          </svg>
          <span>Professional <span className="journey-title-accent">Path</span></span>
        </h2>
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