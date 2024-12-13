import {useState} from 'react';

const AddMovie = ({fetchMovieData})=>{

    const [name,setName] = useState("");
    const [genre,setGenre] = useState("");
    const [director,setDirector] = useState("");
    const [desc,setDesc] = useState("");

    const handleSend = async (e)=>{
        e.preventDefault();

        const response = await fetch("http://localhost:5000/addmovie",{
            method: "POST",
            body: JSON.stringify({
                name,
                genre,
                director,
                desc,
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })


        if(!response.ok){
            console.log("coś poszło nie tak")
        } else {
            const data = await response.json();
            alert(data.message)
            fetchMovieData();
        }
    }

    return(
        <form onSubmit={handleSend}>
        <input 
            type="text" 
            value={name}
            onChange={e=>setName(e.target.value)}
            placeholder='nazwa filmu...' />
        <input 
            type="text" 
            value={genre}
            onChange={e=>setGenre(e.target.value)}
            placeholder='gatunek...' />
        <input 
            type="text" 
            value={director}
            onChange={e=>setDirector(e.target.value)}
            placeholder='reżyser...' />
        <input 
            type="text" 
            value={desc}
            onChange={e=>setDesc(e.target.value)}
            placeholder='opis...' />
        <input type="submit" value="dodaj" />
    </form>
    )
}
export default AddMovie;