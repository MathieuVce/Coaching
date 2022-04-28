import { query, collection, where, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { errorMapping } from "../../../common/firebaseErrors";
import { ICreateComment, ICreateReview } from "../../../common/info";
import { IUser, IMovie } from "../../../common/page";
import { db } from "../services/firebase";

export const checkEmail = (input: string) => {
     return /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/.test(input)
};

export const truncateString = (text: string, max: number) => {
    return text.substring(0,max-1)+(text.length>max?"...":""); 
}

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

export const getDocById = async (what: string, name: string, who: any) => {
  const q = query(collection(db, name), where(what, "==", who));
  const querySnapshot = await getDocs(q);
  return querySnapshot
}

export const getErrors = (keyWord: string) => {
  const  message = 'An undefined error occured';

  const parsedError  = keyWord.split('/')[1]
  return errorMapping[parsedError] || message
};

export const without = <T>(object: T) => <K extends keyof T>(...parts: Array<K>): Omit<T, K> => {
  return (Object.keys(object) as Array<keyof T>).reduce((acc, key) => {
      if (!parts.includes(key as any)) {
          acc[key] = object[key];
      }
      return acc;
  }, {} as T);
};

export         const sortBy: {[key: string]: Function} = {
  'created date': function (a: { creationDate: string }, b: { creationDate: string }) {
      return new Date(a.creationDate).getTime() < new Date(b.creationDate).getTime()  ? 1 : -1;
  },
  'rating': function (a: { rating: number }, b: { rating: number }) {
      return b.rating - a.rating;
  },
  'author': function (a: { user: IUser }, b: { user: IUser }) {
      return a.user < b.user ? -1 : 1
  },
  'item': function (a: { item: IMovie }, b: { item: IMovie }) {
      return a.item < b.item ? -1 : 1
  },
  'title': function (a: { title: string }, b: { title: string }) {
      return a.title < b.title ? -1 : 1
  },
  'category': function (a: { category: string }, b: { category: string }) {
      return a.category < b.category ? -1 : 1
  },
  'status': function (a: { status: string }, b: { status: string }) {
      return a.status < b.status ? -1 : 1
  },
  'views': function (a: { views: number }, b: { views: number }) {
      return b.views - a.views
  },
  'username': function (a: { username: string }, b: { username: string }) {
      return a.username < b.username ? -1 : 1
  },
  'pricing': function (a: { pricing: number }, b: { pricing: number }) {
      return a.pricing < b.pricing ? -1 : 1
  },
  'comments': function (a: { comments: ICreateComment }, b: { comments: ICreateComment }) {
      return a.comments > b.comments ? -1 : 1
  },
  'reviews': function (a: { reviews: ICreateReview }, b: { reviews: ICreateReview }) {
      return a.reviews > b.reviews ? -1 : 1
  },
  'basic info': function (a: { name: string }, b: { name: string }) {
      return a.name < b.name ? -1 : 1
  }
};