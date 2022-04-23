import { Page } from "../components/Page";
import { AiOutlineEye, AiOutlinePlusCircle } from "react-icons/ai"
import { BiTrash } from "react-icons/bi";
import { useEffect, useState } from "react";
import { IComment, IPageType } from "../../../common/page";
import { Modal } from "../components/Modal";
import { ActivityIndicator } from "../components/ActivityIndicator";
import { createComments, deleteComments, getComments } from "../slices/info";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { ShowInfo } from "../components/ShowInfo";
import { Form } from "../components/Form";
import { Dropdown } from "../components/Dropdown";

const Comments: React.FunctionComponent = () => {

    const { users, movies, comments } = useAppSelector(state => state.info);
    const header = ['id', 'item', 'author', 'text', 'created date', 'title', 'actions']
    const [commentId, setCommentId] = useState<IComment>();
    const [isLoading, setLoading] = useState<boolean>(true);
    const [showModal, setShowModal] = useState(false);
    const [show, setShow] = useState(false);
    const [createCommentModal, setCreateCommentModal] = useState(false);
    const [comment, setComment] = useState({comment: "", title: ""});
    const [finalUser, setFinalUser] = useState<string>('user');
    const [finalMovie, setFinalMovie] = useState<string>('movie');
    const user: string[] = []
    const movie: string[] = []
    users.map((item) => user.push(item.username));
    movies.map((item) => movie.push(item.title));
    
    const dispatch = useAppDispatch();
    
    useEffect(() => {
        setLoading(true);
        fetchComments(); 
    }, []);

    const handleChange = (prop: keyof typeof comment, value: string) => {
        setComment({
            ...comment,
            [prop]: value
        });
    };

    const handleCreateComment = async () => {
        if (comment.title && comment.comment && finalUser !== 'user' && finalMovie !== 'movie') {
            setCreateCommentModal(false);
            setLoading(true);

            const obj = {
                ...comment,
                movie: finalMovie,
                user: finalUser,
                creationDate: new Date().toLocaleString()
            }
            await dispatch(createComments({comment: obj}))
            await fetchComments();
        }
    }

    const fetchComments = async () => {
        await dispatch(getComments());
        setLoading(false);
    }

    const handleAction = async () => {
        setShowModal(false);
        setLoading(true);
        await dispatch(deleteComments({what: commentId?.comment!}))
        await fetchComments();
    }

    const handleClick = () => {
        setComment({title: "", comment: ""});
        setFinalUser("user");
        setFinalMovie("movie");
        setCreateCommentModal(true);
    }

    return (
        <>
            <Modal setShowModal={setCreateCommentModal} showModal={createCommentModal} buttons='cancel/add comment' onApply={handleCreateComment} title="Add a comment">
                <Form name="Title" type='text' placeholder='Enter title' onChange={(e) => {handleChange('title', e.target.value)}} value={comment.title}/>
                <Form name="Comment" type='text' placeholder='Enter comment' onChange={(e) => {handleChange('comment', e.target.value)}} value={comment.comment} maxLen={200}/>
                <Dropdown color="bg-blue" display={finalMovie} setDisplay={setFinalMovie} title='Movie' values={movie}/>
                <Dropdown color="bg-blue" display={finalUser} setDisplay={setFinalUser} title='User' values={user}/>
            </Modal>
            <Modal setShowModal={setShowModal} showModal={showModal} onApply={handleAction} buttons={show ? 'go back/delete' : 'no/confirm'} title={show ? '' : "Delete comment"}>
            {!show ? (
                <label>
                    Are you sure you want to delete this comment ?
                </label>
            ) : (
                <ShowInfo title={commentId?.title!} type={IPageType.COMMENT} creationDate={commentId?.creationDate!} text={commentId?.comment!} user={commentId?.user!} />
                
            )}
            </Modal>
            {isLoading ? (
                <ActivityIndicator/>
            )
            :
                <Page title={'Comments'} total={comments.length.toString()} values={comments} header={header} icon={<AiOutlinePlusCircle color='black' size={0}/>} setId={setCommentId} handleClick={handleClick}>
                    <div className="flex items-center space-x-5 justify-center">
                        <button className="bg-yellow-light h-6 flex items-center justify-center bg-opacity-50 rounded-lg w-6 shadow-xs" onClick={() => {setShow(true); setShowModal(true)}}>
                            <AiOutlineEye color='black' size={20}/>
                        </button>
                        <button className="bg-red-light h-6 flex items-center bg-opacity-40 rounded-lg w-6 justify-center shadow-xs" onClick={() => {setShow(false); setShowModal(true)}}>
                            <BiTrash color='black' size={18}/>
                        </button>
                    </div>
                </Page>
            }
        </>
    );
};

export default Comments
