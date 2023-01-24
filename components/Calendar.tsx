import Grid from "@mui/material/Grid";

const GridBox = ({ children }: { children: any }) => {
    return (
        <Grid container spacing={1}>
            {children}
        </Grid>
    );
};

export default GridBox;
