import { useEffect, useState } from "react";
import { Vibrant } from "node-vibrant/browser";

import "./LevelElement.css";

export default function LevelElement({ level }: { level: Level }) {
    const [borderStyle, setBorderStyle] = useState<string>("");

    useEffect(() => {
        Vibrant.from(level.thumbnail).getPalette().then((palette) => {
            setBorderStyle(`3px solid ${palette?.Vibrant?.hex ?? "white"}`);
        });
    }, []);
    
    return <div className="level"
        style={{
            backgroundImage: `url(https://levelthumbs.prevter.me/thumbnail/${level.level_id}/small)`,
            border: borderStyle
        }}
    >
        <img
            className="level-img"
            draggable="false"
            src={level.thumbnail}
            style={{ border: borderStyle }}
        />

        <h1>{level.name}</h1>

        <p>verified by {level.verifier.name}</p>
        <p>published by {level.publisher.name}</p>
    </div>
}