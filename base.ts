const BASE_WEB_URL: string =
    process.env.NEXT_PUBLIC_NODE_ENV === "dev"
        ? "http://localhost:3000"
        : "https://findatime.netlify.app";

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

export { BASE_WEB_URL, months, days };
