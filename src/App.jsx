// src/App.jsx
import Navbar from "./components/Navbar";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Projects from "./sections/Projects";
import Experience from "./sections/Experience";
import Skills from "./sections/Skills";
import Contact from "./sections/Contact";
import Footer from "./components/Footer";

export default function App() {
    return (
        <div className="min-h-screen scroll-smooth font-sans antialiased text-gray-900">
            <Navbar/>

            <main>
                <Hero/>
                <About/>
                <Projects/>
                <Experience/>
                <Skills/>
                <Contact/>
            </main>

            <Footer/>
        </div>
    );
}
