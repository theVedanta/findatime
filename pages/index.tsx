import {
    Alert,
    Box,
    Button,
    FormControl,
    FormControlLabel,
    InputLabel,
    MenuItem,
    Radio,
    RadioGroup,
    Select,
    Snackbar,
    TextField,
    Typography,
} from "@mui/material";
import Nav from "../components/Nav";
import React, { useState } from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import BottomNav from "../components/BottomNav";
import db from "../db";
import { addDoc, collection } from "firebase/firestore";
import { Meeting } from "../types";

const Index = () => {
    const [duration, setDuration] = useState("1 Hour");
    const [timezone, setTimezone] = useState("India (GMT+5)");
    const [type, setType] = useState("specific");
    const [date, setDate] = useState(new Date());
    const [name, setName] = useState("");
    const [note, setNote] = useState("");
    const [err, setErr] = useState(false);
    const [errMsg, setErrMsg] = useState("");
    const [loading, setLoading] = useState(false);

    const showErr = (msgToSet: string) => {
        setErrMsg(msgToSet);
        setErr(true);
        setTimeout(() => setErr(false), 5000);
    };

    const handleClose = (
        event: React.SyntheticEvent | Event,
        reason?: string
    ) => {
        if (reason === "clickaway") {
            return;
        }

        setErr(false);
    };

    const createEvent = async () => {
        setLoading(true);
        try {
            if (name === "") {
                setLoading(false);
                return showErr("Please fill in all the required fields");
            }

            const meet = await addDoc(collection(db, "meetings"), {
                name,
                duration,
                note,
                type,
                timezone,
                date: date.toString(),
                active: new Date().toString(),
                selections: [],
            } as Meeting);

            window.location.href = `/${meet.id}`;
        } catch (err) {
            setLoading(false);
            showErr("Some error occurred");
        }
    };

    return (
        <>
            <Nav />

            <Box
                mt={{ xs: 10, sm: 12, xl: 16 }}
                px={{ xs: 4, sm: 12, lg: 36, xl: 64 }}
            >
                <Typography mb={4} fontWeight={400} fontSize={28}>
                    Meeting Info
                </Typography>
                <TextField
                    onChange={(e) => setName(e.target.value.trim())}
                    label="Event name"
                    required
                />
                <TextField
                    label="Note (optional)"
                    onChange={(e) => setNote(e.target.value.trim())}
                    multiline
                    rows={3}
                    maxRows={6}
                    sx={{ marginTop: "26px" }}
                />
                <Box display="flex" width="full" sx={{ marginTop: "26px" }}>
                    <FormControl fullWidth>
                        <InputLabel required id="duration">
                            Duration
                        </InputLabel>
                        <Select
                            required
                            labelId="duration"
                            name="duration"
                            id="duration"
                            label="duration"
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                        >
                            <MenuItem value="30 Mintutes">30 Minutes</MenuItem>
                            <MenuItem value="1 Hour">1 Hour</MenuItem>
                        </Select>
                    </FormControl>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <FormControl fullWidth>
                        <InputLabel required id="time-zone">
                            Time zone
                        </InputLabel>
                        <Select
                            required
                            labelId="time-zone"
                            name="time-zone"
                            id="time-zone"
                            label="Time zone"
                            value={timezone}
                            onChange={(e) => setTimezone(e.target.value)}
                        >
                            <MenuItem value={"India (GMT+5)"}>
                                India (GMT+5)
                            </MenuItem>
                        </Select>
                    </FormControl>
                </Box>

                <Typography mt={6} mb={2} fontWeight={400} fontSize={24}>
                    Meeting Poll Type
                </Typography>
                <FormControl>
                    <RadioGroup
                        row
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        name="radio-buttons-group"
                    >
                        <FormControlLabel
                            value="specific"
                            control={<Radio />}
                            label="Specific Dates"
                            sx={{ marginRight: 10 }}
                        />
                        <FormControlLabel
                            value="week"
                            control={<Radio />}
                            label="Days of the week"
                            sx={{ marginRight: 10 }}
                        />
                        <FormControlLabel
                            value="day"
                            control={<Radio />}
                            label="Single Day"
                            sx={{ marginRight: 10 }}
                        />
                    </RadioGroup>
                </FormControl>
                <Typography fontStyle="italic" mt={2}>
                    Let all participants choose times for one specific day.
                </Typography>

                {type === "day" && (
                    <>
                        <Typography mt={5} mb={1} fontWeight={600}>
                            Pick a date for your meet
                        </Typography>
                        <Box width="50%" mt={2}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    disablePast
                                    label="Date"
                                    openTo="day"
                                    views={["day"]}
                                    value={date}
                                    onChange={(val: any) => {
                                        setDate(new Date(val.$d));
                                    }}
                                    renderInput={(params) => (
                                        <TextField {...params} />
                                    )}
                                />
                            </LocalizationProvider>
                        </Box>
                    </>
                )}

                <Button
                    onClick={createEvent}
                    sx={{ marginTop: 5 }}
                    disabled={loading}
                >
                    Create Event
                </Button>
            </Box>

            <BottomNav />

            <Snackbar
                open={err}
                autoHideDuration={6000}
                onClose={handleClose}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
                <Alert
                    variant="filled"
                    onClose={handleClose}
                    severity="error"
                    sx={{ width: "100%" }}
                >
                    {errMsg}
                </Alert>
            </Snackbar>
        </>
    );
};

export default Index;
