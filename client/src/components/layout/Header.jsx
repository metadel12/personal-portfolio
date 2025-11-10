// components/layout/Header.jsx
import React, { useState, useEffect } from 'react'
import ThemeToggle from '../ThemeToggle'
import './Header.css'

const Header = ({ darkMode, toggleDarkMode }) => {
    const [isMobile, setIsMobile] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)

    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth <= 768)
        }

        checkScreenSize()
        window.addEventListener('resize', checkScreenSize)

        return () => {
            window.removeEventListener('resize', checkScreenSize)
        }
    }, [])

    const handleLogoClick = () => {
        console.log('Logo clicked - Navigating to home section')
        window.scrollTo({ top: 0, behavior: 'smooth' })
        setMenuOpen(false)
    }

    const handleNavClick = (section) => {
        console.log(`Navigation clicked - Scrolling to ${section} section`)
        setMenuOpen(false)
    }

    const toggleMobileMenu = () => {
        console.log(`Mobile menu ${menuOpen ? 'closed' : 'opened'}`)
        setMenuOpen(!menuOpen)
    }

    return (
        <header className={`header ${darkMode ? 'dark-mode' : ''}`}>
            <div className="container">
                <div className="header-content">
                    {/* Logo */}
                    <div
                        className="logo"
                        onClick={handleLogoClick}
                        style={{ cursor: 'pointer' }}
                    >
                        MA
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="nav-desktop">
                        <a
                            href="#about"
                            className="nav-link"
                            onClick={() => handleNavClick('about')}
                        >
                            About
                        </a>
                        <a
                            href="#skills"
                            className="nav-link"
                            onClick={() => handleNavClick('skills')}
                        >
                            Skills
                        </a>
                        <a
                            href="#projects"
                            className="nav-link"
                            onClick={() => handleNavClick('projects')}
                        >
                            Projects
                        </a>
                        <a
                            href="#contact"
                            className="nav-link"
                            onClick={() => handleNavClick('contact')}
                        >
                            Contact
                        </a>
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        className={`mobile-menu-btn ${menuOpen ? 'open' : ''}`}
                        onClick={toggleMobileMenu}
                        aria-label="Toggle menu"
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>

                    {/* Theme Toggle */}
                    <ThemeToggle
                        darkMode={darkMode}
                        toggleDarkMode={toggleDarkMode}
                    />
                </div>

                {/* Mobile Navigation */}
                <nav className={`nav-mobile ${menuOpen ? 'open' : ''}`}>
                    <a
                        href="#about"
                        className="nav-link"
                        onClick={() => handleNavClick('about')}
                    >
                        About
                    </a>
                    <a
                        href="#skills"
                        className="nav-link"
                        onClick={() => handleNavClick('skills')}
                    >
                        Skills
                    </a>
                    <a
                        href="#projects"
                        className="nav-link"
                        onClick={() => handleNavClick('projects')}
                    >
                        Projects
                    </a>
                    <a
                        href="#contact"
                        className="nav-link"
                        onClick={() => handleNavClick('contact')}
                    >
                        Contact
                    </a>
                </nav>
            </div>
        </header>
    )
}

export default Header