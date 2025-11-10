import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useCursor } from '../context/CursorContext';
import './Skills.css';


gsap.registerPlugin(ScrollTrigger);


const Skills3DScene = ({ darkMode }) => {
    return (
        <div className={`skills-3d-scene ${darkMode ? 'skills-3d-scene-dark' : 'skills-3d-scene-light'}`}>
            <Canvas camera={{ position: [0, 0, 5] }}>
                <ambientLight intensity={darkMode ? 0.3 : 0.5} />
                <pointLight position={[10, 10, 10]} intensity={darkMode ? 0.8 : 1} />
                <OrbitControls enableZoom={false} enablePan={false} />
            </Canvas>
        </div>
    );
};


const AnimatedSkillCard = ({ category, index, isActive, onHover, darkMode }) => {
    const cardRef = useRef();
    const titleRef = useRef();
    const skillsRef = useRef();

    useEffect(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: cardRef.current,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
            }
        });

        tl.fromTo(cardRef.current,
            { y: 100, opacity: 0, rotationY: 90 },
            { y: 0, opacity: 1, rotationY: 0, duration: 1, ease: "back.out(1.7)", delay: index * 0.2 }
        );

        tl.fromTo(titleRef.current,
            { scale: 0, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.5, ease: "power2.out" },
            "-=0.5"
        );

        tl.fromTo(skillsRef.current.children,
            { x: -50, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out" },
            "-=0.3"
        );
    }, [index]);

    const handleMouseEnter = () => {
        onHover(category.title);
        gsap.to(cardRef.current, {
            y: -10,
            scale: 1.02,
            duration: 0.3,
            ease: "power2.out"
        });

        gsap.to(titleRef.current, {
            color: category.color,
            duration: 0.3,
            ease: "power2.out"
        });
    };

    const handleMouseLeave = () => {
        onHover(null);
        gsap.to(cardRef.current, {
            y: 0,
            scale: 1,
            duration: 0.3,
            ease: "power2.out"
        });

        gsap.to(titleRef.current, {
            color: darkMode ? "#e5e7eb" : "#374151",
            duration: 0.3,
            ease: "power2.out"
        });
    };

    return (
        <div
            ref={cardRef}
            className={`skill-card ${isActive ? 'skill-card-active' : ''} ${darkMode ? 'skill-card-dark' : 'skill-card-light'}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{ '--card-color': category.color }}
        >
            <div className={`skill-card-glow ${darkMode ? 'skill-card-glow-dark' : 'skill-card-glow-light'}`}></div>
            <div className="skill-card-content">
                <h3 ref={titleRef} className={`skill-card-title ${darkMode ? 'skill-card-title-dark' : 'skill-card-title-light'}`}>
                    {category.title}
                </h3>
                <div ref={skillsRef} className="skill-items">
                    {category.skills.map((skill, skillIndex) => (
                        <div key={skill} className={`skill-item ${darkMode ? 'skill-item-dark' : 'skill-item-light'}`}>
                            <div
                                className="skill-dot"
                                style={{ backgroundColor: category.color }}
                            ></div>
                            <span className={`skill-name ${darkMode ? 'skill-name-dark' : 'skill-name-light'}`}>{skill}</span>
                            <div className={`skill-level ${darkMode ? 'skill-level-dark' : 'skill-level-light'}`}>
                                <div
                                    className="skill-level-bar"
                                    style={{
                                        width: `${80 + (skillIndex * 3)}%`,
                                        backgroundColor: category.color
                                    }}
                                ></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};


const AnimatedSkillMeter = ({ skill, percentage, color, delay, darkMode }) => {
    const meterRef = useRef();
    const percentageRef = useRef();

    useEffect(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: meterRef.current,
                start: "top 85%",
                end: "bottom 15%",
                toggleActions: "play none none reverse"
            }
        });

        tl.fromTo(meterRef.current,
            { width: 0 },
            { width: `${percentage}%`, duration: 1.5, ease: "power2.out", delay }
        );

        tl.fromTo(percentageRef.current,
            { opacity: 0, scale: 0 },
            { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.7)" },
            "-=0.5"
        );
    }, [percentage, delay]);

    return (
        <div className={`skill-meter ${darkMode ? 'skill-meter-dark' : 'skill-meter-light'}`}>
            <div className="skill-meter-header">
                <span className={`skill-meter-name ${darkMode ? 'skill-meter-name-dark' : 'skill-meter-name-light'}`}>{skill}</span>
                <span ref={percentageRef} className={`skill-meter-percentage ${darkMode ? 'skill-meter-percentage-dark' : 'skill-meter-percentage-light'}`}>
                    {percentage}%
                </span>
            </div>
            <div className={`skill-meter-track ${darkMode ? 'skill-meter-track-dark' : 'skill-meter-track-light'}`}>
                <div
                    ref={meterRef}
                    className="skill-meter-fill"
                    style={{ '--meter-color': color }}
                ></div>
            </div>
        </div>
    );
};

const Skills = ({ darkMode }) => {
    const sectionRef = useRef();
    const titleRef = useRef();
    const subtitleRef = useRef();
    const [activeCategory, setActiveCategory] = useState(null);

    const skillCategories = [
        {
            title: "Frontend Development",
            skills: ["React/Next.js", "Vue.js/Nuxt.js", "TypeScript", "JavaScript ES6+", "Tailwind CSS", "Three.js"],
            color: darkMode ? "#60a5fa" : "#3b82f6",
            gradient: "from-blue-500 to-cyan-500"
        },
        {
            title: "Backend & APIs",
            skills: ["Node.js/Express", "Python/Django", "REST APIs", "GraphQL", "WebSockets", "Serverless"],
            color: darkMode ? "#34d399" : "#10b981",
            gradient: "from-green-500 to-emerald-500"
        },
        {
            title: "Database & DevOps",
            skills: ["MongoDB", "PostgreSQL", "Docker", "AWS", "CI/CD", "Jest/Testing"],
            color: darkMode ? "#a78bfa" : "#8b5cf6",
            gradient: "from-purple-500 to-pink-500"
        }
    ];

    const proficiencySkills = [
        { skill: "React & Next.js", percentage: 95, color: darkMode ? "#60a5fa" : "#3b82f6" },
        { skill: "Node.js & Express", percentage: 90, color: darkMode ? "#34d399" : "#10b981" },
        { skill: "TypeScript", percentage: 88, color: darkMode ? "#a78bfa" : "#8b5cf6" },
        { skill: "MongoDB", percentage: 85, color: darkMode ? "#fbbf24" : "#f59e0b" },
        { skill: "AWS & DevOps", percentage: 80, color: darkMode ? "#f472b6" : "#ec4899" },
        { skill: "Three.js & WebGL", percentage: 75, color: darkMode ? "#22d3ee" : "#06b6d4" }
    ];

    useEffect(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 70%",
                end: "bottom 30%",
                toggleActions: "play none none reverse"
            }
        });


        tl.fromTo(titleRef.current,
            { y: 100, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
        );


        tl.fromTo(subtitleRef.current,
            { y: 80, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
            "-=0.5"
        );
    }, []);

    const handleCategoryHover = (category) => {
        setActiveCategory(category);
    };

    return (
        <section
            id="skills"
            ref={sectionRef}
            className={`skills-section ${darkMode ? 'skills-section-dark' : 'skills-section-light'}`}
        >

            <Skills3DScene darkMode={darkMode} />


            <div className="skills-grid-lines">

                {[1, 2, 3, 4].map((i) => (
                    <div
                        key={`v-${i}`}
                        className="vertical-line"
                        style={{ left: `${i * 20}%` }}
                    />
                ))}


                {[1, 2, 3, 4].map((i) => (
                    <div
                        key={`h-${i}`}
                        className="horizontal-line"
                        style={{ top: `${i * 20}%` }}
                    />
                ))}
            </div>


            <motion.div
                className="skills-glow"
                animate={{ opacity: [0.2, 0.4, 0.2] }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            <div className="skills-container">

                <div className="skills-header">
                    <h2 ref={titleRef} className={`skills-title ${darkMode ? 'skills-title-dark' : 'skills-title-light'}`}>
                        Technical <span className={`skills-title-gradient ${darkMode ? 'skills-title-gradient-dark' : 'skills-title-gradient-light'}`}>Skills</span>
                    </h2>
                    <p ref={subtitleRef} className={`skills-subtitle ${darkMode ? 'skills-subtitle-dark' : 'skills-subtitle-light'}`}>
                        Technologies and tools I use to create amazing digital experiences
                    </p>
                </div>


                <div className="skills-content">

                    <div className="skills-categories">
                        {skillCategories.map((category, index) => (
                            <AnimatedSkillCard
                                key={category.title}
                                category={category}
                                index={index}
                                isActive={activeCategory === category.title}
                                onHover={handleCategoryHover}
                                darkMode={darkMode}
                            />
                        ))}
                    </div>


                    <div className="skills-proficiency">
                        <div className="proficiency-header">
                            <h3 className={`proficiency-title ${darkMode ? 'proficiency-title-dark' : 'proficiency-title-light'}`}>
                                Skill <span className={`proficiency-title-accent ${darkMode ? 'proficiency-title-accent-dark' : 'proficiency-title-accent-light'}`}>Proficiency</span>
                            </h3>
                            <p className={`proficiency-description ${darkMode ? 'proficiency-description-dark' : 'proficiency-description-light'}`}>
                                My expertise level across key technologies
                            </p>
                        </div>

                        <div className="proficiency-meters">
                            {proficiencySkills.map((skill, index) => (
                                <AnimatedSkillMeter
                                    key={skill.skill}
                                    skill={skill.skill}
                                    percentage={skill.percentage}
                                    color={skill.color}
                                    delay={index * 0.1}
                                    darkMode={darkMode}
                                />
                            ))}
                        </div>


                        <div className="skills-stats">
                            <div className={`stat-item ${darkMode ? 'stat-item-dark' : 'stat-item-light'}`}>
                                <div className={`stat-number ${darkMode ? 'stat-number-dark' : 'stat-number-light'}`}>3+</div>
                                <div className={`stat-label ${darkMode ? 'stat-label-dark' : 'stat-label-light'}`}>Years Experience</div>
                            </div>
                            <div className={`stat-item ${darkMode ? 'stat-item-dark' : 'stat-item-light'}`}>
                                <div className={`stat-number ${darkMode ? 'stat-number-dark' : 'stat-number-light'}`}>5+</div>
                                <div className={`stat-label ${darkMode ? 'stat-label-dark' : 'stat-label-light'}`}>Projects Completed</div>
                            </div>
                            <div className={`stat-item ${darkMode ? 'stat-item-dark' : 'stat-item-light'}`}>
                                <div className={`stat-number ${darkMode ? 'stat-number-dark' : 'stat-number-light'}`}>15+</div>
                                <div className={`stat-label ${darkMode ? 'stat-label-dark' : 'stat-label-light'}`}>Technologies</div>
                            </div>
                            <div className={`stat-item ${darkMode ? 'stat-item-dark' : 'stat-item-light'}`}>
                                <div className={`stat-number ${darkMode ? 'stat-number-dark' : 'stat-number-light'}`}>100%</div>
                                <div className={`stat-label ${darkMode ? 'stat-label-dark' : 'stat-label-light'}`}>Client Satisfaction</div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="tech-stack">
                    <h3 className={`tech-stack-title ${darkMode ? 'tech-stack-title-dark' : 'tech-stack-title-light'}`}>Tech Stack</h3>
                    <div className="tech-icons">
                        {['React', 'Node.js', 'Python', 'MongoDB', 'AWS', 'Docker', 'TypeScript', 'Three.js'].map((tech) => (
                            <div key={tech} className={`tech-icon ${darkMode ? 'tech-icon-dark' : 'tech-icon-light'}`}>
                                <div className={`tech-icon-bg ${darkMode ? 'tech-icon-bg-dark' : 'tech-icon-bg-light'}`}></div>
                                <span className={`tech-icon-text ${darkMode ? 'tech-icon-text-dark' : 'tech-icon-text-light'}`}>{tech}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section >
    );
};

export default Skills;