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
import { ActivityIndicator } from "../components/ActivityIndicator";

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
                    item: moviesnap.exists() ? moviesnap.data().title : "",
                    user: userSnap.exists() ? userSnap.data().name : "",
                    comment: doc.data().comment,
                    creationDate: doc.data().creationDate,
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
        const commentRef = await getDocIdBy("comment", "comments", comment?.comment!);
        const document = doc(collection(db, "comments"), commentRef.docs[0].id)

        await deleteDoc(document)

        setComments([]);
        await fetchComments();
    }

    const handleClick = async () => {
        setLoading(true);
        const newCommentRef = doc(collection(db, "comments"));
        const movieRef = doc(db, 'movies/1SoMx4v11KhZmHF26t7h');
        const movieRef2 = doc(db, 'movies/ah72UXJAGkj7CBxVgOjQ');
        const userRef = doc(db, 'users/0RSBXt8yBaT5TyPphJlf');
        const userRef2 = doc(db, 'users/XeuTk0i6qxO3nhE2aoNy');

        await setDoc(newCommentRef, {
            movie: movieRef,
            user: userRef,
            comment: 'uih hoekfozekf zoekfoi okez fzoekfozekf zefokez fzoekfo',
            creationDate: new Date().toLocaleString(),
            title: 'OK new best movie'
        });

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
                <ActivityIndicator/>
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
