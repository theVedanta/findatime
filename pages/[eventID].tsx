import { useRouter } from "next/router";
import Nav from "../components/Nav";
import LeftBar from "../components/LeftBar";

const Event = () => {
    const router = useRouter();
    const { eventID } = router.query;

    return (
        <>
            <Nav name="Event name" />
            <LeftBar />
        </>
    );
};

export default Event;
