import { Box, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import EventIcon from "@mui/icons-material/Event";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";

const Nav = ({ name = "" }) => {
    return (
        <Box
            display="flex"
            width="100%"
            justifyContent="space-between"
            alignItems="center"
            px={6}
            py={2}
            color="primary.100"
            bgcolor="primary.900"
            position="relative"
            zIndex={20}
        >
            <MenuIcon />

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

            <EventIcon />
        </Box>
    );
};

export default Nav;
