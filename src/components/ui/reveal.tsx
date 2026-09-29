"use client";

import {motion, useReducedMotion} from "motion/react";

interface RevealProps {
    children: React.ReactNode;
    className?: string;
    /** Seconds to wait before the reveal starts. */
    delay?: number;
}

export function Reveal({children, className, delay = 0}: RevealProps) {
    const reducedMotion = useReducedMotion();

    return (
        <motion.div
            className={className}
            initial={reducedMotion ? false : {opacity: 0, y: 26}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true, margin: "-60px"}}
            transition={{duration: 0.75, delay, ease: [0.22, 1, 0.36, 1]}}
        >
            {children}
        </motion.div>
    );
}
