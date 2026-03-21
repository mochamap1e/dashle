import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

import "./Input.css";

type Props = {
    list: Level[],
    sendGuess: Function
};

export function Input({ list, sendGuess }: Props) {
    const [value, setValue] = useState("");
    const [showSuggestions, setShowSuggestions] = useState(false);

    const suggestions = list.filter(level => level.name.toLowerCase().includes(value.trim().toLowerCase()));

    const hiddenSuggestionState = { y: 20, opacity: 0 };

    function checkInput() {
        const level = list.find(level => level.name.toLowerCase() === value.toLowerCase());

        if (!level) return;

        setValue("");
        sendGuess(level);
    }

    return <div className="input-wrapper">
        <div className="input-wrapper2">
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
        <button className="guess" onClick={checkInput}>
            <img src="/img/guess.svg" draggable="false"/>
        </button>
    </div>
}