"use client"
import { useEffect, useState } from "react"
import { CiCirclePlus } from "react-icons/ci";
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import "../style.scss"

const Home = () => {

    const router = useRouter();

    const {data:session} = useSession({
        required: true,
        onUnauthenticated(){
            router.push("/")
        }

    })

    const [list, setList] = useState([
        { tytul: "" },
        { tytul: "" }, 
        { tytul: "" }
    ]);

    const [tab,setTab] = useState(list);

    const fetchData = async ()=>{
        const response = await fetch("https://szymonzawrotny.pl.cytr.us/moviesApi")
        .then(response => response.json())
        .then(data=>{
            setList(data)
            setTab(data)
        })
    }

    useEffect(()=>{
        fetchData()
    },[])

    const handleInput = (e)=>{
        const value = e.target.value;

        const newTab = list.filter(one=>{
            return one.tytul.toLowerCase().includes(value)
        })

        setTab(newTab)
    }

    const addRent = async (movie)=>{
        
        const response = await fetch("https://szymonzawrotny.pl.cytr.us/addrent",{
            method: "POST",
            body: JSON.stringify({
                id: session?.user?.email?.id,
                email: session?.user?.email?.email,
                movie
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })

        if(!response.ok){
            console.log("coś poszło nie tak")
        } else {
            const data = await response.json();
            if(data.answer == "limit"){
                alert("zbyt duża liczba wypożyczeń")
            } else if(data.answer == "already have"){
                alert("już masz taki film!")
            } else {
                alert("dodano wypożyczenie")
            }
        }

        
    }

    const elements = tab.map((one, index) => {
        return (
            <li key={index}>
                <p>
                    {index +1}.
                    {one.tytul}
                </p>
                <div className="show" onClick={()=>addRent(one)}>
                    <CiCirclePlus/>
                </div>
            </li>
        )
    })

    return (
        <div className="rentMovie">
            <h2>Wypożycz filmy!</h2>
            <div className="search">
                <input type="text" onChange={handleInput}/>
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
