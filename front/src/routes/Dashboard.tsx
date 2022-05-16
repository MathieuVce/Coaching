import { AiOutlineStar } from "react-icons/ai";
import { FaRegCommentDots } from "react-icons/fa";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { RiUser3Line } from "react-icons/ri";
import { NewItems } from "../components/NewItems";
import { Table } from "../components/Table";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useEffect, useState } from "react";
import { getComments, getMovies, getReviews, getUsers } from "../slices/info";
import { ActivityIndicator } from "../components/ActivityIndicator";
import { removeFromObject } from "../utils/Utils";
import { IComment, IMovie, IReview, IUser } from "../../../common/page";
import { IconBaseProps } from "react-icons";

const Dashboard: React.FunctionComponent = () => {

    const headItems = ['title', 'category', 'rating']
    const headUsers = ['fullname', 'email', 'username']
    const headReviews = ['item', 'author', 'rating']
    const headComments = ['item', 'author', 'text']
    const { reviews, comments, users, movies } = useAppSelector(state => state.info);
    const [isLoading, setLoading] = useState<boolean>(true);
    const valuesItems: {[key: string]: string | number}[] = []
    movies.map((movie: IMovie) => {
        valuesItems.push(removeFromObject(movie)('views', 'status', 'creationDate'));
    });
    const valuesReviews: {[key: string]: string | number}[] = []
    reviews.map((review: IReview) => {
        valuesReviews.push(removeFromObject(review)('review', 'title', 'creationDate'));
    });
    const valuesComments: {[key: string]: string | number | undefined}[] = []
    comments.map((comment: IComment) => {
        valuesComments.push(removeFromObject(comment)('title', 'creationDate'));
    });
    const valuesUsers: {[key: string]: string | number}[] = []
    users.map((user: IUser) => {
        valuesUsers.push(removeFromObject(user)('comments', 'pricing', 'creationDate', 'reviews', 'status', 'creationDate', 'info'));
    });


    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    
    useEffect(() => {
        fetchAll();
    }, []);

    const fetchAll = async () => {
        setLoading(true);
        await dispatch(getReviews());
        await dispatch(getComments());
        await dispatch(getUsers());
        await dispatch(getMovies());
        setLoading(false);
    };

    const tableItems: {[key: string]: {[key: string] : any}} = {
        "Items": {'array': movies, 'icon': <MdOutlineDashboardCustomize size={35}/>, 'head': headItems, 'values': valuesItems, getInfo: getMovies},
        "Reviews": {'array': reviews, 'icon': <AiOutlineStar size={36}/> , 'head': headReviews, 'values': valuesReviews, getInfo: getReviews},
        "Users": {'array': users, 'icon': <RiUser3Line size={35}/>, 'head': headUsers, 'values': valuesUsers, getInfo: getUsers},
        "Comments": {'array': comments, 'icon': <FaRegCommentDots size={32}/>, 'head': headComments, 'values': valuesComments, getInfo: getComments}
    }

    return(
        <>
            <div className="mx-6 py-2 pr-4 pb-8 w-screen dark:bg-primary">
                <div className="border-b dark:border-b-white py-3">
                    <label className="text-primary dark:text-white text-4xl font-bold">Dashboard</label>
                </div>
                {isLoading ? (
                    <ActivityIndicator/>
                )
                : (
                    <div className="container mt-8">
                        <div className="flex flex-wrap sm:grid gap-6 lg:grid-cols-4 md:grid-cols-2">
                            {Object.keys(tableItems).map((key: string) => (
                                <NewItems title={key} count={tableItems[key].array.length.toString()} icon={tableItems[key].icon}/>
                            ))}
                        </div>
            
                        <div className="grid gap-6 lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 mt-6">
                            {Object.keys(tableItems).map((key: string) => (
                                <Table title={`Latest ${key}`} onClick={() => {navigate(`/home/${key.toLowerCase()}`)}} head={tableItems[key].head} getInfo={async () => {await dispatch(tableItems[key].getInfo())}} values={tableItems[key].values} icon={tableItems[key].icon}/>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default Dashboard
