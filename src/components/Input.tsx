import { useState } from "react";

import "./Input.css";

type Props = {
    list: Level[]
};

export function Input({ list }: Props) {
    const [value, setValue] = useState("");
    const [showSuggestions, setShowSuggestions] = useState(false);

    const suggestions = list.filter(level => level.name.toLowerCase().includes(value.trim().toLowerCase()));

    return <div>
        <input
            value={value}
            className="input"
            placeholder="Enter a Pointercrate main list level name..."
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setShowSuggestions(false)}
            onChange={(e) => setValue(e.target.value)}
        />

        {showSuggestions && (suggestions.length < list.length) && <ul>
            {suggestions.map(suggestion =>
                <li
                    onMouseDown={() => setValue(suggestion.name)}
                    key={suggestion.id}
                >
                    {suggestion.name}
                </li>
            )}
        </ul>}
    </div>
}