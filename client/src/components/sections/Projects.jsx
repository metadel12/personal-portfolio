import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useCursor } from '../context/CursorContext';
import { ExternalLink, Github, ArrowRight, Eye, Code2, Image as ImageIcon } from 'lucide-react';
import './Projects.css';


gsap.registerPlugin(ScrollTrigger);


const Projects3DScene = ({ darkMode }) => {
    return (
        <div className={`projects-3d-scene ${darkMode ? 'projects-3d-scene-dark' : 'projects-3d-scene-light'}`}>
            <Canvas camera={{ position: [0, 0, 5] }}>
                <ambientLight intensity={darkMode ? 0.3 : 0.5} />
                <pointLight position={[10, 10, 10]} intensity={darkMode ? 0.8 : 1} />
                <OrbitControls enableZoom={false} enablePan={false} />
            </Canvas>
        </div>
    );
};


const ImageModal = ({ imageUrl, title, isOpen, onClose, darkMode }) => {
    if (!isOpen) return null;

    return (
        <motion.div
            className="image-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
        >
            <motion.div
                className={`image-modal-content ${darkMode ? 'image-modal-content-dark' : 'image-modal-content-light'}`}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    className={`modal-close-btn ${darkMode ? 'modal-close-btn-dark' : 'modal-close-btn-light'}`}
                    onClick={onClose}
                >
                    &times;
                </button>
                <img src={imageUrl} alt={title} className="modal-image" />
                <p className={`modal-title ${darkMode ? 'modal-title-dark' : 'modal-title-light'}`}>{title}</p>
            </motion.div>
        </motion.div>
    );
};


