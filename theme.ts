import { createTheme } from "@mui/material";

const theme = createTheme({
    palette: {
        primary: {
            100: "white",
            200: "#F5F5F5",
            300: "#EBE28F", // Yellow
            400: "#FF8D4E", // Orange
            500: "#74B78F", // green
            600: "#333844",
            900: "#313131",
            800: "rgba(0, 0, 0, 0.2)",
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
                text: {
                    textTransform: "none",
                    color: "#313131",
                    ":hover": {
                        background: "#d7dbce",
                    },
                },
            },
            defaultProps: {
                variant: "contained",
                size: "large",
            },
        },
        MuiIconButton: {
            styleOverrides: {
                root: {
                    color: "#fff",
                    ":hover": {
                        backgroundColor: "rgba(255, 255, 255, 0.15)",
                    },
                },
            },
        },
    },
});

export default theme;
