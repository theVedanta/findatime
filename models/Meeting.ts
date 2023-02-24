import mongoose from "mongoose";

interface Meeting {
    owner?: string;
    code: string;
    name: string;
    note?: string;
    duration: string;
    type: "week" | "specific" | "day";
    timezone: string;
    date: Date;
    active: Date;
}

const meetingSchema: mongoose.Schema = new mongoose.Schema<Meeting>(
    {
        owner: String,
        code: { type: String, required: true, unique: true },
        name: { type: String, required: true },
        note: String,
        duration: String,
        type: { type: String, required: true },
        timezone: String,
        date: Date,
        active: Date,
    },
    { versionKey: false, timestamps: true }
);

export default mongoose.model<Meeting>("meeting", meetingSchema);
