import { useState, useEffect } from "react";
import { AiOutlineEye, AiOutlinePlusCircle } from "react-icons/ai";
import { BiTrash } from "react-icons/bi";
import { IPageType, IReview } from "../../../common/page";
import { ActivityIndicator } from "../components/ActivityIndicator";
import { Modal } from "../components/Modal";
import { Page } from "../components/Page";
import { ShowInfo } from "../components/ShowInfo";
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
        (async () => {
            setLoading(true);
            await fetchReviews();
        })();
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
                <ShowInfo title={review?.title!} type={IPageType.REVIEW} creationDate={review?.creationDate!} text={review?.review!} user={review?.user!} rating={review?.rating!}/>
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
