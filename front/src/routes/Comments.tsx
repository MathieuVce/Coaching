import { Page } from "../components/Page";
import { AiOutlineEye, AiOutlinePlusCircle } from "react-icons/ai"
import { BiTrash } from "react-icons/bi";
import { useEffect, useState } from "react";
import { getDocs, collection, getDoc, doc, deleteDoc, DocumentData, DocumentSnapshot, setDoc } from "firebase/firestore";
import { db } from "../services/firebase";
import { IComment } from "../../../common/page";
import { getDocIdBy } from "../utils/Utils";
import { Modal } from "../components/Modal";
import { RiUser3Line } from "react-icons/ri";

const Comments: React.FunctionComponent = () => {

    const header = ['id', 'item', 'author', 'text', 'created date', 'actions']
    const [comments, setComments] = useState<IComment[]>([]);
    const [comment, setComment] = useState<IComment>();
    const [isLoading, setLoading] = useState<boolean>(true);
    const [showModal, setShowModal] = useState(false);
    const [showModal2, setShowModal2] = useState(false);

    useEffect(() => {
        fetchComments();
    }, []);

    const fetchComments = async () => {
        setLoading(true);
        const querySnapshot = await getDocs(collection(db, "comments"));
        querySnapshot.forEach(async (doc) => {

            const userSnap: DocumentSnapshot<DocumentData> = await getDoc(doc.data().user);
            console.log(userSnap.exists() ? userSnap.data().name : '')
            const moviesnap: DocumentSnapshot<DocumentData> = await getDoc(doc.data().movie);

            
            setComments(comments => [...comments, {
                    comment: doc.data().comment,
                    item: moviesnap.exists() ? moviesnap.data().title : "",
                    creationDate: doc.data().creationDate,
                    user: userSnap.exists() ? userSnap.data().name : "",
                    title: doc.data().title
                }
            ]);
            setLoading(false);
        });
    }

    const handleApply = async () => {
        setShowModal(false);
        setShowModal2(false);
        setLoading(true);
        const userRef = await getDocIdBy("comment", "comments", comment?.comment!);
        const document = doc(collection(db, "comments"), userRef.docs[0].id)

        await deleteDoc(document)

        setComments([]);
        await fetchComments();
    }

    const handleClick = async () => {
        const newCommentRef = doc(collection(db, "comments"));
        const movieRef = doc(db, 'movies/1SoMx4v11KhZmHF26t7h');
        const movieRef2 = doc(db, 'movies/ah72UXJAGkj7CBxVgOjQ');
        const userRef = doc(db, 'users/0RSBXt8yBaT5TyPphJlf');
        const userRef2 = doc(db, 'users/XeuTk0i6qxO3nhE2aoNy');

        await setDoc(newCommentRef, {
            comment: 'uih hoekfozekf zoekfoi okez fzoekfozekf zefokez fzoekfo',
            creationDate: new Date().toLocaleString(),
            movie: movieRef,
            user: userRef,
            title: 'OK new best movie'
        });

        setLoading(true);
        setComments([]);
        await fetchComments();
    }

    return(
        <>
            <Modal setShowModal={setShowModal} showModal={showModal} onApply={handleApply} buttons='no/confirm' title={"Delete comment"}>
                <label>
                    Are you sure you want to delete this comment ?
                </label>
            </Modal>
            <Modal setShowModal={setShowModal2} showModal={showModal2} onApply={handleApply} buttons='go back/delete comment' title={""}>
                <article className="flex items-center my-1 -mx-1 min-w-full">
                    <section className="bg-blue bg-opacity-30 w-12 h-12 rounded-md items-center justify-center flex mr-2">
                        <RiUser3Line size={30} color='black'/>
                    </section>

                    <article className="flex flex-col py-4 space-y-1">
                            <p className="font-medium text-md">{comment?.title}</p>
                            <p className="font-light text-xs text-brown">{comment?.creationDate.split(':').slice(0, -1).join(':').replaceAll('/','.')} by <span className="font-semibold text-sm text-primary">{comment?.user}</span></p>
                    </article>
                </article>
                <article className="border-t border-t-brown pt-4 whitespace-pre-wrap ">
                    {comment?.comment}
                </article>
            </Modal>
            {isLoading ? (
                <div className="flex items-center justify-center w-full h-screen text-center">
                    <svg role="status" className="inline mr-2 w-8 h-8 animate-spin fill-blue text-brown" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                    </svg>
                    <label className="text-brown font-light text-2xl">
                        Loading...
                    </label>
                </div>
            )
            :
                <Page title={'Comments'} total={comments.length.toString()} values={comments} header={header} icon={<AiOutlinePlusCircle color='black' size={0}/>} setId={setComment} handleClick={handleClick}>
                    <div className="flex items-center space-x-5 justify-center">
                        <button className="bg-yellow-light h-6 flex items-center justify-center bg-opacity-50 rounded-lg w-6" onClick={() => {setShowModal2(true)}}>
                            <AiOutlineEye color='black' size={20}/>
                        </button>
                        <button className="bg-red-light h-6 flex items-center bg-opacity-40 rounded-lg w-6 justify-center" onClick={() => {setShowModal(true)}}>
                            <BiTrash color='black' size={18}/>
                        </button>
                    </div>
                </Page>
            }
        </>
    );
};

export default Comments
