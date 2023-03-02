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
import { useState } from "react";

interface Props {
    src?: string;
    letter?: string;
    size?: string;
}

const UserIcon = ({ src, letter, size }: Props) => {
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
    const [color, setColor] = useState(colors[Math.trunc(Math.random() * 10)]);

    return (
        <Avatar
            sx={{
                width: size === "sm" ? 26 : 36,
                height: size === "sm" ? 26 : 36,
                fontSize: size === "sm" ? 14 : 20,
                background: !src ? color : "transparent",
            }}
            src={src && src}
        >
            {!src && letter}
        </Avatar>
    );
};

export default UserIcon;
