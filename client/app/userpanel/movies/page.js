"use client"
import { useEffect, useState} from "react"
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import "../style.scss"
import MovieList from "@/components/MovieElement";

const Home = () => {
    const router = useRouter();
    const [list, setList] = useState([
        { tytul: "" },
        { tytul: "" },
        { tytul: "" }
    ]);
    const [tab, setTab] = useState(list);

    const { data: session } = useSession({
        required: true,
        onUnauthenticated() {
            router.push("/")
        }
    })

    const fetchData = async () => {
        const response = await fetch("https://szymonzawrotny.pl.cytr.us/moviesApi")
            .then(response => response.json())
            .then(data => {
                setList(data)
                setTab(data)
            })
    }

    useEffect(() => {
        fetchData()
    }, [])

    const handleSearch = (e) => {
        const value = e.target.value;

        const newTab = list.filter(one=>{
            return one.tytul.toLowerCase().includes(value)
        })

        console.log(newTab)

        setTab(newTab)
    }

    const elements = tab.map((one, index) => {
        return (
           <MovieList key={index} one={one} index={index}/>
        )
    })

    return (
        <div className="movieList">
            <h2>Lista filmów</h2>
            <div className="search">
                <input type="text" onChange={handleSearch}/>
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

