import {
    Box,
    Button,
    FormControl,
    FormControlLabel,
    FormLabel,
    InputLabel,
    MenuItem,
    Radio,
    RadioGroup,
    Select,
    TextField,
    Typography,
} from "@mui/material";
import Nav from "../components/Nav";
import { useState } from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import BottomNav from "../components/BottomNav";

const Index = () => {
    const [duration, setDuration] = useState("1 Hour");
    const [zone, setZone] = useState("India (GMT+5)");
    const [poll, setPoll] = useState("day");
    const [date, setDate] = useState<any>();

    return (
        <>
            <Nav />

            <Box mt={6} px={64}>
                <Typography mb={4} fontWeight={400} fontSize={28}>
                    Meeting Info
                </Typography>
                <TextField label="Event name" required />
                <TextField
                    label="Note (optional)"
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
                            <MenuItem value={"1 Hour"}>1 Hour</MenuItem>
                            <MenuItem value={"2 Hours"}>2 Hours</MenuItem>
                            <MenuItem value={"3 Hours"}>3 Hours</MenuItem>
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
                            value={zone}
                            onChange={(e) => setZone(e.target.value)}
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
                        value={poll}
                        onChange={(e) => setPoll(e.target.value)}
                        name="radio-buttons-group"
                    >
                        <FormControlLabel
                            value="specific"
                            control={<Radio />}
                            label="Specific Dates"
                            sx={{ marginRight: 10 }}
                        />
                        <FormControlLabel
                            value="days"
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

                {poll === "day" && (
                    <>
                        <Typography mt={5} mb={1} fontWeight={600}>
                            Pick a date for your meet
                        </Typography>
                        <Box width="50%" mt={2}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    disableFuture
                                    label="Date"
                                    openTo="year"
                                    views={["year", "month", "day"]}
                                    value={date}
                                    onChange={(val) => {
                                        setDate(val);
                                    }}
                                    renderInput={(params) => (
                                        <TextField {...params} />
                                    )}
                                />
                            </LocalizationProvider>
                        </Box>
                    </>
                )}

                <Button sx={{ marginTop: 5 }}>Create Event</Button>
            </Box>

            <BottomNav />
        </>
    );
};

export default Index;
