import {useState, useRef, useEffect} from "react";
import {ChevronDown} from "lucide-react";

export default function MultiSelectDropdown({options, selected, onChange}) {
    const [open, setOpen] = useState(false);
    const ref = useRef();

    useEffect(() => {
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                setOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    function toggleOption(option) {
        const updated = new Set(selected);
        updated.has(option) ? updated.delete(option) : updated.add(option);
        onChange(updated);
    }

    return (
        <div ref={ref} className="relative w-64 text-sm">
            <button
                onClick={() => setOpen(!open)}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-left shadow-sm transition focus:outline-none dark:border-slate-600 dark:bg-slate-800 dark:text-white"
            >
                {selected.size > 0
                    ? [...selected].join(", ")
                    : "Filter by topic..."}
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400"/>
            </button>

            {open && (
                <ul className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-lg border border-gray-300 bg-white shadow-md dark:border-slate-600 dark:bg-slate-800">
                    {options.map(option => (
                        <li
                            key={option}
                            onClick={() => toggleOption(option)}
                            className={`cursor-pointer px-4 py-2 hover:bg-blue-100 dark:hover:bg-slate-700 ${
                                selected.has(option)
                                    ? "bg-blue-50 dark:bg-slate-700 font-medium"
                                    : ""
                            }`}
                        >
                            {option}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
