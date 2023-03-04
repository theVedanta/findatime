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
    IconButton,
    InputAdornment,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    Snackbar,
    TextField,
    Typography,
} from "@mui/material";
import { FC, useEffect, useState } from "react";
import {
    CheckRounded,
    ChevronLeft,
    ChevronRight,
    EnergySavingsLeafTwoTone,
} from "@mui/icons-material";
import { colors, days, months, slots } from "../base";
import UserIcon from "../components/UserIcon";
import { red } from "@mui/material/colors";
import { Meeting, Selection } from "../types";
import {
    collection,
    doc,
    getDocs,
    onSnapshot,
    query,
    updateDoc,
    where,
} from "firebase/firestore";
import db from "../db";
import Auth from "../components/Auth";

const Event: FC = ({ authed, setAuthed, user, setUser }: any) => {
    const router = useRouter();
    const { eventID } = router.query;
    const [timezone, setTimezone] = useState("");
    const [event, setEvent] = useState<Meeting>({});
    const [dates, setDates] = useState<Date[]>([]);
    const [selections, setSelections] = useState<Selection[]>([]);
    const [name, setName] = useState(" ");
    const [err, setErr] = useState(false);
    const [errMsg, setErrMsg] = useState("");
    const [nameTaken, setNameTaken] = useState(false);
    const [authOpen, setAuthOpen] = useState(false);
    const [color, setColor] = useState("");
    const [changedName, setChangedName] = useState(false);

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

    const checkUniqueness = async (nm: string) => {
        const docsWithName = await getDocs(
            query(collection(db, "users"), where("username", "==", nm))
        );

        if (docsWithName.size > 0) {
            return false;
        } else {
            return true;
        }
    };

    const updateSelections = async (sels: Selection[]) => {
        try {
            if (!event.timezone) return;
            await updateDoc(doc(db, "meetings", eventID as string), {
                selections: sels,
            });
        } catch (err) {
            showErr("Some error occurred with app");
        }
    };

    const randomName = (nm: string) => {
        return nm + ` ${Math.trunc(Math.random() * 10000)}`;
    };

    const updateNameInSelections = (fromName: string, toName: string) => {
        const selsCopy = [...selections];
        selsCopy.forEach((sel, i) => {
            if (sel.name === fromName) {
                sel["name"] = toName;
            }
        });

        setSelections(selsCopy);
        updateSelections(selsCopy);
    };

    const isNameTaken = async (nm: string) => {
        if (
            selections.find((sel) => sel.name === nm) ||
            !(await checkUniqueness(nm))
        ) {
            setNameTaken(true);
            return true;
        } else {
            setNameTaken(false);
            return false;
        }
    };

    const checkName: any = async (
        nm: string = name,
        change: boolean = false
    ) => {
        setChangedName(false);
        // nm is newly entered name
        if (nm === "") {
            return setNameTaken(true);
        }
        if (name === nm && !change) {
            return setNameTaken(false);
        }
        if (await isNameTaken(nm)) {
            if (change) {
                const newName = randomName(nm);
                (
                    document.querySelector("#name-input") as HTMLInputElement
                ).value = newName;

                if (
                    selections.find((sel) => sel.name === nm) ||
                    !(await checkUniqueness(nm))
                ) {
                    checkName(newName, true);
                } else {
                    setName(newName);
                    sessionStorage.setItem("name", newName);
                }
            }
        } else {
            updateNameInSelections(name, nm);
            typeof window !== "undefined" && sessionStorage.setItem("name", nm);
            setName(nm);
            if (change)
                (
                    document.querySelector("#name-input") as HTMLInputElement
                ).value = nm;
        }
    };

    const boxClick = async (date: Date, slot: string, box: number) => {
        let newSels = [...selections];
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
                    date: date.toString(),
                    slot,
                    box,
                    name,
                    color,
                },
            ];
        }
        updateSelections(newSels);
    };

    const changeDates = (forward: boolean) => {
        const dts = [];
        for (let i = 0; i <= 7; i++) {
            const newDate = forward
                ? new Date(dates[dates.length - 1])
                : new Date(dates[0]);
            forward
                ? newDate.setDate(dates[dates.length - 1].getDate() + i)
                : newDate.setDate(dates[0].getDate() - i);

            dts.push(newDate);
        }

        !forward && dts.reverse();
        setDates(dts);
    };

    useEffect(() => {
        const dts = [new Date()];
        const newDate = new Date();
        for (let i = 0; i < 7; i++) {
            newDate.setDate(newDate.getDate() + 1);
            dts.push(new Date(newDate));
        }

        setDates(dts);

        const getEvent = async () => {
            try {
                onSnapshot(doc(db, "meetings", eventID as string), (meet) => {
                    if (meet.exists()) {
                        const meetData = meet.data();

                        setEvent({ id: eventID as string, ...meetData });
                        setSelections(
                            meetData.selections !== undefined
                                ? meetData.selections
                                : []
                        );

                        setTimezone(meetData.timezone);
                    } else {
                        window.location.href = "/";
                        showErr("Meet not found");
                    }
                });
            } catch (err) {
                showErr("Some error occurred");
            }
        };

        eventID && getEvent();
    }, [eventID]);

    useEffect(() => {
        if (authed !== "check") {
            if (user && user.username) {
                updateNameInSelections(name, user.username);
                setNameTaken(false);
                setName(user.username);
                (
                    document.querySelector("#name-input") as HTMLInputElement
                ).value = user.username;

                setColor(user.color);
            } else if (sessionStorage.getItem("name")) {
                checkName(sessionStorage.getItem("name") as string, true);
                setColor(sessionStorage.getItem("color") as string);
            } else {
                checkName(
                    `New user ${Math.trunc(Math.random() * 10000).toString()}`,
                    true
                );
                setColor(colors[Math.trunc(Math.random() * 10)]);
                sessionStorage.setItem(
                    "color",
                    colors[Math.trunc(Math.random() * 10)]
                );
            }
        }
    }, [user, authed]);

    return (
        <>
            <LeftBar event={event} />
            <Nav name={event && event.name} />

            {authOpen && !authed && (
                <Auth
                    authed={authed}
                    setAuthed={setAuthed}
                    user={user}
                    setUser={setUser}
                    name={name}
                    authOpen={authOpen}
                    setAuthOpen={setAuthOpen}
                    color={color}
                    checkUniqueness={checkUniqueness}
                    setChangedName={setChangedName}
                />
            )}

            <Box pl="26%" mt={12}>
                <Box display="flex">
                    <FormControl
                        variant="outlined"
                        sx={{
                            width: "40%",
                            marginRight: 2,
                        }}
                    >
                        <InputLabel size="small" htmlFor="name-input">
                            Username*
                        </InputLabel>
                        <OutlinedInput
                            label="Username*"
                            defaultValue={name}
                            disabled={user && user.username ? true : false}
                            id="name-input"
                            size="small"
                            sx={{ paddingRight: 0 }}
                            onChange={(e) => {
                                setChangedName(true);
                                isNameTaken(e.target.value.trim());
                            }}
                            endAdornment={
                                <InputAdornment variant="filled" position="end">
                                    <Button
                                        onClick={() =>
                                            checkName(
                                                (
                                                    document.querySelector(
                                                        "#name-input"
                                                    ) as HTMLInputElement
                                                ).value.trim()
                                            )
                                        }
                                        sx={{ boxShadow: "none" }}
                                        disabled={!changedName || nameTaken}
                                    >
                                        <CheckRounded />
                                    </Button>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                    <FormControl sx={{ width: "20%", marginRight: 2 }}>
                        <InputLabel size="small" required id="duration">
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

                    {!authed ? (
                        <Button
                            sx={{ width: "30%" }}
                            size="small"
                            onClick={() => setAuthOpen(true)}
                            disabled={nameTaken}
                        >
                            Sign in to save and edit meet
                        </Button>
                    ) : (
                        <Button
                            sx={{ width: "20%" }}
                            size="small"
                            onClick={() => {
                                setAuthed(false);
                                setUser({});
                                localStorage.removeItem("auth-token");
                            }}
                        >
                            Logout
                        </Button>
                    )}
                </Box>

                <Typography
                    sx={{
                        opacity: nameTaken || changedName ? 1 : 0,
                        transition: "all 0.2s",
                    }}
                    color={red[600]}
                    fontSize={14}
                >
                    <b>
                        {nameTaken
                            ? "This name is taken/invalid"
                            : "Name has been edited, please save to proceed"}
                    </b>
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

                <Typography fontWeight={500} fontSize={16} mt={2}>
                    Click/tap on the times and dates that suit you below
                </Typography>

                <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    mt={4}
                    pr={6}
                >
                    {dates.length !== 0 && (
                        <Typography fontSize={20} mr={3}>
                            {months[dates[0].getMonth()]}&nbsp;
                            {dates[0].getDate()} -{" "}
                            {months[dates[dates.length - 1].getMonth()]}&nbsp;
                            {dates[dates.length - 1].getDate()}
                        </Typography>
                    )}

                    {event && event.type !== "week" && (
                        <Box display="flex" alignItems="center">
                            <Button
                                variant="text"
                                onClick={() => changeDates(false)}
                            >
                                <ChevronLeft />
                            </Button>
                            <Button
                                variant="text"
                                onClick={() => changeDates(true)}
                            >
                                <ChevronRight />
                            </Button>
                        </Box>
                    )}
                </Box>

                <Box
                    mt={1}
                    id="calendar-container"
                    width="100%"
                    height="68vh"
                    overflow="scroll"
                    position="relative"
                    sx={{
                        pointerEvents:
                            nameTaken || event.name === undefined || changedName
                                ? "none"
                                : "all",
                        opacity:
                            nameTaken || event.name === undefined || changedName
                                ? 0.3
                                : 1,
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
                                                    sx={{
                                                        cursor: "pointer",
                                                        transition: "all 0.3s",
                                                    }}
                                                    key={i}
                                                    p={0.5}
                                                    bgcolor={
                                                        matchBox(date, slot, i)
                                                            ? matchBox(
                                                                  date,
                                                                  slot,
                                                                  i,
                                                                  true
                                                              )
                                                                ? "primary.500"
                                                                : "primary.300"
                                                            : "primary.200"
                                                    }
                                                    alignItems="center"
                                                    px={2}
                                                    onClick={() => {
                                                        boxClick(date, slot, i);
                                                    }}
                                                    borderLeft={
                                                        matchBox(
                                                            date,
                                                            slot,
                                                            i
                                                        ) &&
                                                        "6px solid rgba(0, 0, 0, 0.25)"
                                                    }
                                                    borderBottom="0.1px solid #fff"
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
                                                        <AvatarGroup
                                                            sx={{
                                                                "& .MuiAvatar-root":
                                                                    {
                                                                        width: 24,
                                                                        height: 24,
                                                                        fontSize: 14,
                                                                    },
                                                            }}
                                                            max={3}
                                                        >
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
                                                                        letter={(
                                                                            sel
                                                                                .name[0] +
                                                                            sel.name.slice(
                                                                                -1
                                                                            )
                                                                        ).toUpperCase()}
                                                                        name={
                                                                            sel.name
                                                                        }
                                                                        size="sm"
                                                                        color={
                                                                            sel.color
                                                                        }
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
