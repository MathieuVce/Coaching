import { useState, useEffect } from "react";
import { AiOutlineEye, AiOutlinePlusCircle } from "react-icons/ai";
import { BiTrash } from "react-icons/bi";
import { IPageType, IReview } from "../../../common/page";
import { ActivityIndicator } from "../components/ActivityIndicator";
import { Dropdown } from "../components/Dropdown";
import { Form } from "../components/Form";
import { Modal } from "../components/Modal";
import { Page } from "../components/Page";
import { ShowInfo } from "../components/ShowInfo";
import { Stars } from "../components/Stars";
import { createReviews, deleteReviews, getReviews } from "../slices/info";
import { useAppDispatch, useAppSelector } from "../store/hooks";


const Reviews: React.FunctionComponent = () => {
    
    const { users, movies, reviews } = useAppSelector(state => state.info);
    const header = ['id', 'item', 'author', 'text', 'rating', 'created date', 'title', 'actions']
    const [reviewId, setReviewId] = useState<IReview>();
    const [isLoading, setLoading] = useState<boolean>(true);
    const [showModal, setShowModal] = useState(false);
    const [show, setShow] = useState(false);
    const [createReviewModal, setCreateReviewModal] = useState(false);
    const [review, setReview] = useState({review: "", title: ""});
    const [rating, setRating] = useState(0);
    const [finalUser, setFinalUser] = useState<string>('user');
    const [finalMovie, setFinalMovie] = useState<string>('movie');
    const user: string[] = []
    const movie: string[] = []
    users.map((item) => user.push(item.username));
    movies.map((item) => movie.push(item.title));
    
    const dispatch = useAppDispatch();
    
    useEffect(() => {
        setLoading(true);
        fetchReviews();
    }, []);

    const handleChange = (prop: keyof typeof review, value: string) => {
        setReview({
            ...review,
            [prop]: value
        });
    };

    const handleCreateReview = async () => {
        if (review.title && review.review && finalUser !== 'user' && finalMovie !== 'movie') {
            setCreateReviewModal(false);
            setLoading(true);

            const obj = {
                ...review,
                movie: finalMovie,
                user: finalUser,
                rating: rating + 1,
                creationDate: new Date().toLocaleString()
            }
            await dispatch(createReviews({review: obj}))
            await fetchReviews();
        }
    }

    const fetchReviews = async () => {
        await dispatch(getReviews());
        setLoading(false);
    }

    const handleAction = async () => {
        setShowModal(false);
        setLoading(true);
        await dispatch(deleteReviews({what: reviewId?.review!}))
        await fetchReviews();
    }

    const handleClick = () => {
        setReview({title: "", review: ""});
        setFinalUser("user");
        setFinalMovie("movie");
        setCreateReviewModal(true);
    }

    return(
        <>
            <Modal setShowModal={setCreateReviewModal} showModal={createReviewModal} buttons='cancel/add review' onApply={handleCreateReview} title="Add a review">
                <Form name="Title" type='text' placeholder='Enter title' onChange={(e) => {handleChange('title', e.target.value)}} value={review.title}/>
                <Form name="Review" type='text' placeholder='Enter review' onChange={(e) => {handleChange('review', e.target.value)}} value={review.review} maxLen={200}/>
                <section className="my-2 dark:text-white">
                    <label>Rating <span className="italic font-light ml-1">{rating + 1} stars</span></label>
                    <Stars color='text-blue' rating={rating} setRating={setRating}/>
                </section>
                <Dropdown color="bg-blue" display={finalMovie} setDisplay={setFinalMovie} title='Movie' values={movie}/>
                <Dropdown color="bg-blue" display={finalUser} setDisplay={setFinalUser} title='User' values={user}/>
            </Modal>
            <Modal setShowModal={setShowModal} showModal={showModal} onApply={handleAction} buttons={!show ? 'no/confirm' : 'go back/delete review'} title={!show ? "Delete review" : ""}>
            {!show ? (
                <label className="dark:text-white">
                    Are you sure you want to delete this review ?
                </label>
            ) : (
                <ShowInfo title={reviewId?.title!} type={IPageType.REVIEW} creationDate={reviewId?.creationDate!} text={reviewId?.review!} user={reviewId?.user!} rating={reviewId?.rating!}/>
            )}
            </Modal>
            {isLoading ? (
                <ActivityIndicator/>
            )
            :
            <Page title={'Reviews'} total={reviews.length.toString()} values={reviews} header={header} icon={<AiOutlinePlusCircle size={20}/>} setId={setReviewId} handleClick={handleClick}>
                <div className="flex items-center space-x-5 justify-center">
                    <button className="bg-yellow-light h-6 flex items-center justify-center bg-opacity-20 rounded-lg w-6 shadow-xs" onClick={() => {setShow(true);  setShowModal(true)}}>
                        <AiOutlineEye size={20} className='text-yellow-light'/>
                    </button>
                    <button className="bg-red-light h-6 flex items-center bg-opacity-20 rounded-lg w-6 justify-center shadow-xs" onClick={() => {setShow(false); setShowModal(true)}}>
                        <BiTrash size={18} className='text-red-dark dark:text-red'/>
                    </button>
                </div>
            </Page>
            }
        </>
    );
};

export default Reviews
