import CredentialsProvider from "next-auth/providers/credentials";
import { MongoClient } from "mongodb";
import "dotenv/config";

export const options = {
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: {
                    type: "text",
                    placeholder: "login or email"
                },
                password: {
                    type: "password",
                    placeholder: "password"
                }
            },
            async authorize(credentials) {
                const client = new MongoClient(process.env.LINK);

                try {
                    await client.connect();
                    const db = client.db("db_d234");
                    let users = db.collection("users");

                    
                    const user = await users.findOne({ email: credentials.username });

                    if (!user) {
                        throw new Error("Nieprawidłowy login lub hasło");
                    }

                    
                    if (credentials.password !== user.password) {
                        throw new Error("Nieprawidłowy login lub hasło");
                    }

                    return {
                        email: {
                            email: user.email,
                            name: user.name,
                            surname: user.surname
                        }
                    };

                } catch (error) {
                    console.log(error);
                    return null;
                } finally {
                    await client.close();
                }
            }
        })
    ],
    pages: {
        signIn: "/",
        signOut: "/",
    }
};
