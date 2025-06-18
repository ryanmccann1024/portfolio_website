// src/components/Spinner.jsx
import {motion} from "framer-motion";

export default function Spinner() {
    return (
        <motion.div
            className="flex justify-center py-24"
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 0.3}}
        >
            <motion.span
                className="h-8 w-8 rounded-full border-4 border-blue-600 border-t-transparent"
                animate={{rotate: 360}}
                transition={{repeat: Infinity, duration: 1, ease: "linear"}}
            />
        </motion.div>
    );
}
