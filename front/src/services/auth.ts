import { auth } from "./firebase";
import { createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import { FirebaseError } from "../../../common/auth";
import { errorMapping } from "../../../common/firebaseErrors";

const getErrors = (keyWord: string) => {
    const  message = 'An undefined error occured';

    // Object.keys(errorMapping).forEach((code, index) => {
    //   if (code === keyWord.split('/')[1]) {
    //     message = Object.values(errorMapping).at(index)!
    //   }
    // });
    // return message;
    const parsedError  = keyWord.split('/')[1]
    return errorMapping[parsedError] || message
};

const loginUser = async (email: string, password: string) => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password)
    // localStorage.setItem("user", JSON.stringify(res.user));
    return res.user
  } catch(error) {
    const firebaseError = error as FirebaseError
    console.log(firebaseError.code)
    throw { message: getErrors(firebaseError.code) }
  }
};

const registerUser = async (email: string, password: string, displayName?: string) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password)
    updateProfile(res.user, {displayName});
    return res.user
  } catch(error) {
    const firebaseError = error as FirebaseError
    console.log(firebaseError.code)
    throw { message: getErrors(firebaseError.code) }
  }
};

const passwordForgotten = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email)
  } catch(error) {
    const firebaseError = error as FirebaseError
    console.log(firebaseError.code)
    throw { message: getErrors(firebaseError.code) }
  }
};

const logoutUser = () => {
  signOut(auth)
  .then(() => {
    console.log('logged out')
    // localStorage.removeItem("user");
  })
  .catch((error: any) => {
  });
};

const authService = {
  loginUser,
  registerUser,
  logoutUser,
  passwordForgotten,
};

export default authService;