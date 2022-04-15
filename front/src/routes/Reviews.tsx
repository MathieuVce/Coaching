import { getDocs, collection } from "firebase/firestore";
import { useState, useEffect } from "react";
import { AiOutlineEye, AiOutlineUserAdd } from "react-icons/ai";
import { BiTrash } from "react-icons/bi";
import { IUser } from "../../../common/page";
import { Page } from "../components/Page";
import { db } from "../services/firebase";


const Reviews: React.FunctionComponent = () => {

    const values = ['10', 'Spider-Man', 'John Doe', 'What a movie !!! So many visual effects, what a movie !!! So many visual effects, What a movie !!! So many visual effects', '9.2', '23 Dec. 2021']
    const header = ['id', 'item', 'author', 'text', 'rating', 'created date', 'actions']
    const [reviews, setReviews] = useState<IUser[]>([]);
    const [id, setId] = useState<string>();

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        const querySnapshot = await getDocs(collection(db, "users"));
        querySnapshot.forEach((doc) => {
            setReviews(reviews => [...reviews, {
                    name: doc.data().name,
                    email: doc.data().email,
                    username: doc.data().username,
                    pricing: doc.data().pricing,
                    comments: doc.data().comments,
                    reviews: doc.data().reviews,
                    creationDate: doc.data().creationDate,
                    status: doc.data().status ? "approved" : "banned",
                    info: doc.data().name + '/' + doc.data().email,
                }
            ]);
        });
    };

    const handleClick = () => {
       
    };

    return(
        <>
            <Page title={'Reviews'} total='10 122' values={reviews} header={header} icon={<AiOutlineUserAdd color='black' size={20}/>} setId={setId} handleClick={handleClick}>
                <div className="flex items-center space-x-5 justify-center">
                    <article className="bg-yellow-light h-6 flex items-center justify-center bg-opacity-50 rounded-lg w-6">
                        <AiOutlineEye color='black' size={20}/>
                    </article>
                    <article className="bg-red-light h-6 flex items-center bg-opacity-40 rounded-lg w-6 justify-center">
                        <BiTrash color='black' size={18}/>
                    </article>
                </div>
            </Page>
        </>
    );
};

export default Reviews
