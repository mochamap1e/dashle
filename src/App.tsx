import axios from "axios";
import { useState, useEffect } from "react";

import LevelElement from "./components/LevelElement";

import "./styles.css";

export default function App() {
    // -------- FETCH DEMONLIST -------- //

    const [list, setList] = useState<Level[]>([]);
    
    const cacheKey = "cached_list";
    const refreshTime = 86400000; // 24 hours

    async function fetchList() {
        try {
            const response = await axios.get("https://pointercrate.com/api/v2/demons/listed?limit=50");

            const listData: ListCache = {
                date: Date.now(),
                list: response.data
            }

            setList(listData.list);
            localStorage.setItem(cacheKey, JSON.stringify(listData));

            console.log("Cached new list");
        } catch(error) {
            setList([]);
            console.error("Error fetching from Pointercrate:", error);
        }
    }

    useEffect(() => {
        const cachedList = localStorage.getItem(cacheKey);

        if (cachedList) {
            const parsedCache: ListCache = JSON.parse(cachedList);

            console.log("Cached list found");

            if (Date.now() - parsedCache.date >= refreshTime) {
                fetchList();
                console.log(`Cached list is older than ${refreshTime} ms`);
            } else {
                setList(parsedCache.list);
                console.log("Cached list is up-to-date");
            }
        } else {
            fetchList();
            console.log("No cached list found!");
        }
    }, []);

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
        <h1 className="title">Dashle</h1>
        <p className="desc">The Pointercrate Demonlist guessing game</p>

        <input className="input" placeholder="Enter a demonlist level..."/>

        {list.length > 0 && <LevelElement level={list[13]} />}
    </div>;
}