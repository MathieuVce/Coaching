import { getDocs, collection, deleteDoc, doc, DocumentData, DocumentSnapshot, getDoc, setDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { AiFillStar, AiOutlineEye, AiOutlinePlusCircle } from "react-icons/ai";
import { BiTrash } from "react-icons/bi";
import { RiUser3Line } from "react-icons/ri";
import { IReview } from "../../../common/page";
import { ActivityIndicator } from "../components/ActivityIndicator";
import { Modal } from "../components/Modal";
import { Page } from "../components/Page";
import { db } from "../services/firebase";
import { getDocIdBy } from "../utils/Utils";


const Reviews: React.FunctionComponent = () => {

    const values = ['10', 'Spider-Man', 'John Doe', 'What a movie !!! So many visual effects, what a movie !!! So many visual effects, What a movie !!! So many visual effects', '9.2', '23 Dec. 2021']
    const header = ['id', 'item', 'author', 'text', 'rating', 'created date', 'actions']
    const [reviews, setReviews] = useState<IReview[]>([]);
    const [review, setReview] = useState<IReview>();
    const [isLoading, setLoading] = useState<boolean>(true);
    const [showModal, setShowModal] = useState(false);
    const [showModal2, setShowModal2] = useState(false);

    useEffect(() => {
        fetchReviews();
    }, []);

    const fetchReviews = async () => {
        setLoading(true);
        const querySnapshot = await getDocs(collection(db, "reviews"));
        querySnapshot.forEach(async (doc) => {

            const userSnap: DocumentSnapshot<DocumentData> = await getDoc(doc.data().user);
            console.log(userSnap.exists() ? userSnap.data().name : '')
            const moviesnap: DocumentSnapshot<DocumentData> = await getDoc(doc.data().movie);

            
            setReviews(reviews => [...reviews, {
                    item: moviesnap.exists() ? moviesnap.data().title : "",
                    user: userSnap.exists() ? userSnap.data().name : "",
                    review: doc.data().review,
                    rating: doc.data().rating,
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
        const userRef = await getDocIdBy("review", "reviews", review?.review!);
        const document = doc(collection(db, "reviews"), userRef.docs[0].id)

        await deleteDoc(document)

        setReviews([]);
        await fetchReviews();
    }

    const handleClick = async () => {
        const newReviewRef = doc(collection(db, "reviews"));
        const movieRef = doc(db, 'movies/1SoMx4v11KhZmHF26t7h');
        const movieRef2 = doc(db, 'movies/ah72UXJAGkj7CBxVgOjQ');
        const userRef = doc(db, 'users/0RSBXt8yBaT5TyPphJlf');
        const userRef2 = doc(db, 'users/XeuTk0i6qxO3nhE2aoNy');

        await setDoc(newReviewRef, {
            movie: movieRef2,
            user: userRef,
            review: 'uih hoekfozekf zoekfoi okez fzoekfozekf zefokez fzoekfoz fzoekfozekf zefokez fzoekfoz fzoekfozekf zefokez fzoekfoz fzoekfozekf zefokez fzoekfoz fzoekfozekf zefokez fzoekfo',
            rating: 7.3,
            creationDate: new Date().toLocaleString(),
            title: 'OK new best mememememememe'
        });

        setLoading(true);
        setReviews([]);
        await fetchReviews();
    }

    return(
        <>
            <Modal setShowModal={setShowModal} showModal={showModal} onApply={handleApply} buttons='no/confirm' title={"Delete review"}>
                <label>
                    Are you sure you want to delete this review ?
                </label>
            </Modal>
            <Modal setShowModal={setShowModal2} showModal={showModal2} onApply={handleApply} buttons='go back/delete review' title={""}>
                <article className="flex items-center my-1 -mx-1 min-w-full">
                    <section className="bg-blue bg-opacity-30 w-12 h-12 rounded-md items-center justify-center flex mr-2">
                        <RiUser3Line size={30} color='black'/>
                    </section>

                    <article className="flex flex-col py-4 space-y-1">
                            <p className="font-medium text-md">{review?.title}</p>
                            <p className="font-light text-xs text-brown">{review?.creationDate.split(':').slice(0, -1).join(':').replaceAll('/','.')} by <span className="font-semibold text-sm text-primary">{review?.user}</span></p>
                    </article>
                    <article className="ml-auto">
                        <section className="flex">
                            {review?.rating}
                            <article className="pl-1">
                                <AiFillStar size={20} color="#0AC5CD"/>
                            </article>
                        </section>
                    </article>
                </article>
                <article className="border-t border-t-brown pt-4 whitespace-pre-wrap ">
                    {review?.review}
                </article>
            </Modal>
            {isLoading ? (
                <ActivityIndicator/>
            )
            :
            <Page title={'Reviews'} total={reviews.length.toString()} values={reviews} header={header} icon={<AiOutlinePlusCircle color='black' size={20}/>} setId={setReview} handleClick={handleClick}>
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

export default Reviews
