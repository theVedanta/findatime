import { Box, Typography } from "@mui/material";
import EventIcon from "@mui/icons-material/Event";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";

const BottomNav = () => {
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
            position="absolute"
            bottom={0}
            left={0}
        >
            <Box display="flex" width="33.33333333%">
                {/* <Typography display="flex" alignItems="center">
                    <EventIcon /> &nbsp;&nbsp;Plan a meet
                </Typography> */}
                <Typography display="flex" alignItems="center">
                    <InfoOutlinedIcon />
                    &nbsp;&nbsp;Learn More
                </Typography>
            </Box>
            <Typography
                display="flex"
                alignItems="center"
                width="33.33333333%"
                justifyContent="center"
            >
                <FavoriteBorderOutlinedIcon />
                &nbsp;&nbsp;Support the Project
            </Typography>
            <Typography
                width="33.33333333%"
                display="flex"
                justifyContent="flex-end"
            >
                FindaTime © 2022
            </Typography>
        </Box>
    );
};

export default BottomNav;
