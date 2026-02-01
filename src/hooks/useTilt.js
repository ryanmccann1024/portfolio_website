// src/hooks/useTilt.js
// 3D tilt effect hook that tracks mouse position and applies subtle transforms

import { useState, useCallback } from "react";

export default function useTilt(maxTilt = 6) {
    const [style, setStyle] = useState({
        transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
        transition: "transform 0.15s ease-out",
    });

    const handleMouseMove = useCallback(
        (e) => {
            const el = e.currentTarget;
            const rect = el.getBoundingClientRect();

            // Calculate mouse position relative to element center (-1 to 1)
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;

            // Convert to rotation angles
            const rotateX = (y - 0.5) * -maxTilt * 2; // Invert Y for natural feel
            const rotateY = (x - 0.5) * maxTilt * 2;

            setStyle({
                transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
                transition: "transform 0.1s ease-out",
            });
        },
        [maxTilt]
    );

    const handleMouseLeave = useCallback(() => {
        setStyle({
            transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
            transition: "transform 0.4s ease-out",
        });
    }, []);

    return {
        style,
        onMouseMove: handleMouseMove,
        onMouseLeave: handleMouseLeave,
    };
}
