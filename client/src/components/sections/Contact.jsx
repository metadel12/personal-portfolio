import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Mail, Phone, MapPin, MessageCircle, Zap } from 'lucide-react';
import './Contact.css';


gsap.registerPlugin(ScrollTrigger);


const Contact3DScene = ({ darkMode }) => {
    return (
        <div className={`contact-3d-scene ${darkMode ? 'contact-3d-scene-dark' : 'contact-3d-scene-light'}`}>
            <Canvas camera={{ position: [0, 0, 4] }}>
                <ambientLight intensity={darkMode ? 0.3 : 0.5} />
                <pointLight position={[10, 10, 10]} intensity={darkMode ? 0.8 : 1} />
                <OrbitControls enableZoom={false} enablePan={false} />
            </Canvas>
        </div>
    );
};


const AnimatedContactMethod = ({ method, index, darkMode }) => {
    const methodRef = useRef();
    const iconRef = useRef();

    useEffect(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: methodRef.current,
                start: "top 85%",
                end: "bottom 15%",
                toggleActions: "play none none reverse"
            }
        });

        tl.fromTo(methodRef.current,
            { x: -50, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.8, ease: "power2.out", delay: index * 0.2 }
        );

        tl.fromTo(iconRef.current,
            { scale: 0, rotation: -180 },
            { scale: 1, rotation: 0, duration: 0.6, ease: "back.out(1.7)" },
            "-=0.5"
        );


        const handleMouseEnter = () => {
            gsap.to(methodRef.current, {
                y: -5,
                scale: 1.02,
                duration: 0.3,
                ease: "power2.out"
            });

            gsap.to(iconRef.current, {
                scale: 1.2,
                duration: 0.3,
                ease: "power2.out"
            });
        };

        const handleMouseLeave = () => {
            gsap.to(methodRef.current, {
                y: 0,
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
            });

            gsap.to(iconRef.current, {
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
            });
        };

        if (methodRef.current) {
            methodRef.current.addEventListener('mouseenter', handleMouseEnter);
            methodRef.current.addEventListener('mouseleave', handleMouseLeave);
        }

        return () => {
            if (methodRef.current) {
                methodRef.current.removeEventListener('mouseenter', handleMouseEnter);
                methodRef.current.removeEventListener('mouseleave', handleMouseLeave);
            }
        };
    }, [index]);

    return (
        <a
            ref={methodRef}
            href={method.href}
            className={`contact-method ${darkMode ? 'contact-method-dark' : 'contact-method-light'}`}
            style={{ '--method-color': method.color }}
        >
            <div className={`method-glow ${darkMode ? 'method-glow-dark' : 'method-glow-light'}`}></div>
            <div ref={iconRef} className="method-icon">
                <method.icon size={24} />
            </div>
            <div className="method-content">
                <h4 className={`method-label ${darkMode ? 'method-label-dark' : 'method-label-light'}`}>{method.label}</h4>
                <p className={`method-value ${darkMode ? 'method-value-dark' : 'method-value-light'}`}>{method.value}</p>
            </div>
            <div className="method-arrow">
                <Zap size={16} />
            </div>
        </a>
    );
};

