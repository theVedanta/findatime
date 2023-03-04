import { ThemeProvider } from "@mui/material";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import theme from "../theme";
import { useEffect, useState } from "react";
import { verify } from "jsonwebtoken";
import { User } from "../types";
import db from "../db";
import { doc, getDoc } from "firebase/firestore";

export default function App({ Component, pageProps }: AppProps) {
    const [authed, setAuthed] = useState<string | boolean>("check");
    const [user, setUser] = useState<User>({});

    useEffect(() => {
        const getUser = async () => {
            if (!localStorage.getItem("auth-token")) {
                return setAuthed(false);
            }
            try {
                const token = localStorage.getItem("auth-token") as string;
                const payload = verify(
                    token,
                    process.env.NEXT_PUBLIC_TOKEN_SECRET as string
                );

                if (payload) {
                    const userDoc = await getDoc(
                        doc(db, "users", (payload as User).id as string)
                    );
                    if (userDoc.exists()) {
                        setAuthed(true);
                        sessionStorage.removeItem("name");
                        sessionStorage.removeItem("color");
                        return setUser({
                            username: userDoc.data().username,
                            id: userDoc.id,
                            color: userDoc.data().color,
                        });
                    } else {
                        localStorage.removeItem("auth-token");
                        return setAuthed(false);
                    }
                } else {
                    localStorage.removeItem("auth-token");
                    return setAuthed(false);
                }
            } catch (err) {
                console.log(err);
                localStorage.removeItem("auth-token");
                return setAuthed(false);
            }
        };

        getUser();
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <Component
                authed={authed}
                setAuthed={setAuthed}
                user={user}
                setUser={setUser}
                {...pageProps}
            />
        </ThemeProvider>
    );
}
