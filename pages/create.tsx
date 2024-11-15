import {
	Alert,
	Box,
	Button,
	FormControl,
	FormControlLabel,
	InputLabel,
	MenuItem,
	Radio,
	RadioGroup,
	Select,
	Snackbar,
	TextField,
	Typography,
} from "@mui/material";
import Nav from "../components/Nav";
import React, { useEffect, useState } from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import BottomNav from "../components/BottomNav";
import db from "../db";
import { addDoc, collection } from "firebase/firestore";
import { Meeting } from "../types";
import { tzs } from "../base";
import { useRouter } from "next/router";

const Index = ({ setAuthed, setUser, authed }: any) => {
	const [duration, setDuration] = useState("1 Hour");
	const [timezone, setTimezone] = useState<string>(
		((new Date().getTimezoneOffset() / 60) * -1).toString()
	);
	const [type, setType] = useState("specific");
	const [date, setDate] = useState(new Date());
	const [name, setName] = useState("");
	const [note, setNote] = useState("");
	const [err, setErr] = useState(false);
	const [errMsg, setErrMsg] = useState("");
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	const showErr = (msgToSet: string) => {
		setErrMsg(msgToSet);
		setErr(true);
		setTimeout(() => setErr(false), 5000);
	};
	const handleClose = (
		event: React.SyntheticEvent | Event,
		reason?: string
	) => {
		if (reason === "clickaway") {
			return;
		}

		setErr(false);
	};

	const createEvent = async () => {
		setLoading(true);
		try {
			if (name === "") {
				setLoading(false);
				return showErr("Please fill in all the required fields");
			}

			const meet = await addDoc(collection(db, "meetings"), {
				name,
				duration,
				note,
				type,
				timezone,
				date: date.toString(),
				active: new Date().toString(),
				selections: [],
			} as Meeting);

			window.location.href = `/${meet.id}`;
		} catch (err) {
			setLoading(false);
			showErr("Some error occurred");
		}
	};

	useEffect(() => {
		process.env.NEXT_PUBLIC_NODE_ENV !== "dev" && router.push("/");
	}, [router]);

	return (
		<>
			<Nav authed={authed} setAuthed={setAuthed} setUser={setUser} />

			<Box
				mt={{ xs: 10, sm: 12, xl: 16 }}
				px={{ xs: 4, sm: 12, lg: 36, xl: 64 }}
				mb={{ xs: 8, sm: 0 }}
			>
				<Typography
					mb={{ xs: 2, sm: 4 }}
					fontWeight={400}
					fontSize={{ xs: 22, sm: 28 }}
				>
					Meeting Info
				</Typography>
				<TextField
					onChange={(e) => setName(e.target.value.trim())}
					label="Event name"
					required
				/>
				<TextField
					label="Note (optional)"
					onChange={(e) => setNote(e.target.value.trim())}
					multiline
					rows={3}
					sx={{ marginTop: { xs: "20px", sm: "26px" } }}
				/>
				<Box
					display="flex"
					width="full"
					sx={{ marginTop: { xs: "20px", sm: "26px" } }}
				>
					<FormControl fullWidth>
						<InputLabel required id="duration">
							Duration
						</InputLabel>
						<Select
							required
							labelId="duration"
							name="duration"
							id="duration"
							label="duration"
							value={duration}
							onChange={(e) => setDuration(e.target.value)}
						>
							<MenuItem value="30 Mintutes">30 Minutes</MenuItem>
							<MenuItem value="1 Hour">1 Hour</MenuItem>
						</Select>
					</FormControl>
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					<FormControl fullWidth>
						<InputLabel required id="time-zone">
							Timezone
						</InputLabel>
						<Select
							// native
							labelId="time-zone"
							name="time-zone"
							id="time-zone"
							label="Time zone"
							value={timezone}
							onChange={(e) => setTimezone(e.target.value)}
						>
							{tzs.map((tz) => (
								<MenuItem value={tz.value} key={tz.value}>
									{tz.label}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</Box>

				<Typography
					mt={{ xs: 2, sm: 6 }}
					mb={{ xs: 1, sm: 2 }}
					fontWeight={400}
					fontSize={{ xs: 20, sm: 24 }}
				>
					Meeting Poll Type
				</Typography>
				<FormControl>
					<RadioGroup
						row
						value={type}
						onChange={(e) => setType(e.target.value)}
						name="radio-buttons-group"
					>
						<FormControlLabel
							value="specific"
							control={<Radio />}
							label="Specific Dates"
							sx={{ marginRight: 10 }}
						/>
						<FormControlLabel
							value="week"
							control={<Radio />}
							label="Days of the week"
							sx={{ marginRight: 10 }}
						/>
						<FormControlLabel
							value="day"
							control={<Radio />}
							label="Single Day"
							sx={{ marginRight: 10 }}
						/>
					</RadioGroup>
				</FormControl>
				<Typography fontStyle="italic" mt={{ xs: 1, sm: 2 }}>
					{type === "day"
						? "Let all participants choose times for one specific day."
						: type === "week"
							? "Let participants select from the days of the week"
							: "Let participants select from any day"}
				</Typography>

				{type === "day" && (
					<>
						<Typography
							mt={{ xs: 2, sm: 5 }}
							mb={1}
							fontWeight={600}
						>
							Pick a date for your meet
						</Typography>
						<Box width="50%" mt={2}>
							<LocalizationProvider dateAdapter={AdapterDayjs}>
								<DatePicker
									disablePast
									label="Date"
									openTo="day"
									views={["day"]}
									value={date}
									onChange={(val: any) => {
										val && setDate(new Date(val.$d));
									}}
									renderInput={(params) => (
										<TextField
											sx={{ svg: { color: "#000" } }}
											{...params}
										/>
									)}
								/>
							</LocalizationProvider>
						</Box>
					</>
				)}

				<Button
					onClick={createEvent}
					sx={{ marginTop: { xs: 2, sm: 5 } }}
					disabled={loading}
				>
					Create Event
				</Button>
			</Box>

			<BottomNav />

			<Snackbar
				open={err}
				autoHideDuration={6000}
				onClose={handleClose}
				anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
			>
				<Alert
					variant="filled"
					onClose={handleClose}
					severity="error"
					sx={{ width: "100%" }}
				>
					{errMsg}
				</Alert>
			</Snackbar>
		</>
	);
};

export default Index;
