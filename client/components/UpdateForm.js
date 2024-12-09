"use client"
import { useState, useEffect } from React;

const UpdateForm = ({fetchUserData})=>{

    const [email,setEmail] = useState("");
    const [data,setData] = useState("");
    const [value, setValue] = useState("");


    const handleUpdateAccount = async e => {
        e.preventDefault();

        const response = await fetch("https://szymonzawrotny.pl.cytr.us/deleteaccount",{
            method: "POST",
            body: JSON.stringify({
                email,
                data,
                value
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })

        if (response.ok) {
            alert("edytowano użytkownika");
            setEmail("");
            setData("");
            setValue("");
        } else {
            console.log("coś nie działa");
            alert("błędne dane")
        }
        fetchUserData();
    }

    return(
        <form onSubmit={handleUpdateAccount}>
            <input 
                type="text"
                value={email} 
                onChange={e=>setEmail(e.target.value)}
                placeholder='email...' />
            <input 
                type="text"
                value={data} 
                onChange={e=>setData(e.target.value)} 
                placeholder='dane...' />
            <input 
                type="text"
                value={value} 
                onChange={e=>setValue(e.target.value)} 
                placeholder='wartość...' />
            <input type="submit" value="edytuj" />
        </form>
    )
}

export default UpdateForm