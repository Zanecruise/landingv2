import React, { useRef, useEffect, useState } from 'react';
import { useTheme } from './ThemeContext';
import * as THREE from 'three';
import { SimplexNoise } from 'three/examples/jsm/math/SimplexNoise.js';


const AnimatedBackground: React.FC = () => {
    const mountRef = useRef<HTMLDivElement>(null);
    const { theme } = useTheme();
    const [isMotionReduced, setIsMotionReduced] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        setIsMotionReduced(mediaQuery.matches);

        const handleChange = () => setIsMotionReduced(mediaQuery.matches);
        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    useEffect(() => {
        if (isMotionReduced) {
            return;
        }

        const mount = mountRef.current;
        if (!mount) return;

        let animationFrameId: number;

        // Scene setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
        camera.position.z = 1;

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        mount.appendChild(renderer.domElement);
        
        // Mouse tracking
        const mouse = new THREE.Vector2(-10, -10); // Start off-screen
        const handleMouseMove = (event: MouseEvent) => {
            mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        };
        window.addEventListener('mousemove', handleMouseMove);

        // Flow Field Particle system
        const PARTICLE_COUNT = 1500; // Performance Optimization
        const positions = new Float32Array(PARTICLE_COUNT * 3);
        const velocities = new Float32Array(PARTICLE_COUNT * 3);

        for (let i = 0; i < PARTICLE_COUNT; i++) {
            positions[i * 3 + 0] = (Math.random() - 0.5) * 10;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
        }

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        
        // Define colors based on CSS variables
        const style = getComputedStyle(document.documentElement);
        const color1 = new THREE.Color(style.getPropertyValue('--accent-primary').trim());
        const color2 = new THREE.Color(style.getPropertyValue('--accent-secondary').trim());
        const finalColor = new THREE.Color().lerpColors(color1, color2, 0.5);

        const material = new THREE.PointsMaterial({
            size: 0.02,
            color: finalColor,
            blending: THREE.AdditiveBlending,
            transparent: true,
            opacity: 0.7,
            depthWrite: false,
        });

        const particles = new THREE.Points(geometry, material);
        scene.add(particles);

        const simplex = new SimplexNoise();
        const clock = new THREE.Clock();

        const animate = () => {
            animationFrameId = requestAnimationFrame(animate);
            const elapsedTime = clock.getElapsedTime();
            const positions = particles.geometry.attributes.position.array as Float32Array;

            for (let i = 0; i < PARTICLE_COUNT; i++) {
                const i3 = i * 3;
                const x = positions[i3 + 0];
                const y = positions[i3 + 1];

                // Noise for angle
                const noise = simplex.noise3d(x * 0.1, y * 0.1, elapsedTime * 0.1);
                const angle = noise * Math.PI * 2;
                
                // Update velocities
                const speed = 0.003; // UX Refinement: Slower, more graceful speed
                velocities[i3 + 0] = Math.cos(angle) * speed;
                velocities[i3 + 1] = Math.sin(angle) * speed;
                
                // Mouse interaction
                const dx = x - (mouse.x * 5);
                const dy = y - (mouse.y * 5);
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 1) { // UX Refinement: smaller radius, less jarring effect
                    const force = (1 - dist) * 0.01;
                    velocities[i3 + 0] += (dx / dist) * force;
                    velocities[i3 + 1] += (dy / dist) * force;
                }

                // Update positions
                positions[i3 + 0] += velocities[i3 + 0];
                positions[i3 + 1] += velocities[i3 + 1];
                
                // Damping
                velocities[i3 + 0] *= 0.98;
                velocities[i3 + 1] *= 0.98;

                // Screen wrapping
                if (positions[i3 + 0] > 5) positions[i3 + 0] = -5;
                if (positions[i3 + 0] < -5) positions[i3 + 0] = 5;
                if (positions[i3 + 1] > 5) positions[i3 + 1] = -5;
                if (positions[i3 + 1] < -5) positions[i3 + 1] = 5;
            }

            particles.geometry.attributes.position.needsUpdate = true;
            renderer.render(scene, camera);
        };

        animate();

        // Handle resize
        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        };
        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
            if (mount && renderer.domElement) {
                mount.removeChild(renderer.domElement);
            }
        };
    }, [theme, isMotionReduced]);
    
    if (isMotionReduced) {
        return null;
    }

    return <div ref={mountRef} className="fixed top-0 left-0 w-full h-full z-[-1] pointer-events-none opacity-50" />;
};

export default AnimatedBackground;