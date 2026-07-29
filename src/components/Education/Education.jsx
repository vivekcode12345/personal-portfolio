import React, { useRef } from "react";
import TimelineSection from "../Journey/TimelineSection";
import useTimelineAnimation from "../Journey/useTimelineAnimation";
import { EDUCATION } from "./educationData";
import "./Education.scss";

/**
 * Education timeline – owns its own ref and animation hook.
 * No props required. Completely independent.
 */
const Education = () => {
  const timelineRef = useRef(null);

  useTimelineAnimation(timelineRef);

  return (
    <TimelineSection
      ref={timelineRef}
      title="📚 EDUCATION"
      items={EDUCATION}
    />
  );
};

export default Education;