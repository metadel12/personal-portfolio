import React, { useEffect, useRef } from 'react';
import { ChevronDown, Github, Linkedin, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useCursor } from '../context/CursorContext';
import './Hero.css';


const ThreeScene = ({ darkMode }) => {
    return (
        <div className={`three-scene ${darkMode ? 'three-scene-dark' : 'three-scene-light'}`}>
            <Canvas camera={{ position: [0, 0, 5] }}>
                <ambientLight intensity={darkMode ? 0.3 : 0.5} />
                <pointLight position={[10, 10, 10]} intensity={darkMode ? 0.8 : 1} />
                <OrbitControls enableZoom={false} enablePan={false} />
            </Canvas>
        </div>
    );
};

const Hero = ({ darkMode }) => {
    const { setCursorVariant } = useCursor();
    const heroRef = useRef(null);
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);
    const descriptionRef = useRef(null);
    const buttonsRef = useRef(null);
    const socialRef = useRef(null);

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

    const socialLinks = [
        {
            icon: Github,
            href: "https://github.com/metadel12",
            username: "metadel12"
        },
        {
            icon: Linkedin,
            href: "https://linkedin.com/in/metadel-abere",
            username: "Metadel Abere"
        },
        {
            icon: Mail,
            href: "mailto:metizomawa@gmail.com",
            username: "metizomawa@gmail.com"
        },
    ];

    const scrollToAbout = () => {
        document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleScrollToSection = (sectionId) => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };


    useEffect(() => {
        const tl = gsap.timeline();


        tl.fromTo(titleRef.current,
            { y: 100, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: 'power3.out' },
            '-=0.5'
        );

        tl.fromTo(subtitleRef.current,
            { y: 80, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' },
            '-=0.3'
        );

        tl.fromTo(descriptionRef.current,
            { y: 60, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' },
            '-=0.2'
        );

        tl.fromTo(buttonsRef.current,
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
            '-=0.1'
        );

        tl.fromTo(socialRef.current,
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
            '-=0.1'
        );


        gsap.to('.scroll-indicator', {
            y: '+=10',
            duration: 1.5,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
        });


        const handleMouseMove = (event) => {
            const { clientX, clientY } = event;
            const x = (clientX / window.innerWidth) * 50 - 25;
            const y = (clientY / window.innerHeight) * 50 - 25;

            gsap.to('.three-scene', {
                x: x * 0.1,
                y: y * 0.1,
                duration: 1,
                ease: 'power2.out'
            });
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <section
            id="home"
            ref={heroRef}
            className={`hero-section ${darkMode ? 'hero-section-dark' : 'hero-section-light'}`}
        >

            <ThreeScene darkMode={darkMode} />


            <div className="hero-grid-lines">

                {[1, 2].map((i) => (
                    <div
                        key={`v-${i}`}
                        className="vertical-line"
                        style={{ left: `${i * 33.33}%` }}
                    />
                ))}


                {[1, 2].map((i) => (
                    <div
                        key={`h-${i}`}
                        className="horizontal-line"
                        style={{ top: `${i * 33.33}%` }}
                    />
                ))}
            </div>


            <motion.div
                className="hero-glow"
                animate={{ opacity: [0.2, 0.4, 0.2] }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            {/* Main Content */}
            <motion.div
                className="hero-container"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <div className="hero-content">
                    <div className="hero-text-content">
                        <motion.h1
                            ref={titleRef}
                            className={`hero-title ${darkMode ? 'hero-title-dark' : 'hero-title-light'}`}
                            variants={itemVariants}
                        >
                            Hi, I'm <span className={`hero-name ${darkMode ? 'hero-name-dark' : 'hero-name-light'}`}>Metadel</span>
                        </motion.h1>

                        <motion.p
                            ref={subtitleRef}
                            className={`hero-subtitle ${darkMode ? 'hero-subtitle-dark' : 'hero-subtitle-light'}`}
                            variants={itemVariants}
                        >
                            Full-Stack Developer
                        </motion.p>

                        <motion.p
                            ref={descriptionRef}
                            className={`hero-description ${darkMode ? 'hero-description-dark' : 'hero-description-light'}`}
                            variants={itemVariants}
                        >
                            I create immersive, functional, and scalable web applications with cutting-edge technologies
                            including React, Three.js, and modern animation libraries. Specializing in interactive
                            3D web experiences that push the boundaries of user engagement.
                        </motion.p>


                        <motion.div
                            ref={buttonsRef}
                            className="hero-buttons"
                            variants={itemVariants}
                        >
                            <motion.button
                                className={`hero-btn primary-btn ${darkMode ? 'primary-btn-dark' : 'primary-btn-light'}`}
                                onMouseEnter={() => setCursorVariant("button")}
                                onMouseLeave={() => setCursorVariant("default")}
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleScrollToSection("projects")}
                            >
                                View My Work
                            </motion.button>

                            <motion.button
                                className={`hero-btn secondary-btn ${darkMode ? 'secondary-btn-dark' : 'secondary-btn-light'}`}
                                onMouseEnter={() => setCursorVariant("button")}
                                onMouseLeave={() => setCursorVariant("default")}
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleScrollToSection("contact")}
                            >
                                Get In Touch
                            </motion.button>
                        </motion.div>


                        <motion.div
                            ref={socialRef}
                            className="social-links"
                            variants={itemVariants}
                        >
                            {socialLinks.map((social, index) => {
                                const isExternal = social.href.startsWith("http");
                                return (
                                    <motion.a
                                        key={index}
                                        href={social.href}
                                        target={isExternal ? "_blank" : undefined}
                                        rel={isExternal ? "noopener noreferrer" : undefined}
                                        className={`social-link ${darkMode ? 'social-link-dark' : 'social-link-light'}`}
                                        onMouseEnter={() => setCursorVariant("button")}
                                        onMouseLeave={() => setCursorVariant("default")}
                                        whileHover={{ scale: 1.1, y: -2 }}
                                    >
                                        <social.icon className="social-icon" />
                                        <div className="social-tooltip">
                                            {social.username}
                                        </div>
                                    </motion.a>
                                );
                            })}
                        </motion.div>
                    </div>
                </div>


                <motion.button
                    onClick={scrollToAbout}
                    className={`scroll-indicator ${darkMode ? 'scroll-indicator-dark' : 'scroll-indicator-light'}`}
                    aria-label="Scroll to about section"
                    variants={itemVariants}
                >
                    <ChevronDown className="scroll-arrow" />
                </motion.button>
            </motion.div>
        </section>
    );
};

export default Hero;
