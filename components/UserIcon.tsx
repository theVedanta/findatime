import { Avatar, Tooltip } from "@mui/material";

interface Props {
    src?: string;
    letter?: string;
    size?: string;
    name?: string;
    color?: string;
}

const UserIcon = ({ src, letter, size, name, color }: Props) => {
    return (
        <Tooltip title={name}>
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
        </Tooltip>
    );
};

export default UserIcon;
