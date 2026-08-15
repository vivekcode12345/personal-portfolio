import { useEffect, useRef } from "react";
import "./BackgroundStars.scss";

export default function BackgroundStars() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const stars = [];
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isLowPower = (navigator.hardwareConcurrency || 8) <= 4;
    const starCount = prefersReducedMotion ? 60 : isLowPower ? 95 : 130;
    const targetFrameTime = prefersReducedMotion ? 1000 / 24 : 1000 / 40;

    let width = 0;
    let height = 0;
    let centerX = 0;
    let centerY = 0;
    let rafId = 0;
    let isRunning = true;
    let lastTime = 0;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      centerX = width / 2;
      centerY = height / 2;

      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const makeStar = () => ({
      x: (Math.random() - 0.5) * width,
      y: (Math.random() - 0.5) * height,
      z: Math.random() * width,
      size: Math.random() * 1.8 + 0.8,
      alpha: Math.random() * 0.7 + 0.2,
      speed: Math.random() * 0.8 + 0.25,
      driftX: (Math.random() - 0.5) * 0.32,
      driftY: (Math.random() - 0.5) * 0.32,
      phase: Math.random() * Math.PI * 2,
    });

    const initializeStars = () => {
      stars.length = 0;
      for (let i = 0; i < starCount; i += 1) {
        stars.push(makeStar());
      }
    };

    const draw = (timestamp) => {
      if (!isRunning) return;

      if (timestamp - lastTime < targetFrameTime) {
        rafId = requestAnimationFrame(draw);
        return;
      }

      const time = timestamp * 0.0007;
      lastTime = timestamp;
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < stars.length; i += 1) {
        const star = stars[i];
        star.z -= star.speed;
        star.x += star.driftX * 0.2;
        star.y += star.driftY * 0.2;

        if (star.z <= 0) {
          Object.assign(star, makeStar());
          star.z = width;
        }

        const k = 620 / star.z;
        const parallaxX = Math.sin(time + star.phase) * 18 * (1.2 - star.z / width);
        const parallaxY = Math.cos(time * 1.15 + star.phase) * 16 * (1.2 - star.z / width);
        const x = star.x * k + centerX + parallaxX;
        const y = star.y * k + centerY + parallaxY;
        const radius = star.size * k * (0.85 + Math.sin(time * 2 + star.phase) * 0.2);

        if (x < 0 || x > width || y < 0 || y > height) {
          Object.assign(star, makeStar());
          star.z = width;
          continue;
        }

        const glow = 10 + (1.2 - star.z / width) * 18;
        const twinkle = 0.7 + (Math.sin(time * 3 + star.phase) + 1) * 0.15;
        ctx.beginPath();
        ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha * twinkle})`;
        if (star.z < width * 0.72) {
          ctx.shadowColor = "rgba(164, 194, 255, 0.8)";
          ctx.shadowBlur = glow;
        } else {
          ctx.shadowBlur = 0;
        }
        ctx.arc(x, y, Math.max(radius, 0.8), 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.shadowBlur = 0;
      rafId = requestAnimationFrame(draw);
    };

    const onVisibilityChange = () => {
      if (document.hidden) {
        isRunning = false;
        cancelAnimationFrame(rafId);
      } else {
        isRunning = true;
        lastTime = 0;
        rafId = requestAnimationFrame(draw);
      }
    };

    resize();
    initializeStars();
    rafId = requestAnimationFrame(draw);

    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      isRunning = false;
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  return <canvas className="stars-background" ref={canvasRef} aria-hidden="true" />;
}
