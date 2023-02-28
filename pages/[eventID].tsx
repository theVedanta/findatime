import { useRouter } from "next/router";
import Nav from "../components/Nav";
import LeftBar from "../components/LeftBar";
import {
    Alert,
    Box,
    Button,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    Snackbar,
    TextField,
    Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { yellow } from "@mui/material/colors";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { BASE_API_URL, days, months } from "../base";
import axios from "axios";

interface Meeting {
    owner?: string;
    name?: string;
    note?: string;
    duration?: string;
    type?: string;
    timezone?: string;
    date?: Date;
    active?: Date;
}
interface Selection {
    date: Date;
    slot: string;
    // box: number;
}

const Event = () => {
    const router = useRouter();
    const { eventID } = router.query;
    const [timezone, setTimezone] = useState("India (GMT+5)");
    const [event, setEvent] = useState<Meeting>({});
    const [dates, setDates] = useState<Date[]>([]);
    const [selections, setSelections] = useState<Selection[]>([]);
    const [name, setName] = useState("New user");
    const [err, setErr] = useState(false);
    const [errMsg, setErrMsg] = useState("");
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

    const matchDate = (
        date1Create: Date | string,
        date2Create: Date | string,
        invert: boolean = false
    ) => {
        const date1 = new Date(date1Create.toString());
        const date2 = new Date(date2Create.toString());

        return invert
            ? !(
                  date1.getFullYear() === date2.getFullYear() &&
                  date1.getMonth() === date2.getMonth() &&
                  date1.getDate() === date2.getDate()
              )
            : date1.getFullYear() === date2.getFullYear() &&
                  date1.getMonth() === date2.getMonth() &&
                  date1.getDate() === date2.getDate();
    };

    const boxClick = async (date: Date, slot: string) => {
        // selections.find(
        //     (elem) => elem.slot === slot && matchDate(elem.date, date)
        // )
        //     ? setSelections(
        //           selections.filter(
        //               (elem) => elem.slot === slot && matchDate(elem.date, date)
        //           )
        //       )
        //     : setSelections([
        //           ...selections,
        //           {
        //               date,
        //               slot,
        //               // box: 1,
        //           },
        //       ]);

        let newSels = [...selections];
        if (
            selections.find(
                (elem) => elem.slot === slot && matchDate(elem.date, date)
            )
        ) {
            newSels = selections.filter(
                (sel) => sel.slot !== slot || matchDate(sel.date, date, true)
            );
            setSelections(newSels);
        } else {
            newSels = [
                ...selections,
                {
                    date,
                    slot,
                },
            ];
            setSelections(newSels);
        }

        try {
            const updated: any = await axios.put(
                `${BASE_API_URL}/update/${eventID}`,
                {
                    selections: newSels,
                }
            );

            if (!updated.data.done) {
                showErr("Some error occurred");
            }
        } catch (err) {
            showErr("Some error occurred");
        }
    };

    useEffect(() => {
        const dts = [];
        const newDate = new Date();
        for (let i = 0; i < 7; i++) {
            newDate.setDate(newDate.getDate() + 1);
            dts.push(new Date(newDate));
        }

        setDates(dts);

        const getEvent = async () => {
            const sseClient = new EventSource(
                `${BASE_API_URL}/event/${eventID}`
            );
            sseClient.onopen = () => console.log("Connection opened!");
            sseClient.onmessage = (event) => {
                const parsedEvent = JSON.parse(event.data).event;
                setEvent(parsedEvent);
                setSelections(
                    parsedEvent && parsedEvent.selections !== undefined
                        ? parsedEvent.selections
                        : []
                );
                setTimezone(parsedEvent.timezone);
            };
            sseClient.onerror = () => console.log("Something went wrong!");
        };

        eventID && getEvent();
    }, [eventID]);

    return (
        <>
            <LeftBar event={event} />
            <Nav name={event && event.name} />

            <Box pl="26%" mt={5}>
                <Box display="flex" width="80%">
                    <TextField
                        sx={{ width: "40%", marginRight: 2 }}
                        label="Your name*"
                        defaultValue={name}
                    />
                    <FormControl sx={{ width: "20%", marginRight: 2 }}>
                        <InputLabel required id="duration">
                            Timezone
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
                    {event && event.type !== "week" && (
                        <>
                            <Button variant="text">
                                <ChevronLeft />
                            </Button>
                            <Button variant="text">
                                <ChevronRight />
                            </Button>
                        </>
                    )}
                </Box>

                <Box
                    mt={2}
                    id="calendar-container"
                    width="100%"
                    height="66vh"
                    overflow="scroll"
                    position="relative"
                >
                    <Grid
                        container
                        spacing={0}
                        width={`${dates.length * 15}%`}
                        columns={dates.length + 1}
                    >
                        {/* COLUMN 1 */}
                        <Grid
                            item
                            width="3%"
                            position="sticky"
                            left="0"
                            top="0"
                            zIndex={10}
                        >
                            {/* NULL BOX */}
                            <Box height="5vh"></Box>
                            {/* SLOTS */}
                            {slots.map((slot) => (
                                <Grid item key={slot}>
                                    <Box height="8vh" bgcolor="white">
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
                                    position="sticky"
                                    top="0"
                                    zIndex={10}
                                    bgcolor="white"
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
                                            // bgcolor="primary.200"
                                            border="0.5px solid"
                                            borderColor="primary.800"
                                            height="8vh"
                                            onClick={() => boxClick(date, slot)}
                                            width="100%"
                                            bgcolor={
                                                selections !== undefined &&
                                                selections.find(
                                                    (elem) =>
                                                        elem.slot === slot &&
                                                        matchDate(
                                                            elem.date,
                                                            date
                                                        )
                                                )
                                                    ? "#0275d8"
                                                    : "primary.200"
                                            }
                                        ></Box>
                                    </Grid>
                                ))}
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Box>

            {/* ERR */}
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

export default Event;
