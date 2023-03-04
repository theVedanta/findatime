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
    PeopleAltOutlined,
    Reddit,
    Telegram,
    Twitter,
    WhatsApp,
} from "@mui/icons-material";
import { BASE_WEB_URL } from "../base";
import UserIcon from "../components/UserIcon";
import { useState, useEffect } from "react";
import { Meeting } from "../types";

interface User {
    name: string;
    color: string;
}

const LeftBar = ({ event }: { event: Meeting }) => {
    const [grpMembers, setGrpMembers] = useState<User[]>([]);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
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
    }, [event]);

    return (
        <Box
            position="fixed"
            left={0}
            top={0}
            height="100vh"
            width="24%"
            borderRight="2px solid"
            borderColor="primary.900"
            zIndex={10}
            pt={8}
            pb={2}
            px={4}
            bgcolor="white"
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
        >
            <Box>
                <Typography mt={3} mb={2} fontWeight={400} fontSize={28}>
                    Meeting Info
                </Typography>

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
                    Note: This is the poll to decide the best time for Exile
                    members to meet to discuss Issue#2
                </Typography>

                <Typography mt={4} mb={1} fontSize={18}>
                    Event Poll link
                </Typography>
                <Box
                    display="flex"
                    alignItems="center"
                    width="100%"
                    boxShadow="0 0 10px rgba(0, 0, 0, 0.16)"
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
                        borderRadius="0 5px 5px 0"
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

                <Typography
                    display="flex"
                    alignItems="center"
                    mt={5}
                    mb={1}
                    color="primary.500"
                    fontSize={18}
                    fontWeight={500}
                >
                    <Check />
                    &nbsp;&nbsp;Best Available Times for Group
                </Typography>
                <Typography mt={1.4}>
                    Fri 15th Oct, 12 - 12:30 PM - <u>All Available</u>
                </Typography>
                <Typography mt={1.4}>
                    Sat 16th Oct, 12-12:30 PM - <u>4/5 Available</u>
                </Typography>
                <Typography mt={1.4}>
                    Fri 15th Oct, 12 - 12:30 PM - <u>All Available</u>
                </Typography>

                <Box
                    mt={6}
                    pb={4}
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
            </Box>

            <Box>
                <Button size="small" sx={{ marginBottom: 2 }}>
                    Email Reminder
                </Button>
                <Button
                    size="small"
                    sx={{
                        background: "transparent",
                        color: "#1E88E5",
                        ":hover": { background: "transparent" },
                    }}
                >
                    Add to Google Calendar
                </Button>
            </Box>
        </Box>
    );
};

export default LeftBar;
