import { auth } from "./firebase";
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';


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
  logoutUser,
};

export default authService;