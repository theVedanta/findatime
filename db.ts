// DB CONNECTION
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBqm8OVB6Hrv9-t3AQ7lSSFXsLdc7_P5Ic",
    authDomain: "findatime-5b83e.firebaseapp.com",
    projectId: "findatime-5b83e",
    storageBucket: "findatime-5b83e.appspot.com",
    messagingSenderId: "247876517457",
    appId: "1:247876517457:web:d57019b327b2f617a08270",
    measurementId: "G-LCP02CKVJN",
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
