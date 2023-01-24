const BASE_WEB_URL: string =
    process.env.NEXT_PUBLIC_NODE_ENV === "dev" ? "http://localhost:3000" : "";
const BASE_API_URL: string =
    process.env.NEXT_PUBLIC_NODE_ENV === "dev" ? "http://localhost:4000" : "";

const months: string[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];
const days: string[] = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];

export { BASE_WEB_URL, BASE_API_URL, months, days };
