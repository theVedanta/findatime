import { Box, Button, Drawer, IconButton, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import { BiCalendarPlus } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";
import Link from "next/link";
import { useState } from "react";
import { Person } from "@mui/icons-material";

const Nav = ({ name = "" }) => {
    const [drawerOpen, setDrawerOpen] = useState(false);

    const links = {
        "Plan a Meeting": { link: "/", icon: <EventAvailableIcon /> },
        Login: { link: "/", icon: <Person /> },
    };

    return (
        <Box
            display="flex"
            width="100%"
            justifyContent="space-between"
            alignItems="center"
            px={{ xs: 3, sm: 6 }}
            py={1}
            color="primary.100"
            bgcolor="primary.900"
            position="fixed"
            top={0}
            left={0}
            zIndex={20}
        >
            <IconButton onClick={() => setDrawerOpen(true)}>
                <MenuIcon />
            </IconButton>

            <Drawer
                anchor="left"
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
            >
                <Typography
                    fontSize={40}
                    mr={20}
                    fontWeight="bold"
                    my={4}
                    pl={4}
                >
                    FindATime
                </Typography>
                <IconButton
                    sx={{
                        color: "#000",
                        position: "absolute",
                        top: 8,
                        right: 8,
                        fontSize: 28,
                    }}
                    onClick={() => setDrawerOpen(false)}
                >
                    <RxCross2 />
                </IconButton>
                <Box sx={{ borderTop: "1px solid rgba(0, 0, 0, 0.2)" }}>
                    {Object.keys(links).map((title) => (
                        <Link
                            style={{ textDecoration: "none" }}
                            key={title}
                            href={links[title as keyof typeof links].link}
                        >
                            <Button
                                sx={{
                                    width: "100%",
                                    display: "flex",
                                    justifyContent: "flex-start",
                                    alignItems: "center",
                                    borderBottom:
                                        "1px solid rgba(0, 0, 0, 0.2)",
                                    borderRadius: 0,
                                }}
                                variant="text"
                            >
                                {links[title as keyof typeof links].icon}
                                &nbsp;&nbsp;{title}
                            </Button>
                        </Link>
                    ))}
                </Box>
            </Drawer>

            {!name ? (
                <Box display="flex" alignItems="center">
                    <EventAvailableIcon />
                    &nbsp;
                    <Typography fontWeight={500} fontSize={22}>
                        Plan a Meeting
                    </Typography>
                </Box>
            ) : (
                <Typography fontWeight={500} fontSize={22}>
                    {name}
                </Typography>
            )}

            <Link href="/">
                <IconButton>
                    <BiCalendarPlus />
                </IconButton>
            </Link>
        </Box>
    );
};

export default Nav;
