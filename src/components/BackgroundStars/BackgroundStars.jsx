import { useEffect, useRef } from "react";
import "./BackgroundStars.scss";

export default function BackgroundStars() {
  const canvasRef = useRef(null);
  const frameCountRef = useRef(0);
  const debugOverlayRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const nodes = [];
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isLowPower = (navigator.hardwareConcurrency || 8) <= 4;

    // DEBUG: Checks #3 and #4
    console.log('[BGStars] INIT - hardwareConcurrency:', navigator.hardwareConcurrency, 'isLowPower:', isLowPower);
    console.log('[BGStars] INIT - prefersReducedMotion:', prefersReducedMotion);
    console.log('[BGStars] INIT - nodeCount will be:', prefersReducedMotion ? 42 : isLowPower ? 56 : 78);
    const nodeCount = prefersReducedMotion ? 42 : isLowPower ? 56 : 78;
    const targetFrameTime = prefersReducedMotion ? 1000 / 24 : 1000 / 40;
    const connectionDistance = 150;

    // Pointer-reactive tuning
    const repelRadius = 140;
    const constellationRadius = 220;
    const maxDisplacement = 24;
    const repelStrength = 0.35;
    const springStiffness = 0.05;
    const velocityDamping = 0.9;

    let width = 0;
    let height = 0;
    let rafId = 0;
    let isRunning = true;
    let lastTime = 0;
    const pointer = { x: null, y: null };
    const primaryColor = getComputedStyle(document.documentElement)
      .getPropertyValue("--primary")
      .trim() || "#362FDB";

    let prevWidth = 0;
    let prevHeight = 0;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      width = rect.width;
      height = rect.height;

      // Reinitialize nodes if size changed from zero to non-zero (first layout)
      if ((prevWidth === 0 || prevHeight === 0) && width > 0 && height > 0) {
        console.log('[BGStars] reinitializing nodes, size changed from', prevWidth, 'x', prevHeight, 'to', width, 'x', height);
        initializeNodes();
      }
      prevWidth = width;
      prevHeight = height;

      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const makeNode = () => {
      const x = Math.random() * width;
      const y = Math.random() * height;
      return {
        x,
        y,
        baseX: x,
        baseY: y,
        vx: 0,
        vy: 0,
        radius: Math.random() * 1.2 + 1.5,
        alpha: Math.random() * 0.15 + 0.25,
        driftX: (Math.random() - 0.5) * 0.3,
        driftY: (Math.random() - 0.5) * 0.3,
      };
    };

    const initializeNodes = () => {
      nodes.length = 0;
      for (let i = 0; i < nodeCount; i += 1) {
        nodes.push(makeNode());
      }
    };

    const draw = (timestamp) => {
      // DEBUG: Check #1 - Is RAF loop rescheduling?
      frameCountRef.current += 1;
      if (frameCountRef.current <= 10 || frameCountRef.current % 60 === 0) {
        console.log('[BGStars] frame:', frameCountRef.current, 'isRunning:', isRunning, 'rafId:', rafId, 'prefersReducedMotion:', prefersReducedMotion);
      }

      if (!isRunning) {
        console.log('[BGStars] NOT RUNNING - loop stopped at frame', frameCountRef.current);
        return;
      }

      if (timestamp - lastTime < targetFrameTime) {
        rafId = requestAnimationFrame(draw);
        return;
      }

      lastTime = timestamp;
      ctx.clearRect(0, 0, width, height);

      // DEBUG: Check #5 - Is baseX actually changing?
      if (frameCountRef.current % 60 === 0 && nodes.length > 0) {
        console.log('[BGStars] nodes[0] baseX:', nodes[0].baseX.toFixed(4), 'x:', nodes[0].x.toFixed(4), 'driftX:', nodes[0].driftX.toFixed(6), 'width:', width, 'height:', height);
      }

      // Update visible debug overlay with blinking indicator
      if (debugOverlayRef.current) {
        const isMoving = nodes.length > 0 && Math.abs(nodes[0].baseX - nodes[0].x) > 0.001;
        debugOverlayRef.current.style.background = frameCountRef.current % 2 === 0 ? 'rgba(0,128,0,0.8)' : 'rgba(0,0,128,0.8)';
        debugOverlayRef.current.textContent =
          `frames: ${frameCountRef.current} | baseX: ${nodes.length > 0 ? nodes[0].baseX.toFixed(2) : 'N/A'} | x: ${nodes.length > 0 ? nodes[0].x.toFixed(2) : 'N/A'} | driftX: ${nodes.length > 0 ? nodes[0].driftX.toFixed(4) : 'N/A'} | reduced: ${prefersReducedMotion} | ${width}x${height}`;
      }

      // Update node positions: idle drift + pointer repel + spring-back
      for (let i = 0; i < nodes.length; i += 1) {
        const node = nodes[i];

        if (!prefersReducedMotion) {
          node.baseX += node.driftX;
          node.baseY += node.driftY;

          // Wrap around edges for smooth continuous drift
          if (node.baseX < -10) node.baseX = width + 10;
          else if (node.baseX > width + 10) node.baseX = -10;
          if (node.baseY < -10) node.baseY = height + 10;
          else if (node.baseY > height + 10) node.baseY = -10;
        }

        if (!prefersReducedMotion && pointer.x !== null && pointer.y !== null) {
          const dx = node.x - pointer.x;
          const dy = node.y - pointer.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < repelRadius && dist > 0) {
            const force = (1 - dist / repelRadius) * repelStrength;
            node.vx += (dx / dist) * force;
            node.vy += (dy / dist) * force;
          }
        }

        node.vx += (node.baseX - node.x) * springStiffness;
        node.vy += (node.baseY - node.y) * springStiffness;
        node.vx *= velocityDamping;
        node.vy *= velocityDamping;
        node.x += node.vx;
        node.y += node.vy;

        const dispX = node.x - node.baseX;
        const dispY = node.y - node.baseY;
        const disp = Math.sqrt(dispX * dispX + dispY * dispY);
        if (disp > maxDisplacement) {
          node.x = node.baseX + (dispX / disp) * maxDisplacement;
          node.y = node.baseY + (dispY / disp) * maxDisplacement;
        }
      }

      // Ambient node-to-node connections
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
            ctx.globalAlpha = (1 - distance / connectionDistance) * 0.18;
            ctx.moveTo(first.x, first.y);
            ctx.lineTo(second.x, second.y);
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      for (let i = 0; i < nodes.length; i += 1) {
        const node = nodes[i];
        ctx.beginPath();
        ctx.fillStyle = primaryColor;
        ctx.globalAlpha = node.alpha;
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // Constellation-on-cursor effect
      if (!prefersReducedMotion && pointer.x !== null && pointer.y !== null) {
        const closest = [];
        for (let i = 0; i < nodes.length; i += 1) {
          const node = nodes[i];
          const dx = node.x - pointer.x;
          const dy = node.y - pointer.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < constellationRadius) {
            closest.push({ node, dist });
          }
        }

        closest.sort((a, b) => a.dist - b.dist);
        const cluster = closest.slice(0, 5);

        for (let i = 0; i < cluster.length; i += 1) {
          const { node, dist } = cluster[i];
          const lineAlpha = (1 - dist / constellationRadius) * 0.25;
          ctx.beginPath();
          ctx.strokeStyle = primaryColor;
          ctx.globalAlpha = lineAlpha;
          ctx.lineWidth = 0.8;
          ctx.moveTo(pointer.x, pointer.y);
          ctx.lineTo(node.x, node.y);
          ctx.stroke();
        }

        for (let i = 0; i < cluster.length; i += 1) {
          const { node, dist } = cluster[i];
          const boost = (1 - dist / constellationRadius) * 0.4 + 1;
          ctx.beginPath();
          ctx.fillStyle = primaryColor;
          ctx.globalAlpha = node.alpha * 1.8;
          ctx.arc(node.x, node.y, node.radius * boost, 0, Math.PI * 2);
          ctx.fill();
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

    const onPointerMove = (e) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
    };

    const onPointerLeave = () => {
      pointer.x = null;
      pointer.y = null;
    };

    resize();
    console.log('[BGStars] after resize: width =', width, 'height =', height);
    initializeNodes();
    rafId = requestAnimationFrame(draw);

    const parent = canvas.parentElement;
    let resizeObserver = null;
    if (parent && typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(() => resize());
      resizeObserver.observe(parent);
    }
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVisibilityChange);
    window.addEventListener("mousemove", onPointerMove);
    document.addEventListener("mouseleave", onPointerLeave);

    return () => {
      isRunning = false;
      cancelAnimationFrame(rafId);
      if (resizeObserver) resizeObserver.disconnect();
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("mousemove", onPointerMove);
      document.removeEventListener("mouseleave", onPointerLeave);
    };
  }, []);

  return (
    <>
      <canvas className="stars-background" ref={canvasRef} aria-hidden="true" />
      <div
        ref={debugOverlayRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          background: 'rgba(0,0,0,0.7)',
          color: '#0f0',
          fontFamily: 'monospace',
          fontSize: '11px',
          padding: '4px 8px',
          zIndex: 9999,
          pointerEvents: 'none',
          whiteSpace: 'nowrap',
        }}
      />
    </>
  );
}
