import { Box, Button, Link, TextField, Typography } from "@mui/material";
import { red } from "@mui/material/colors";
import { useEffect, useState } from "react";
import db from "../db";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { compare, hash } from "bcryptjs";
import { sign } from "jsonwebtoken";

const Auth = ({
    setAuthOpen,
    name,
    color,
    setChangedName,
    setAuthed,
    setUser,
    checkUniqueness,
}: any) => {
    const [register, setRegister] = useState(true);
    const [nameTaken, setNameTaken] = useState(false);
    const [passMatch, setPassMatch] = useState(true);
    const [incrPass, setIncrPass] = useState(false);
    const [username, setUsername] = useState(name);
    const [password, setPassword] = useState("");
    const [passwordConf, setPasswordConf] = useState("");
    const [loading, setLoading] = useState(false);

    const signUpUser = async (clr: string) => {
        if (nameTaken || !passMatch) return;
        if (password === "") return setPassMatch(false);
        setLoading(true);
        const userToAdd = {
            username,
            password: await hash(password, 10),
            color: clr,
        };
        const userDoc = await addDoc(collection(db, "users"), userToAdd);

        const access_token = sign(
            { id: userDoc.id.toString() },
            process.env.NEXT_PUBLIC_TOKEN_SECRET as string,
            { expiresIn: "30d" }
        );
        localStorage.setItem("auth-token", access_token);
        setAuthed(true);
        setUser({ id: userDoc.id.toString(), ...userToAdd });
        localStorage.removeItem("name");
        localStorage.removeItem("color");
        setChangedName(false);
        setAuthOpen(false);
        setLoading(false);
    };

    const loginUser = async () => {
        if (!nameTaken) return;
        if (password === "") return setPassMatch(false);
        setLoading(true);
        const userArr = await getDocs(
            query(collection(db, "users"), where("username", "==", username))
        );

        if (await compare(password, userArr.docs[0].data().password)) {
            setIncrPass(false);
            const access_token = sign(
                {
                    id: userArr.docs[0].id.toString(),
                },
                process.env.NEXT_PUBLIC_TOKEN_SECRET as string,
                { expiresIn: "30d" }
            );
            localStorage.setItem("auth-token", access_token);
            setAuthed(true);
            setUser({
                id: userArr.docs[0].id.toString(),
                ...userArr.docs[0].data(),
            });
            localStorage.removeItem("name");
            localStorage.removeItem("color");
            setChangedName(false);
            setAuthOpen(false);
        } else setIncrPass(true);
        setLoading(false);
    };

    useEffect(
        () =>
            password === passwordConf
                ? setPassMatch(true)
                : setPassMatch(false),
        [password, passwordConf]
    );

    return (
        <>
            <Box
                id="overlay"
                bgcolor="rgba(0, 0, 0, 0.6)"
                width="100vw"
                height="100vh"
                sx={{ position: "fixed", top: 0, left: 0 }}
                zIndex={40}
                onClick={() => setAuthOpen(false)}
            ></Box>

            <Box
                width={{ xs: "100vw", sm: "30vw" }}
                p={{ xs: 4, sm: 6 }}
                bgcolor="#fff"
                zIndex={50}
                sx={{
                    position: "fixed",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    borderRadius: 3,
                }}
            >
                <Typography
                    textAlign="center"
                    fontSize={22}
                    fontWeight="bold"
                    mb={3}
                >
                    {register ? "Sign Up" : "Login"}
                </Typography>

                <TextField
                    onChange={async (e) => {
                        setUsername(e.target.value.trim());
                        (await checkUniqueness(e.target.value.trim()))
                            ? setNameTaken(false)
                            : setNameTaken(true);
                    }}
                    label="Username"
                    required
                    defaultValue={username}
                />
                <TextField
                    sx={{ marginTop: 2 }}
                    onChange={(e) => setPassword(e.target.value.trim())}
                    label="Password"
                    type="password"
                    required
                />
                {register && (
                    <TextField
                        sx={{ marginTop: 2 }}
                        onChange={(e) => setPasswordConf(e.target.value.trim())}
                        label="Confirm password"
                        type="password"
                        required
                    />
                )}

                {register && nameTaken && (
                    <Typography color={red[600]} fontSize={14}>
                        <b>Username is already taken</b>
                    </Typography>
                )}
                {register && !passMatch && (
                    <Typography color={red[600]} fontSize={14}>
                        <b>Passwords don&apos;t match</b>
                    </Typography>
                )}
                {!register && !nameTaken && (
                    <Typography color={red[600]} fontSize={14}>
                        <b>Username not found</b>
                    </Typography>
                )}
                {!register && incrPass && (
                    <Typography color={red[600]} fontSize={14}>
                        <b>Password is incorrect</b>
                    </Typography>
                )}

                <Typography mt={2}>
                    {register ? "Already registered? " : "New to FindATime? "}
                    <Link
                        sx={{ cursor: "pointer" }}
                        onClick={() => setRegister(!register)}
                    >
                        Sign {register ? "in" : "up"}
                    </Link>
                </Typography>

                {loading ? (
                    <Button disabled={true} sx={{ marginTop: 5 }}>
                        Loading...
                    </Button>
                ) : (
                    <Button
                        disabled={
                            register
                                ? nameTaken || !passMatch
                                : !nameTaken || loading
                        }
                        sx={{ marginTop: 5 }}
                        onClick={register ? () => signUpUser(color) : loginUser}
                    >
                        {register ? "Register" : "Sign in"}
                    </Button>
                )}
            </Box>
        </>
    );
};

export default Auth;
