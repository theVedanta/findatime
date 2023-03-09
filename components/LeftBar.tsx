import { Box, Button, Typography } from "@mui/material";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import {
    EmailShareButton,
    FacebookShareButton,
    LinkedinShareButton,
    RedditShareButton,
    TelegramShareButton,
    TwitterShareButton,
    WhatsappShareButton,
} from "react-share";
import {
    Check,
    CheckRounded,
    EmailOutlined,
    FacebookOutlined,
    LinkedIn,
    Mail,
    MailOutline,
    PeopleAltOutlined,
    Reddit,
    Telegram,
    Twitter,
    WhatsApp,
} from "@mui/icons-material";
import { BASE_WEB_URL, days, months } from "../base";
import UserIcon from "../components/UserIcon";
import { useState, useEffect } from "react";
import { Meeting } from "../types";
import Image from "next/image";

interface User {
    name: string;
    color: string;
}

const LeftBar = ({ event, tab }: { event: Meeting; tab: boolean }) => {
    const [grpMembers, setGrpMembers] = useState<User[]>([]);
    const [copied, setCopied] = useState(false);
    const [bestTimes, setBestTimes] = useState<string[]>([]);

    useEffect(() => {
        // SETTING GRP MEMBERS
        let users =
            event &&
            event.selections &&
            event.selections.map((sel) => ({
                name: sel.name,
                color: sel.color,
            }));

        users =
            users &&
            users.filter(
                (v, i, a) => a.findIndex((v2) => v2.name === v.name) === i
            );
        setGrpMembers(users as User[]);

        // SETTING SUITED TIMES
        function getMax(arr: number[]) {
            let max = 0;
            arr.forEach((elem) => {
                if (elem > max) {
                    max = elem;
                }
            });

            return max;
        }

        let pCountObj: { [key: string]: number } = {};
        let bestTimeConst: string[] = [];

        event &&
            event.selections &&
            event.selections.forEach((sel) => {
                const selDate = new Date(sel.date);
                const dateAndSlot = `${selDate.getMonth()}/${selDate.getDate()}/${selDate.getFullYear()} ${
                    sel.slot
                }`;
                pCountObj[dateAndSlot] = pCountObj[dateAndSlot]
                    ? pCountObj[dateAndSlot] + 1
                    : 1;
            });

        let selCountArr = Object.values(pCountObj);
        let highSelCount = [];

        let i = 0;
        while (i < 3) {
            const newMax = getMax(selCountArr);
            highSelCount.push(newMax);
            selCountArr.splice(selCountArr.indexOf(newMax), 1);

            i += 1;
        }

        highSelCount.forEach((cnt) => {
            const key = Object.keys(pCountObj).find(
                (k) => pCountObj[k] === cnt
            );
            if (key !== undefined) {
                const dt = new Date((key as string).split(" ")[0]);
                bestTimeConst.push(
                    `${days[dt.getDay()].slice(0, 3)} ${dt.getDate()} ${
                        months[dt.getMonth()]
                    }, ${(key as string).split(" ")[1]} - ${
                        cnt === (users as []).length
                            ? "All"
                            : `${cnt}/${(users as []).length}`
                    } Available`
                );

                delete pCountObj[key];
            }
        });

        setBestTimes(bestTimeConst);
    }, [event]);

    return (
        <Box
            position={{ xs: "static", sm: "fixed" }}
            left={0}
            top={0}
            height={{ xs: "auto", sm: "100vh" }}
            width={{ xs: "100%", sm: "24%" }}
            borderRight="2px solid"
            borderColor="primary.900"
            zIndex={10}
            pt={{ xs: 0, sm: 8 }}
            pb={2}
            px={4}
            bgcolor="white"
            display={{ xs: !tab ? "flex" : "none", sm: "flex" }}
            flexDirection="column"
            justifyContent="space-between"
        >
            <Box>
                {tab && (
                    <Typography mt={3} mb={2} fontWeight={400} fontSize={28}>
                        Meeting Info
                    </Typography>
                )}

                <Typography
                    display="flex"
                    alignItems="center"
                    fontWeight={500}
                    fontSize={18}
                >
                    <AccessTimeOutlinedIcon />
                    &nbsp;Duration: {event && event.duration}
                </Typography>
                <Typography
                    fontSize={14}
                    fontWeight={200}
                    mt={1}
                    fontStyle="italic"
                >
                    {event && event.note && <>Note: {event.note}</>}
                </Typography>

                <Typography mt={{ xs: 1, sm: 4 }} mb={1} fontSize={18}>
                    Event Poll link
                </Typography>
                <Box
                    display="flex"
                    alignItems="center"
                    width="100%"
                    // boxShadow="0 0 10px rgba(0, 0, 0, 0.16)"
                    sx={{
                        border: "2px solid rgba(0, 0, 0, 0.3)",
                        ":hover": {
                            border: "2px solid rgba(0, 0, 0, 0.5)",
                        },
                    }}
                    borderRadius="5px"
                >
                    <Box
                        width="100%"
                        p={1}
                        px={2}
                        borderRadius="5px 0 0 5px"
                        bgcolor="primary.200"
                        overflow="scroll"
                        className="no-scrollbar"
                    >
                        <Typography whiteSpace="nowrap">
                            {copied
                                ? "Copied text!"
                                : `${BASE_WEB_URL}/${event && event.id}`}
                        </Typography>
                    </Box>
                    <Box
                        bgcolor="primary.500"
                        color="white"
                        display="flex"
                        alignItems="center"
                        py={1}
                        px={2}
                        borderRadius="0 3px 3px 0"
                        sx={{ cursor: "pointer" }}
                        onClick={() => {
                            setCopied(true);
                            navigator.clipboard.writeText(
                                `${BASE_WEB_URL}/${event && event.id}`
                            );

                            setTimeout(() => setCopied(false), 3000);
                        }}
                    >
                        {copied ? (
                            <CheckRounded />
                        ) : (
                            <ContentCopyOutlinedIcon />
                        )}
                    </Box>
                </Box>

                <Box
                    display="flex"
                    width="100%"
                    justifyContent="space-between"
                    pr={12}
                    mt={3}
                    sx={{ opacity: 0.4 }}
                >
                    <EmailShareButton
                        url={`${BASE_WEB_URL}/${event && event.id}`}
                    >
                        <EmailOutlined />
                    </EmailShareButton>
                    <FacebookShareButton
                        url={`${BASE_WEB_URL}/${event && event.id}`}
                    >
                        <FacebookOutlined />
                    </FacebookShareButton>
                    <LinkedinShareButton
                        url={`${BASE_WEB_URL}/${event && event.id}`}
                    >
                        <LinkedIn />
                    </LinkedinShareButton>
                    <RedditShareButton
                        url={`${BASE_WEB_URL}/${event && event.id}`}
                    >
                        <Reddit />
                    </RedditShareButton>
                    <TelegramShareButton
                        url={`${BASE_WEB_URL}/${event && event.id}`}
                    >
                        <Telegram />
                    </TelegramShareButton>
                    <TwitterShareButton
                        url={`${BASE_WEB_URL}/${event && event.id}`}
                    >
                        <Twitter />
                    </TwitterShareButton>
                    <WhatsappShareButton
                        url={`${BASE_WEB_URL}/${event && event.id}`}
                    >
                        <WhatsApp />
                    </WhatsappShareButton>
                </Box>

                {bestTimes && bestTimes.length !== 0 && (
                    <>
                        <Typography
                            display="flex"
                            alignItems="center"
                            mt={{ xs: 3, sm: 5 }}
                            mb={1}
                            color="primary.500"
                            fontSize={18}
                            fontWeight={500}
                        >
                            <Check />
                            &nbsp;&nbsp;Best Available Times for Group
                        </Typography>
                        {bestTimes.map((tm, i) => (
                            <Typography key={i} mt={1.4}>
                                {tm}
                            </Typography>
                        ))}
                    </>
                )}

                {grpMembers && grpMembers.length !== 0 && (
                    <Box
                        mt={{ xs: 3, sm: 6 }}
                        pb={{ xs: 2, sm: 4 }}
                        id="user-section"
                        maxHeight={275}
                        overflow="scroll"
                    >
                        <Typography
                            display="flex"
                            alignItems="center"
                            mb={2}
                            fontSize={18}
                            fontWeight={500}
                        >
                            <PeopleAltOutlined />
                            &nbsp;&nbsp; Group Members
                        </Typography>

                        {grpMembers &&
                            grpMembers.map((mem) => (
                                <Box
                                    key={mem.name}
                                    display="flex"
                                    alignItems="center"
                                    mt={1}
                                >
                                    <UserIcon
                                        letter={(
                                            mem.name[0] + mem.name.slice(-1)
                                        ).toUpperCase()}
                                        color={mem.color}
                                    />
                                    <Typography
                                        fontSize={17}
                                        fontWeight={100}
                                        ml={2}
                                    >
                                        {mem.name}
                                    </Typography>
                                </Box>
                            ))}
                    </Box>
                )}
            </Box>

            <Box mt={{ xs: 3, sm: 0 }}>
                <Button sx={{ marginBottom: 2 }}>
                    <MailOutline />
                    &nbsp;&nbsp;Email Reminder
                </Button>
                <Button
                    sx={{
                        background: "transparent",
                        color: "#1E88E5",
                        ":hover": { background: "transparent" },
                    }}
                >
                    <Image
                        src="/assets/google-calendar.png"
                        alt="google calendar"
                        width={20}
                        height={20}
                    />
                    &nbsp;&nbsp;Add to Google Calendar
                </Button>
            </Box>
        </Box>
    );
};

export default LeftBar;
