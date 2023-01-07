import { Box, Typography } from "@mui/material";

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
            <Box display="flex">
                <Typography>Plan a meet</Typography>
                <Typography ml={3}>Learn More</Typography>
            </Box>
            <Typography>Support the Project</Typography>
            <Typography>FindaTime © 2022</Typography>
        </Box>
    );
};

export default BottomNav;
