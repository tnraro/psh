import Link from "next/link";
import { useEffect, useState } from "react";

type Kitty = {
    breeds: any[];
    id: string;
    url: string;
    width: number;
    height: number;
};

const App = () => {
    const [kitty, setKitty] = useState("");
    useEffect(() => {
        const getRandomKitty = async () => {
            const data = await fetch(
                "https://api.thecatapi.com/v1/images/search"
            );
            const kittys: Kitty[] = await data.json();
            const kitty = kittys[0];

            setKitty(kitty.url);
        };
        getRandomKitty();
    }, []);
    return (
        <div>
            {kitty !== "" ? <img src={kitty} alt="kitty" height={300} /> : ""}
            <Link href="/">back to root</Link>
        </div>
    );
};

export default App;
