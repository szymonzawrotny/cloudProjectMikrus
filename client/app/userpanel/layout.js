"use client"
import Link from 'next/link'
import "./style.scss"
import { FaCameraRetro } from "react-icons/fa";
import { MdLocalMovies } from "react-icons/md";
import { MdMovieEdit } from "react-icons/md";
import { MdAddShoppingCart } from "react-icons/md";
import { CgLogOut } from "react-icons/cg";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import { RiAdminLine } from "react-icons/ri";

export default function RootLayout({ children }) {

    const router = useRouter();

    const { data: session } = useSession({
        required: true,
        onUnauthenticated() {
            router.push("/")
        }
    })

    const logout = ()=>{
        signOut({ callbackUrl: "https://szymonzawrotny.pl/" }).then((res) => {
            console.log("Wylogowanie zakończone:", res);
        }).catch((error) => {
            console.error("Błąd podczas wylogowywania:", error);
        });
    }

    return (
        <div className="userpanel">
            <nav>
                <Link href="/userpanel">
                    <div className="logo">
                        <FaCameraRetro size={42} />
                    </div>
                </Link>
                <Link href="/userpanel/movies">
                    <div className="option">
                        <MdLocalMovies size={28} />
                        movies
                    </div>
                </Link>
                <Link href="/userpanel/rentals">
                    <div className="option">
                        <MdMovieEdit size={28} />
                        yours rentals
                    </div>
                </Link>
                <Link href="/userpanel/rent">
                    <div className="option">
                        <MdAddShoppingCart size={28} />
                        rent
                    </div>
                </Link>
                { 
                    session?.user?.email.email === "szymonzawrotny@gmail.com" && <Link href="/userpanel/admin">
                        <div className="option">
                            <RiAdminLine size={28} />
                            adminpanel
                        </div>
                     </Link>
                }
                <div className="logout" onClick={logout}>
                    <CgLogOut size={36} />
                </div>
            </nav>
            <main>
                {children}
            </main>
        </div>
    )
}