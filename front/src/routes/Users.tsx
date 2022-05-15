import { AiOutlineLock, AiOutlineUserAdd } from "react-icons/ai";
import { BiTrash } from "react-icons/bi";
import { Page } from "../components/Page";
import { useEffect, useState } from "react";
import { IUser } from "../../../common/page";
import { Modal } from "../components/Modal";
import { Dropdown } from "../components/Dropdown";
import { Form } from "../components/Form";
import { ActivityIndicator } from "../components/ActivityIndicator";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { createUsers, deleteUsers, getUsers, updateUsers } from "../slices/info";


const Users: React.FunctionComponent = () => {
    const header = ['id', 'basic info', 'username', 'pricing', 'comments', 'reviews', 'status', 'created date', 'actions'];
    const [userId, setUserId] = useState<IUser>();
    const [isLoading, setLoading] = useState<boolean>(true);
    const [showModal, setShowModal] = useState(false);
    const [toDelete, setDelete] = useState(false);
    const [createUserModal, setCreateUserModal] = useState(false);
    const [user, setUser] = useState({email: "", name: "", username: ""});
    const [final, setFinal] = useState<string>('pricing');
    const pricing = ['FREE', 'STANDARD', 'PREMIUM'];
    const { users } = useAppSelector(state => state.info);

    const dispatch = useAppDispatch();

    useEffect(() => {
        setLoading(true);
        fetchUsers();
    }, []);


    const handleChange = (prop: keyof typeof user, value: string) => {
        setUser({
            ...user,
            [prop]: value
        });
    };

    const handleCreateUser = async () => {
        if (user.email && user.name && user.username && final !== 'pricing') {
            setCreateUserModal(false);
            setLoading(true);

            const obj = {
                ...user,
                pricing: final,
                comments: 0,
                reviews: 0,
                status: true,
                creationDate: new Date().toLocaleString()
            }
            await dispatch(createUsers({user: obj}))
            await fetchUsers();
        }
    }
    
    const fetchUsers = async () => {
        await dispatch(getUsers());
        setLoading(false);
    }

    const handleAction = async () => {
        setShowModal(false);
        setLoading(true);
        const obj = {what: userId?.username!}

        await dispatch(toDelete ? deleteUsers(obj) : updateUsers(obj));

        await fetchUsers();
    }

    const handleClick = () => {
        setUser({email: "", name: "", username: ""});
        setFinal("pricing");
        setCreateUserModal(true);
    }

    return(
        <>
            <Modal setShowModal={setCreateUserModal} showModal={createUserModal} buttons='cancel/add user' onApply={handleCreateUser} title="Add a user">
                <Form name="Name" type='text' placeholder='Enter name' onChange={(e) => {handleChange('name', e.target.value)}} value={user.name}/>
                <Form name="Username" type='text' placeholder='Enter username' onChange={(e) => {handleChange('username', e.target.value)}} value={user.username}/>
                <Form name="Email" type='email' placeholder='name@email.com' onChange={(e) => { handleChange('email', e.target.value); }} value={user.email} />
                <Dropdown color="bg-blue" display={final} setDisplay={setFinal} title='Pricing' values={pricing}/>
            </Modal>
            <Modal setShowModal={setShowModal} showModal={showModal} onApply={handleAction} buttons='no/confirm' title={toDelete ? "Delete user" : "Change status"}>
                <div className="dark:text-white">
                    {toDelete ? "Are you sure you want to delete this user?" : "Are you sure you want to change the status of this user?"}
                </div>
            </Modal>
            {isLoading ? (
                <ActivityIndicator/>
            )
            :
                <Page fetchInfo={() => fetchUsers()} title={'Users'} total={users.length.toString()} values={users} header={header} icon={<AiOutlineUserAdd size={20}/>} setId={setUserId} handleClick={handleClick}>
                    <div className="flex items-center space-x-5 justify-center"> 
                        <button className="bg-green-light h-6 flex items-center justify-center bg-opacity-20 rounded-lg w-6 shadow-xs" onClick={() => {setDelete(false); setShowModal(true)}}>
                            <AiOutlineLock size={18} className='text-green-darker'/>
                        </button>
                        <button className="bg-red-light h-6 flex items-center bg-opacity-20 rounded-lg w-6 justify-center shadow-xs" onClick={() => {setDelete(true); setShowModal(true)}}>
                            <BiTrash size={18} className='text-red-dark dark:text-red'/>
                        </button>
                    </div>
                </Page>
            }
        </>
    );
};

export default Users
