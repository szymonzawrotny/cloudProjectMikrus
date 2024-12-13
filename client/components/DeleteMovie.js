import {useState} from 'react'

const DeleteMovie = ({fetchMovieData})=>{

    const [name,setName] = useState("");

    const handleSend = async (e)=>{
        e.preventDefault();

        const response = await fetch("https://szymonzawrotny.pl.cytr.us/deletemovie",{
            method: "POST",
            body: JSON.stringify({
                name,
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
            <input type="submit" value="usuń" />
        </form>
    )
}
export default DeleteMovie