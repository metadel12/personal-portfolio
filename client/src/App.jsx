import { useState, useEffect } from 'react'
import { CursorProvider } from './components/context/CursorContext'
import Header from './components/layout/Header'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Skills from './components/sections/Skills'
import Projects from './components/sections/Projects'
import Contact from './components/sections/Contact'
import Footer from './components/layout/Footer'
import Cursor from './components/sections/Cursor'
import './styles/globals.css'

function App() {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    // Check user's system preference
    const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches

    // Check if user has a saved preference
    const savedTheme = localStorage.getItem('portfolio-theme')

    if (savedTheme) {
      setDarkMode(savedTheme === 'dark')
    } else {
      setDarkMode(systemPrefersDark)
    }
  }, [])

  useEffect(() => {
    // Save theme preference to localStorage
    localStorage.setItem('portfolio-theme', darkMode ? 'dark' : 'light')

    // Update document class for dark mode
    if (darkMode) {
      document.documentElement.classList.add('dark-theme')
      document.documentElement.classList.remove('light-theme')
    } else {
      document.documentElement.classList.add('light-theme')
      document.documentElement.classList.remove('dark-theme')
    }
  }, [darkMode])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  return (
    <CursorProvider>
      <div className={`app ${darkMode ? 'dark-theme' : 'light-theme'}`}>
        <Cursor />
        <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <main className="main-content">
          <Hero darkMode={darkMode} />
          <About darkMode={darkMode} />
          <Skills darkMode={darkMode} />
          <Projects darkMode={darkMode} />
          <Contact darkMode={darkMode} />
        </main>
        <Footer darkMode={darkMode} />
      </div>
    </CursorProvider>
  )
}

export default App