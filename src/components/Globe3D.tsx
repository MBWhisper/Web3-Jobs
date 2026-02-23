import { useEffect, useRef } from 'react';

export function Globe3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth * 2;
      canvas.height = canvas.offsetHeight * 2;
      ctx.scale(2, 2);
    };
    resize();
    window.addEventListener('resize', resize);

    let rotation = 0;
    let animationId: number;

    const drawGlobe = () => {
      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;
      const centerX = width / 2;
      const centerY = height / 2;
      const radius = Math.min(width, height) * 0.35;

      ctx.clearRect(0, 0, width, height);

      // Draw outer glow
      const gradient = ctx.createRadialGradient(centerX, centerY, radius * 0.8, centerX, centerY, radius * 1.5);
      gradient.addColorStop(0, 'rgba(255, 20, 147, 0.3)');
      gradient.addColorStop(0.5, 'rgba(255, 20, 147, 0.1)');
      gradient.addColorStop(1, 'transparent');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Draw sphere
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255, 20, 147, 0.8)';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw latitude lines
      for (let i = 1; i < 5; i++) {
        const latRadius = radius * Math.sin((i / 5) * Math.PI);
        const latY = centerY - radius * Math.cos((i / 5) * Math.PI);
        
        ctx.beginPath();
        ctx.ellipse(centerX, latY, latRadius, latRadius * 0.3, 0, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 20, 147, ${0.3 + i * 0.1})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.beginPath();
        ctx.ellipse(centerX, centerY + (centerY - latY), latRadius, latRadius * 0.3, 0, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 20, 147, ${0.3 + i * 0.1})`;
        ctx.stroke();
      }

      // Draw longitude lines (rotating)
      for (let i = 0; i < 12; i++) {
        const angle = ((i / 12) * Math.PI * 2 + rotation) % (Math.PI * 2);
        const x = centerX + Math.cos(angle) * radius;
        
        ctx.beginPath();
        ctx.ellipse(centerX + (x - centerX) * 0.3, centerY, radius * 0.15, radius, angle > Math.PI / 2 && angle < Math.PI * 1.5 ? Math.PI : 0, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 20, 147, ${0.2 + Math.sin(angle) * 0.3})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Draw inner sphere glow
      const innerGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
      innerGradient.addColorStop(0, 'rgba(255, 20, 147, 0.2)');
      innerGradient.addColorStop(0.7, 'rgba(255, 20, 147, 0.05)');
      innerGradient.addColorStop(1, 'transparent');
      ctx.fillStyle = innerGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.fill();

      rotation += 0.005;
      animationId = requestAnimationFrame(drawGlobe);
    };

    drawGlobe();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ imageRendering: 'crisp-edges' }}
    />
  );
}
