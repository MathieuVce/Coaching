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


const Users: React.FunctionComponent = () => {
    const header = ['id', 'basic info', 'username', 'pricing', 'comments', 'reviews', 'status', 'created date', 'actions'];
    const [users, setUsers] = useState<IUser[]>([]);
    const [id, setId] = useState<string>();
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
                comments: [],
                reviews: [],
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
        setLoading(false);
    }
    const handleApply = async () => {
        setShowModal(false);
        setLoading(true);
        const userRef = await getDocIdBy("username", "users", id!);
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
                <div className="flex items-center justify-center w-full h-screen text-center">
                    <svg role="status" className="inline mr-2 w-8 h-8 animate-spin fill-blue text-brown" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                    </svg>
                    <label className="text-brown font-light text-2xl">
                        Loading...
                    </label>
                </div>
            )
            :
                <Page title={'Users'} total={users.length.toString()} values={users} header={header} icon={<AiOutlineUserAdd color='black' size={20}/>} setId={setId} handleClick={handleClick}>
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
