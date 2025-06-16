// src/pages/Home.jsx
import Hero from "../sections/Hero";
import About from "../sections/About";
import Projects from "../sections/Projects";
import Experience from "../sections/Experience";
import Contact from "../sections/Contact";

export default function Home() {
    return (
        <main className="pt-20 md:pt-0">
            <Hero/>
            <About/>
            <Projects/>
            <Experience/>
            <Contact/>
        </main>
    );
}
