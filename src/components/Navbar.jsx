export default function Navbar() {
    return (
        <header className="fixed inset-x-0 top-0 z-10 bg-white/70 backdrop-blur">
            <nav className="mx-auto flex max-w-5xl items-center justify-between p-4">
                <span className="text-xl font-bold">Ryan M.</span>
                <ul className="flex gap-6 text-sm font-medium">
                    {["About", "Projects", "Experience", "Skills", "Contact"].map((item) => (
                        <li key={item}>
                            <a href={`#${item.toLowerCase()}`} className="hover:text-blue-600">
                                {item}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    );
}
