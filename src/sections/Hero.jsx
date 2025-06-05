export default function Hero() {
    return (
        <section
            id="hero"
            className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white px-4 text-center"
        >
            <h1 className="mb-4 text-5xl font-extrabold tracking-tight">
                Hi, I’m <span className="text-blue-600">Ryan</span>
            </h1>
            <p className="mb-8 max-w-xl text-lg text-gray-700">
                A Python-savvy developer transitioning into modern front-end technologies
                to build performant, elegant web experiences.
            </p>
            <a
                href="#projects"
                className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white shadow hover:bg-blue-700"
            >
                View my work
            </a>
        </section>
    );
}
