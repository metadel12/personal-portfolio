// components/Cursor.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { useCursor } from '../context/CursorContext';
import './Cursor.css';

const Cursor = () => {
    const { cursorVariant, variants } = useCursor();

    return (
        <>
            <motion.div
                className="cursor"
                variants={variants}
                animate={cursorVariant}
                transition={{
                    type: "spring",
                    damping: 20,
                    stiffness: 300,
                    mass: 0.5
                }}
            />
        </>
    );
};

export default Cursor;