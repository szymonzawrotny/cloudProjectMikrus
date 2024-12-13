import { useState } from 'react';

const RegForm = ({fetchUserData})=>{

    const [regEmail, setRegEmail] = useState("");
    const [regPassword, setRegPassword] = useState("");

    const handleReg = async (e) => {
        e.preventDefault();

        const response = await fetch("https://szymonzawrotny.pl.cytr.us/reg", {
            method: "POST",
            body: JSON.stringify({
                regEmail,
                regPassword
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })

        if (response.ok) {
            alert("dodano użytkownika")
            setRegEmail("");
            setRegPassword("");
        } else {
            console.log("coś nie działa");
        }
        fetchUserData();
    }

    return(
        <form onSubmit={handleReg}>
            <input
                type="text"
                value={regEmail}
                onChange={e => setRegEmail(e.target.value)}
                placeholder='email...' />
            <input
                type="text"
                value={regPassword}
                onChange={e => setRegPassword(e.target.value)}
                placeholder='password...' />
            <input type="submit" value="dodaj" />
        </form>
    )
}
export default RegForm;