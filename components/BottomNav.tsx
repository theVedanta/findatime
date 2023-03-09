import { Box, Typography } from "@mui/material";
import EventIcon from "@mui/icons-material/Event";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";

const BottomNav = () => {
    return (
        <Box
            display="flex"
            flexWrap={{ xs: "wrap", sm: "nowrap" }}
            width="100%"
            justifyContent="space-between"
            alignItems="center"
            px={{ xs: 3, sm: 6 }}
            py={2}
            color="primary.100"
            bgcolor="primary.900"
            position={{ xs: "static", sm: "absolute" }}
            bottom={0}
            left={0}
        >
            <Box
                sx={{ visibility: "hidden" }}
                display="flex"
                width={{ xs: "50%", sm: "33.33333333%" }}
            >
                <Typography display="flex" alignItems="center">
                    <InfoOutlinedIcon />
                    &nbsp;&nbsp;Learn More
                </Typography>
            </Box>
            <Typography
                sx={{ visibility: "hidden" }}
                display="flex"
                alignItems="center"
                width={{ xs: "50%", sm: "33.33333333%" }}
                justifyContent="center"
            >
                <FavoriteBorderOutlinedIcon />
                &nbsp;&nbsp;Support the Project
            </Typography>
            <Typography
                width={{ xs: "50%", sm: "33.33333333%" }}
                display="flex"
                mt={{ xs: 3, sm: 0 }}
                justifyContent={{ xs: "flex-start", sm: "flex-end" }}
            >
                FindaTime © 2022
            </Typography>
        </Box>
    );
};

export default BottomNav;
