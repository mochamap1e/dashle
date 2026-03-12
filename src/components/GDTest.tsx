import axios from "axios";
import { useEffect } from "react";

export default function GDTest() {
    useEffect(() => {
        async function fetch() {
            const response = await axios.post("http://www.boomlings.comto/database/downloadGJLevel22.php", {
                "levelID": 119544028,
                "secret": "Wmfd2893gb7"
            });

            console.log(response);
        }

        fetch();
    }, []);

    return null;
}