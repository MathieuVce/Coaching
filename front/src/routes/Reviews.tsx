import { useState, useEffect } from "react";
import { AiFillStar, AiOutlineEye, AiOutlinePlusCircle } from "react-icons/ai";
import { BiTrash } from "react-icons/bi";
import { RiUser3Line } from "react-icons/ri";
import { IReview } from "../../../common/page";
import { ActivityIndicator } from "../components/ActivityIndicator";
import { Modal } from "../components/Modal";
import { Page } from "../components/Page";
import { createReviews, deleteReviews, getReviews } from "../slices/info";
import { useAppDispatch, useAppSelector } from "../store/hooks";


const Reviews: React.FunctionComponent = () => {

    const header = ['id', 'item', 'author', 'text', 'rating', 'created date', 'actions']
    const [review, setReview] = useState<IReview>();
    const [isLoading, setLoading] = useState<boolean>(true);
    const [showModal, setShowModal] = useState(false);
    const [show, setShow] = useState(false);
    const { reviews } = useAppSelector(state => state.info);

    const dispatch = useAppDispatch();

    useEffect(() => {
        setLoading(true);
        fetchReviews();
    }, []);

    const fetchReviews = async () => {
        await dispatch(getReviews());
        setLoading(false);
    }

    const handleAction = async () => {
        setShowModal(false);
        setLoading(true);
        await dispatch(deleteReviews({what: review?.review!}))

        await fetchReviews();
    }

    const handleClick = async () => {
        setLoading(true);
        await dispatch(createReviews());
        await fetchReviews();
    }

    return(
        <>
            <Modal setShowModal={setShowModal} showModal={showModal} onApply={handleAction} buttons={!show ? 'no/confirm' : 'go back/delete review'} title={!show ? "Delete review" : ""}>
            {!show ? (
                <label>
                    Are you sure you want to delete this review ?
                </label>
            ) : (
                <>
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
                </>
            )}
            </Modal>
            {isLoading ? (
                <ActivityIndicator/>
            )
            :
            <Page title={'Reviews'} total={reviews.length.toString()} values={reviews} header={header} icon={<AiOutlinePlusCircle color='black' size={20}/>} setId={setReview} handleClick={handleClick}>
                <div className="flex items-center space-x-5 justify-center">
                    <button className="bg-yellow-light h-6 flex items-center justify-center bg-opacity-50 rounded-lg w-6" onClick={() => {setShow(true);  setShowModal(true)}}>
                        <AiOutlineEye color='black' size={20}/>
                    </button>
                    <button className="bg-red-light h-6 flex items-center bg-opacity-40 rounded-lg w-6 justify-center" onClick={() => {setShow(false); setShowModal(true)}}>
                        <BiTrash color='black' size={18}/>
                    </button>
                </div>
            </Page>
            }
        </>
    );
};

export default Reviews
