import { useRouter } from "next/router";
import Nav from "../components/Nav";
import LeftBar from "../components/LeftBar";
import {
    Alert,
    AvatarGroup,
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
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { BASE_API_URL, days, months } from "../base";
import axios from "axios";
import UserIcon from "../components/UserIcon";
import { red } from "@mui/material/colors";

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
    box: number;
    name: string;
}

const Event = () => {
    const router = useRouter();
    const { eventID } = router.query;
    const [timezone, setTimezone] = useState("");
    const [event, setEvent] = useState<Meeting>({});
    const [dates, setDates] = useState<Date[]>([]);
    const [selections, setSelections] = useState<Selection[]>([]);
    const [name, setName] = useState("New user");
    const [err, setErr] = useState(false);
    const [errMsg, setErrMsg] = useState("");
    const [nameTaken, setNameTaken] = useState(false);
    const [updateName, setUpdateName] = useState(false);
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

    const matchBox = (
        date: Date | string,
        slot: string,
        box: number,
        nameArg: boolean = false
    ) => {
        return selections && nameArg
            ? selections.find(
                  (elem) =>
                      elem.slot === slot &&
                      matchDate(elem.date, date) &&
                      elem.box === box &&
                      elem.name === name
              )
            : selections.find(
                  (elem) =>
                      elem.slot === slot &&
                      matchDate(elem.date, date) &&
                      elem.box === box
              );
    };

    const boxClick = async (date: Date, slot: string, box: number) => {
        let newSels = [...selections];
        console.log(matchBox(date, slot, box, true));
        if (matchBox(date, slot, box, true)) {
            newSels = selections.filter(
                (sel) =>
                    sel.slot !== slot ||
                    matchDate(sel.date, date, true) ||
                    sel.box !== box ||
                    sel.name !== name
            );
        } else {
            newSels = [
                ...selections,
                {
                    date,
                    slot,
                    box,
                    name,
                },
            ];
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

    const checkName: any = (currentName: string, initial: boolean = false) => {
        if (currentName === "") setNameTaken(true);
        else {
            if (selections.find((sel) => sel.name === currentName)) {
                if (initial) {
                    const newName = `${currentName} ${
                        selections.filter((sel) => sel.name === currentName)
                            .length
                    }`;
                    console.log(
                        newName,
                        selections.find((sel) => sel.name === newName)
                    );
                    if (selections.find((sel) => sel.name === newName))
                        return checkName(newName, true);

                    setName(newName as string);
                    (
                        document.querySelector(
                            "#name-input"
                        ) as HTMLInputElement
                    ).value = newName;
                } else {
                    setNameTaken(true);
                }
            } else {
                setName(currentName);
                setNameTaken(false);
            }
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
                setUpdateName(!updateName);
            };
            sseClient.onerror = () => console.log("Something went wrong!");
        };

        eventID && getEvent();
    }, [eventID]);

    useEffect(() => {
        checkName(name, true);
    }, [updateName]);

    return (
        <>
            <LeftBar event={event} />
            <Nav name={event && event.name} />

            <Box pl="26%" mt={5}>
                <Box display="flex">
                    <TextField
                        sx={{ width: "40%", marginRight: 2 }}
                        label="Username*"
                        defaultValue={name}
                        id="name-input"
                        onChange={(e) => checkName(e.target.value.trim())}
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
                {nameTaken && (
                    <Typography color={red[600]} fontSize={14}>
                        <b>This name is taken</b>
                    </Typography>
                )}

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
                            bgcolor="primary.300"
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
                    sx={{
                        pointerEvents: nameTaken ? "none" : "all",
                        opacity: nameTaken ? 0.3 : 1,
                    }}
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
                                            width="100%"
                                            bgcolor="primary.200"
                                        >
                                            {(event &&
                                            event.duration === "1 Hour"
                                                ? [1]
                                                : [1, 2]
                                            ).map((i) => (
                                                <Box
                                                    sx={{ cursor: "pointer" }}
                                                    key={i}
                                                    p={1}
                                                    bgcolor={
                                                        matchBox(date, slot, i)
                                                            ? "primary.500"
                                                            : "primary.200"
                                                    }
                                                    alignItems="center"
                                                    px={2}
                                                    onClick={() =>
                                                        boxClick(date, slot, i)
                                                    }
                                                    borderLeft={
                                                        matchBox(
                                                            date,
                                                            slot,
                                                            i
                                                        ) &&
                                                        "8px solid rgba(0, 0, 0, 0.2)"
                                                    }
                                                    width="100%"
                                                    height={
                                                        event &&
                                                        event.duration ===
                                                            "1 Hour"
                                                            ? "100%"
                                                            : "50%"
                                                    }
                                                >
                                                    {matchBox(
                                                        date,
                                                        slot,
                                                        i
                                                    ) && (
                                                        <AvatarGroup max={2}>
                                                            {selections
                                                                .filter(
                                                                    (sel) =>
                                                                        sel.slot ===
                                                                            slot &&
                                                                        matchDate(
                                                                            sel.date,
                                                                            date
                                                                        ) &&
                                                                        sel.box ===
                                                                            i
                                                                )
                                                                .map((sel) => (
                                                                    <UserIcon
                                                                        key={
                                                                            sel.name
                                                                        }
                                                                        letter={`${sel.name[0].toUpperCase()}${sel.name
                                                                            .slice(
                                                                                -1
                                                                            )
                                                                            .toUpperCase()}`}
                                                                        size="sm"
                                                                    />
                                                                ))}
                                                        </AvatarGroup>
                                                    )}
                                                </Box>
                                            ))}
                                        </Box>
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