const Contact = ({ darkMode }) => {
    const sectionRef = useRef();
    const titleRef = useRef();
    const subtitleRef = useRef();

    const contactMethods = [
        {
            icon: Mail,
            label: 'Email',
            value: 'metizomawa@gmail.com',
            href: 'mailto:metizomawa@gmail.com',
            color: darkMode ? '#f87171' : '#ea4335'
        },
        {
            icon: Phone,
            label: 'Phone',
            value: '+251923956310',
            href: 'tel:+251923956310',
            color: darkMode ? '#34d399' : '#34a853'
        },
        {
            icon: MapPin,
            label: 'Location',
            value: 'Addis Ababa, Ethiopia',
            href: '#',
            color: darkMode ? '#60a5fa' : '#4285f4'
        },
        {
            icon: MessageCircle,
            label: 'Social',
            value: 'Available for chat',
            href: '#',
            color: darkMode ? '#a78bfa' : '#8b5cf6'
        }
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

    return (
        <section
            id="contact"
            ref={sectionRef}
            className={`contact-section ${darkMode ? 'contact-section-dark' : 'contact-section-light'}`}
        >

            <div className="contact-grid-lines">

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


            <div className="contact-glow"></div>


            <Contact3DScene darkMode={darkMode} />

            <div className="contact-container">

                <div className="contact-header">
                    <h2 ref={titleRef} className={`contact-title ${darkMode ? 'contact-title-dark' : 'contact-title-light'}`}>
                        Let's <span className={`contact-title-gradient ${darkMode ? 'contact-title-gradient-dark' : 'contact-title-gradient-light'}`}>Connect</span>
                    </h2>
                    <p ref={subtitleRef} className={`contact-subtitle ${darkMode ? 'contact-subtitle-dark' : 'contact-subtitle-light'}`}>
                        Ready to bring your ideas to life? Let's discuss your project and create something amazing together.
                    </p>
                </div>

                <div className="contact-content">

                    <div className="contact-methods">
                        <div className="methods-header">
                            <h3 className={`methods-title ${darkMode ? 'methods-title-dark' : 'methods-title-light'}`}>Get In Touch</h3>
                            <p className={`methods-description ${darkMode ? 'methods-description-dark' : 'methods-description-light'}`}>
                                Choose your preferred way to reach out. I'm always available for new opportunities and collaborations.
                            </p>
                        </div>

                        <div className="methods-grid">
                            {contactMethods.map((method, index) => (
                                <AnimatedContactMethod
                                    key={method.label}
                                    method={method}
                                    index={index}
                                    darkMode={darkMode}
                                />
                            ))}
                        </div>


                        <div className="contact-info">
                            <div className={`info-item ${darkMode ? 'info-item-dark' : 'info-item-light'}`}>
                                <div className="info-icon">🚀</div>
                                <div className="info-content">
                                    <strong className={`${darkMode ? 'info-strong-dark' : 'info-strong-light'}`}>Fast Response</strong>
                                    <span className={`${darkMode ? 'info-span-dark' : 'info-span-light'}`}>Typically replies within 24 hours</span>
                                </div>
                            </div>
                            <div className={`info-item ${darkMode ? 'info-item-dark' : 'info-item-light'}`}>
                                <div className="info-icon">💼</div>
                                <div className="info-content">
                                    <strong className={`${darkMode ? 'info-strong-dark' : 'info-strong-light'}`}>Available for Work</strong>
                                    <span className={`${darkMode ? 'info-span-dark' : 'info-span-light'}`}>Open to full-time and freelance</span>
                                </div>
                            </div>
                        </div>


                        <div className={`contact-cta ${darkMode ? 'contact-cta-dark' : 'contact-cta-light'}`}>
                            <h4 className={`cta-title ${darkMode ? 'cta-title-dark' : 'cta-title-light'}`}>Ready to Start Your Project?</h4>
                            <p className={`cta-description ${darkMode ? 'cta-description-dark' : 'cta-description-light'}`}>
                                Let's work together to bring your vision to life with cutting-edge technology and innovative solutions.
                            </p>
                            <div className="cta-buttons">
                                <a href="mailto:metizomawa@gmail.com" className={`cta-button primary ${darkMode ? 'cta-button-primary-dark' : 'cta-button-primary-light'}`}>
                                    <Mail size={20} />
                                    <span>Email Me</span>
                                </a>
                                <a href="tel:+251923956310" className={`cta-button secondary ${darkMode ? 'cta-button-secondary-dark' : 'cta-button-secondary-light'}`}>
                                    <Phone size={20} />
                                    <span>Call Now</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;