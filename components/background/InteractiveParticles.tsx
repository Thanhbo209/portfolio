"use client";

import { useEffect, useRef } from "react";

// Grid spacing in CSS px — 24-36px is the requested range; 32 sits mid-range,
// dense enough to feel like a field of dots without looking noisy.
const GRID_SPACING = 32;
// How far (CSS px) the cursor's influence reaches.
const INTERACTION_RADIUS = 160;
// Per-frame interpolation factor toward the target opacity/radius - applied
// as `value += (target - value) * FADE_SPEED`, never an instant jump.
const FADE_SPEED = 0.08;
const MIN_OPACITY = 0.16;
const MAX_OPACITY = 0.75;
const MIN_RADIUS = 1.2;
const MAX_RADIUS = 2.5;
// Subtle per-frame noise added only at draw time (never written back into
// the particle's own state), so it can't accumulate or drift.
const FLICKER_AMOUNT = 0.02;
// Resize regenerates the whole grid, which is one of the few real allocations
// this component does - debounced so a window drag-resize doesn't rebuild it
// every pixel.
const RESIZE_DEBOUNCE_MS = 150;

interface Particle {
  x: number;
  y: number;
  opacity: number;
  targetOpacity: number;
  radius: number;
  targetRadius: number;
}

function createGrid(width: number, height: number): Particle[] {
  const particles: Particle[] = [];
  const cols = Math.ceil(width / GRID_SPACING) + 1;
  const rows = Math.ceil(height / GRID_SPACING) + 1;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      particles.push({
        x: col * GRID_SPACING,
        y: row * GRID_SPACING,
        opacity: MIN_OPACITY,
        targetOpacity: MIN_OPACITY,
        radius: MIN_RADIUS,
        targetRadius: MIN_RADIUS,
      });
    }
  }

  return particles;
}

export function InteractiveParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reducedMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    let reducedMotion = reducedMotionQuery.matches;

    let particles: Particle[] = [];
    let width = 0;
    let height = 0;
    // Read once per theme change (via the MutationObserver below), not once
    // per particle per frame.
    let particleColor = getParticleColor();
    // Mutated in place by the mousemove listener; the animation loop only
    // ever reads it, never allocates a new object here.
    const mouse = { x: -Infinity, y: -Infinity };

    function getParticleColor(): string {
      return getComputedStyle(document.documentElement)
        .getPropertyValue("--particle-color")
        .trim();
    }

    function resize() {
      if (!canvas || !ctx) return;
      width = window.innerWidth;
      height = window.innerHeight;
      const dpr = window.devicePixelRatio || 1;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      // setTransform (not scale) so repeated resizes don't compound the DPR
      // scale factor onto itself.
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      particles = createGrid(width, height);
    }

    let resizeTimeout: ReturnType<typeof setTimeout> | undefined;
    function handleResize() {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        resize();
        // A resize regenerates the grid; redraw immediately so a resize
        // while reduced-motion is active doesn't leave a stale/misaligned
        // frame on screen until the next real animation tick (there is none).
        startAnimation();
      }, RESIZE_DEBOUNCE_MS);
    }

    function handleMouseMove(event: MouseEvent) {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    }

    function handleMouseLeave() {
      mouse.x = -Infinity;
      mouse.y = -Infinity;
    }

    function handleReducedMotionChange(event: MediaQueryListEvent) {
      reducedMotion = event.matches;
      startAnimation();
    }

    const themeObserver = new MutationObserver(() => {
      particleColor = getParticleColor();
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    resize();
    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave, { passive: true });
    reducedMotionQuery.addEventListener("change", handleReducedMotionChange);

    let rafId: number;

    function drawStaticFrame() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = particleColor;
      for (const particle of particles) {
        ctx.globalAlpha = MIN_OPACITY;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, MIN_RADIUS, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    }

    function tick() {
      if (!ctx) return;

      for (const particle of particles) {
        const dx = particle.x - mouse.x;
        const dy = particle.y - mouse.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < INTERACTION_RADIUS) {
          // Nearer the cursor -> closer to full brightness/size, tapering
          // out linearly to the idle state at the edge of the radius.
          const proximity = 1 - distance / INTERACTION_RADIUS;
          particle.targetOpacity = MIN_OPACITY + (MAX_OPACITY - MIN_OPACITY) * proximity;
          particle.targetRadius = MIN_RADIUS + (MAX_RADIUS - MIN_RADIUS) * proximity;
        } else {
          particle.targetOpacity = MIN_OPACITY;
          particle.targetRadius = MIN_RADIUS;
        }

        particle.opacity += (particle.targetOpacity - particle.opacity) * FADE_SPEED;
        particle.radius += (particle.targetRadius - particle.radius) * FADE_SPEED;
      }

      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = particleColor;

      for (const particle of particles) {
        const isNearCursor = particle.opacity > MIN_OPACITY + 0.02;
        if (isNearCursor) {
          ctx.shadowBlur = 8;
          ctx.shadowColor = particleColor;
        } else {
          ctx.shadowBlur = 0;
        }

        const flicker = (Math.random() - 0.5) * FLICKER_AMOUNT;
        ctx.globalAlpha = Math.min(1, Math.max(0, particle.opacity + flicker));
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.shadowBlur = 0;
      ctx.globalAlpha = 1;

      rafId = requestAnimationFrame(tick);
    }

    // Single entry point for (re)starting animation, called on mount, on
    // resize, and whenever prefers-reduced-motion changes at runtime - so
    // toggling it live actually starts/stops the loop instead of just
    // flipping a flag `tick` never checks.
    function startAnimation() {
      cancelAnimationFrame(rafId);
      if (reducedMotion) {
        drawStaticFrame();
      } else {
        rafId = requestAnimationFrame(tick);
      }
    }

    startAnimation();

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(resizeTimeout);
      themeObserver.disconnect();
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      reducedMotionQuery.removeEventListener("change", handleReducedMotionChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10"
    />
  );
}
