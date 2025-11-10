import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { motion as Motion } from 'framer-motion';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useCursor } from '../context/CursorContext';
import './About.css';

// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// 3D Scene Component
const About3DScene = ({ darkMode }) => {
    return (
        <div className={`about-3d-scene ${darkMode ? 'about-3d-scene-dark' : 'about-3d-scene-light'}`}>
            <Canvas
                camera={{ position: [0, 0, 5], fov: 50 }}
            >
                <ambientLight intensity={darkMode ? 0.3 : 0.5} />
                <pointLight position={[10, 10, 10]} intensity={darkMode ? 0.8 : 1} />
                <OrbitControls enableZoom={false} enablePan={false} />
            </Canvas>
        </div>
    );
};

// Animated Profile Image Component
const AnimatedProfileImage = ({ darkMode }) => {
    const imageRef = useRef();
    const containerRef = useRef();
    const borderRef = useRef();

    useEffect(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
            }
        });

        tl.fromTo(imageRef.current,
            { scale: 0, rotation: -180, opacity: 0 },
            { scale: 1, rotation: 0, opacity: 1, duration: 1.5, ease: "back.out(1.7)" }
        );

        tl.fromTo(borderRef.current,
            { scale: 0, opacity: 0 },
            { scale: 1, opacity: 1, duration: 1, ease: "power2.out" },
            "-=0.5"
        );

        // Hover animation
        const handleMouseEnter = () => {
            gsap.to(imageRef.current, {
                scale: 1.05,
                rotation: 5,
                duration: 0.3,
                ease: "power2.out"
            });
            gsap.to(borderRef.current, {
                scale: 1.1,
                duration: 0.3,
                ease: "power2.out"
            });
        };

        const handleMouseLeave = () => {
            gsap.to(imageRef.current, {
                scale: 1,
                rotation: 0,
                duration: 0.3,
                ease: "power2.out"
            });
            gsap.to(borderRef.current, {
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
            });
        };

        if (containerRef.current) {
            containerRef.current.addEventListener('mouseenter', handleMouseEnter);
            containerRef.current.addEventListener('mouseleave', handleMouseLeave);
        }

        return () => {
            if (containerRef.current) {
                containerRef.current.removeEventListener('mouseenter', handleMouseEnter);
                containerRef.current.removeEventListener('mouseleave', handleMouseLeave);
            }
        };
    }, []);

    return (
        <div ref={containerRef} className="profile-image-container">
            <div ref={borderRef} className="profile-image-border">
                <div className={`profile-image-glow ${darkMode ? 'profile-image-glow-dark' : 'profile-image-glow-light'}`}></div>
            </div>
            <img
                ref={imageRef}
                src="/images/profile-about.jpg"
                alt="Metadel - Full Stack Developer"
                className="profile-image"
            />
            <div className="floating-elements">
                <div className={`floating-element element-1 ${darkMode ? 'floating-element-dark' : 'floating-element-light'}`}></div>
                <div className={`floating-element element-2 ${darkMode ? 'floating-element-dark' : 'floating-element-light'}`}></div>
                <div className={`floating-element element-3 ${darkMode ? 'floating-element-dark' : 'floating-element-light'}`}></div>
                <div className={`floating-element element-4 ${darkMode ? 'floating-element-dark' : 'floating-element-light'}`}></div>
            </div>
        </div>
    );
};

