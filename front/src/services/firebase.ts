import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// App's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBwKtHEiasYYbX2OU_SH9_9hNGEXPJMsPA",
    authDomain: "coaching-fa243.firebaseapp.com",
    projectId: "coaching-fa243",
    storageBucket: "coaching-fa243.appspot.com",
    messagingSenderId: "551107038028",
    appId: "1:551107038028:web:3779b8ad86c81917611de9"
  };

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);