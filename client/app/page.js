'use client'
import "./style.scss"
import { useEffect, useState } from "react";
import { signIn } from 'next-auth/react';
import { useRouter } from "next/navigation";

const Home = () => {

  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
      console.log("wysłano")
      alert("dodano użytkownika")
      setRegEmail("");
      setRegPassword("");
    } else {
      console.log("coś nie działa");
      alert("coś nie działa")
    }
  }

  const handleLog = async (e) => {
    e.preventDefault();

    const result = await signIn("credentials", {
      redirect: false,
      username: email,
      password: password
    })

    if (result.error) {
      console.log(result.error);
      alert("Błędne dane logowania :(")
    } else {
      router.push('/userpanel')
    }
  }

  return (
    <div className="app">
      <div className="left">
        <div className="triangle"></div>
        <header>Join us!</header>
      </div>
      <div className="right">
        <div className="register">
          <h2>register</h2>
          <form onSubmit={handleReg}>
            <input
              type="text"
              placeholder="email..."
              value={regEmail}
              onChange={e => setRegEmail(e.target.value)} />
            <input
              type="text"
              placeholder="password..."
              value={regPassword}
              onChange={e => setRegPassword(e.target.value)} />
            <input type="text" placeholder="password again..." />
            <input type="submit" value="add" />
          </form>
        </div>
        <div className="login">
          <h2>login</h2>
          <form onSubmit={handleLog}>
            <input type="email" placeholder="email..." onChange={(e) => { setEmail(e.target.value) }} />
            <input type="password" placeholder="password..." onChange={(e) => { setPassword(e.target.value) }} />
            <input type="submit" value="zaloguj" />
          </form>
        </div>
      </div>
    </div>
  )
}
export default Home;