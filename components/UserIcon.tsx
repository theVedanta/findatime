import { Avatar, Box } from "@mui/material";
import {
    blue,
    brown,
    green,
    lime,
    orange,
    pink,
    purple,
    red,
    teal,
    yellow,
} from "@mui/material/colors";

interface Props {
    src?: string;
    letter?: string;
}

const UserIcon = ({ src, letter }: Props) => {
    const colors: string[] = [
        orange[500],
        blue[500],
        red[500],
        purple[500],
        yellow[800],
        green[500],
        pink[500],
        lime[700],
        teal[500],
        brown[500],
    ];

    return (
        <Box width={36} height={36} borderRadius="50%" overflow="hidden">
            <Avatar
                sx={{
                    width: 36,
                    height: 36,
                    background: !src
                        ? colors[Math.trunc(Math.random() * 10)]
                        : "transparent",
                }}
                src={src && src}
            >
                {!src && letter}
            </Avatar>
        </Box>
    );
};

export default UserIcon;
