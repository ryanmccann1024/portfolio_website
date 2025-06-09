// src/sections/Contact.jsx
import {Mail, Linkedin, Github, Send} from "lucide-react";
import {motion} from "framer-motion";

/* ---- social links ---------------------------------------------------- */
const socials = [
    {icon: Mail, label: "Email", url: "mailto:ryanjohnmccann@gmail.com"},
    {icon: Linkedin, label: "LinkedIn", url: "https://www.linkedin.com/in/ryanjmccann/"},
    {icon: Github, label: "GitHub", url: "https://github.com/ryanmccann1024"},
];

/* ---- component ------------------------------------------------------- */
export default function Contact() {
    return (
        <section id="contact" className="bg-gray-50 py-24 dark:bg-slate-700">
            <div className="mx-auto max-w-lg px-4 text-center">
                {/* title */}
                <motion.h2
                    initial={{opacity: 0, y: 40}}
                    whileInView={{opacity: 1, y: 0}}
                    viewport={{once: true, amount: 0.3}}
                    transition={{duration: 0.4}}
                    className="mb-4 text-4xl font-extrabold tracking-tight
                     text-gray-900 dark:text-gray-50"
                >
                    Let’s Connect
                </motion.h2>

                {/* subtitle */}
                <motion.p
                    initial={{opacity: 0, y: 40}}
                    whileInView={{opacity: 1, y: 0}}
                    viewport={{once: true, amount: 0.3}}
                    transition={{duration: 0.4, delay: 0.1}}
                    className="mx-auto mb-10 max-w-md text-lg leading-relaxed
                     text-gray-700 dark:text-gray-300"
                >
                    I love meeting curious people, whether it’s about optical networks,
                    AI, or the perfect espresso recipe.
                </motion.p>

                {/* social icons */}
                <motion.div
                    initial={{opacity: 0}}
                    whileInView={{opacity: 1}}
                    viewport={{once: true, amount: 0.3}}
                    transition={{duration: 0.4, delay: 0.2}}
                    className="mb-12 flex justify-center gap-8"
                >
                    {socials.map(({icon: Icon, label, url}) => (
                        <a
                            key={label}
                            href={url}
                            target={url.startsWith("http") ? "_blank" : undefined}
                            rel="noopener noreferrer"
                            aria-label={label}
                            className="rounded-full p-3 shadow transition
                         hover:scale-110 hover:bg-blue-600 hover:text-white
                         bg-blue-600 text-white
                         dark:bg-white dark:text-blue-600
                         dark:hover:bg-blue-500 dark:hover:text-white"
                        >
                            <Icon size={28}/>
                        </a>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

