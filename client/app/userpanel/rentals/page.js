"use client"
import "../style.scss"
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

const Home = () => {

    const router = useRouter();
    const [list,setList] = useState([{tytul_filmu: "Forrest Gump"},{tytul_filmu: "Dwunastu gniewnych ludzi"}]);

    const { data: session } = useSession({
        required: true,
        onUnauthenticated() {
            router.push("/")
        }

    })

    const fetchData = async () => {
        const response = await fetch("https://szymonzawrotny.pl.cytr.us/rentsApi")
            .then(response => response.json())
            .then(data => setList(data))
    }

    useEffect(()=>{
        fetchData()
    },[])

    const elements = list.map((one,index)=>{
        if(session?.user?.email?.email == one.klient){
            return (
                <li key={index}>{one.tytul_filmu}</li>
            )
        } else {
            return null;
        }
    })


    return (
        <div className="rentalsList">
            <h2>Twoje wypożyczenia</h2>
            <div className="list">
                <ul>
                    {elements}
                </ul>
            </div>
        </div>
    )
}
export default Home;