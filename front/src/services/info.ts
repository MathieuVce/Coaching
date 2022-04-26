import { db } from "./firebase";
import { FirebaseError } from "../../../common/auth";
import { getDocById, getErrors } from "../utils/Utils";
import { getDocs, collection, deleteDoc, doc, updateDoc, DocumentData, DocumentSnapshot, getDoc, setDoc, query, orderBy, startAt, DocumentReference } from "firebase/firestore";
import { IComment, IMovie, IPageType, IReview, IUser } from "../../../common/page";
import { ICreateComment, ICreateReview } from "../../../common/info";

const getFirstDoc = async (what: string, type: IPageType) => {
    const typeArray = ["username", "comment", "review", "title"]
    const collectionArray = ["users", "comments", "reviews", "movies"]

    const ref = await getDocById(typeArray[type], collectionArray[type], what);
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

const createMovies = async (movie: IMovie) => {
    try {
        const newMovieRef = doc(collection(db, "movies"));

        await setDoc(newMovieRef,movie);

    } catch(error) {
        const firebaseError = error as FirebaseError
        throw { message: getErrors(firebaseError.code) }
    }
};

const getMovies = async () => {
    try {
        const querySnapshot = query(collection(db, "movies"), orderBy('title'), startAt('A'));
        const queryDocs = await getDocs(querySnapshot);

        const promiseArray = queryDocs.docs.map(async (doc) => {

            const obj = 
            {
                title: doc.data().title,
                rating: doc.data().rating.toFixed(1),
                category: doc.data().category.toUpperCase(),
                views: doc.data().views,
                status: doc.data().status ? "VISIBLE" : "HIDDEN",
                creationDate: doc.data().creationDate.split(',')[0],
            }
            return obj;
        });

        const arrayOfValues: IMovie[] = await Promise.all(promiseArray);

        return arrayOfValues;
    } catch(error) {
        const firebaseError = error as FirebaseError
        throw { message: getErrors(firebaseError.code) }
    }
};

const updateMovies = async (what: string) => {
    try {
        const res = await getFirstDoc(what, IPageType.ITEM);

        await updateDoc(res.document, {
            status: !res.ref.docs[0].data().status
        });
    
    } catch(error) {
        const firebaseError = error as FirebaseError
        throw { message: getErrors(firebaseError.code) }
    }
};

const deleteMovies = async (what: string) => {
    try {
        const res = await getFirstDoc(what, IPageType.ITEM);

        await deleteDoc(res.document)
    
    } catch(error) {
        const firebaseError = error as FirebaseError
        console.log(firebaseError.code)
        throw { message: getErrors(firebaseError.code) }
    }
};

const getUsers = async () => {
    try {
        const querySnapshot = query(collection(db, "users"), orderBy("name"), startAt('A'));
        const queryDocs = await getDocs(querySnapshot);

        const promiseArray = queryDocs.docs.map(async (doc) => {

            const obj = 
            {
                name: doc.data().name,
                email: doc.data().email,
                info: doc.data().name + '/' + doc.data().email,
                username: doc.data().username,
                pricing: doc.data().pricing.toUpperCase(),
                comments: doc.data().comments,
                reviews: doc.data().reviews,
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
        const querySnapshot = query(collection(db, "comments"), orderBy("comment"), startAt('A'));
        const queryDocs = await getDocs(querySnapshot);

        const promiseArray = queryDocs.docs.map(async (doc) => {

            const userSnap: DocumentSnapshot<DocumentData> = await getDoc(doc.data().user);
            const moviesnap: DocumentSnapshot<DocumentData> = await getDoc(doc.data().movie);

            const obj = 
            {
                item: moviesnap.exists() ? moviesnap.data().title : "",
                user: userSnap.exists() ? userSnap.data().username : "",
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
        const userRef = res.ref.docs[0].data().user;

        await deleteDoc(res.document)
        await (updateUserComment(userRef))
  
    } catch(error) {
        const firebaseError = error as FirebaseError
        console.log(firebaseError.code)
        throw { message: getErrors(firebaseError.code) }
    }
};

const updateMovieRating = async (movieRef: DocumentReference<DocumentData>) => {
    let rating = 0;
    const refRating = await getDocById("movie", "reviews", movieRef);

    refRating.docs.map((doc) => {
        rating += doc.data().rating;
    })  
    const document = doc(collection(db, 'movies'), movieRef.id)

    await updateDoc(document, {
        rating: rating/refRating.docs.length
    });
};

const updateUserReview = async (userRef: DocumentReference<DocumentData>) => {
    const refReviews = await getDocById("user", "reviews", userRef);
    const numReviews = refReviews.docs.length;
    console.log(refReviews.docs)
    
    const document = doc(collection(db, 'users'), userRef.id)

    await updateDoc(document, {
        reviews: numReviews
    });
}

const createReviews = async (review: ICreateReview) => {
    try {
        const newReviewRef = doc(collection(db, "reviews"));

        const movieDoc = await getFirstDoc(review.movie, IPageType.ITEM);
        const userDoc = await getFirstDoc(review.user, IPageType.USER);

        const movieRef = doc(db, `movies/${movieDoc.ref.docs[0].id}`);
        const userRef = doc(db, `users/${userDoc.ref.docs[0].id}`);
        
        await setDoc(newReviewRef, {
            ...review,
            movie: movieRef,
            user: userRef,

        });
        await (updateMovieRating(movieRef));
        await (updateUserReview(userRef));

    } catch(error) {
        const firebaseError = error as FirebaseError
        throw { message: getErrors(firebaseError.code) }
    }
};

const updateUserComment = async (userRef: DocumentReference<DocumentData>) => {
    const refComments = await getDocById("user", "comments", userRef);
    const numComments = refComments.docs.length;
    
    const document = doc(collection(db, 'users'), userRef.id)

    await updateDoc(document, {
        comments: numComments
    });
    console.log(numComments)
}

const createComments = async (comment: ICreateComment) => {
    try {
        const newCommentRef = doc(collection(db, "comments"));
        const movieDoc = await getFirstDoc(comment.movie, IPageType.ITEM);
        const userDoc = await getFirstDoc(comment.user, IPageType.USER);

        const movieRef = doc(db, `movies/${movieDoc.ref.docs[0].id}`);
        const userRef = doc(db, `users/${userDoc.ref.docs[0].id}`);
        
        await setDoc(newCommentRef, {
            ...comment,
            movie: movieRef,
            user: userRef,

        });
        await (updateUserComment(userRef));


    } catch(error) {
        console.log(error)
        const firebaseError = error as FirebaseError
        throw { message: getErrors(firebaseError.code) }
    }
};

const getReviews = async () => {
    try {
        const querySnapshot = query(collection(db, "reviews"), orderBy("review"), startAt('A'));
        const queryDocs = await getDocs(querySnapshot);
    
        const promiseArray = queryDocs.docs.map(async (doc) => {

            const userSnap: DocumentSnapshot<DocumentData> = await getDoc(doc.data().user);
            const moviesnap: DocumentSnapshot<DocumentData> = await getDoc(doc.data().movie);

            const obj = 
            {
                item: moviesnap.exists() ? moviesnap.data().title : "",
                user: userSnap.exists() ? userSnap.data().username : "",
                review: doc.data().review,
                rating: doc.data().rating.toFixed(1),
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
        const userRef = res.ref.docs[0].data().user;

        await deleteDoc(res.document)
        await (updateUserReview(userRef))
  
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
    createComments,
    getMovies,
    deleteMovies,
    updateMovies,
    createMovies
};

export default infoService;