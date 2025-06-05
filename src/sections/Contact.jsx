// src/sections/Contact.jsx
import {MailIcon, LinkedinIcon, GithubIcon} from "lucide-react";

export default function Contact() {
    return (
        <section id="contact" className="bg-gray-50 py-24 dark:bg-slate-900">
            <div className="mx-auto max-w-lg px-4 text-center">
                <h2 className="mb-4 text-3xl font-bold tracking-tight">Let’s Talk</h2>
                <p className="mb-10 text-gray-700 dark:text-gray-300">
                    Whether you have an opportunity that fits my skill set or just want to
                    chat about deep-RL in optical networks, drop me a line.
                </p>

                {/* ------ quick links row ------ */}
                <div className="mb-12 flex justify-center gap-6">
                    {/* email */}
                    <a
                        href="mailto:ryan@example.com"
                        className="text-gray-600 transition hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
                        aria-label="Email"
                    >
                        <MailIcon size={28}/>
                    </a>
                    {/* LinkedIn */}
                    <a
                        href="https://linkedin.com/in/ryan-m"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 transition hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
                        aria-label="LinkedIn"
                    >
                        <LinkedinIcon size={28}/>
                    </a>
                    {/* GitHub */}
                    <a
                        href="https://github.com/ryan"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 transition hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
                        aria-label="GitHub"
                    >
                        <GithubIcon size={28}/>
                    </a>
                </div>

                {/* ------ optional contact form ------ */}
                <form
                    action="https://formspree.io/f/yourFormID"
                    method="POST"
                    className="grid gap-4"
                >
                    <input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        required
                        className="rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm
                       focus:border-blue-600 focus:outline-none dark:border-slate-700 dark:bg-slate-800"
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="you@example.com"
                        required
                        className="rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm
                       focus:border-blue-600 focus:outline-none dark:border-slate-700 dark:bg-slate-800"
                    />
                    <textarea
                        name="message"
                        rows="4"
                        placeholder="How can I help?"
                        required
                        className="rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm
                       focus:border-blue-600 focus:outline-none dark:border-slate-700 dark:bg-slate-800"
                    ></textarea>

                    {/* anti-spam hidden honeypot */}
                    <input type="text" name="_gotcha" className="hidden"/>

                    <button
                        type="submit"
                        className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white shadow
                       hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                    >
                        Send Message
                    </button>
                </form>

                {/* success note (Formspree redirects by default) */}
                <p className="mt-4 text-xs text-gray-500">
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