const AnimatedProjectCard = ({ project, index, darkMode }) => {
    const cardRef = useRef();
    const { setCursorVariant } = useCursor();
    const [isImageModalOpen, setIsImageModalOpen] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);

    const containerVariants = {
        hidden: { y: 50, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    const handleImageClick = () => {
        setIsImageModalOpen(true);
    };

    const handleImageLoad = () => {
        setImageLoaded(true);
    };

    return (
        <>
            <motion.div
                ref={cardRef}
                className={`project-card ${darkMode ? 'project-card-dark' : 'project-card-light'}`}
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                onMouseEnter={() => setCursorVariant("button")}
                onMouseLeave={() => setCursorVariant("default")}
                whileHover={{ y: -5, scale: 1.02 }}
            >
                <div className={`project-card-glow ${darkMode ? 'project-card-glow-dark' : 'project-card-glow-light'}`}></div>


                {project.imageUrl && (
                    <div className="project-image-container">
                        <motion.div
                            className="project-image-wrapper"
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            {!imageLoaded && (
                                <div className="image-skeleton">
                                    <ImageIcon size={32} className="image-placeholder-icon" />
                                </div>
                            )}
                            <img
                                src={project.imageUrl}
                                alt={project.title}
                                className={`project-image ${imageLoaded ? 'project-image-loaded' : 'project-image-loading'}`}
                                onClick={handleImageClick}
                                onLoad={handleImageLoad}
                                loading="lazy"
                            />
                            <motion.div
                                className="project-image-overlay"
                                initial={{ opacity: 0 }}
                                whileHover={{ opacity: 1 }}
                                onClick={handleImageClick}
                            >
                                <Eye size={24} />
                                <span>View Project</span>
                            </motion.div>
                        </motion.div>
                    </div>
                )}


                <div className="project-header">
                    <div className="project-icon-wrapper">
                        <Code2 className={`project-icon ${darkMode ? 'project-icon-dark' : 'project-icon-light'}`} />
                    </div>
                    <div>
                        <h3 className={`project-title ${darkMode ? 'project-title-dark' : 'project-title-light'}`}>
                            {project.title}
                        </h3>
                        {project.featured && (
                            <div className={`project-badge ${darkMode ? 'project-badge-dark' : 'project-badge-light'}`}>
                                Featured
                            </div>
                        )}
                    </div>
                </div>


                <p className={`project-description ${darkMode ? 'project-description-dark' : 'project-description-light'}`}>
                    {project.description}
                </p>


                <div className="project-tech-stack">
                    {project.techStack.map((tech, techIndex) => (
                        <span
                            key={tech}
                            className={`tech-tag ${darkMode ? 'tech-tag-dark' : 'tech-tag-light'}`}
                            style={{
                                '--tech-color': project.techColors[techIndex],
                                '--tech-bg': project.techColors[techIndex] + '20'
                            }}
                        >
                            {tech}
                        </span>
                    ))}
                </div>


                <div className="project-links">
                    <motion.a
                        href={project.liveUrl}
                        className={`project-link primary-link ${darkMode ? 'primary-link-dark' : 'primary-link-light'}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Eye size={18} />
                        <span>Live Demo</span>
                        <ArrowRight size={16} />
                    </motion.a>
                    <motion.a
                        href={project.githubUrl}
                        className={`project-link secondary-link ${darkMode ? 'secondary-link-dark' : 'secondary-link-light'}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Github size={18} />
                        <span>Source Code</span>
                    </motion.a>
                </div>
            </motion.div>


            <ImageModal
                imageUrl={project.imageUrl}
                title={project.title}
                isOpen={isImageModalOpen}
                onClose={() => setIsImageModalOpen(false)}
                darkMode={darkMode}
            />
        </>
    );
};


const ProjectFilter = ({ categories, activeCategory, onFilterChange, darkMode }) => {
    const { setCursorVariant } = useCursor();

    return (
        <motion.div
            className="project-filters"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
        >
            {categories.map((category) => (
                <motion.button
                    key={category}
                    className={`filter-btn ${activeCategory === category ? 'filter-btn-active' : ''} ${darkMode ? 'filter-btn-dark' : 'filter-btn-light'}`}
                    onClick={() => onFilterChange(category)}
                    onMouseEnter={() => setCursorVariant("button")}
                    onMouseLeave={() => setCursorVariant("default")}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    {category}
                </motion.button>
            ))}
        </motion.div>
    );
};


const Projects = ({ darkMode }) => {
    const { setCursorVariant } = useCursor();
    const projectsRef = useRef(null);
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);
    const [activeCategory, setActiveCategory] = useState('All');

    const projectCategories = ['All', 'Full Stack', 'Frontend', 'Backend', 'Mobile', '3D Web'];


    const projects = [
        {
            id: 1,
            title: "Kallos Coffee",
            description: "A full-stack e-commerce solution with admin dashboard, user authentication, payment processing, and inventory management for a premium coffee brand.",
            techStack: ["React", "Node.js", "MongoDB", "Stripe", "JWT", "Redux"],
            techColors: darkMode ? ["#60a5fa", "#34d399", "#a78bfa", "#818cf8", "#f472b6", "#fbbf24"] : ["#3b82f6", "#10b981", "#8b5cf6", "#6366f1", "#ec4899", "#f59e0b"],
            liveUrl: "https://kallos-coffee.com",
            githubUrl: "https://github.com/metadel12/kaloss-coffee",
            category: "Full Stack",
            featured: true,
            imageUrl: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
        },
        {
            id: 2,
            title: "Ethio Code",
            description: "Collaborative coding interview platform with real-time code editing, video conferencing, and advanced project tracking for technical interviews.",
            techStack: ["Vue.js", "Express", "Socket.io", "PostgreSQL", "Redis"],
            techColors: darkMode ? ["#34d399", "#60a5fa", "#a78bfa", "#22d3ee", "#ef4444"] : ["#10b981", "#3b82f6", "#8b5cf6", "#06b6d4", "#dc2626"],
            liveUrl: "https://ethio-code.com",
            githubUrl: "https://github.com/metadel12/ethio-code",
            category: "Full Stack",
            featured: true,
            imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
        },
        {
            id: 3,
            title: "Car Shop",
            description: "Modern car dealership platform with advanced search, virtual test drives, inventory management, and customer relationship management features.",
            techStack: ["React", "D3.js", "Weather API", "Chart.js", "Leaflet"],
            techColors: darkMode ? ["#a78bfa", "#60a5fa", "#22d3ee", "#34d399", "#84cc16"] : ["#8b5cf6", "#3b82f6", "#06b6d4", "#10b981", "#84cc16"],
            liveUrl: "https://car-shop-demo.com",
            githubUrl: "https://github.com/metadel12/car-shop",
            category: "Frontend",
            featured: false,
            imageUrl: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
        },
        {
            id: 4,
            title: "3D Portfolio Website",
            description: "Interactive 3D portfolio with WebGL animations, smooth transitions, particle effects, and immersive user experience using Three.js and React.",
            techStack: ["Three.js", "React", "GSAP", "Framer Motion", "WebGL"],
            techColors: darkMode ? ["#f472b6", "#a78bfa", "#60a5fa", "#22d3ee", "#fbbf24"] : ["#ec4899", "#8b5cf6", "#3b82f6", "#06b6d4", "#f59e0b"],
            liveUrl: "https://3d-portfolio-demo.com",
            githubUrl: "https://github.com/metadel12/3d-portfolio",
            category: "3D Web",
            featured: true,
            imageUrl: "https://images.unsplash.com/photo-1633265486064-086b219458ec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
        },
        {
            id: 5,
            title: "API Management System",
            description: "Comprehensive API management platform with rate limiting, analytics, documentation, developer portal, and real-time monitoring dashboard.",
            techStack: ["Node.js", "Express", "MongoDB", "Redis", "Docker"],
            techColors: darkMode ? ["#fbbf24", "#ef4444", "#34d399", "#60a5fa", "#a78bfa"] : ["#f59e0b", "#dc2626", "#10b981", "#3b82f6", "#8b5cf6"],
            liveUrl: "https://api-management-demo.com",
            githubUrl: "https://github.com/metadel12/api-management",
            category: "Backend",
            featured: false,
            imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
        },
        {
            id: 6,
            title: "Mobile Fitness App",
            description: "Cross-platform fitness application with workout tracking, social features, personalized recommendations, and progress analytics using React Native.",
            techStack: ["React Native", "Firebase", "Node.js", "MongoDB", "Expo"],
            techColors: darkMode ? ["#ef4444", "#34d399", "#60a5fa", "#a78bfa", "#fbbf24"] : ["#dc2626", "#10b981", "#3b82f6", "#8b5cf6", "#f59e0b"],
            liveUrl: "https://fitness-app-demo.com",
            githubUrl: "https://github.com/metadel12/fitness-app",
            category: "Mobile",
            featured: true,
            imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
        },
        {
            id: 7,
            title: "Task Management App",
            description: "Productivity application with task management, team collaboration, time tracking, and project planning features with intuitive UI/UX.",
            techStack: ["React", "TypeScript", "Node.js", "MongoDB", "GraphQL"],
            techColors: darkMode ? ["#8b5cf6", "#06b6d4", "#84cc16", "#f97316", "#ec4899"] : ["#7c3aed", "#0891b2", "#65a30d", "#ea580c", "#db2777"],
            liveUrl: "https://task-manager-demo.com",
            githubUrl: "https://github.com/metadel12/task-manager",
            category: "Full Stack",
            featured: false,
            imageUrl: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
        },
        {
            id: 8,
            title: "E-commerce Analytics",
            description: "Advanced analytics dashboard for e-commerce businesses with sales tracking, customer insights, and predictive analytics using machine learning.",
            techStack: ["Python", "Django", "React", "PostgreSQL", "TensorFlow"],
            techColors: darkMode ? ["#06b6d4", "#8b5cf6", "#84cc16", "#f97316", "#ec4899"] : ["#0891b2", "#7c3aed", "#65a30d", "#ea580c", "#db2777"],
            liveUrl: "https://analytics-demo.com",
            githubUrl: "https://github.com/metadel12/ecommerce-analytics",
            category: "Backend",
            featured: true,
            imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
        }
    ];

    const filteredProjects = activeCategory === 'All'
        ? projects
        : projects.filter(project => project.category === activeCategory);

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


    useEffect(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: projectsRef.current,
                start: "top 70%",
                end: "bottom 30%",
                toggleActions: "play none none reverse"
            }
        });


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
    }, []);

    const handleFilterChange = (category) => {
        setActiveCategory(category);
    };

    return (
        <section
            id="projects"
            ref={projectsRef}
            className={`projects-section ${darkMode ? 'projects-section-dark' : 'projects-section-light'}`}
        >

            <Projects3DScene darkMode={darkMode} />


            <div className="projects-grid-lines">

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
                className="projects-glow"
                animate={{ opacity: [0.2, 0.4, 0.2] }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />


            <motion.div
                className="projects-container"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <div className="projects-content">
                    <div className="projects-text-content">
                        <motion.h2
                            ref={titleRef}
                            className={`projects-title ${darkMode ? 'projects-title-dark' : 'projects-title-light'}`}
                            variants={itemVariants}
                        >
                            My <span className={`projects-name ${darkMode ? 'projects-name-dark' : 'projects-name-light'}`}>Projects</span>
                        </motion.h2>

                        <motion.p
                            ref={subtitleRef}
                            className={`projects-subtitle ${darkMode ? 'projects-subtitle-dark' : 'projects-subtitle-light'}`}
                            variants={itemVariants}
                        >
                            A collection of my recent work showcasing full-stack development,
                            modern technologies, and creative solutions across various domains.
                        </motion.p>


                        <motion.div variants={itemVariants}>
                            <ProjectFilter
                                categories={projectCategories}
                                activeCategory={activeCategory}
                                onFilterChange={handleFilterChange}
                                darkMode={darkMode}
                            />
                        </motion.div>


                        <motion.div
                            className="projects-grid"
                            variants={itemVariants}
                        >
                            {filteredProjects.map((project, index) => (
                                <AnimatedProjectCard
                                    key={project.id}
                                    project={project}
                                    index={index}
                                    darkMode={darkMode}
                                />
                            ))}
                        </motion.div>


                        <motion.div
                            className="projects-cta"
                            variants={itemVariants}
                        >
                            <div className={`cta-content ${darkMode ? 'cta-content-dark' : 'cta-content-light'}`}>
                                <h3 className={`cta-title ${darkMode ? 'cta-title-dark' : 'cta-title-light'}`}>
                                    Ready to start your project?
                                </h3>
                                <p className={`cta-description ${darkMode ? 'cta-description-dark' : 'cta-description-light'}`}>
                                    Let's work together to bring your ideas to life with cutting-edge technology and innovative solutions.
                                </p>
                                <motion.a
                                    href="#contact"
                                    className={`cta-button ${darkMode ? 'cta-button-dark' : 'cta-button-light'}`}
                                    onMouseEnter={() => setCursorVariant("button")}
                                    onMouseLeave={() => setCursorVariant("default")}
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <span>Start a Project</span>
                                    <ArrowRight size={20} />
                                </motion.a>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default Projects;