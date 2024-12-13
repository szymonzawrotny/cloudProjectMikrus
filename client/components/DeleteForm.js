import { useState } from 'react';

const DeleteForm = ({fetchUserData})=>{
    const [deleteAccount, setDeleteAccount] = useState("");

    const handleDeleteAccount = async e => {
        e.preventDefault();

        const response = await fetch("http://localhost:5000/deleteaccount",{
            method: "POST",
            body: JSON.stringify({
                email: deleteAccount
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })

        if (response.ok) {
            alert("usunięto użytkownika");
            setDeleteAccount("")
        } else {
            console.log("coś nie działa");
            alert("błędne dane")
        }
        fetchUserData();
    }

    return(
        <form onSubmit={handleDeleteAccount}>
            <input 
                type="text" 
                value={deleteAccount}
                onChange={e=>setDeleteAccount(e.target.value)}
                placeholder='email...' />
            <input type="submit" value="usuń" />
        </form>
    )
}
export default DeleteForm;