import { useEffect, useRef } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react'
import { gsap } from 'gsap';
import { Github, Linkedin, Mail, Twitter, Heart, ArrowUp, Code } from 'lucide-react';
import './Footer.css';

const Footer = ({ darkMode }) => {
    const currentYear = new Date().getFullYear();
    const footerRef = useRef();
    const contentRef = useRef();
    const socialLinksRef = useRef();
    const copyrightRef = useRef();

    const socialLinks = [
        {
            icon: Github,
            href: 'https://github.com/metadel12',
            label: 'GitHub',
            color: darkMode ? '#a78bfa' : '#6e5494'
        },
        {
            icon: Linkedin,
            href: 'https://linkedin.com/in/metadel',
            label: 'LinkedIn',
            color: darkMode ? '#60a5fa' : '#0077b5'
        },
        {
            icon: Twitter,
            href: 'https://twitter.com/metadel',
            label: 'Twitter',
            color: darkMode ? '#7dd3fc' : '#1da1f2'
        },
        {
            icon: Mail,
            href: 'mailto:metizomawa@gmial.com',
            label: 'Email',
            color: darkMode ? '#f87171' : '#ea4335'
        },
    ];

    const quickLinks = [
        { name: 'Home', href: '#home' },
        { name: 'About', href: '#about' },
        { name: 'Skills', href: '#skills' },
        { name: 'Projects', href: '#projects' },
        { name: 'Contact', href: '#contact' }
    ];

    const techStack = ['React', 'Node.js', 'Three.js', 'GSAP', 'CSS3', 'Vite'];

    useEffect(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: footerRef.current,
                start: "top 90%",
                end: "bottom 10%",
                toggleActions: "play none none reverse"
            }
        });

        // Content animation
        tl.fromTo(contentRef.current,
            { y: 100, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
        );

        // Social links animation
        tl.fromTo(socialLinksRef.current.children,
            { scale: 0, rotation: -180, opacity: 0 },
            { scale: 1, rotation: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "back.out(1.7)" },
            "-=0.5"
        );

        // Copyright animation
        tl.fromTo(copyrightRef.current,
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
            "-=0.3"
        );

        // Floating animation for background elements
        gsap.to('.footer-particle', {
            y: '+=20',
            duration: 4,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            stagger: 1
        });

        // Continuous rotation for tech icons
        gsap.to('.tech-icon', {
            rotation: 360,
            duration: 8,
            repeat: -1,
            ease: "none"
        });
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleQuickLinkClick = (href) => {
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <footer ref={footerRef} className={`footer ${darkMode ? 'footer-dark' : 'footer-light'}`}>
            {/* Background Elements */}
            <div className="footer-background">
                <div className={`footer-particle particle-1 ${darkMode ? 'footer-particle-dark' : 'footer-particle-light'}`}></div>
                <div className={`footer-particle particle-2 ${darkMode ? 'footer-particle-dark' : 'footer-particle-light'}`}></div>
                <div className={`footer-particle particle-3 ${darkMode ? 'footer-particle-dark' : 'footer-particle-light'}`}></div>
                <div className={`footer-wave ${darkMode ? 'footer-wave-dark' : 'footer-wave-light'}`}></div>
            </div>

            {/* Background Grid Lines */}
            <div className="footer-grid-lines">
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
            <div className="footer-glow"></div>

            <div className="footer-container">
                <div ref={contentRef} className="footer-content">
                    {/* Main Footer Section */}
                    <div className="footer-main">
                        {/* Brand Section */}
                        <div className="footer-brand">
                            <div className={`brand-logo ${darkMode ? 'brand-logo-dark' : 'brand-logo-light'}`}>
                                <Code size={32} />
                                <span className={`brand-text ${darkMode ? 'brand-text-dark' : 'brand-text-light'}`}>Metadel</span>
                            </div>
                            <p className={`brand-tagline ${darkMode ? 'brand-tagline-dark' : 'brand-tagline-light'}`}>
                                Full-Stack Developer & Digital Creator
                            </p>
                            <p className={`brand-description ${darkMode ? 'brand-description-dark' : 'brand-description-light'}`}>
                                Crafting exceptional digital experiences with modern technologies
                                and innovative solutions.
                            </p>
                        </div>

                        {/* Quick Links */}
                        <div className="footer-links">
                            <h4 className={`links-title ${darkMode ? 'links-title-dark' : 'links-title-light'}`}>Quick Links</h4>
                            <div className="links-grid">
                                {quickLinks.map((link) => (
                                    <a
                                        key={link.name}
                                        href={link.href}
                                        className={`footer-link ${darkMode ? 'footer-link-dark' : 'footer-link-light'}`}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleQuickLinkClick(link.href);
                                        }}
                                    >
                                        {link.name}
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Tech Stack */}
                        <div className="footer-tech">
                            <h4 className={`tech-title ${darkMode ? 'tech-title-dark' : 'tech-title-light'}`}>Tech Stack</h4>
                            <div className="tech-grid">
                                {techStack.map((tech) => (
                                    <div key={tech} className={`tech-item ${darkMode ? 'tech-item-dark' : 'tech-item-light'}`}>
                                        <div className={`tech-icon ${darkMode ? 'tech-icon-dark' : 'tech-icon-light'}`}>
                                            <Code size={14} />
                                        </div>
                                        <span className={`tech-text ${darkMode ? 'tech-text-dark' : 'tech-text-light'}`}>{tech}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="footer-social">
                            <h4 className={`social-title ${darkMode ? 'social-title-dark' : 'social-title-light'}`}>Let's Connect</h4>
                            <p className={`social-description ${darkMode ? 'social-description-dark' : 'social-description-light'}`}>
                                Reach out for collaborations or just say hello!
                            </p>
                            <div ref={socialLinksRef} className="social-links">
                                {socialLinks.map((social) => (
                                    <a
                                        key={social.label}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`social-link ${darkMode ? 'social-link-dark' : 'social-link-light'}`}
                                        style={{ '--social-color': social.color }}
                                        aria-label={social.label}
                                    >
                                        <social.icon size={20} />
                                        <div className={`social-tooltip ${darkMode ? 'social-tooltip-dark' : 'social-tooltip-light'}`}>{social.label}</div>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Footer Bottom */}
                    <div className="footer-bottom">
                        <div ref={copyrightRef} className="footer-copyright">
                            <div className={`copyright-content ${darkMode ? 'copyright-content-dark' : 'copyright-content-light'}`}>
                                <span className={`copyright-text ${darkMode ? 'copyright-text-dark' : 'copyright-text-light'}`}>
                                    © {currentYear} Metadel Abere. Crafted with
                                </span>
                                <Heart size={16} className={`heart-icon ${darkMode ? 'heart-icon-dark' : 'heart-icon-light'}`} />
                                <span className={`copyright-text ${darkMode ? 'copyright-text-dark' : 'copyright-text-light'}`}>
                                    using React, Three.js & GSAP
                                </span>
                            </div>
                        </div>

                        {/* Back to Top Button */}
                        <button
                            onClick={scrollToTop}
                            className={`back-to-top ${darkMode ? 'back-to-top-dark' : 'back-to-top-light'}`}
                            aria-label="Back to top"
                        >
                            <ArrowUp size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;