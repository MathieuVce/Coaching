import { db } from "./firebase";
import { FirebaseError } from "../../../common/auth";
import { getDocIdBy, getErrors } from "../utils/Utils";
import { getDocs, collection, deleteDoc, doc, updateDoc, DocumentData, DocumentSnapshot, getDoc } from "firebase/firestore";
import { IComment, IPageType } from "../../../common/page";
import { useState } from "react";

const getFirstDoc = async (what: string, type: IPageType) => {
  const typeArray = ["username", "comment", "review"]
  const collectionArray = ["users", "comments", "reviews"]

  const ref = await getDocIdBy(typeArray[type], collectionArray[type], what);
  const document = doc(collection(db, "users"), ref.docs[0].id)

  return {ref, document};
}

const getUsers = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "users"));
    
    return querySnapshot;
  
  } catch(error) {
    const firebaseError = error as FirebaseError
    console.log(firebaseError.code)
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
    console.log(firebaseError.code)
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
  const [comments, setComments] = useState<IComment[]>([]);
  try {

    // let arr: any[] = []
    const querySnapshot = await getDocs(collection(db, "comments"));


    querySnapshot.forEach(async (doc) => {

        const userSnap: DocumentSnapshot<DocumentData> = await getDoc(doc.data().user);
        const moviesnap: DocumentSnapshot<DocumentData> = await getDoc(doc.data().movie);

        let obj = {
                  item: moviesnap.exists() ? moviesnap.data().title : "",
                  user: userSnap.exists() ? userSnap.data().name : "",
                  comment: doc.data().comment,
                  creationDate: doc.data().creationDate,
                  title: doc.data().title
        }

        setComments(prev => [...prev, obj])
        
        // console.log(obj)

        // arr = [...arr, obj]
     
    });
 
    return comments;
   
  
  } catch(error) {
    const firebaseError = error as FirebaseError
    console.log(getErrors(firebaseError.code))
    console.log("error")
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

const getReviews = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "reviews"));
    
    return querySnapshot;
  
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
  getUsers,
  updateUsers,
  deleteUsers,
};

export default infoService;