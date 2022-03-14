import { auth } from "./firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import { FirebaseError } from "../@types/auth";

const getErrors = (code: string) => {
  switch(code) {
    case 'auth/email-already-exists':
      return 'The provided email is already in use by an existing user. Each user must have a unique email.';
    case 'auth/invalid-password':
      return 'The provided value for the password user property is invalid. It must be a string with at least six characters.';
    case 'auth/user-not-found':
      return 'There is no existing user record corresponding to the provided identifier.';
    case 'auth/wrong-password':
      return 'The provided value for the password user property is invalid.';
    case 'auth/weak-password':
      return 'The provided value for the password user property is invalid. It must be a string with at least six characters.';
    case 'auth/email-already-in-use':
      return 'The provided email is already in use by an existing user. Each user must have a unique email.';
    case 'auth/invalid-email':
      return 'The provided value fro the email user property is invalid.';
    default:
      return 'An unknown error occured. Please try again';
  }
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
const registerUser = async (email: string, password: string, displayName: string) => {
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
};

export default authService;