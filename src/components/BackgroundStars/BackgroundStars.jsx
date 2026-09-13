import { useEffect, useRef } from "react";
import "./BackgroundStars.scss";

export default function BackgroundStars() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const nodes = [];
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isLowPower = (navigator.hardwareConcurrency || 8) <= 4;
    const nodeCount = prefersReducedMotion ? 42 : isLowPower ? 56 : 78;
    const targetFrameTime = prefersReducedMotion ? 1000 / 24 : 1000 / 40;
    const connectionDistance = 150;

    let width = 0;
    let height = 0;
    let rafId = 0;
    let isRunning = true;
    let lastTime = 0;
    const primaryColor = getComputedStyle(document.documentElement)
      .getPropertyValue("--primary")
      .trim() || "#362FDB";

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;

      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const makeNode = () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 0.8 + 0.7,
      alpha: Math.random() * 0.04 + 0.04,
      driftX: (Math.random() - 0.5) * 0.08,
      driftY: (Math.random() - 0.5) * 0.08,
    });

    const initializeNodes = () => {
      nodes.length = 0;
      for (let i = 0; i < nodeCount; i += 1) {
        nodes.push(makeNode());
      }
    };

    const draw = (timestamp) => {
      if (!isRunning) return;

      if (timestamp - lastTime < targetFrameTime) {
        rafId = requestAnimationFrame(draw);
        return;
      }

      lastTime = timestamp;
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < nodes.length; i += 1) {
        const node = nodes[i];

        if (!prefersReducedMotion) {
          node.x += node.driftX;
          node.y += node.driftY;

          if (node.x < -10 || node.x > width + 10) node.driftX *= -1;
          if (node.y < -10 || node.y > height + 10) node.driftY *= -1;
        }

        ctx.beginPath();
        ctx.fillStyle = primaryColor;
        ctx.globalAlpha = node.alpha;
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      ctx.strokeStyle = primaryColor;
      ctx.lineWidth = 0.7;

      for (let i = 0; i < nodes.length; i += 1) {
        for (let j = i + 1; j < nodes.length; j += 1) {
          const first = nodes[i];
          const second = nodes[j];
          const distanceX = first.x - second.x;
          const distanceY = first.y - second.y;
          const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

          if (distance < connectionDistance) {
            ctx.beginPath();
            ctx.globalAlpha = (1 - distance / connectionDistance) * 0.05;
            ctx.moveTo(first.x, first.y);
            ctx.lineTo(second.x, second.y);
            ctx.stroke();
          }
        }
      }

      ctx.globalAlpha = 1;
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
    initializeNodes();
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
