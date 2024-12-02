"use client"
import "./style.scss"
import { useEffect } from "react";
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const Home = () => {

    const router = useRouter();

    const { data: session } = useSession({
        required: true,
        onUnauthenticated() {
            router.push("/")
        }

    })

    useEffect(() => {
        //console.log(session.user.email.name);
    }, [])

    return (
        <span>zmieniłem sshkey i muszę coś zmienić dla nowego commita {session?.user?.email.name}</span>
    )
}
export default Home;