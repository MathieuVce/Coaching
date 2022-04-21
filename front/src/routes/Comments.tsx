import { Page } from "../components/Page";
import { AiOutlineEye, AiOutlinePlusCircle } from "react-icons/ai"
import { BiTrash } from "react-icons/bi";
import { useEffect, useState } from "react";
import { IComment, IPageType } from "../../../common/page";
import { Modal } from "../components/Modal";
import { RiUser3Line } from "react-icons/ri";
import { ActivityIndicator } from "../components/ActivityIndicator";
import { createComments, deleteComments, getComments } from "../slices/info";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { ShowInfo } from "../components/ShowInfo";

const Comments: React.FunctionComponent = () => {

    const header = ['id', 'item', 'author', 'text', 'created date', 'actions']
    const [comment, setComment] = useState<IComment>();
    const [isLoading, setLoading] = useState<boolean>(true);
    const [showModal, setShowModal] = useState(false);
    const [show, setShow] = useState(false);
    const { comments } = useAppSelector(state => state.info);

    const dispatch = useAppDispatch();

    useEffect(() => {
        setLoading(true);
        fetchComments();
    }, []);

    const fetchComments = async () => {
        await dispatch(getComments());
        setLoading(false);
    }

    const handleAction = async () => {
        setShowModal(false);
        setLoading(true);
        await dispatch(deleteComments({what: comment?.comment!}))
        await fetchComments();
    }

    const handleClick = async () => {
        setLoading(true);
        await dispatch(createComments());
        await fetchComments();
    }

    return (
        <>
            <Modal setShowModal={setShowModal} showModal={showModal} onApply={handleAction} buttons={show ? 'go back/delete' : 'no/confirm'} title={show ? '' : "Delete comment"}>
            {!show ? (
                <label>
                    Are you sure you want to delete this comment ?
                </label>
            ) : (
                <ShowInfo title={comment?.title!} type={IPageType.COMMENT} creationDate={comment?.creationDate!} text={comment?.comment!} user={comment?.user!} />
                
            )}
            </Modal>
            {isLoading ? (
                <ActivityIndicator/>
            )
            :
                <Page title={'Comments'} total={comments.length.toString()} values={comments} header={header} icon={<AiOutlinePlusCircle color='black' size={0}/>} setId={setComment} handleClick={handleClick}>
                    <div className="flex items-center space-x-5 justify-center">
                        <button className="bg-yellow-light h-6 flex items-center justify-center bg-opacity-50 rounded-lg w-6" onClick={() => {setShow(true); setShowModal(true)}}>
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

export default Comments
