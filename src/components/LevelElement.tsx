import "./LevelElement.css";

export default function LevelElement({ level }: { level: Level }) {
    return <div className="level">
        {level.name}
    </div>
}