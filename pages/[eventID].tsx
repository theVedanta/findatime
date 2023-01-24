import { useRouter } from "next/router";
import Nav from "../components/Nav";
import LeftBar from "../components/LeftBar";
import {
    Box,
    Button,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { yellow } from "@mui/material/colors";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { BASE_API_URL, days, months } from "../base";
import axios from "axios";

const Event = () => {
    const router = useRouter();
    const { eventID } = router.query;
    const [timezone, setTimezone] = useState("India (GMT+5)");
    const [event, setEvent] = useState({});
    const [dates, setDates] = useState<Date[]>([]);
    const slots = [
        "1AM",
        "2AM",
        "3AM",
        "4AM",
        "5AM",
        "6AM",
        "7AM",
        "8AM",
        "9AM",
    ];

    useEffect(() => {
        const dts = [];
        const newDate = new Date();
        for (let i = 0; i < 7; i++) {
            newDate.setDate(newDate.getDate() + 1);
            dts.push(new Date(newDate));
        }

        setDates(dts);

        const getEvent = async () => {
            const res = await axios.get(`${BASE_API_URL}/event/${eventID}`);

            if (res.data.err) {
                return;
            }

            setEvent(res.data.event);
            setTimezone(res.data.event.timezone);
        };

        eventID && getEvent();
    }, [eventID]);

    return (
        <>
            <LeftBar event={event} />
            <Nav name="Event name" />

            <Box pl="26%" mt={5}>
                <Box display="flex" width="80%">
                    <TextField
                        sx={{ width: "40%", marginRight: 2 }}
                        label="Your name*"
                    />
                    <FormControl sx={{ width: "20%", marginRight: 2 }}>
                        <InputLabel required id="duration">
                            Duration
                        </InputLabel>
                        <Select
                            required
                            labelId="duration"
                            name="duration"
                            id="duration"
                            label="duration"
                            value={timezone}
                            onChange={(e) => setTimezone(e.target.value)}
                        >
                            <MenuItem value={"India (GMT+5)"}>
                                India (GMT+5)
                            </MenuItem>
                        </Select>
                    </FormControl>

                    <Button sx={{ width: "30%" }} size="small">
                        Sign in to save and edit meet
                    </Button>
                </Box>

                <Typography fontWeight={500} fontSize={14} mt={3}>
                    Click/tap on the times and dates that suit you below
                </Typography>
                <Box display="flex" mt={2}>
                    <Box display="flex" alignItems="center" mr={10}>
                        <Box
                            width={16}
                            height={16}
                            border="1px solid"
                            borderColor="primary.900"
                            bgcolor="primary.500"
                        ></Box>
                        <Typography ml={1}>Your availability</Typography>
                    </Box>

                    <Box display="flex" alignItems="center" mr={10}>
                        <Box
                            width={16}
                            height={16}
                            border="1px solid"
                            borderColor="primary.900"
                            bgcolor={yellow[500]}
                        ></Box>
                        <Typography ml={1}>Group availability</Typography>
                    </Box>

                    <Box display="flex" alignItems="center" mr={10}>
                        <Box
                            width={16}
                            height={16}
                            border="1px solid"
                            borderColor="primary.900"
                            bgcolor="transparent"
                        ></Box>
                        <Typography ml={1}>No one available</Typography>
                    </Box>
                </Box>

                <Box display="flex" alignItems="center" mt={6}>
                    <Typography fontSize={20} mr={3}>
                        October 1 - October 7
                    </Typography>
                    <Button variant="text">
                        <ChevronLeft />
                    </Button>
                    <Button variant="text">
                        <ChevronRight />
                    </Button>
                </Box>

                <Box
                    mt={2}
                    id="calendar-container"
                    width="100%"
                    height="66vh"
                    overflow="scroll"
                >
                    <Grid
                        container
                        spacing={0}
                        width={`${dates.length * 15}%`}
                        columns={dates.length + 1}
                    >
                        <Grid item width="3%">
                            <Box height="5vh"></Box>
                            {slots.map((slot) => (
                                <Grid item width="100%" key={slot}>
                                    <Box height="8vh">
                                        <Typography>{slot}</Typography>
                                    </Box>
                                </Grid>
                            ))}
                        </Grid>
                        {dates.map((date) => (
                            <Grid
                                item
                                width={`${97 / dates.length}%`}
                                key={date.getDate()}
                            >
                                <Box
                                    display="flex"
                                    justifyContent="center"
                                    alignItems="center"
                                    height="5vh"
                                >
                                    <Typography>
                                        {months[date.getMonth()].slice(0, 3)}{" "}
                                        {date.getDate()},{" "}
                                        {days[date.getDay()].slice(0, 3)}
                                    </Typography>
                                </Box>
                                {slots.map((slot) => (
                                    <Grid item width="100%" key={slot}>
                                        <Box
                                            bgcolor="primary.200"
                                            border="0.5px solid"
                                            borderColor="primary.800"
                                            height="8vh"
                                        ></Box>
                                    </Grid>
                                ))}
                            </Grid>
                        ))}
                        {/* {slots.map((slot) => (
                            <Grid item width="3%" key={slot}>
                                <Box
                                    bgcolor="primary.200"
                                    border="1px solid"
                                    borderColor="primary.800"
                                    height="5vh"
                                >
                                    {slot}
                                </Box>
                            </Grid>
                        ))}
                        {dates.map((date) => (
                            <Grid item width="10%" key={date.getDate()}>
                                <Box
                                    bgcolor="primary.200"
                                    border="1px solid"
                                    borderColor="primary.800"
                                    height="5vh"
                                >
                                    {date.getDate()}
                                </Box>
                                {slots.map((slot) => (
                                    <Grid item width="100%" key={slot}>
                                        <Box
                                            bgcolor="primary.200"
                                            border="1px solid"
                                            borderColor="primary.800"
                                            height="5vh"
                                        >
                                            {slot}
                                        </Box>
                                    </Grid>
                                ))}
                            </Grid>
                        ))} */}
                    </Grid>
                </Box>
            </Box>
        </>
    );
};

export default Event;
