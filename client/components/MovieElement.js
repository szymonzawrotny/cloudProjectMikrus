"use client"
import { CiCirclePlus } from "react-icons/ci";
import { useRef } from "react";

const MovieList = ({one,index})=>{

    const ref = useRef();
    
    return(
         <li className="movie">
            <header>
                <p>
                    {index + 1}.
                    {one.tytul}
                </p>
                <div className="show" onClick={()=>{ref.current.classList.toggle("active")}}>
                    <CiCirclePlus />
                </div>
            </header>
            <section ref={ref}>
                <p>{one.gatunek}</p>
                <p>{one.opis}</p>
                <p>{one.ocena}</p>
            </section>
        </li>
    )
}
export default MovieList