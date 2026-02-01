// src/constants/animations.js
// Shared animation variants for consistent micro-interactions

export const customEasing = [0.25, 0.1, 0.25, 1];

// Fade up with blur-to-sharp transition
export const fadeUpBlur = {
    hidden: {
        opacity: 0,
        y: 40,
        filter: "blur(4px)",
    },
    visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: {
            duration: 0.5,
            ease: customEasing,
        },
    },
};

// Container with staggered children
export const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1,
        },
    },
};

// Individual stagger items
export const staggerItem = {
    hidden: {
        opacity: 0,
        y: 20,
        filter: "blur(4px)",
    },
    visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: {
            duration: 0.4,
            ease: customEasing,
        },
    },
};

// Letter-by-letter reveal for headings
export const letterReveal = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.03,
            duration: 0.4,
            ease: customEasing,
        },
    }),
};

// Scale and fade for cards on hover
export const cardHover = {
    rest: {
        scale: 1,
        boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
    },
    hover: {
        scale: 1.02,
        boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1)",
        transition: {
            duration: 0.3,
            ease: customEasing,
        },
    },
};

// Navbar scroll animation
export const navbarScroll = {
    top: {
        height: 80,
        backdropFilter: "blur(8px)",
        borderBottom: "1px solid transparent",
    },
    scrolled: {
        height: 60,
        backdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(0,0,0,0.1)",
    },
};

// Timeline item reveal
export const timelineItem = {
    hidden: {
        opacity: 0,
        x: -20,
        filter: "blur(4px)",
    },
    visible: {
        opacity: 1,
        x: 0,
        filter: "blur(0px)",
        transition: {
            duration: 0.5,
            ease: customEasing,
        },
    },
};

// Slide in from different directions
export const slideIn = {
    left: {
        hidden: { opacity: 0, x: -60 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.5, ease: customEasing },
        },
    },
    right: {
        hidden: { opacity: 0, x: 60 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.5, ease: customEasing },
        },
    },
    up: {
        hidden: { opacity: 0, y: 60 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: customEasing },
        },
    },
};
