import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from './ThemeContext';

const MAX_TRAIL_COUNT = 20;

// Define theme-based color palettes as module-level constants for performance.
// This prevents them from being redeclared on every component render.
const DARK_COLORS = ['#38BDF8', '#7DD3FC', '#0EA5E9', '#A5DFFF'];
const LIGHT_COLORS = ['#2DD4BF', '#5EEAD4', '#0D9488', '#99F6E4'];

const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailRefs = useRef<(HTMLDivElement | null)[]>([]);
  const { theme } = useTheme();
  
  const [isHovering, setIsHovering] = useState(false);
  const [isMotionReduced, setIsMotionReduced] = useState(false);
  
  const isHoveringRef = useRef(isHovering);
  isHoveringRef.current = isHovering;

  const mousePosition = useRef({ x: 0, y: 0 });
  const cursorPosition = useRef({ x: 0, y: 0 });
  const particles = useRef<{ x: number; y: number; opacity: number; size: number; decayRate: number; color: string; }[]>([]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsMotionReduced(mediaQuery.matches);

    const handleChange = () => setIsMotionReduced(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    if (isMotionReduced) return;

    const onMouseMove = (e: MouseEvent) => {
      mousePosition.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, .interactive-card, .tab-button, .case-study-card')) {
        setIsHovering(true);
      }
    };
    
    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
       if (target.closest('a, button, .interactive-card, .tab-button, .case-study-card')) {
        setIsHovering(false);
      }
    };

    let animationFrameId: number;

    const animate = () => {
      const dampingNormal = 0.12;
      const dampingHover = 0.06;
      const currentDamping = isHoveringRef.current ? dampingHover : dampingNormal;

      const { x: targetX, y: targetY } = mousePosition.current;
      const { x: currentX, y: currentY } = cursorPosition.current;
      
      const newX = currentX + (targetX - currentX) * currentDamping;
      const newY = currentY + (targetY - currentY) * currentDamping;
      
      cursorPosition.current = { x: newX, y: newY };

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${newX}px, ${newY}px, 0) translate(-50%, -50%)`;
      }

      if (particles.current.length < MAX_TRAIL_COUNT) {
          const particleX = newX + (Math.random() - 0.5) * 10;
          const particleY = newY + (Math.random() - 0.5) * 10;
          
          const initialSize = isHoveringRef.current ? 16 + Math.random() * 6 : 6 + Math.random() * 4;
          const initialOpacity = 0.8 + Math.random() * 0.2;
          
          const decayRate = (isHoveringRef.current ? 0.085 : 0.03) + Math.random() * 0.015;
          
          const colorPalette = theme === 'dark' ? DARK_COLORS : LIGHT_COLORS;
          const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];

          particles.current.push({
              x: particleX,
              y: particleY,
              opacity: initialOpacity,
              size: initialSize,
              decayRate: decayRate,
              color: color,
          });
      }

      for (let i = particles.current.length - 1; i >= 0; i--) {
          const p = particles.current[i];
          p.opacity -= p.decayRate;
          p.size *= 0.96;

          if (p.opacity <= 0 || p.size < 0.5) {
              particles.current.splice(i, 1);
          }
      }

      trailRefs.current.forEach((ref, i) => {
        const particle = particles.current[i];
        if (ref && particle) {
          ref.style.transform = `translate3d(${particle.x}px, ${particle.y}px, 0) translate(-50%, -50%)`;
          ref.style.opacity = `${particle.opacity}`;
          ref.style.width = `${particle.size}px`;
          ref.style.height = `${particle.size}px`;
          ref.style.backgroundColor = particle.color;
          ref.style.display = 'block';
        } else if (ref) {
          ref.style.display = 'none';
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    document.addEventListener('mousemove', (e) => {
        mousePosition.current = { x: e.clientX, y: e.clientY };
        cursorPosition.current = { x: e.clientX, y: e.clientY };
    }, { once: true });

    window.addEventListener('mousemove', onMouseMove);
    document.body.addEventListener('mouseover', onMouseOver);
    document.body.addEventListener('mouseout', onMouseOut);
    
    animationFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.body.removeEventListener('mouseover', onMouseOver);
      document.body.removeEventListener('mouseout', onMouseOut);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme, isMotionReduced]);

  if (isMotionReduced) {
    return null;
  }

  const cursorSize = 8;
  const hoverSize = 50;
  
  const cursorClasses = `fixed top-0 left-0 rounded-full pointer-events-none z-[10000] transition-[width,height,border,background-color] duration-200`;
  
  return (
    <>
      <div 
        ref={cursorRef}
        className={cursorClasses}
        style={{
          width: isHovering ? `${hoverSize}px` : `${cursorSize}px`,
          height: isHovering ? `${hoverSize}px` : `${cursorSize}px`,
          backgroundColor: isHovering ? 'transparent' : 'var(--accent-secondary)',
          border: isHovering ? '1px solid var(--accent-secondary)' : 'none',
        }}
      />
      
      {Array.from({ length: MAX_TRAIL_COUNT }).map((_, i) => (
        <div
          key={i}
          ref={(el) => { trailRefs.current[i] = el; }}
          className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999]"
          style={{
            opacity: 0,
            display: 'none',
          }}
        />
      ))}
    </>
  );
};

export default CustomCursor;