// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

/*   apiKey: "AIzaSyAvKSUWrk7-_JtrNbTfW1NibLt5Heq-Yx8",
    authDomain: "jobbox-ae624.firebaseapp.com",
    projectId: "jobbox-ae624",
    storageBucket: "jobbox-ae624.appspot.com",
    messagingSenderId: "92995893956",
    appId: "1:92995893956:web:abd44729ae5ac3d410e791"*/
const firebaseConfig = {
    apiKey: process.env.REACT_APP_apiKey,
    authDomain: process.env.REACT_APP_authDomain,
    projectId: process.env.RECAT_APP_projectId,
    storageBucket: process.env.RECAT_APP_storageBucket,
    messagingSenderId: process.env.RECAT_APP_messagingSenderId,
    appId: process.env.RECAT_APP_appId
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;