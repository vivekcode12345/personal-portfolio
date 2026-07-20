import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger, SplitText, ScrollSmoother } from "gsap/all";

import Cursor from "./ui/cursor/Cursor";
import Navbar from "./components/NavBar/Navbar";
import Hero from "./components/Hero/Hero";
import WhoAmI from "./components/WhoAmI/WhoAmI";
import Experience from "./components/Experience/Experience";
import Warp from "./components/Warp/Warp";
import Certifications from "./components/TechnicalCertifications/Certifications";
import TechStack from "./components/TechStack/TechStack";
import Contact from "./components/Contact/Contact";
import Projects from "./components/Projects/Projects";

gsap.registerPlugin(ScrollTrigger, SplitText, ScrollSmoother);

const App = () => {
  useEffect(() => {
  ScrollSmoother.create({
    smooth: 3,
    effects: true,
    normalizeScroll: true,
  });

  ScrollTrigger.refresh();
}, []);


  return (
    <>
      <Warp />
      <Cursor />
      <div id="smooth-wrapper">
          <Navbar />
        <div id="smooth-content">
          <Hero />
          <WhoAmI/>
          {/* <DirectionalMarquee /> */}
          <Experience />
          <TechStack/>
          <Projects />
          <Certifications />
          <Contact />
        </div>
      </div>
    </>
  );
};

export default App;