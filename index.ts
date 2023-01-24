import express, { Express, Request, Response } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Meeting from "./models/Meeting";
import createCode from "./createCode";
import cors from "cors";
import cookieParser from "cookie-parser";
if (process.env.NODE_ENV !== "production") {
    dotenv.config();
}

const app: Express = express();
const PORT = process.env.PORT || 4000;
const DB_URL = <string>process.env.DB_URL;

// OPTIONS
mongoose.set("strictQuery", false);
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: false, limit: "50mb" }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(express.json());
app.use(cors());

// DB CONNECTION
async function connectDB() {
    await mongoose.connect(DB_URL, {});
    app.listen(PORT, () => console.log(`Listening on ${PORT}...`));
}
connectDB();

app.post("/create", async (req: Request, res: Response) => {
    const code = createCode();
    const meeting = new Meeting({
        code,
        owner: req.body.owner && req.body.owner,
        name: req.body.name,
        duration: req.body.duration,
        note: req.body.note,
        type: req.body.type,
        timezone: req.body.timezone,
        date: req.body.date,
    });

    try {
        await meeting.save();
        res.json({ done: true, code });
    } catch (err) {
        res.json({ err });
    }
});