const About = ({ darkMode }) => {
    const { setCursorVariant } = useCursor();
    const aboutRef = useRef(null);
    const titleRef = useRef(null);
    const descriptionRef = useRef(null);
    const highlightsRef = useRef(null);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                delayChildren: 0.3,
                staggerChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 },
    };

    // GSAP Animations
    useEffect(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: aboutRef.current,
                start: "top 70%",
                end: "bottom 30%",
                toggleActions: "play none none reverse"
            }
        });

        // Text animations
        tl.fromTo(titleRef.current,
            { y: 100, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: 'power3.out' },
            '-=0.5'
        );

        tl.fromTo(descriptionRef.current,
            { y: 80, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' },
            '-=0.3'
        );

        tl.fromTo(highlightsRef.current,
            { y: 60, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' },
            '-=0.2'
        );

        // Floating background elements
        gsap.to('.floating-element', {
            y: '+=20',
            duration: 3,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            stagger: 0.5
        });
    }, []);

    return (
        <section
            id="about"
            ref={aboutRef}
            className={`about-section ${darkMode ? 'about-section-dark' : 'about-section-light'}`}
        >
            {/* 3D Background Scene */}
            <About3DScene darkMode={darkMode} />

            {/* Background Grid Lines */}
            <div className="about-grid-lines">
                {/* Vertical lines */}
                {[1, 2, 3, 4].map((i) => (
                    <div
                        key={`v-${i}`}
                        className="vertical-line"
                        style={{ left: `${i * 20}%` }}
                    />
                ))}

                {/* Horizontal lines */}
                {[1, 2, 3, 4].map((i) => (
                    <div
                        key={`h-${i}`}
                        className="horizontal-line"
                        style={{ top: `${i * 20}%` }}
                    />
                ))}
            </div>

            {/* Animated Background Glow */}
            <Motion.div
                className="about-glow"
                animate={{ opacity: [0.2, 0.4, 0.2] }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            {/* Main Content */}
            <Motion.div
                className="about-container"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <div className="about-content">
                    {/* Left Column - Profile Image */}
                    <div className="about-image-column">
                        <AnimatedProfileImage darkMode={darkMode} />
                    </div>

                    {/* Right Column - Content */}
                    <div className="about-text-column">
                        <div className="about-text-content">
                            <Motion.h2
                                ref={titleRef}
                                className={`about-title ${darkMode ? 'about-title-dark' : 'about-title-light'}`}
                                variants={itemVariants}
                            >
                                About <span className={`about-name ${darkMode ? 'about-name-dark' : 'about-name-light'}`}>Me</span>
                            </Motion.h2>

                            <Motion.div
                                ref={descriptionRef}
                                className={`about-description ${darkMode ? 'about-description-dark' : 'about-description-light'}`}
                                variants={itemVariants}
                            >
                                <p className="description-paragraph">
                                    Hello! I'm <strong>Metadel</strong>, a passionate full-stack developer with 3+ years of experience
                                    crafting digital solutions that blend cutting-edge technology with beautiful design.
                                </p>

                                <p className="description-paragraph">
                                    My journey began with a curiosity about how websites work, and has evolved into a
                                    passion for creating immersive, high-performance web applications using modern
                                    technologies like <strong>React</strong>, <strong>Three.js</strong>, and <strong>Node.js</strong>.
                                </p>

                                <p className="description-paragraph">
                                    I specialize in building scalable, user-centric applications that not only look
                                    amazing but also deliver exceptional performance and user experiences.
                                </p>
                            </Motion.div>

                            {/* Highlights */}
                            <Motion.div
                                ref={highlightsRef}
                                className="about-highlights"
                                variants={itemVariants}
                            >
                                <Motion.div
                                    className={`highlight-item ${darkMode ? 'highlight-item-dark' : 'highlight-item-light'}`}
                                    onMouseEnter={() => setCursorVariant("button")}
                                    onMouseLeave={() => setCursorVariant("default")}
                                    whileHover={{ scale: 1.05, y: -2 }}
                                >
                                    <div className="highlight-icon">🚀</div>
                                    <div className="highlight-text">
                                        <strong>3+ Years</strong> of professional experience
                                    </div>
                                </Motion.div>

                                <Motion.div
                                    className={`highlight-item ${darkMode ? 'highlight-item-dark' : 'highlight-item-light'}`}
                                    onMouseEnter={() => setCursorVariant("button")}
                                    onMouseLeave={() => setCursorVariant("default")}
                                    whileHover={{ scale: 1.05, y: -2 }}
                                >
                                    <div className="highlight-icon">💼</div>
                                    <div className="highlight-text">
                                        <strong>5+ Projects</strong> delivered successfully
                                    </div>
                                </Motion.div>

                                <Motion.div
                                    className={`highlight-item ${darkMode ? 'highlight-item-dark' : 'highlight-item-light'}`}
                                    onMouseEnter={() => setCursorVariant("button")}
                                    onMouseLeave={() => setCursorVariant("default")}
                                    whileHover={{ scale: 1.05, y: -2 }}
                                >
                                    <div className="highlight-icon">🌐</div>
                                    <div className="highlight-text">
                                        <strong>Full-Stack</strong> development expertise
                                    </div>
                                </Motion.div>

                                <Motion.div
                                    className={`highlight-item ${darkMode ? 'highlight-item-dark' : 'highlight-item-light'}`}
                                    onMouseEnter={() => setCursorVariant("button")}
                                    onMouseLeave={() => setCursorVariant("default")}
                                    whileHover={{ scale: 1.05, y: -2 }}
                                >
                                    <div className="highlight-icon">⚡</div>
                                    <div className="highlight-text">
                                        <strong>Modern Tech</strong> React, Node.js, Three.js
                                    </div>
                                </Motion.div>
                            </Motion.div>
                        </div>
                    </div>
                </div>
            </Motion.div>
        </section>
    );
};

export default About;