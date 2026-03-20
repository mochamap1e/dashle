import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

import "./Input.css";

type Props = {
    list: Level[]
};

export function Input({ list }: Props) {
    const [value, setValue] = useState("");
    const [showSuggestions, setShowSuggestions] = useState(false);

    const suggestions = list.filter(level => level.name.toLowerCase().includes(value.trim().toLowerCase()));

    const hiddenSuggestionState = { y: 20, opacity: 0 };

    return (
        <div className="input-wrapper">
            <input
                value={value}
                className="input"
                placeholder="Enter a Pointercrate main list level name..."
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setShowSuggestions(false)}
                onChange={(e) => setValue(e.target.value)}
            />

            <AnimatePresence>
                {showSuggestions && (suggestions.length < list.length) &&
                    <motion.ul
                        className="suggestions"
                        initial={hiddenSuggestionState}
                        animate={{ y: 0, opacity: 1 }}
                        exit={hiddenSuggestionState}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                    >
                        {suggestions.map(suggestion =>
                            <li
                                className="suggestion"
                                key={suggestion.id}
                                onMouseDown={() => setValue(suggestion.name)}
                            >
                                {suggestion.name}
                            </li>
                        )}
                    </motion.ul>
                }
            </AnimatePresence>
        </div>
    );
}