import { CalendarToday, InfoOutlined } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";

const SwitchTab = ({ tab, setTab }: { tab: boolean; setTab: any }) => {
    return (
        <Box display={{ xs: "flex", sm: "none" }} justifyContent="center">
            <Box
                mb={2.6}
                px={0.8}
                py={0.6}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                width="auto"
                border="1.6px solid rgba(0, 0, 0, 0.3)"
                bgcolor="rgba(0, 0, 0, 0.06)"
                borderRadius={2}
            >
                <Typography
                    fontSize={14}
                    bgcolor={tab ? "primary.500" : "transparent"}
                    color={tab ? "white" : "black"}
                    borderRadius={1}
                    mr={1}
                    px={1.4}
                    py={0.6}
                    display="flex"
                    alignItems="center"
                    onClick={() => setTab(true)}
                >
                    <CalendarToday sx={{ fontSize: 18 }} />
                    &nbsp;&nbsp;Times/Days
                </Typography>
                <Typography
                    fontSize={14}
                    bgcolor={!tab ? "primary.500" : "transparent"}
                    color={!tab ? "white" : "black"}
                    borderRadius={1}
                    px={1.4}
                    py={0.6}
                    display="flex"
                    alignItems="center"
                    onClick={() => setTab(false)}
                >
                    <InfoOutlined sx={{ fontSize: 18 }} />
                    &nbsp;&nbsp;Meet info
                </Typography>
            </Box>
        </Box>
    );
};

export default SwitchTab;
