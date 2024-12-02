"use client"
import { useEffect, useState} from "react"
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import "../style.scss"
import MovieList from "@/components/MovieElement";

const Home = () => {
    const router = useRouter();
    const [list, setList] = useState([
        { tytul: "siema" },
        { tytul: "co" },
        { tytul: "tam" }
    ]);
    const [copyList, setCopyList] = useState([]);

    const { data: session } = useSession({
        required: true,
        onUnauthenticated() {
            router.push("/")
        }
    })

    const fetchData = async () => {
        const response = await fetch("https://szymonzawrotny.pl.cytr.us/moviesApi")
            .then(response => response.json())
            .then(data => setList(data))
    }

    useEffect(() => {
        fetchData()
    }, [])

    const handleSearch = (e) => {
        let text = e.target.value;
    }

    const elements = list.map((one, index) => {
        return (
           <MovieList key={index} one={one} index={index}/>
        )
    })

    return (
        <div className="movieList">
            <h2>Lista filmów</h2>
            <div className="search" onChange={handleSearch}>
                <input type="text" />
            </div>
            <div className="list">
                <ul>
                    {elements}
                </ul>
            </div>
        </div>
    )
}
export default Home;

