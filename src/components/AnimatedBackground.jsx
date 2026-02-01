// src/components/AnimatedBackground.jsx
// 3D WebGL background with floating elements - Apple-style sophistication

import React, { Suspense, useRef, useMemo, Component } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";

// Error boundary for 3D canvas
class CanvasErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }
    static getDerivedStateFromError(error) {
        console.error("3D Canvas error:", error);
        return { hasError: true };
    }
    render() {
        if (this.state.hasError) {
            return null; // Graceful fallback
        }
        return this.props.children;
    }
}
import { Points, PointMaterial, Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

// Floating particles that respond to scroll
function ParticleCloud({ count = 2000 }) {
    const ref = useRef();
    const positions = useMemo(() => {
        const pos = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 25;
            pos[i * 3 + 1] = (Math.random() - 0.5) * 25;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 25;
        }
        return pos;
    }, [count]);

    useFrame((state) => {
        if (ref.current) {
            ref.current.rotation.y = state.clock.elapsedTime * 0.02;
            ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.1;
        }
    });

    return (
        <Points ref={ref} positions={positions} stride={3}>
            <PointMaterial
                transparent
                color="#6366f1"
                size={0.015}
                sizeAttenuation={true}
                depthWrite={false}
                opacity={0.4}
            />
        </Points>
    );
}

// Floating geometric shapes
function FloatingShapes() {
    const group = useRef();
    const shapes = useRef([]);

    useFrame((state) => {
        if (group.current) {
            group.current.rotation.y = state.clock.elapsedTime * 0.03;
        }
        shapes.current.forEach((shape, i) => {
            if (shape) {
                shape.rotation.x += 0.003;
                shape.rotation.y += 0.005;
                shape.position.y = Math.sin(state.clock.elapsedTime * 0.5 + i * 2) * 0.5;
            }
        });
    });

    const shapeData = useMemo(() => [
        { pos: [-5, 2, -3], size: 0.8, color: "#3b82f6" },
        { pos: [6, -1, -4], size: 0.6, color: "#8b5cf6" },
        { pos: [-3, -3, -2], size: 0.5, color: "#06b6d4" },
        { pos: [4, 3, -5], size: 0.7, color: "#10b981" },
        { pos: [0, -4, -3], size: 0.4, color: "#f59e0b" },
        { pos: [-6, 0, -4], size: 0.5, color: "#ec4899" },
    ], []);

    return (
        <group ref={group}>
            {shapeData.map((shape, i) => (
                <Float key={i} speed={1} rotationIntensity={0.5} floatIntensity={0.5}>
                    <mesh
                        ref={(el) => (shapes.current[i] = el)}
                        position={shape.pos}
                    >
                        {i % 3 === 0 ? (
                            <icosahedronGeometry args={[shape.size, 0]} />
                        ) : i % 3 === 1 ? (
                            <octahedronGeometry args={[shape.size, 0]} />
                        ) : (
                            <tetrahedronGeometry args={[shape.size, 0]} />
                        )}
                        <meshBasicMaterial
                            color={shape.color}
                            wireframe
                            transparent
                            opacity={0.15}
                        />
                    </mesh>
                </Float>
            ))}
        </group>
    );
}

// Glowing orb with distortion
function GlowingOrb({ position, color, size = 1 }) {
    const ref = useRef();

    useFrame((state) => {
        if (ref.current) {
            ref.current.distort = 0.3 + Math.sin(state.clock.elapsedTime) * 0.1;
        }
    });

    return (
        <Float speed={2} rotationIntensity={0} floatIntensity={1}>
            <mesh position={position}>
                <sphereGeometry args={[size, 64, 64]} />
                <MeshDistortMaterial
                    ref={ref}
                    color={color}
                    transparent
                    opacity={0.1}
                    distort={0.3}
                    speed={2}
                />
            </mesh>
        </Float>
    );
}

// Infinite grid
function InfiniteGrid() {
    const ref = useRef();

    useFrame((state) => {
        if (ref.current) {
            ref.current.position.z = (state.clock.elapsedTime * 0.5) % 1;
        }
    });

    return (
        <group ref={ref}>
            <gridHelper
                args={[50, 50, "#1e293b", "#1e293b"]}
                position={[0, -5, 0]}
                rotation={[0, 0, 0]}
            />
        </group>
    );
}

// Connection lines between points
function ConnectionLines() {
    const linesRef = useRef();
    const points = useMemo(() => {
        const pts = [];
        for (let i = 0; i < 20; i++) {
            pts.push(new THREE.Vector3(
                (Math.random() - 0.5) * 15,
                (Math.random() - 0.5) * 15,
                (Math.random() - 0.5) * 10 - 5
            ));
        }
        return pts;
    }, []);

    const lineGeometry = useMemo(() => {
        const geometry = new THREE.BufferGeometry();
        const positions = [];

        // Connect nearby points
        for (let i = 0; i < points.length; i++) {
            for (let j = i + 1; j < points.length; j++) {
                const dist = points[i].distanceTo(points[j]);
                if (dist < 5) {
                    positions.push(points[i].x, points[i].y, points[i].z);
                    positions.push(points[j].x, points[j].y, points[j].z);
                }
            }
        }

        geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
        return geometry;
    }, [points]);

    useFrame((state) => {
        if (linesRef.current) {
            linesRef.current.rotation.y = state.clock.elapsedTime * 0.02;
            linesRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
        }
    });

    return (
        <lineSegments ref={linesRef} geometry={lineGeometry}>
            <lineBasicMaterial color="#3b82f6" transparent opacity={0.1} />
        </lineSegments>
    );
}

// Mouse-reactive camera
function CameraRig() {
    const { camera, mouse } = useThree();

    useFrame(() => {
        camera.position.x += (mouse.x * 0.5 - camera.position.x) * 0.02;
        camera.position.y += (mouse.y * 0.3 - camera.position.y) * 0.02;
        camera.lookAt(0, 0, 0);
    });

    return null;
}

// Main 3D Scene
function Scene() {
    return (
        <>
            <CameraRig />
            <ambientLight intensity={0.5} />
            <ParticleCloud />
            <FloatingShapes />
            <ConnectionLines />
            <GlowingOrb position={[-4, 2, -5]} color="#6366f1" size={2} />
            <GlowingOrb position={[5, -2, -6]} color="#8b5cf6" size={1.5} />
            <GlowingOrb position={[0, 0, -8]} color="#06b6d4" size={3} />
            <InfiniteGrid />
        </>
    );
}

export default function AnimatedBackground() {
    return (
        <div className="fixed inset-0 -z-10">
            {/* Base gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50 to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950" />

            {/* 3D Canvas */}
            <div className="absolute inset-0 opacity-70 dark:opacity-100">
                <CanvasErrorBoundary>
                    <Canvas
                        camera={{ position: [0, 0, 10], fov: 60 }}
                        dpr={[1, 2]}
                        gl={{ antialias: true, alpha: true }}
                    >
                        <Suspense fallback={null}>
                            <Scene />
                        </Suspense>
                    </Canvas>
                </CanvasErrorBoundary>
            </div>

            {/* Overlay gradient for text readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/50 via-transparent to-white/50 dark:from-slate-950/50 dark:via-transparent dark:to-slate-950/50" />
        </div>
    );
}
