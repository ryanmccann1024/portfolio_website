// src/components/TerminalIntro.jsx
// Impressive terminal boot sequence with 3D WebGL background

import React, { useState, useEffect, useCallback, useRef, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";

const TYPING_SPEED = 30;

// Realistic Linux boot sequence
const bootSequence = [
    { text: "[    0.000000] Linux version 6.5.0-neural (gcc 13.2.0)", delay: 50 },
    { text: "[    0.000000] Command line: BOOT_IMAGE=/vmlinuz root=/dev/nvme0n1p2", delay: 40 },
    { text: "[    0.004521] BIOS-provided physical RAM map:", delay: 30 },
    { text: "[    0.004523]   BIOS-e820: [mem 0x0000000000000000-0x000000000009ffff] usable", delay: 20 },
    { text: "[    0.052341] CPU: AMD Ryzen 9 7950X (32) @ 5.759GHz", delay: 40 },
    { text: "[    0.052344] ACPI: Core revision 20230628", delay: 30 },
    { text: "[    0.089234] nvidia: loading driver version 545.29.06", delay: 50 },
    { text: "[    0.134521] nvme nvme0: pci function 0000:01:00.0", delay: 30 },
    { text: "[    0.234521] EXT4-fs (nvme0n1p2): mounted filesystem", delay: 40 },
    { text: "[    0.345123] systemd[1]: Detected architecture x86-64.", delay: 50 },
    { text: "[    0.345234] systemd[1]: Hostname set to <neural-workstation>.", delay: 40 },
    { text: "[    0.456789] systemd[1]: Reached target Multi-User System.", delay: 50 },
];

// Terminal commands - each is a complete unit
const terminalScript = [
    { type: "info", text: `Last login: ${new Date().toLocaleString()} on ttys000` },
    { type: "blank" },
    { type: "command", cmd: "neofetch --off" },
    { type: "neofetch" },
    { type: "command", cmd: "whoami" },
    { type: "output", text: "ryan.mccann" },
    { type: "command", cmd: "cat ~/.mission" },
    { type: "output", text: '"Software Engineer. Product Builder. OSS Enthusiast."' },
    { type: "command", cmd: "echo $CURRENT_FOCUS" },
    { type: "output", text: "Shipping software, one commit at a time" },
    { type: "command", cmd: "git log --oneline -1" },
    { type: "output", text: "a1b2c3d feat: launch portfolio v2.0" },
    { type: "command", cmd: "./launch_portfolio.sh --mode=production" },
    { type: "output", text: "[INFO] Initializing 3D renderer..." },
    { type: "output", text: "[INFO] Loading assets..." },
    { type: "progress" },
    { type: "output", text: "[SUCCESS] Portfolio ready." },
    { type: "output", text: "[INFO] Launching visual interface..." },
    { type: "launch" },
];

// Neofetch ASCII art - full version for desktop
const neofetchArt = `       _,met$$$$$gg.           ryan@neural
    ,g$$$$$$$$$$$$$$$P.        -----------
  ,g$$P"        """Y$$.".      OS: NeuralOS 4.2.0
 ,$$P'              \`$$$.     Kernel: 6.5.0-neural
',$$P       ,ggs.    \`$$b:    Uptime: ∞
\`d$$'     ,$P"'   .   $$$     Shell: zsh 5.9
 $$P      d$'     ,   $$P     CPU: Ryzen 9 7950X
 $$:      $$.   -    ,d$$'    GPU: RTX 4090 24GB
 $$;      Y$b._   _,d$P'      Memory: 64GB DDR5
 Y$$.    \`.    d$$$'         Disk: 2TB NVMe
 \`$$b      "-.__
  \`Y$$                       ████████████████
   \`Y$$.
     \`$$b.`;

// Compact neofetch for mobile
const neofetchArtMobile = `ryan@neural
-----------
OS: NeuralOS 4.2.0
Shell: zsh 5.9
CPU: Ryzen 9 7950X
GPU: RTX 4090
Memory: 64GB DDR5
████████████████`;

// 3D Particle field
function ParticleField() {
    const ref = useRef();
    const [positions] = useState(() => {
        const pos = new Float32Array(3000 * 3);
        for (let i = 0; i < 3000; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 25;
            pos[i * 3 + 1] = (Math.random() - 0.5) * 25;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 25;
        }
        return pos;
    });

    useFrame((state, delta) => {
        if (ref.current) {
            ref.current.rotation.y += delta * 0.03;
            ref.current.rotation.x += delta * 0.01;
        }
    });

    return (
        <Points ref={ref} positions={positions} stride={3}>
            <PointMaterial
                transparent
                color="#22c55e"
                size={0.025}
                sizeAttenuation={true}
                depthWrite={false}
                opacity={0.6}
            />
        </Points>
    );
}

// Wireframe grid
function WireframeGrid() {
    const ref = useRef();

    useFrame((state) => {
        if (ref.current) {
            ref.current.rotation.x = Math.PI / 2;
            ref.current.position.y = -3;
            ref.current.position.z = Math.sin(state.clock.elapsedTime * 0.2) * 0.5;
        }
    });

    return (
        <mesh ref={ref}>
            <planeGeometry args={[40, 40, 40, 40]} />
            <meshBasicMaterial color="#22c55e" wireframe transparent opacity={0.08} />
        </mesh>
    );
}

// Floating cubes
function FloatingCubes() {
    const group = useRef();
    const cubes = useRef([]);

    useFrame((state) => {
        if (group.current) {
            group.current.rotation.y = state.clock.elapsedTime * 0.05;
        }
        cubes.current.forEach((cube, i) => {
            if (cube) {
                cube.rotation.x += 0.005;
                cube.rotation.z += 0.005;
                cube.position.y = Math.sin(state.clock.elapsedTime + i * 0.5) * 0.3;
            }
        });
    });

    return (
        <group ref={group}>
            {[0, 1, 2, 3, 4, 5].map((i) => (
                <mesh
                    key={i}
                    ref={(el) => (cubes.current[i] = el)}
                    position={[
                        Math.cos((i / 6) * Math.PI * 2) * 5,
                        0,
                        Math.sin((i / 6) * Math.PI * 2) * 5 - 5,
                    ]}
                >
                    <boxGeometry args={[0.4, 0.4, 0.4]} />
                    <meshBasicMaterial color="#22c55e" wireframe transparent opacity={0.2} />
                </mesh>
            ))}
        </group>
    );
}

// 3D Scene
function Scene3D() {
    return (
        <Canvas camera={{ position: [0, 0, 10], fov: 60 }} style={{ background: 'transparent' }}>
            <Suspense fallback={null}>
                <ParticleField />
                <WireframeGrid />
                <FloatingCubes />
            </Suspense>
        </Canvas>
    );
}

// Typing animation
function TypeWriter({ text, onComplete, speed = TYPING_SPEED }) {
    const [displayed, setDisplayed] = useState("");

    useEffect(() => {
        if (displayed.length < text.length) {
            const timer = setTimeout(() => {
                setDisplayed(text.slice(0, displayed.length + 1));
            }, speed + Math.random() * 15);
            return () => clearTimeout(timer);
        } else {
            const doneTimer = setTimeout(() => onComplete?.(), 100);
            return () => clearTimeout(doneTimer);
        }
    }, [displayed, text, speed, onComplete]);

    return (
        <>
            {displayed}
            {displayed.length < text.length && <span className="animate-pulse">▋</span>}
        </>
    );
}

// Progress bar
function ProgressBar({ onComplete }) {
    const [progress, setProgress] = useState(0);
    const barWidth = 40;

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((p) => {
                if (p >= 100) {
                    clearInterval(interval);
                    setTimeout(() => onComplete?.(), 200);
                    return 100;
                }
                return p + Math.random() * 12 + 3;
            });
        }, 50);
        return () => clearInterval(interval);
    }, [onComplete]);

    const filled = Math.floor((Math.min(progress, 100) / 100) * barWidth);
    return (
        <span className="text-emerald-400">
            [{"█".repeat(filled)}{"░".repeat(barWidth - filled)}] {Math.min(Math.floor(progress), 100)}%
        </span>
    );
}

