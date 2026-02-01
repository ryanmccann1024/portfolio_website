// src/components/Particles.jsx
// Interactive particle background using tsparticles

import { useCallback, useMemo } from "react";
import Particles from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

export default function ParticleBackground() {
    const particlesInit = useCallback(async (engine) => {
        await loadSlim(engine);
    }, []);

    const options = useMemo(
        () => ({
            fullScreen: false,
            fpsLimit: 60,
            interactivity: {
                events: {
                    onHover: {
                        enable: true,
                        mode: "grab",
                    },
                    resize: true,
                },
                modes: {
                    grab: {
                        distance: 150,
                        links: {
                            opacity: 0.5,
                        },
                    },
                },
            },
            particles: {
                color: {
                    value: ["#3b82f6", "#8b5cf6", "#06b6d4"],
                },
                links: {
                    color: "#3b82f6",
                    distance: 150,
                    enable: true,
                    opacity: 0.15,
                    width: 1,
                },
                move: {
                    enable: true,
                    outModes: {
                        default: "bounce",
                    },
                    random: true,
                    speed: 0.8,
                    straight: false,
                    attract: {
                        enable: true,
                        rotateX: 600,
                        rotateY: 1200,
                    },
                },
                number: {
                    density: {
                        enable: true,
                        area: 1000,
                    },
                    value: 65,
                },
                opacity: {
                    value: { min: 0.3, max: 0.6 },
                    animation: {
                        enable: true,
                        speed: 0.5,
                        minimumValue: 0.2,
                    },
                },
                shape: {
                    type: "circle",
                },
                size: {
                    value: { min: 1, max: 3 },
                },
            },
            detectRetina: true,
        }),
        []
    );

    return (
        <Particles
            id="hero-particles"
            init={particlesInit}
            options={options}
            className="absolute inset-0 -z-5"
        />
    );
}
