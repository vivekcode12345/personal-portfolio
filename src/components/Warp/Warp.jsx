import { useEffect, useRef } from "react";
import "./Warp.scss";

/**
 * Creates a cinematic canvas-based warp-speed starfield animation with
 * keyboard, mouse, and touch interactions.
 *
 * Visual direction: deep-space / digital warp atmosphere with subtle
 * warm-orange (#c46b1f) accents to match the portfolio theme.
 */
export default function WarpSpeed() {
    const canvasRef = useRef(null);
    const rafRef = useRef(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d", { alpha: true });
        if (!ctx) return;

        // ── Performance / device detection ──
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const isMobile = window.innerWidth <= 640;
        const isLowPower = (navigator.hardwareConcurrency || 8) <= 4;
        const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
        const targetFrameTime = prefersReducedMotion ? 1000 / 20 : 1000 / 32;

        // ── Constants ──
        const STAR_COUNT = prefersReducedMotion ? 0 : isMobile ? 45 : isLowPower ? 70 : 95;
        const ACCENT = { r: 196, g: 107, b: 31 }; // #c46b1f
        const MAX_WARP = 1;
        const WARP_EASE = 0.04;      // progressive warp transition
        const INERTIA = 0.92;        // smooth x/y easing
        const BASE_SPEED = 0.02;
        const WARP_SPEED = 0.045;

        let w = 0;
        let h = 0;
        let isRunning = true;
        let lastFrameTime = 0;

        const resize = () => {
            w = window.innerWidth;
            h = window.innerHeight;
            canvas.width = w * dpr;
            canvas.height = h * dpr;
            canvas.style.width = `${w}px`;
            canvas.style.height = `${h}px`;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        };
        resize();

        // ── State ──
        let xMod = 0;
        let yMod = 0;
        let targetX = 0;
        let targetY = 0;
        let warpSpeed = 0;
        let targetWarp = 0;

        // ── Star factory ──
        function Star() {
            // Natural distribution: more stars near center, fewer at edges
            const angle = Math.random() * Math.PI * 2;
            const radius = Math.sqrt(Math.random()) * Math.max(w, h) * 0.6;
            this.x = w / 2 + Math.cos(angle) * radius;
            this.y = h / 2 + Math.sin(angle) * radius;
            this.c = 0;
            this.size = 0.5 + Math.random() * 1.5;      // varied star sizes
            this.opacity = 0.3 + Math.random() * 0.7;   // varied brightness
            this.speed = 0.7 + Math.random() * 0.6;     // varied movement speed
            this.depth = 0.3 + Math.random() * 0.7;     // depth factor for parallax
        }

        Star.prototype.updateColor = function () {
            this.c = Math.min(255, this.c + 5);
        };

        Star.prototype.updatePos = function () {
            const speedMult = (warpSpeed > 0.1 ? WARP_SPEED : BASE_SPEED) * this.speed * this.depth;

            const cx = w / 2;
            const cy = h / 2;

            this.x += xMod * this.depth + (this.x - cx) * speedMult;
            this.y += yMod * this.depth + (this.y - cy) * speedMult;

            this.updateColor();

            if (this.x > w || this.x < 0 || this.y > h || this.y < 0) {
                // Respawn near center for natural flow
                const angle = Math.random() * Math.PI * 2;
                const radius = Math.random() * Math.min(w, h) * 0.3;
                this.x = w / 2 + Math.cos(angle) * radius;
                this.y = h / 2 + Math.sin(angle) * radius;
                this.c = 0;
            }
        };

        const stars = Array.from({ length: STAR_COUNT }, () => new Star());

        // ── Input handlers ──
        const onKeyDown = (e) => {
            const code = e.keyCode || e.which;

            switch (code) {
                case 32: // space
                    targetWarp = MAX_WARP;
                    break;
                case 37: // left
                    targetX = Math.min(6, targetX + 0.3);
                    break;
                case 38: // up
                    targetY = Math.min(6, targetY + 0.3);
                    break;
                case 39: // right
                    targetX = Math.max(-6, targetX - 0.3);
                    break;
                case 40: // down
                    targetY = Math.max(-6, targetY - 0.3);
                    break;
                default:
                    return;
            }
            e.preventDefault();
        };

        const onKeyUp = (e) => {
            const code = e.keyCode || e.which;

            switch (code) {
                case 32:
                    targetWarp = 0;
                    break;
                case 37:
                case 39:
                    targetX = 0;
                    break;
                case 38:
                case 40:
                    targetY = 0;
                    break;
                default:
                    return;
            }
            e.preventDefault();
        };

        const onMouseDown = (e) => {
            if (e.button !== 0) return;
            targetWarp = MAX_WARP;
        };

        const onMouseUp = (e) => {
            if (e.button !== 0) return;
            targetWarp = 0;
        };

        const onTouchStart = (e) => {
            e.preventDefault();
            targetWarp = MAX_WARP;
        };
        const onTouchEnd = () => {
            targetWarp = 0;
        };

        // ── Draw loop ──
        const draw = (timestamp) => {
            if (!isRunning) return;

            if (timestamp - lastFrameTime < targetFrameTime) {
                rafRef.current = requestAnimationFrame(draw);
                return;
            }
            lastFrameTime = timestamp;

            // Smooth warp transition (progressive, not instant)
            warpSpeed += (targetWarp - warpSpeed) * WARP_EASE;
            if (Math.abs(warpSpeed - targetWarp) < 0.01) warpSpeed = targetWarp;

            // Smooth inertia for x/y movement
            xMod += (targetX - xMod) * INERTIA;
            yMod += (targetY - yMod) * INERTIA;

            // Fade trail
            ctx.fillStyle = "rgba(0,0,0,0.18)";
            ctx.fillRect(0, 0, w, h);

            for (let i = 0; i < stars.length; i++) {
                const s = stars[i];
                const c = s.c;

                // Color: warm orange in warp, soft white/gray in normal
                if (warpSpeed > 0.1) {
                    const orangeMix = Math.min(1, warpSpeed);
                    const r = Math.floor(255 * orangeMix + c * (1 - orangeMix));
                    const g = Math.floor(ACCENT.g * orangeMix + c * 0.45 * (1 - orangeMix));
                    const b = Math.floor(ACCENT.b * orangeMix * 0.5);
                    ctx.fillStyle = `rgba(${r},${g},${b},${s.opacity})`;
                } else {
                    const gray = Math.floor(c * 0.8);
                    ctx.fillStyle = `rgba(${gray},${gray},${gray},${s.opacity * 0.7})`;
                }

                // Draw as soft circles for natural look
                const size = (c / 128) * s.size;
                ctx.beginPath();
                ctx.arc(s.x, s.y, size, 0, Math.PI * 2);
                ctx.fill();

                s.updatePos();
            }

            rafRef.current = requestAnimationFrame(draw);
        };

        const onVisibilityChange = () => {
            if (document.hidden) {
                isRunning = false;
                cancelAnimationFrame(rafRef.current);
            } else {
                isRunning = true;
                lastFrameTime = 0;
                rafRef.current = requestAnimationFrame(draw);
            }
        };

        // ── Start / reduced motion ──
        if (!prefersReducedMotion) {
            rafRef.current = requestAnimationFrame(draw);
        } else {
            // Static subtle background for reduced motion
            ctx.fillStyle = "rgba(0,0,0,1)";
            ctx.fillRect(0, 0, w, h);
            for (let i = 0; i < stars.length; i++) {
                const s = stars[i];
                ctx.fillStyle = `rgba(255,255,255,${s.opacity * 0.3})`;
                ctx.beginPath();
                ctx.arc(s.x, s.y, s.size * 0.5, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        // ── Event listeners ──
        window.addEventListener("resize", resize);
        window.addEventListener("keydown", onKeyDown, { passive: false });
        window.addEventListener("keyup", onKeyUp, { passive: false });
        canvas.addEventListener("mousedown", onMouseDown);
        window.addEventListener("mouseup", onMouseUp);
        canvas.addEventListener("touchstart", onTouchStart, { passive: false });
        canvas.addEventListener("touchend", onTouchEnd);
        document.addEventListener("visibilitychange", onVisibilityChange);

        // ── Cleanup ──
        return () => {
            isRunning = false;
            cancelAnimationFrame(rafRef.current);
            window.removeEventListener("resize", resize);
            window.removeEventListener("keydown", onKeyDown);
            window.removeEventListener("keyup", onKeyUp);
            canvas.removeEventListener("mousedown", onMouseDown);
            window.removeEventListener("mouseup", onMouseUp);
            canvas.removeEventListener("touchstart", onTouchStart);
            canvas.removeEventListener("touchend", onTouchEnd);
            document.removeEventListener("visibilitychange", onVisibilityChange);
        };
    }, []);

    return (
        <div className="warp-wrap" aria-hidden="true">
            <canvas ref={canvasRef} className="warp-canvas" />
        </div>
    );
}