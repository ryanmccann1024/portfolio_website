// src/sections/Contact.jsx
import {Mail, Linkedin, Github, Send} from "lucide-react";
import {motion} from "framer-motion";

/* ---- social links ---------------------------------------------------- */
const socials = [
    {icon: Mail, label: "Email", url: "mailto:ryan@example.com"},
    {icon: Linkedin, label: "LinkedIn", url: "https://linkedin.com/in/ryan-m"},
    {icon: Github, label: "GitHub", url: "https://github.com/ryan"},
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

                {/* message form */}
                <motion.form
                    initial={{opacity: 0, y: 40}}
                    whileInView={{opacity: 1, y: 0}}
                    viewport={{once: true, amount: 0.3}}
                    transition={{duration: 0.4, delay: 0.3}}
                    action="https://formspree.io/f/yourFormID"
                    method="POST"
                    className="grid gap-4 rounded-xl border border-gray-200 bg-white p-6
                     shadow-md dark:border-slate-700 dark:bg-slate-800"
                >
                    <input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        required
                        className="rounded-lg border border-gray-300 px-4 py-3 text-sm
                       focus:border-blue-600 focus:outline-none
                       dark:border-slate-600 dark:bg-slate-900 dark:text-gray-100"
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="you@example.com"
                        required
                        className="rounded-lg border border-gray-300 px-4 py-3 text-sm
                       focus:border-blue-600 focus:outline-none
                       dark:border-slate-600 dark:bg-slate-900 dark:text-gray-100"
                    />
                    <textarea
                        name="message"
                        rows="4"
                        placeholder="How can I help?"
                        required
                        className="rounded-lg border border-gray-300 px-4 py-3 text-sm
                       focus:border-blue-600 focus:outline-none
                       dark:border-slate-600 dark:bg-slate-900 dark:text-gray-100"
                    ></textarea>

                    {/* honeypot */}
                    <input type="text" name="_gotcha" className="hidden"/>

                    <button
                        type="submit"
                        className="flex items-center justify-center gap-2 rounded-lg
                       bg-blue-600 px-6 py-3 font-semibold text-white shadow
                       transition-colors duration-200 hover:bg-blue-700
                       dark:bg-white dark:text-blue-600
                       dark:hover:bg-blue-500 dark:hover:text-white"
                    >
                        <Send size={18}/>
                        Send Message
                    </button>
                </motion.form>

                <p className="mt-4 text-xs text-gray-500 dark:text-gray-400">
                    Powered by{" "}
                    <a
                        href="https://formspree.io"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline"
                    >
                        Formspree
                    </a>
                </p>
            </div>
        </section>
    );
}

