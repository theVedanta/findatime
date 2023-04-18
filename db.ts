// DB CONNECTION
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: "findatime-5b83e.firebaseapp.com",
    projectId: "findatime-5b83e",
    storageBucket: "findatime-5b83e.appspot.com",
    messagingSenderId: "247876517457",
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: "G-LCP02CKVJN",
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
