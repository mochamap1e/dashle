import axios from "axios";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

import { Input } from "./components/Input";
import { LevelElement } from "./components/LevelElement";

import "./styles.css";

export default function App() {
    // -------- FETCH DEMONLIST -------- //

    const [list, setList] = useState<Level[]>([]);
    
    const cacheKey = "cached_list";
    const refreshTime = 86400000; // 24 hours

    async function fetchList() {
        try {
            const response = await axios.get("https://pointercrate.com/api/v2/demons/listed?limit=75");

            const listData: ListCache = {
                date: Date.now(),
                list: response.data
            }

            setList(listData.list);
            localStorage.setItem(cacheKey, JSON.stringify(listData));
        } catch(error) {
            setList([]);
            alert("Failed to fetch from Pointercrate");
            console.error(error);
        }
    }

    useEffect(() => {
        const cachedList = localStorage.getItem(cacheKey);

        if (cachedList) {
            const parsedCache: ListCache = JSON.parse(cachedList);

            if (Date.now() - parsedCache.date >= refreshTime) {
                fetchList();
            } else {
                setList(parsedCache.list);
            }
        } else {
            fetchList();
        }
    }, []);

    // -------- GAME LOGIC -------- //

    const [guesses, setGuesses] = useState<Level[]>([]);

    function sendGuess(level: Level) {
        console.log("Guessing:", level.name);
        setGuesses(prev => [...prev, level]);
    }

    // -------- DEBUGGING -------- //

    useEffect(() => {
        console.log(list);
    }, [list]);

    /*
    
    {list.map((level, index) => (
        <LevelElement key={index} level={level}/>
    ))}

    */

    // -------- PAGE -------- //

    return <div className="page">
        {guesses.length === 0 && (
            <img className="icon" src="/img/gd.png" draggable="false"/>
        )}

        <h1 className="title">Dashle</h1>

        <Input list={list} sendGuess={sendGuess}/>

        <div>
            {guesses.map((level) => <h1 key={level.id}>{level.name}</h1>)}
        </div>

        {guesses.length >= 6 && (
            <div>
                <h1>The level was:</h1>
                <AnimatePresence>
                    <LevelElement level={list[1]}/>
                </AnimatePresence>
            </div>
        )}
    </div>;
}