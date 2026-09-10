import React, { useEffect, useRef } from 'react';

/**
 * Poisson process for random lightning strikes
 * Returns intervals distributed according to Poisson distribution
 */
function generatePoissonInterval(lambda: number): number {
  const u = Math.random();
  return -Math.log(u) / lambda;
}

/**
 * Two-scale autoregressive lightning path generation
 * Creates realistic branching lightning with two levels of detail
 */
function generateLightningPath(
  startX: number,
  startY: number,
  endX: number,
  endY: number,
  scale: number = 1,
  branches: Array<{ x: number; y: number; points: Array<[number, number]> }> = []
): Array<[number, number]> {
  const points: Array<[number, number]> = [[startX, startY]];
  const dx = endX - startX;
  const dy = endY - startY;
  const distance = Math.sqrt(dx * dx + dy * dy);
  const steps = Math.ceil(distance / (4 * scale));

  // First scale: main path with broad curves
  const mainPathPoints: Array<[number, number]> = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    let x = startX + dx * t;
    let y = startY + dy * t;

    // Add randomness perpendicular to the line
    const perpX = -dy / distance;
    const perpY = dx / distance;
    const offset = Math.sin(t * Math.PI) * distance * 0.1 * (Math.random() - 0.5) * scale;
    x += perpX * offset;
    y += perpY * offset;

    mainPathPoints.push([x, y]);
  }

  // Second scale: add finer detail to main path
  const detailedPath: Array<[number, number]> = [];
  for (let i = 0; i < mainPathPoints.length - 1; i++) {
    const [x1, y1] = mainPathPoints[i];
    const [x2, y2] = mainPathPoints[i + 1];

    detailedPath.push([x1, y1]);

    // Add sub-segments with finer noise
    const numSubSteps = 2;
    for (let j = 1; j < numSubSteps; j++) {
      const t = j / numSubSteps;
      let x = x1 + (x2 - x1) * t;
      let y = y1 + (y2 - y1) * t;

      // Finer detail perturbations
      const perturbX = (Math.random() - 0.5) * 8 * scale;
      const perturbY = (Math.random() - 0.5) * 8 * scale;
      x += perturbX;
      y += perturbY;

      detailedPath.push([x, y]);
    }
  }
  detailedPath.push(mainPathPoints[mainPathPoints.length - 1]);

  // Generate branches (downwards from random points on main path)
  if (scale > 0.3) {
    const branchCount = Math.floor(3 + Math.random() * 4);
    for (let b = 0; b < branchCount; b++) {
      const branchPointIdx = Math.floor(Math.random() * (detailedPath.length * 0.7));
      if (branchPointIdx >= 0 && branchPointIdx < detailedPath.length) {
        const [bx, by] = detailedPath[branchPointIdx];

        // Branch goes downward with some randomness
        const branchLength = distance * (0.3 + Math.random() * 0.4);
        const branchAngle = Math.PI / 2 + (Math.random() - 0.5) * 0.6; // Mostly downward
        const branchEndX = bx + Math.cos(branchAngle) * branchLength;
        const branchEndY = by + Math.sin(branchAngle) * branchLength;

        const branchPath = generateLightningPath(
          bx,
          by,
          branchEndX,
          branchEndY,
          scale * 0.5,
          branches
        );

        branches.push({
          x: bx,
          y: by,
          points: branchPath,
        });
      }
    }
  }

  return detailedPath;
}

interface LightningStrike {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  mainPath: Array<[number, number]>;
  branches: Array<{ x: number; y: number; points: Array<[number, number]> }>;
  intensity: number; // 0-1, fades out
  createdAt: number;
}

export default function LightningBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const strikeRef = useRef<LightningStrike | null>(null);
  const timeRef = useRef<number>(0);
  const nextStrikeRef = useRef<number>(0);
  const lambdaRef = useRef<number>(0.3); // Poisson parameter (strikes per second)

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Animation loop
    let animationId: number;
    let lastTime = Date.now();

    const animate = () => {
      const now = Date.now();
      const deltaTime = (now - lastTime) / 1000;
      lastTime = now;

      timeRef.current += deltaTime;

      // Clear canvas with semi-transparent dark background
      ctx.fillStyle = 'rgba(13, 10, 6, 0)'; // Transparent, preserves previous frame slightly
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Check if we should generate a new strike
      if (timeRef.current >= nextStrikeRef.current) {
        const startX = Math.random() * canvas.width;
        const startY = -10;
        const endX = Math.random() * canvas.width;
        const endY = canvas.height + 10;

        const branches: Array<{ x: number; y: number; points: Array<[number, number]> }> = [];
        const mainPath = generateLightningPath(startX, startY, endX, endY, 1, branches);

        strikeRef.current = {
          startX,
          startY,
          endX,
          endY,
          mainPath,
          branches,
          intensity: 1,
          createdAt: timeRef.current,
        };

        // Schedule next strike using Poisson distribution
        nextStrikeRef.current = timeRef.current + generatePoissonInterval(lambdaRef.current);
      }

      // Draw and animate current strike
      if (strikeRef.current) {
        const strike = strikeRef.current;
        const age = timeRef.current - strike.createdAt;
        const flashDuration = 0.15; // Duration of the flash in seconds

        if (age < flashDuration) {
          // Flash phase
          strike.intensity = 1 - age / flashDuration;

          // Draw glow (blue outer glow)
          const glowOpacity = strike.intensity * 0.4;
          ctx.strokeStyle = `rgba(100, 150, 255, ${glowOpacity})`;
          ctx.lineWidth = 8;
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';

          // Draw main path glow
          ctx.beginPath();
          ctx.moveTo(strike.mainPath[0][0], strike.mainPath[0][1]);
          for (const [x, y] of strike.mainPath) {
            ctx.lineTo(x, y);
          }
          ctx.stroke();

          // Draw branch glows
          for (const branch of strike.branches) {
            ctx.beginPath();
            ctx.moveTo(branch.points[0][0], branch.points[0][1]);
            for (const [x, y] of branch.points) {
              ctx.lineTo(x, y);
            }
            ctx.stroke();
          }

          // Draw core (white bright bolt)
          const coreOpacity = strike.intensity * 0.9;
          ctx.strokeStyle = `rgba(255, 255, 255, ${coreOpacity})`;
          ctx.lineWidth = 2;

          // Draw main path core
          ctx.beginPath();
          ctx.moveTo(strike.mainPath[0][0], strike.mainPath[0][1]);
          for (const [x, y] of strike.mainPath) {
            ctx.lineTo(x, y);
          }
          ctx.stroke();

          // Draw branch cores
          for (const branch of strike.branches) {
            ctx.beginPath();
            ctx.moveTo(branch.points[0][0], branch.points[0][1]);
            for (const [x, y] of branch.points) {
              ctx.lineTo(x, y);
            }
            ctx.stroke();
          }

          // Optional: Add a bright core flicker
          if (Math.random() > 0.7) {
            ctx.strokeStyle = `rgba(255, 255, 255, ${coreOpacity * 1.2})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(strike.mainPath[0][0], strike.mainPath[0][1]);
            for (const [x, y] of strike.mainPath) {
              ctx.lineTo(x, y);
            }
            ctx.stroke();
          }
        } else {
          // Fade out completely
          strikeRef.current = null;
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        zIndex: 1,
      }}
    />
  );
}
