import { Check } from "@mui/icons-material";
import {
    Alert,
    Box,
    Button,
    Input,
    Link,
    TextField,
    Typography,
} from "@mui/material";
import { collection, doc, getDoc, updateDoc } from "firebase/firestore";
import Image from "next/image";
import { useEffect, useState } from "react";
import db from "../db";

const About = ({ authed }: any) => {
    const [email, setEmail] = useState("");
    const [dis, setDis] = useState(false);
    const [alert, setAlert] = useState(false);

    const submit = async () => {
        if (email === "") return setAlert(true);
        const docRef = doc(db, "emails", "VF87k96GwX1B8dOckRvn");
        const list = await getDoc(docRef);
        let emails = (list.data() as any).emails as string[];
        emails.push(email);
        updateDoc(docRef, { emails });
        setDis(true);
    };

    useEffect(() => {
        setTimeout(() => setAlert(false), 4000);
    }, [alert]);

    return (
        <Box id="main-index" bgcolor="primary.600">
            {alert && (
                <Alert
                    sx={{
                        position: "fixed",
                        bottom: 10,
                        right: 10,
                        zIndex: 9999999,
                    }}
                    severity="error"
                >
                    This is an error alert — check it out!
                </Alert>
            )}
            {/* NAV */}
            <Box
                display={{ xs: "none", sm: "flex" }}
                justifyContent="space-between"
                alignItems="center"
                px={{ xs: 2, sm: 10 }}
                py={1}
                bgcolor="primary.900"
                sx={{ position: "fixed", top: 0, width: "100vw", zIndex: 9999 }}
            >
                <Box display="flex">
                    <a href="#steps">
                        <Typography
                            sx={{
                                color: "#fff",
                                textDecoration: "none",
                                ":hover": { color: "primary.500" },
                                transition: "all 0.3s",
                            }}
                            mr={5}
                        >
                            How it works
                        </Typography>
                    </a>

                    <a href="#features">
                        <Typography
                            sx={{
                                color: "#fff",
                                textDecoration: "none",
                                ":hover": { color: "primary.500" },
                                transition: "all 0.3s",
                            }}
                            mr={5}
                        >
                            Why FindaTime
                        </Typography>
                    </a>

                    <a href="#join">
                        <Typography
                            sx={{
                                color: "#fff",
                                textDecoration: "none",
                                ":hover": { color: "primary.500" },
                                transition: "all 0.3s",
                            }}
                            mr={5}
                        >
                            Join Waitlist
                        </Typography>
                    </a>
                </Box>
                <a href="#demo">
                    <Button sx={{ width: "auto" }}>Watch Demo</Button>
                </a>
            </Box>

            {/* HERO */}
            <Box
                id="join"
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                pt={{ xs: 6, sm: 12 }}
                mb={{ xs: 4, sm: 14 }}
                textAlign="center"
            >
                <Typography
                    color="#fff"
                    fontSize={{ xs: 28, sm: 40, md: 48, xl: 60 }}
                >
                    Find a common time to meet
                </Typography>
                <Typography
                    color="primary.400"
                    fontSize={{ xs: 32, sm: 40, md: 48, xl: 60 }}
                    fontWeight={500}
                    mb={4}
                >
                    instantly
                </Typography>
                <Typography
                    color="#fff"
                    fontSize={{ md: 20, xl: 24 }}
                    width={{ md: "40%", xl: "23%" }}
                    fontWeight={300}
                    mb={4}
                >
                    Join our waitlist to be notified when we launch soon!
                </Typography>

                <Box
                    display="flex"
                    sx={{
                        width: { xs: "90%", sm: "65%", md: "50%", xl: "30%" },
                        marginBottom: { xs: 0, sm: 2 },
                    }}
                    onSubmit={(e) => {
                        e.preventDefault();
                        submit();
                    }}
                    component="form"
                >
                    <TextField
                        placeholder="Your email"
                        size="medium"
                        sx={{
                            background: "#fff",
                            width: "75%",
                            border: "none",
                            borderRadius: "4px 0 0 4px",
                            padding: "10px 22px",
                        }}
                        variant="standard"
                        InputProps={{
                            disableUnderline: true,
                        }}
                        onChange={(e) =>
                            setEmail(e.target.value.toLowerCase().trim())
                        }
                        type="email"
                        required
                    />
                    <Button
                        sx={{
                            width: "25%",
                            borderRadius: "0 4px 4px 0",
                            ":disabled": {
                                color: "rgba(255, 255, 255, 0.6)",
                                cursor: "not-allowed",
                            },
                        }}
                        disabled={dis}
                        type="submit"
                    >
                        Submit
                    </Button>
                </Box>

                <Box
                    sx={{
                        position: "relative",
                        width: "100%",
                        height: { xs: "300px", sm: "500px" },
                    }}
                >
                    <Image src="/assets/lap.svg" alt="Laptop" fill={true} />
                </Box>
            </Box>

            <Box
                id="steps"
                pt={6}
                px={{ xs: 4, sm: 6, lg: 32, xl: 50 }}
                pb={20}
                bgcolor="#282C36"
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Typography
                    textAlign="center"
                    color="#fff"
                    fontSize={{ xs: 34, sm: 42, xl: 56 }}
                    fontWeight={500}
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                >
                    3 Simple Steps
                </Typography>
                <Image
                    src="/assets/scrib/1.svg"
                    alt="scrib"
                    width={300}
                    height={50}
                />

                <Box
                    display="flex"
                    alignItems="center"
                    mt={10}
                    mb={20}
                    position="relative"
                    width="100%"
                >
                    {/* NUMBOX */}
                    <Box
                        bgcolor="primary.400"
                        sx={{
                            width: { xs: "46px", sm: "60px", xl: "75px" },
                            height: { xs: "46px", sm: "60px", xl: "75px" },
                            borderRadius: "50%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            mr: "30px",
                            flexShrink: 0,
                        }}
                    >
                        <Typography
                            fontWeight={500}
                            fontSize={{ sm: 28, lg: 32, xl: 40 }}
                            color="#fff"
                        >
                            1
                        </Typography>
                    </Box>

                    <Box display="flex" flexDirection="column" width="60%">
                        <Typography
                            color="#fff"
                            fontSize={{ xs: 16, sm: 30, lg: 32, xl: 40 }}
                            fontWeight={500}
                        >
                            Create an Event/Meeting
                        </Typography>
                        <Typography
                            color="#fff"
                            fontSize={{ xs: 12, lg: 18, xl: 22 }}
                            sx={{ opacity: 0.6 }}
                            fontWeight={100}
                        >
                            Select the type of meeting you want - recurring or
                            one off. No sign up required.
                        </Typography>
                    </Box>

                    <Box
                        sx={{
                            position: "absolute",
                            right: { xs: 20, sm: 50 },
                            bottom: -150,
                        }}
                    >
                        <Image
                            src="/assets/scrib/3.svg"
                            alt="Scribble"
                            width={170}
                            height={130}
                            style={{
                                objectFit: "scale-down",
                            }}
                        />
                    </Box>
                </Box>

                <Box display="flex">
                    <Box width={{ xs: "20%", sm: "35%" }} position="relative">
                        <Box
                            sx={{
                                position: "absolute",
                                right: { xs: -150, sm: 10, xl: 150 },
                                bottom: { xs: -10, sm: 5, xl: 20 },
                            }}
                        >
                            <Image
                                src="/assets/scrib/3.svg"
                                alt="Scribble"
                                width={170}
                                height={130}
                                style={{
                                    objectFit: "scale-down",
                                    transform: "scaleX(-1)",
                                }}
                            />
                        </Box>
                    </Box>
                    <Box
                        width={{ xs: "80%", sm: "65%" }}
                        display="flex"
                        alignItems="center"
                        mb={20}
                    >
                        <Box display="flex" flexDirection="column">
                            <Typography
                                color="#fff"
                                fontSize={{ xs: 16, sm: 30, lg: 32, xl: 40 }}
                                fontWeight={500}
                            >
                                Put in your times
                            </Typography>
                            <Typography
                                color="#fff"
                                fontSize={{ xs: 12, lg: 18, xl: 22 }}
                                sx={{ opacity: 0.6 }}
                                fontWeight={100}
                            >
                                Select the dates and/or times that suit you by
                                quickly tapping or clicking the calendar slots.
                            </Typography>
                        </Box>

                        {/* NUMBOX */}
                        <Box
                            bgcolor="primary.400"
                            sx={{
                                width: { xs: "46px", sm: "60px", xl: "75px" },
                                height: { xs: "46px", sm: "60px", xl: "75px" },
                                borderRadius: "50%",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                ml: "30px",
                                flexShrink: 0,
                            }}
                        >
                            <Typography
                                fontWeight={500}
                                fontSize={{ sm: 28, lg: 32, xl: 40 }}
                                color="#fff"
                            >
                                2
                            </Typography>
                        </Box>
                    </Box>
                </Box>

                <Box display="flex" alignItems="center">
                    {/* NUMBOX */}
                    <Box
                        bgcolor="primary.500"
                        sx={{
                            width: { xs: "46px", sm: "60px", xl: "75px" },
                            height: { xs: "46px", sm: "60px", xl: "75px" },
                            borderRadius: "50%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            mr: "30px",
                            flexShrink: 0,
                        }}
                    >
                        <Typography
                            fontWeight={500}
                            fontSize={{ sm: 28, lg: 32, xl: 40 }}
                            color="#fff"
                        >
                            3
                        </Typography>
                    </Box>

                    <Box display="flex" flexDirection="column" width="60%">
                        <Typography
                            fontSize={{ xs: 16, sm: 30, lg: 32, xl: 40 }}
                            fontWeight={500}
                            color="primary.500"
                        >
                            Share and find a time!
                        </Typography>
                        <Typography
                            color="#fff"
                            fontSize={{ xs: 12, lg: 18, xl: 22 }}
                            sx={{ opacity: 0.6 }}
                            fontWeight={100}
                        >
                            Once you’re done, simply share the link to the
                            meeting with your team - this can be as many people
                            as you want.
                        </Typography>
                    </Box>
                </Box>
            </Box>

            <Box id="features" pt={10} px={{ md: 6, lg: 20 }} pb={10}>
                <Typography
                    textAlign="center"
                    color="#fff"
                    fontSize={{ xs: 32, sm: 38, md: 42, lg: 46, xl: 56 }}
                    mb={{ xs: 4, lg: 4, xl: 6 }}
                    fontWeight={500}
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    component="div"
                    sx={{
                        display: "inline-block",
                        width: "100%",
                        justifyContent: "center",
                    }}
                >
                    Why use&nbsp;
                    <Box sx={{ display: "inline" }} color="primary.400">
                        this
                    </Box>
                    &nbsp;over other calendar apps?
                </Typography>

                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    flexDirection={{ xs: "column", sm: "row" }}
                    width="100%"
                    mb={6}
                >
                    <Box color="primary.500" mr={{ xs: 0, sm: 10 }}>
                        {[
                            "Quick & Frictionless experience",
                            "No signup required to use",
                            "Easy to understand calendar visualization",
                        ].map((i) => (
                            <Typography
                                py={{ xs: 2, sm: 4 }}
                                fontWeight={400}
                                fontSize={{
                                    xs: 18,
                                    sm: 18,
                                    md: 20,
                                    lg: 26,
                                    xl: 30,
                                }}
                                key={i}
                                display="flex"
                                alignItems="center"
                            >
                                <Check />
                                &nbsp;&nbsp;{i}
                            </Typography>
                        ))}
                    </Box>
                    <Box color="primary.500">
                        {[
                            "Optimized for large groups of people",
                            "Integrations with Slack and Discord",
                            "Add meetings to Google Calendar with one click.",
                        ].map((i) => (
                            <Typography
                                py={{ xs: 2, sm: 4 }}
                                fontWeight={400}
                                fontSize={{
                                    xs: 18,
                                    sm: 18,
                                    md: 20,
                                    lg: 26,
                                    xl: 30,
                                }}
                                key={i}
                                display="flex"
                                alignItems="center"
                            >
                                <Check />
                                &nbsp;&nbsp;{i}
                            </Typography>
                        ))}
                    </Box>
                </Box>

                <Box
                    id="demo"
                    sx={{ position: "relative", width: "100%" }}
                    px={2}
                >
                    <video
                        controls
                        style={{ width: "100%" }}
                        src="/assets/demo.mp4"
                    ></video>
                </Box>
            </Box>

            <Box
                width="100%"
                py={4}
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexDirection="column"
                bgcolor="#282C36"
            >
                <Typography color="#fff">FindaTime © 2023</Typography>
            </Box>
        </Box>
    );
};

export default About;
