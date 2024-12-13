"use client"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

import RegForm from '@/components/RegForm';
import DeleteForm from '@/components/DeleteForm';
import UpdateForm from '@/components/UpdateForm';
import AddMovie from '@/components/AddMovie';
import DeleteMovie from '@/components/DeleteMovie';

const Home = () => {

    const router = useRouter();

    const { data: session } = useSession({
        required: true,
        onUnauthenticated() {
            router.push("/")
        }
    })

    const [users, setUsers] = useState([]);
    const [movies, setMovies] = useState([]);

    const fetchUserData = async () => {
        const response = await fetch("https://szymonzawrotny.pl.cytr.us/usersApi")
            .then(response => response.json())
            .then(data => setUsers(data));
    }

    const fetchMovieData = async () => {
        const response = await fetch("https://szymonzawrotny.pl.cytr.us/moviesApi")
            .then(response => response.json())
            .then(data => setMovies(data));
    }

    useEffect(() => {
        if (session?.user?.email.email !== "szymonzawrotny@gmail.com") {
            router.push("/");
        }

        fetchUserData();
        fetchMovieData();
    }, [])

    const elementsUser = users.map((one, index) => {
        return <li key={index}>{`${index + 1}. ${one.email}`}</li>
    })

    const elementsMovie = movies.map((one, index) => {
        return <li key={index}>{`${index + 1}. ${one.tytul}`}</li>
    })

    return (
        <div className="adminPanel">
            <div className="manageMovie">
                <div className="add">
                    <h2>Dodaj film</h2>
                    <AddMovie fetchMovieData={fetchMovieData}/>
                </div>
                <div className="update">
                    <h2>Edytuj film</h2>
                    <form action="">
                        <input type="text" placeholder='email...' />
                        <input type="text" placeholder='dane...' />
                        <input type="text" placeholder='wartość...' />
                        <input type="submit" value="edytuj" />
                    </form>
                </div>
                <div className="delete">
                    <h2>Usuń film</h2>
                    <DeleteMovie fetchMovieData={fetchMovieData}/>
                </div>
                <div className="userList">
                    <ul>
                        {elementsMovie}
                    </ul>
                </div>
            </div>
            <div className="manageUser">
                <div className="add">
                    <h2>Dodaj klienta</h2>
                    <RegForm fetchUserData={fetchUserData}/>
                </div>
                <div className="update">
                    <h2>Edytuj klientaa</h2>
                    <UpdateForm fetchUserData={fetchUserData}/>
                </div>
                <div className="delete">
                    <h2>Usuń klienta</h2>
                    <DeleteForm fetchUserData={fetchUserData} />
                </div>
                <div className="userList">
                    <ul>
                        {elementsUser}
                    </ul>
                </div>
            </div>
        </div>
    )
}
export default Home;