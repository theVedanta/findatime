import mongoose from "mongoose";

interface Meeting {
    owner?: string;
    code: string;
    name: string;
    note?: string;
    duration: string;
    type: string;
    timezone: string;
    date: Date;
}

const meetingSchema: mongoose.Schema = new mongoose.Schema<Meeting>(
    {
        owner: String,
        code: { type: String, required: true },
        name: { type: String, required: true },
        note: String,
        duration: String,
        type: { type: String, required: true },
        timezone: String,
        date: Date,
    },
    { versionKey: false, timestamps: true }
);

export default mongoose.model<Meeting>("meeting", meetingSchema);
