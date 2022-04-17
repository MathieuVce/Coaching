import { Page } from "../components/Page";
import { AiOutlineEye, AiOutlineUserAdd } from "react-icons/ai"
import { BiTrash } from "react-icons/bi";
import { useEffect, useState } from "react";
import { getDocs, collection, getDoc, doc, deleteDoc, DocumentData, DocumentSnapshot } from "firebase/firestore";
import { db } from "../services/firebase";
import { IComment } from "../../../common/page";
import { getDocIdBy } from "../utils/Utils";
import { Modal } from "../components/Modal";

const Comments: React.FunctionComponent = () => {

    const values = ['10', 'Spider-Man', 'John Doe', 'What a movie !!! So many visual effects, what a movie !!! So many visual effects What a movie !!! So many visual effects', '23 Dec. 2021']
    const header = ['id', 'item', 'author', 'text', 'created date', 'actions']
    const [comments, setComments] = useState<IComment[]>([]);
    const [id, setId] = useState<string>();
    const [showModal, setShowModal] = useState(false);
    const [toDelete, setDelete] = useState(false);

    useEffect(() => {
        fetchComments();
    }, []);

    const fetchComments = async () => {
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
                }
            ]);
        });
    }

    const handleApply = async () => {
        const userRef = await getDocIdBy("comment", "comments", id!);
        const document = doc(collection(db, "comments"), userRef.docs[0].id)

        if (toDelete) {
            await deleteDoc(document)
        } else {
           
        }

        setComments([]);
        await fetchComments();
        setShowModal(false);
    }

    const handleClick = () => {
       
    }

    return(
        <>
            <Modal setShowModal={setShowModal} showModal={showModal} onApply={handleApply} buttons='no/confirm' title={"Delete comment"}>
                <label>
                    Are you sure you want to delete this comment ?
                </label>
            </Modal>
            <Page title={'Comments'} total={comments.length.toString()} values={comments} header={header} icon={<AiOutlineUserAdd color='black' size={0}/>} setId={setId} handleClick={handleClick}>
                <div className="flex items-center space-x-5 justify-center">
                    <button className="bg-yellow-light h-6 flex items-center justify-center bg-opacity-50 rounded-lg w-6" onClick={() => {setDelete(false); setShowModal(true)}}>
                        <AiOutlineEye color='black' size={20}/>
                    </button>
                    <button className="bg-red-light h-6 flex items-center bg-opacity-40 rounded-lg w-6 justify-center" onClick={() => {setDelete(true); setShowModal(true)}}>
                        <BiTrash color='black' size={18}/>
                    </button>
                </div>
            </Page>
        </>
    );
};

export default Comments
