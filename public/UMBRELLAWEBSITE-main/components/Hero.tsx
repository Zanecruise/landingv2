import React, { useRef, useEffect, useState } from 'react';
import { useLanguage } from './LanguageContext';
import * as THREE from 'three'; 
import { SiGooglecloud, SiNvidia } from 'react-icons/si';
import { FiArrowRight } from 'react-icons/fi';

// --- REMOVIDO: O componente UmbrellaIcon foi completamente deletado ---

const Hero: React.FC = () => {
    const { t } = useLanguage();
    const [showPostTaglineElements, setShowPostTaglineElements] = useState(false);
    const mountRef = useRef<HTMLDivElement>(null);

    const FoundlabIcon = () => (
        <svg viewBox="0 0 24 24" className="w-5 h-5 text-[var(--text-secondary)]" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 2 L19.928 6.5 L19.928 15.5 L12 20 L4.072 15.5 L4.072 6.5 Z" />
        </svg>
    );

    // Lógica da animação Three.js, sem alterações
    useEffect(() => {
        if (typeof THREE === 'undefined' || !mountRef.current) return;
        const mount = mountRef.current;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, mount.clientWidth / mount.clientHeight, 0.1, 1000);
        camera.position.z = 25;

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(mount.clientWidth, mount.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        mount.appendChild(renderer.domElement);
        
        const mouse = new THREE.Vector2();
        const handleMouseMove = (event: MouseEvent) => {
            mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        };
        window.addEventListener('mousemove', handleMouseMove);

        const particleCount = 500;
        const particlesGeometry = new THREE.BufferGeometry();
        const posArray = new Float32Array(particleCount * 3);
        for (let i = 0; i < particleCount * 3; i++) {
            posArray[i] = (Math.random() - 0.5) * 50;
        }
        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        
        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.08,
            color: '#00FFD1',
            blending: THREE.AdditiveBlending,
            transparent: true,
        });
        const particleMesh = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particleMesh);

        let animationFrameId: number;
        const clock = new THREE.Clock();
        const animate = () => {
            animationFrameId = requestAnimationFrame(animate);
            const elapsedTime = clock.getElapsedTime();
            particleMesh.rotation.y = elapsedTime * 0.05;
            particleMesh.rotation.x = elapsedTime * 0.02;
            
            camera.position.x += (mouse.x * 5 - camera.position.x) * 0.05;
            camera.position.y += (mouse.y * 5 - camera.position.y) * 0.05;
            camera.lookAt(scene.position);
            renderer.render(scene, camera);
        };
        animate();

        const handleResize = () => {
            renderer.setSize(mount.clientWidth, mount.clientHeight);
            camera.aspect = mount.clientWidth / mount.clientHeight;
            camera.updateProjectionMatrix();
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
            if (mount && renderer.domElement) {
                mount.removeChild(renderer.domElement);
            }
        };
    }, []);

    // useEffect para controlar a aparição dos elementos inferiores
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowPostTaglineElements(true);
        }, 1500); 

        return () => clearTimeout(timer);
    }, []);

    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-24 pb-12">
            <div ref={mountRef} className="absolute top-0 left-0 w-full h-full z-0" />
            
            <style>{`
              /* ... (todo o CSS, sem alterações) ... */
              .font-prata { font-family: 'Prata', serif; }
              .font-share-tech-mono { font-family: 'Share Tech Mono', monospace; }
              @keyframes heroTextEntry {
                from {
                  opacity: 0;
                  transform: translateY(20px);
                  filter: blur(5px);
                }
                to {
                  opacity: 1;
                  transform: translateY(0);
                  filter: blur(0);
                }
              }
              .animate-hero-text {
                opacity: 0;
                animation: heroTextEntry 1s cubic-bezier(0.25, 0.8, 0.25, 1) forwards;
              }
              .hero-cta {
                position: relative;
                overflow: hidden;
                transition: transform 0.3s ease, box-shadow 0.3s ease;
                z-index: 1;
              }
              .hero-cta:hover {
                box-shadow: 0 0 35px var(--accent-secondary-shadow), 0 0 20px var(--accent-primary-shadow);
              }
              .hero-cta::before {
                content: '';
                position: absolute;
                top: 0;
                left: -100%;
                width: 300%;
                height: 100%;
                background: linear-gradient(110deg, transparent 20%, var(--accent-primary) 45%, var(--accent-secondary) 55%, transparent 80%);
                transition: left 0.8s ease;
                z-index: -1;
              }
              .hero-cta:hover::before {
                left: -25%;
              }
            `}</style>
            
            <div className="relative z-10 container mx-auto px-6 text-center my-auto">
                <div 
                    className="flex justify-center animate-hero-text"
                    style={{ animationDelay: '0.3s' }}
                >
                    {/* ALTERADO: O SVG foi substituído por uma tag <img>.
                      Ajuste o `src` se o nome do seu arquivo for diferente (ex: "/logo.png").
                    */}
                    <img 
                        src="/favicon.svg" 
                        alt="Logo Umbrella" 
                        className="w-24 h-24 mb-8"
                    />
                </div>
                <h1 className="font-prata text-5xl md:text-7xl font-normal tracking-tight mb-6 leading-tight">
                    <span className="gradient-text animate-hero-text block" style={{ animationDelay: '0.6s' }}>{t('hero.title')}</span>
                    <span className="text-[var(--text-secondary)] animate-hero-text block" style={{ animationDelay: '0.9s' }}>{t('hero.subtitle')}</span>
                </h1>
                
                <div 
                    className="font-share-tech-mono max-w-3xl mx-auto text-base md:text-lg text-[var(--accent-secondary)] uppercase tracking-widest mb-12 h-10 flex items-center justify-center animate-hero-text"
                    style={{ animationDelay: '1.2s' }}
                >
                    {t('hero.tagline')}
                </div>

                {showPostTaglineElements && (
                    <>
                        <a 
                            href="#solucoes" 
                            className="group hero-cta bg-[var(--background-secondary)] border border-[var(--glass-border)] text-white font-bold text-lg px-8 py-4 rounded-full inline-flex items-center gap-3 hover:scale-105 animate-hero-text"
                            style={{ animationDelay: '0.2s' }}
                        >
                            {t('hero.cta')}
                            <FiArrowRight className="transition-transform group-hover:translate-x-1" />
                        </a>
                        <div 
                            className="mt-12 animate-hero-text"
                            style={{ animationDelay: '0.4s' }}
                        >
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-y-3 sm:divide-x sm:divide-[var(--border-color)] text-xs uppercase tracking-widest text-[var(--text-subtle)]">
                                <a href="#tecnologia" className="flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity sm:px-6">
                                    <FoundlabIcon />
                                    <span className="font-semibold">{t('hero.poweredBy.foundlab')}</span>
                                </a>
                                <a href="#tecnologia" className="flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity sm:px-6">
                                    <SiGooglecloud className="w-5 h-5 text-[var(--tech-gcp-color)]" />
                                    <span className="font-semibold">{t('hero.poweredBy.gcp')}</span>
                                </a>
                                <a href="#tecnologia" className="flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity sm:px-6">
                                    <SiNvidia className="w-5 h-5 text-[var(--tech-nvidia-color)]" />
                                    <span className="font-semibold">{t('hero.poweredBy.nvidia')}</span>
                                </a>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </section>
    );
};

export default Hero;