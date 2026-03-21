import { useRef, useEffect, useState } from "react";
import { motion } from "motion/react";
import { Vibrant } from "node-vibrant/browser";

import "./LevelElement.css";

export function LevelElement({ level }: { level: Level }) {
    const levelRef = useRef(null);

    const [levelColor, setLevelColor] = useState<string>("");
    const [borderStyle, setBorderStyle] = useState<string>("");

    const imageTint = "rgba(0, 0, 0, 0.2)";

    const hiddenState = { y: 50, opacity: 0 };

    useEffect(() => {
        Vibrant.from(level.thumbnail).getPalette().then((palette) => {
            setLevelColor(palette?.Vibrant?.hex || "white")
        });
    }, [level.thumbnail]);

    useEffect(() => {
        setBorderStyle(`3px solid ${levelColor}80`);
    }, [levelColor])
    
    return <motion.div
        ref={levelRef}
        key="level"
        className="level"
        style={{
            backgroundImage: `
                linear-gradient(${imageTint}),
                url(https://levelthumbs.prevter.me/thumbnail/${level.level_id}/small)
            `,
            border: borderStyle
        }}

        transition={{ duration: 0.3 }}
        initial={hiddenState}
        exit={hiddenState}
        animate={{ y: 0, opacity: 1 }}
    >
        <img
            className="level-img"
            draggable="false"
            src={level.thumbnail}
            style={{ border: borderStyle }}
        />

        <h1
            className="level-name"
            style={{ textShadow: `0 0 15px ${levelColor}` }}
        >{level.name}</h1>

        <p>verified by {level.verifier.name}</p>
        <p>published by {level.publisher.name}</p>

        <p className="level-rank">#{level.position}</p>
    </motion.div>
}