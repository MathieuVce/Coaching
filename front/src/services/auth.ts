import { auth } from "./firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';


const loginUser = async (email: string, password: string) => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password)
    localStorage.setItem("user", JSON.stringify(res.user));
    return res.user
  } catch {
    console.log("Wrong credentials")
    throw { message: "Wrong credentials" }
  }
};
const registerUser = async (email: string, password: string, displayName: string) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password)
    updateProfile(res.user, {displayName});
    return res.user
  } catch {
    console.log("User already created")
    throw { message: "User already created" }
  }
};

const logoutUser = () => {
  signOut(auth)
  .then(() => {
    console.log('logged out')
    localStorage.removeItem("user");
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