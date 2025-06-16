// src/App.jsx
import React, {useEffect} from "react";           // ← bring React into scope
import {
    BrowserRouter as Router,
    Routes,
    Route,
    useLocation,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import Post from "./pages/Post";

/* ——— smooth-scroll on hash navigation ——— */
function ScrollToHash() {
    const location = useLocation();

    useEffect(() => {
        if (location.hash) {
            const id = decodeURIComponent(location.hash.slice(1));
            const el = document.getElementById(id);
            if (el) {
                el.scrollIntoView({behavior: "smooth"});
                return;
            }
        }
        window.scrollTo({top: 0, behavior: "smooth"});
    }, [location]);

    return null;
}

/* ——— make router work at /portfolio_website/ too ——— */
const basename = (import.meta.env.BASE_URL || "/").replace(/\/$/, "");

export default function App() {
    return (
        <Router basename={basename}>
            <ScrollToHash/>

            <div className="min-h-screen scroll-smooth font-sans antialiased text-gray-900">
                <Navbar/>

                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/blog" element={<Blog/>}/>
                    <Route path="/blog/:slug" element={<Post/>}/>
                </Routes>

                <Footer/>
            </div>
        </Router>
    );
}
