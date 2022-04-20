import { db } from "./firebase";
import { FirebaseError } from "../../../common/auth";
import { getDocIdBy, getErrors } from "../utils/Utils";
import { getDocs, collection, deleteDoc, doc, updateDoc, DocumentData, DocumentSnapshot, getDoc, setDoc } from "firebase/firestore";
import { IComment, IPageType, IReview, IUser } from "../../../common/page";

const getFirstDoc = async (what: string, type: IPageType) => {
    const typeArray = ["username", "comment", "review"]
    const collectionArray = ["users", "comments", "reviews"]

    const ref = await getDocIdBy(typeArray[type], collectionArray[type], what);
    const document = doc(collection(db, collectionArray[type]), ref.docs[0].id)

    return {ref, document};
}

const createUsers = async (user: IUser) => {
    try {
        const newUserRef = doc(collection(db, "users"));

        await setDoc(newUserRef, user);

    } catch(error) {
        const firebaseError = error as FirebaseError
        throw { message: getErrors(firebaseError.code) }
    }
};

const getUsers = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, "users"));

        const promiseArray = querySnapshot.docs.map(async (doc) => {

            const obj = 
            {
                name: doc.data().name,
                email: doc.data().email,
                info: doc.data().name + '/' + doc.data().email,
                username: doc.data().username,
                pricing: doc.data().pricing.toUpperCase(),
                comments: doc.data().comments.toString(),
                reviews: doc.data().reviews.toString(),
                status: doc.data().status ? "APPROVED" : "BANNED",
                creationDate: doc.data().creationDate.split(',')[0],
            }
            return obj;
        });

        const arrayOfValues: IUser[] = await Promise.all(promiseArray);

        return arrayOfValues;
    } catch(error) {
        const firebaseError = error as FirebaseError
        throw { message: getErrors(firebaseError.code) }
    }
};

const updateUsers = async (what: string) => {
    try {
        const res = await getFirstDoc(what, IPageType.USER);

        await updateDoc(res.document, {
            status: !res.ref.docs[0].data().status
        });
    
    } catch(error) {
        const firebaseError = error as FirebaseError
        throw { message: getErrors(firebaseError.code) }
    }
};

const deleteUsers = async (what: string) => {
    try {
        const res = await getFirstDoc(what, IPageType.USER);

        await deleteDoc(res.document)
    
    } catch(error) {
        const firebaseError = error as FirebaseError
        console.log(firebaseError.code)
        throw { message: getErrors(firebaseError.code) }
    }
};

const getComments = async () => {

    try {
        const querySnapshot = await getDocs(collection(db, "comments"));

        const promiseArray = querySnapshot.docs.map(async (doc) => {

            const userSnap: DocumentSnapshot<DocumentData> = await getDoc(doc.data().user);
            const moviesnap: DocumentSnapshot<DocumentData> = await getDoc(doc.data().movie);

            const obj = 
            {
                item: moviesnap.exists() ? moviesnap.data().title : "",
                user: userSnap.exists() ? userSnap.data().name : "",
                comment: doc.data().comment,
                creationDate: doc.data().creationDate,
                title: doc.data().title
            }
            return obj;
        });

        const arrayOfValues: IComment[] = await Promise.all(promiseArray);

        return arrayOfValues;
    } catch(error) {
        const firebaseError = error as FirebaseError
        throw { message: getErrors(firebaseError.code) }
    }
};

const deleteComments = async (what: string) => {
    try {
        const res = await getFirstDoc(what, IPageType.COMMENT);

        await deleteDoc(res.document)
  
    } catch(error) {
        const firebaseError = error as FirebaseError
        console.log(firebaseError.code)
        throw { message: getErrors(firebaseError.code) }
    }
};

const createReviews = async () => {
    try {
        const newReviewRef = doc(collection(db, "reviews"));
        const movieRef = doc(db, 'movies/1SoMx4v11KhZmHF26t7h');
        const movieRef2 = doc(db, 'movies/ah72UXJAGkj7CBxVgOjQ');
        const userRef = doc(db, 'users/4iJue1PpC2iRhdtOjXP5');
        const userRef2 = doc(db, 'users/y9n6QxTefUKJP53klqlh');

        await setDoc(newReviewRef, {
            movie: movieRef2,
            user: userRef,
            review: 'uih hoekfozekf zoekfoi okez fzoekfozekf zefokez fzoekfoz fzoekfozekf zefokez fzoekfoz fzoekfozekf zefokez fzoekfoz fzoekfozekf zefokez fzoekfoz fzoekfozekf zefokez fzoekfo',
            rating: 7.3,
            creationDate: new Date().toLocaleString(),
            title: 'OK new best mememememememe'
        });

    } catch(error) {
        const firebaseError = error as FirebaseError
        throw { message: getErrors(firebaseError.code) }
    }
};

const createComments = async () => {
    try {
        const newCommentRef = doc(collection(db, "comments"));
        const movieRef = doc(db, 'movies/1SoMx4v11KhZmHF26t7h');
        const movieRef2 = doc(db, 'movies/ah72UXJAGkj7CBxVgOjQ');
        const userRef = doc(db, 'users/4iJue1PpC2iRhdtOjXP5');
        const userRef2 = doc(db, 'users/y9n6QxTefUKJP53klqlh');

        await setDoc(newCommentRef, {
            movie: movieRef,
            user: userRef,
            comment: 'uih hoekfozekf zoekfoi okez fzoekfozekf zefokez fzoekfo',
            creationDate: new Date().toLocaleString(),
            title: 'OK new best movie'
        });
    
    } catch(error) {
        const firebaseError = error as FirebaseError
        throw { message: getErrors(firebaseError.code) }
    }
};

const getReviews = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, "reviews"));
    
        const promiseArray = querySnapshot.docs.map(async (doc) => {

            const userSnap: DocumentSnapshot<DocumentData> = await getDoc(doc.data().user);
            const moviesnap: DocumentSnapshot<DocumentData> = await getDoc(doc.data().movie);

            const obj = 
            {
                item: moviesnap.exists() ? moviesnap.data().title : "",
                user: userSnap.exists() ? userSnap.data().name : "",
                review: doc.data().review,
                rating: doc.data().rating,
                creationDate: doc.data().creationDate,
                title: doc.data().title
            }
            return obj;
        });

        const arrayOfValues: IReview[] = await Promise.all(promiseArray);

        return arrayOfValues;
    } catch(error) {
        const firebaseError = error as FirebaseError
        console.log(firebaseError.code)
        throw { message: getErrors(firebaseError.code) }
    }
};

const deleteReviews = async (what: string) => {
    try {
        const res = await getFirstDoc(what, IPageType.REVIEW);
    
        await deleteDoc(res.document)
  
    } catch(error) {
        const firebaseError = error as FirebaseError
        console.log(firebaseError.code)
        throw { message: getErrors(firebaseError.code) }
    }
};


const infoService = {
    getComments,
    deleteComments,
    getReviews,
    deleteReviews,
    createUsers,
    getUsers,
    updateUsers,
    deleteUsers,
    createReviews,
    createComments
};

export default infoService;