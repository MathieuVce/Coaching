import { query, collection, where, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../services/firebase";

export const checkEmail = (input: string) => {
     return /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/.test(input)
};

export const truncateString = (text: string, max: number) => {
    return text.substring(0,max-1)+(text.length>max?"...":""); 
}

export const headTableStyle: {[key: string]: string} = {
    "id": "pr-8",
    "item": "pr-28", 
    "author": "pr-20", 
    "text": "pr-48",
    "created date": "pr-8", 
    "actions": "pl-5",
    'rating': 'pr-8'
}

// export const headTableStyle: {[key: string]: string} = {
//     "id": "w-28",
//     "item": "w-38", 
//     "author": "w-30", 
//     "text": "w-58",
//     "created date": "w-40", 
//     "actions": "w-30",
//     'rating': "w-30"
// }


export const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);
  useEffect(
    () => {
      const mediaQuery = window.matchMedia(query);
      setMatches(mediaQuery.matches);
      const handler = (event: { matches: boolean | ((prevState: boolean) => boolean); }) => setMatches(event.matches);
      mediaQuery.addEventListener("change", handler);
      return () => mediaQuery.removeEventListener("change", handler);
    },
    []
  );
  return matches;
}

export const useBreakpoints = () => {
    const breakpoints = {
      isXs: useMediaQuery("(max-width: 640px)"),
      isSm: useMediaQuery("(min-width: 641px) and (max-width: 768px)"),
      isMd: useMediaQuery("(min-width: 769px) and (max-width: 1024px)"),
      isLg: useMediaQuery("(min-width: 1025px)"),
      active: "xs"
    };
    if (breakpoints.isXs) breakpoints.active = "xs";
    if (breakpoints.isSm) breakpoints.active = "sm";
    if (breakpoints.isMd) breakpoints.active = "md";
    if (breakpoints.isLg) breakpoints.active = "lg";
    return breakpoints;
}

export const getDocIdBy = async (what: string, name: string, who: any) => {
  const q = query(collection(db, name), where(what, "==", who));
  const querySnapshot = await getDocs(q);
  return querySnapshot
}