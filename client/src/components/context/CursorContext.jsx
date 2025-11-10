// context/CursorContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the context
const CursorContext = createContext();

// Custom hook to use the cursor context
export const useCursor = () => {
    const context = useContext(CursorContext);
    if (!context) {
        throw new Error('useCursor must be used within a CursorProvider');
    }
    return context;
};

// Provider component
export const CursorProvider = ({ children }) => {
    const [cursorVariant, setCursorVariant] = useState('default');
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const mouseMove = (e) => {
            setMousePosition({
                x: e.clientX,
                y: e.clientY
            });
        };

        window.addEventListener('mousemove', mouseMove);

        return () => {
            window.removeEventListener('mousemove', mouseMove);
        };
    }, []);

    // Variants for different cursor states
    const variants = {
        default: {
            x: mousePosition.x - 16,
            y: mousePosition.y - 16,
            backgroundColor: '#3b82f6',
            mixBlendMode: 'difference',
            scale: 1,
        },
        text: {
            x: mousePosition.x - 40,
            y: mousePosition.y - 40,
            backgroundColor: '#ffffff',
            mixBlendMode: 'difference',
            scale: 2,
        },
        button: {
            x: mousePosition.x - 20,
            y: mousePosition.y - 20,
            backgroundColor: '#3b82f6',
            mixBlendMode: 'normal',
            scale: 1.5,
        },
        hidden: {
            x: mousePosition.x - 16,
            y: mousePosition.y - 16,
            backgroundColor: '#3b82f6',
            scale: 0,
        }
    };

    const value = {
        cursorVariant,
        setCursorVariant,
        variants,
        mousePosition
    };

    return (
        <CursorContext.Provider value={value}>
            {children}
        </CursorContext.Provider>
    );
};