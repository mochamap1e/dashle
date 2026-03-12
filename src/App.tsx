import axios from "axios";
import { useState, useEffect } from "react";

import LevelElement from "./components/LevelElement";
import GDTest from "./components/GDTest";

import "./styles.css";

export default function App() {
    const [list, setList] = useState<Level[]>([]);

    // -------- FETCH DEMONLIST -------- //

    const cacheKey = "cached_list";
    const refreshTime = 86400000; // 24 hours

    async function fetchList() {
        try {
            const response = await axios.get("https://pointercrate.com/api/v2/demons/listed?limit=100");

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

    // -------- IDK -------- //

    useEffect(() => {
        console.log(list);
    }, [list]);

    return <>
        <LevelElement level={{
            id: 1,
            level_id: 1,
            name: "test",
            position: 1,
            publisher: {
                id: 1,
                name: "user",
                banned: false
            },
            requirement: 50,
            thumbnail: "hi",
            verifier: {
                id: 1,
                name: "User",
                banned: false
            },
            video: ""
        }}/>

        {list.map((level, index) => (
            <LevelElement key={index} level={level}/>
        ))}

        <GDTest/>   
    </>;
}