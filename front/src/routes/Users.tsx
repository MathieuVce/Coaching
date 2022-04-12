import { AiOutlineLock, AiOutlineUserAdd } from "react-icons/ai";
import { BiTrash } from "react-icons/bi";
import { Page } from "../components/Page";
import { collection, getDocs } from "firebase/firestore"; 
import { useEffect, useState } from "react";
import { db } from "../services/firebase";
import { IUser } from "../../../common/page";


const Users: React.FunctionComponent = () => {
    const values = ['15', 'John Doe/john.doe@gmail.com', 'Jojo2d', 'PREMIUM', '13', '4', 'APPROVED', '28 Dec. 2021']
    const header = ['id', 'basic info', 'username', 'pricing', 'comments', 'reviews', 'status', 'created date', 'actions']

    //const [sites, setSites] = useState<firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>>();   

    // const getSites = async () => {
    //     setSites(await getItems());
    //     setTmpSites((await getItems()).docs.map((doc: { data: () => any; }) => doc.data()));
    //     setItem(tmpSites ? tmpSites[0] : null);
    // };
    const [users, setUsers] = useState<IUser[]>([]);

    useEffect(() => {
        (async () => {
            const querySnapshot = await getDocs(collection(db, "users"));
            querySnapshot.forEach((doc) => {
                console.log(doc.id, " => ", doc.data().name );
                setUsers(users => [...users, {
                        name: doc.data().name,
                        email: doc.data().email,
                        username: doc.data().username,
                        comments: doc.data().comments || [],
                        reviews: doc.data().reviews || [],
                        pricing: doc.data().pricing,
                        creationDate: doc.data().creationDate,
                        status: doc.data().status ? "APPROVED" : "BANNED",
                        info: doc.data().name + '/' + doc.data().email,
                    }
                ]);
            
                
                // user.push('1')
                // user.push(doc.data().name + '/' + doc.data().email)
                // user.push(doc.data().username)
                // user.push(doc.data().pricing)
                // user.push(doc.data().comments)
                // user.push(doc.data().reviews)
                // user.push(doc.data().status ? 'APPROVED' : 'BANNED')
                // user.push(doc.data().createdDate)
            });
        })();
      }, []);
    

    return(
        <>
            <Page title={'Users'} total='3 492' values={users} header={header} icon={<AiOutlineUserAdd color='black' size={20}/>}>
                <div className="flex items-center space-x-5 justify-center"> 
                    <button className="bg-green-light h-6 flex items-center justify-center bg-opacity-50 rounded-lg w-6">
                        <AiOutlineLock color='black' size={20}/>
                    </button>
                    <button className="bg-red-light h-6 flex items-center bg-opacity-40 rounded-lg w-6 justify-center">
                        <BiTrash color='black' size={18}/>
                    </button>
                </div>
            </Page>
        </>
    );
};

export default Users
