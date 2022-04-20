import { AiOutlineLock, AiOutlineUserAdd } from "react-icons/ai";
import { BiTrash } from "react-icons/bi";
import { Page } from "../components/Page";
import { collection, getDocs, setDoc, updateDoc } from "firebase/firestore"; 
import { useEffect, useState } from "react";
import { db } from "../services/firebase";
import { doc, deleteDoc } from "firebase/firestore";
import { IUser } from "../../../common/page";
import { getDocIdBy } from "../utils/Utils";
import { Modal } from "../components/Modal";
import { Dropdown } from "../components/Dropdown";
import { Form } from "../components/Form";
import { ActivityIndicator } from "../components/ActivityIndicator";


const Users: React.FunctionComponent = () => {
    const header = ['id', 'basic info', 'username', 'pricing', 'comments', 'reviews', 'status', 'created date', 'actions'];
    const [users, setUsers] = useState<IUser[]>([]);
    const [userId, setUserId] = useState<IUser>();
    const [isLoading, setLoading] = useState<boolean>(true);
    const [showModal, setShowModal] = useState(false);
    const [toDelete, setDelete] = useState(false);
    const [showModal2, setShowModal2] = useState(false);
    const [user, setUser] = useState({email: "", name: "", username: ""});
    const [final, setFinal] = useState<string>('pricing');
    const pricing = ['FREE', 'STANDARD', 'PREMIUM'];

    useEffect(() => {
        fetchUsers();
    }, []);


    const handleChange = (prop: keyof typeof user, value: string) => {
        setUser({
            ...user,
            [prop]: value
        });
    };

    const handleApply2 = async () => {
        if (user.email && user.name && user.username && final !== 'pricing') {
            setShowModal2(false);
            setLoading(true);
            const newUserRef = doc(collection(db, "users"));

            await setDoc(newUserRef, {
                ...user,
                pricing: final,
                comments: 0,
                reviews: 0,
                status: true,
                creationDate: new Date().toLocaleString()
            });

            setUsers([]);
            window.scrollTo(0, window.pageXOffset);
            await fetchUsers();
        }

    }
    
    const fetchUsers = async () => {
        setLoading(true);
        const querySnapshot = await getDocs(collection(db, "users"));
        querySnapshot.forEach((doc) => {
            setUsers(users => [...users, {
                    name: doc.data().name,
                    email: doc.data().email,
                    info: doc.data().name + '/' + doc.data().email,
                    username: doc.data().username,
                    pricing: doc.data().pricing.toUpperCase(),
                    comments: doc.data().comments.toString(),
                    reviews: doc.data().reviews.toString(),
                    status: doc.data().status ? "APPROVED" : "BANNED",
                    creationDate: doc.data().creationDate.split(',')[0],
                }
            ]);
        });
        setLoading(false);
    }
    const handleApply = async () => {
        setShowModal(false);
        setLoading(true);
        const userRef = await getDocIdBy("username", "users", userId?.username!);
        const document = doc(collection(db, "users"), userRef.docs[0].id)

        if (toDelete) {
            await deleteDoc(document)
        } else {
            await updateDoc(document, {
                status: !userRef.docs[0].data().status
            });
        }

        setUsers([]);
        await fetchUsers();
    }

    const handleClick = () => {
        setUser({email: "", name: "", username: ""});
        setFinal("pricing");
        setShowModal2(true);
    }

    return(
        <>
            <Modal setShowModal={setShowModal2} showModal={showModal2} buttons='cancel/add user' onApply={handleApply2} title="Add a user">
                <Form name="Name" type='text' placeholder='Enter name' onChange={(e) => {handleChange('name', e.target.value)}} value={user.name}/>
                <Form name="Username" type='text' placeholder='Enter username' onChange={(e) => {handleChange('username', e.target.value)}} value={user.username}/>
                <Form name="Email" type='email' placeholder='name@email.com' onChange={(e) => { handleChange('email', e.target.value); }} value={user.email} />
                <Dropdown color="bg-blue" display={final} setDisplay={setFinal} title='Pricing' values={pricing}/>
            </Modal>
            <Modal setShowModal={setShowModal} showModal={showModal} onApply={handleApply} buttons='no/confirm' title={toDelete ? "Delete user" : "Change status"}>
                <div>
                    {toDelete ? "Are you sure you want to delete this user?" : "Are you sure you want to change the status of this user?"}
                </div>
            </Modal>
            {isLoading ? (
                <ActivityIndicator/>
            )
            :
                <Page title={'Users'} total={users.length.toString()} values={users} header={header} icon={<AiOutlineUserAdd color='black' size={20}/>} setId={setUserId} handleClick={handleClick}>
                    <div className="flex items-center space-x-5 justify-center"> 
                        <button className="bg-green-light h-6 flex items-center justify-center bg-opacity-50 rounded-lg w-6" onClick={() => {setDelete(false); setShowModal(true)}}>
                            <AiOutlineLock color='black' size={18}/>
                        </button>
                        <button className="bg-red-light h-6 flex items-center bg-opacity-40 rounded-lg w-6 justify-center" onClick={() => {setDelete(true); setShowModal(true)}}>
                            <BiTrash color='black' size={18}/>
                        </button>
                    </div>
                </Page>
            }
        </>
    );
};

export default Users
