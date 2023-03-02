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

let slots: string[] = [
    "6AM",
    "7AM",
    "8AM",
    "9AM",
    "10AM",
    "11AM",
    "12PM",
    "1PM",
    "2PM",
    "3PM",
    "4PM",
    "5PM",
    "6PM",
    "7PM",
    "8PM",
    "9PM",
    "10PM",
    "11PM",
    "12AM",
    "1AM",
    "2AM",
    "3AM",
    "4AM",
    "5AM",
];

export { BASE_WEB_URL, months, days, slots };
