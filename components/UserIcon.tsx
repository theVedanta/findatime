import { Box } from "@mui/material";
import Image from "next/image";

interface Props {
    src: string;
    alt?: string;
}

const UserIcon = ({ src, alt = "alt" }: Props) => {
    return (
        <Box width={36} height={36} borderRadius="50%" overflow="hidden">
            <Image src={src} alt={alt} width={36} height={36} />
        </Box>
    );
};

export default UserIcon;