// Terminal prompt
function Prompt() {
    return (
        <>
            <span className="text-emerald-400">❯</span>
            <span className="text-blue-400 ml-2">~</span>
            <span className="text-gray-500 ml-1">$</span>
        </>
    );
}

export default function TerminalIntro({ onComplete }) {
    const [phase, setPhase] = useState("boot");
    const [bootIndex, setBootIndex] = useState(0);
    const [scriptIndex, setScriptIndex] = useState(0);
    const [isTyping, setIsTyping] = useState(false);
    const [completedLines, setCompletedLines] = useState([]);
    const [isExiting, setIsExiting] = useState(false);
    const terminalRef = useRef(null);
    const [ready, setReady] = useState(false);
    const [isDesktop, setIsDesktop] = useState(true);

    // Skip terminal on non-desktop screens (< 1024px)
    useEffect(() => {
        const checkDesktop = () => {
            const desktop = window.innerWidth >= 1024;
            setIsDesktop(desktop);
            if (!desktop) {
                onComplete?.();
            }
        };
        checkDesktop();
        // Don't add resize listener - only check on mount
    }, [onComplete]);

    // Delay start so terminal can fade in first
    useEffect(() => {
        const timer = setTimeout(() => setReady(true), 600);
        return () => clearTimeout(timer);
    }, []);

    // Auto scroll
    useEffect(() => {
        if (terminalRef.current) {
            terminalRef.current.scrollTo({
                top: terminalRef.current.scrollHeight,
                behavior: 'smooth'
            });
        }
    }, [bootIndex, completedLines, scriptIndex]);

    // Boot sequence
    useEffect(() => {
        if (phase !== "boot" || !ready) return;

        if (bootIndex < bootSequence.length) {
            const timer = setTimeout(() => {
                setBootIndex((i) => i + 1);
            }, bootSequence[bootIndex].delay);
            return () => clearTimeout(timer);
        } else {
            const timer = setTimeout(() => setPhase("terminal"), 400);
            return () => clearTimeout(timer);
        }
    }, [phase, bootIndex, ready]);

    // Terminal script execution
    useEffect(() => {
        if (phase !== "terminal" || isTyping || isExiting) return;
        if (scriptIndex >= terminalScript.length) return;

        const current = terminalScript[scriptIndex];

        if (current.type === "command") {
            setIsTyping(true);
        } else if (current.type === "launch") {
            setTimeout(() => {
                setIsExiting(true);
                onComplete?.();
            }, 500);
        } else if (current.type === "progress") {
            // Progress bar handles its own completion
        } else {
            // For non-command types, add to completed and move on
            setCompletedLines((lines) => [...lines, { ...current, index: scriptIndex }]);
            const timer = setTimeout(() => {
                setScriptIndex((i) => i + 1);
            }, current.type === "neofetch" ? 600 : current.type === "output" ? 150 : 50);
            return () => clearTimeout(timer);
        }
    }, [phase, scriptIndex, isTyping, isExiting, onComplete]);

    const handleCommandTyped = useCallback(() => {
        const current = terminalScript[scriptIndex];
        setCompletedLines((lines) => [...lines, { ...current, index: scriptIndex }]);
        setIsTyping(false);
        setScriptIndex((i) => i + 1);
    }, [scriptIndex]);

    const handleProgressComplete = useCallback(() => {
        setCompletedLines((lines) => [...lines, { type: "progress-done", index: scriptIndex }]);
        setScriptIndex((i) => i + 1);
    }, [scriptIndex]);

    const handleSkip = () => {
        setIsExiting(true);
        onComplete?.();
    };

    const currentItem = terminalScript[scriptIndex];

    // Don't render on non-desktop screens
    if (!isDesktop) {
        return null;
    }

    return (
        <AnimatePresence>
            {!isExiting ? (
                <motion.div
                    className="fixed inset-0 z-50 bg-black overflow-hidden"
                    exit={{ opacity: 0, filter: "blur(8px)" }}
                    transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
                    onClick={handleSkip}
                >
                    {/* 3D Background */}
                    <motion.div
                        className="absolute inset-0"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.6 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                    >
                        <Scene3D />
                    </motion.div>

                    {/* Scanlines */}
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)",
                            opacity: 0.03,
                        }}
                    />

                    {/* Vignette */}
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{ background: "radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.8) 100%)" }}
                    />

                    {/* Terminal */}
                    <div className="absolute inset-0 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                            className="w-full max-w-4xl relative"
                        >
                            <div className="bg-gray-900/95 backdrop-blur-xl rounded-xl border border-emerald-500/20 shadow-2xl shadow-emerald-900/20 overflow-hidden">
                                {/* Title bar */}
                                <div className="flex items-center gap-2 px-4 py-3 bg-gray-800/80 border-b border-gray-700/50">
                                    <div className="flex gap-2">
                                        <div className="w-3 h-3 rounded-full bg-red-500" />
                                        <div className="w-3 h-3 rounded-full bg-yellow-500" />
                                        <div className="w-3 h-3 rounded-full bg-green-500" />
                                    </div>
                                    <div className="flex-1 text-center">
                                        <span className="text-xs text-gray-400 font-mono">ryan@neural — zsh</span>
                                    </div>
                                    <span className="text-xs text-gray-600 font-mono">{new Date().toLocaleTimeString()}</span>
                                </div>

                                {/* Content */}
                                <div
                                    ref={terminalRef}
                                    className="p-5 pb-8 font-mono text-sm h-[500px] overflow-y-auto"
                                >
                                    {/* Boot phase */}
                                    {phase === "boot" && (
                                        <div className="space-y-0.5">
                                            <div className="text-emerald-400 text-xs mb-2">█▓▒░ NEURAL-OS v4.2.0 ░▒▓█</div>
                                            {bootSequence.slice(0, bootIndex).map((line, i) => (
                                                <div key={i} className="text-gray-600 text-xs">{line.text}</div>
                                            ))}
                                        </div>
                                    )}

                                    {/* Terminal phase */}
                                    {phase === "terminal" && (
                                        <>
                                            {/* Boot summary */}
                                            <div className="text-gray-700 text-xs mb-4 space-y-0.5">
                                                <div className="text-emerald-400 text-xs mb-2">█▓▒░ NEURAL-OS v4.2.0 ░▒▓█</div>
                                                {bootSequence.slice(-4).map((line, i) => (
                                                    <div key={i}>{line.text}</div>
                                                ))}
                                            </div>

                                            <div className="border-t border-gray-800 pt-4 space-y-2">
                                                {/* Completed lines */}
                                                {completedLines.map((line, i) => (
                                                    <div key={i}>
                                                        {line.type === "info" && (
                                                            <div className="text-gray-500 text-xs">{line.text}</div>
                                                        )}
                                                        {line.type === "blank" && <div className="h-4" />}
                                                        {line.type === "command" && (
                                                            <div className="flex items-start gap-1">
                                                                <Prompt />
                                                                <span className="text-gray-100 ml-2">{line.cmd}</span>
                                                            </div>
                                                        )}
                                                        {line.type === "output" && (
                                                            <div className="text-gray-400 pl-6">{line.text}</div>
                                                        )}
                                                        {line.type === "neofetch" && (
                                                            <pre className="text-blue-400 text-xs pl-2 my-2 leading-tight">
                                                                {neofetchArt}
                                                            </pre>
                                                        )}
                                                        {line.type === "progress-done" && (
                                                            <div className="text-emerald-400 pl-6">
                                                                [████████████████████████████████████████] 100%
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}

                                                {/* Currently typing command */}
                                                {isTyping && currentItem?.type === "command" && (
                                                    <div className="flex items-start gap-1">
                                                        <Prompt />
                                                        <span className="text-gray-100 ml-2">
                                                            <TypeWriter text={currentItem.cmd} onComplete={handleCommandTyped} />
                                                        </span>
                                                    </div>
                                                )}

                                                {/* Progress bar */}
                                                {currentItem?.type === "progress" && !completedLines.find(l => l.type === "progress-done" && l.index === scriptIndex) && (
                                                    <div className="pl-6">
                                                        <ProgressBar onComplete={handleProgressComplete} />
                                                    </div>
                                                )}
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* Glow */}
                            <div className="absolute -bottom-10 left-10 right-10 h-20 bg-emerald-500/15 blur-3xl rounded-full" />
                        </motion.div>

                    </div>

                    {/* Skip hint */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 2 }}
                        className="absolute top-6 left-1/2 -translate-x-1/2 text-gray-500 text-xs font-mono pointer-events-none"
                    >
                        click anywhere to skip
                    </motion.div>
                </motion.div>
            ) : null}
        </AnimatePresence>
    );
}
