import { createTheme } from "@mui/material";

const theme = createTheme({
    palette: {
        primary: {
            100: "white",
            200: "#F5F5F5",
            500: "#74B78F",
            900: "#313131",
        },
    },
    typography: {
        fontFamily: [
            "DM Sans",
            "BlinkMacSystemFont",
            '"Segoe UI"',
            "Roboto",
            '"Helvetica Neue"',
            "Arial",
            "sans-serif",
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(","),
    },
    components: {
        MuiTextField: {
            defaultProps: {
                size: "small",
                fullWidth: true,
            },
        },
        MuiSelect: {
            defaultProps: {
                size: "small",
                fullWidth: true,
            },
        },
        MuiButton: {
            styleOverrides: {
                contained: {
                    color: "#ffffff",
                    textTransform: "none",
                    width: "100%",
                },
            },
            defaultProps: {
                variant: "contained",
                size: "large",
            },
        },
    },
});

export default theme;
