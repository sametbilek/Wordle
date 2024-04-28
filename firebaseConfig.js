// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD-JVgxoGKqYzb8W1IS7AtNJSHY-6r5h4A",
  authDomain: "firsapp-c25c2.firebaseapp.com",
  projectId: "firsapp-c25c2",
  storageBucket: "firsapp-c25c2.appspot.com",
  messagingSenderId: "331407577561",
  appId: "1:331407577561:web:922682a8baa6a9e7a689c8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
export const db = getFirestore(app);


export default app