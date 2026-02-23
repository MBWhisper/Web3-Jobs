import { useEffect, useRef } from 'react';

export function GridWave() {
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

    let time = 0;
    let animationId: number;

    const drawWave = () => {
      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;

      ctx.clearRect(0, 0, width, height);

      const gridSize = 20;
      const cols = Math.ceil(width / gridSize) + 2;
      const rows = Math.ceil(height / gridSize) + 2;

      // Draw grid points with wave effect
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * gridSize;
          const y = j * gridSize;
          
          // Calculate wave offset
          const waveX = Math.sin((i + time) * 0.1) * 10;
          const waveY = Math.cos((j + time) * 0.1) * 10;
          const finalX = x + waveX;
          const finalY = y + waveY;

          // Calculate opacity based on position and wave
          const distanceFromCenter = Math.sqrt(
            Math.pow((finalX - width / 2) / (width / 2), 2) + 
            Math.pow((finalY - height / 2) / (height / 2), 2)
          );
          const opacity = Math.max(0, 0.6 - distanceFromCenter * 0.5);

          // Draw point
          ctx.beginPath();
          ctx.arc(finalX, finalY, 1.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 20, 147, ${opacity})`;
          ctx.fill();

          // Draw connections to neighbors
          if (i < cols - 1) {
            const nextWaveX = Math.sin((i + 1 + time) * 0.1) * 10;
            const nextX = (i + 1) * gridSize + nextWaveX;
            const nextWaveY = Math.cos((j + time) * 0.1) * 10;
            const nextY = j * gridSize + nextWaveY;
            
            ctx.beginPath();
            ctx.moveTo(finalX, finalY);
            ctx.lineTo(nextX, nextY);
            ctx.strokeStyle = `rgba(255, 20, 147, ${opacity * 0.3})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }

          if (j < rows - 1) {
            const nextWaveX = Math.sin((i + time) * 0.1) * 10;
            const nextX = i * gridSize + nextWaveX;
            const nextWaveY = Math.cos((j + 1 + time) * 0.1) * 10;
            const nextY = (j + 1) * gridSize + nextWaveY;
            
            ctx.beginPath();
            ctx.moveTo(finalX, finalY);
            ctx.lineTo(nextX, nextY);
            ctx.strokeStyle = `rgba(255, 20, 147, ${opacity * 0.3})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      time += 0.02;
      animationId = requestAnimationFrame(drawWave);
    };

    drawWave();

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
