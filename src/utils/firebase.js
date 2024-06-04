// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCHTkkUULfzOtyZBfyeggtcWe9Ui3pJDlg",
  authDomain: "netflixgpt-282a5.firebaseapp.com",
  projectId: "netflixgpt-282a5",
  storageBucket: "netflixgpt-282a5.appspot.com",
  messagingSenderId: "598786173707",
  appId: "1:598786173707:web:bd04ffe024452492b9500e",
  measurementId: "G-HN7Q0Z8Y0J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();

