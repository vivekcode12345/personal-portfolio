import React, { useRef } from "react";
import TimelineSection from "../Journey/TimelineSection";
import useTimelineAnimation from "../Journey/useTimelineAnimation";
import { EXPERIENCE } from "./experienceData";
import "./Experience.scss";

/**
 * Experience timeline – owns its own ref and animation hook.
 * No props required. Completely independent from Education.
 */
const Experience = () => {
  const timelineRef = useRef(null);

  useTimelineAnimation(timelineRef);

  return (
    <TimelineSection ref={timelineRef} items={EXPERIENCE} />
  );
};

export default Experience;