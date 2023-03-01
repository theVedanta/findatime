import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { formatDistanceToNow } from "date-fns";
import {
    addDoc,
    collection,
    doc,
    onSnapshot,
    updateDoc,
} from "firebase/firestore";
import db from "./db";

interface Selection {
    date: Date;
    slot: string;
    box: number;
    name: string;
}
interface Meeting {
    owner: string;
    name: string;
    note?: string;
    duration: string;
    type: string;
    timezone?: string;
    date?: Date;
    active: Date;
    selections: Selection[];
}

if (process.env.NODE_ENV !== "production") {
    dotenv.config();
}

const app: Express = express();
const PORT = process.env.PORT || 4000;

// OPTIONS
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: false, limit: "50mb" }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(express.json());
app.use(cors());

app.post("/create", async (req: Request, res: Response) => {
    const meet = await addDoc(collection(db, "meetings"), {
        owner: req.body.owner !== undefined && req.body.owner,
        name: req.body.name,
        duration: req.body.duration,
        note: req.body.note,
        type: req.body.type,
        timezone: req.body.timezone,
        date: req.body.date,
        active: new Date(),
        selections: [],
    } as Meeting);

    try {
        res.json({ done: true, code: meet.id });
    } catch (err) {
        res.json({ err });
    }
});
app.get("/event/:id", async (req, res) => {
    res.setHeader("Content-Type", "text/event-stream");
    try {
        onSnapshot(doc(db, "meetings", req.params.id), (meet) => {
            meet.exists() &&
                res.write(
                    `data: ${JSON.stringify({
                        event: { id: meet.id, ...meet.data() },
                    })}\n\n`
                );
        });
    } catch (err) {
        res.write(`data: ${JSON.stringify({ err: "Not found" })}\n\n`);
    }
});

app.put("/update/:id", async (req, res) => {
    try {
        await updateDoc(doc(db, "meetings", req.params.id), req.body);
        res.json({ done: true });
    } catch (err) {
        res.json({ err });
    }
});

app.listen(PORT, () => console.log(`Listening on ${PORT}...`));

// setInterval(async () => {
//     const expiredMeets = await Meeting.find({

//     });
// }, 10000000);
