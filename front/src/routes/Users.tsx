import { AiOutlineLock } from "react-icons/ai";
import { BiTrash } from "react-icons/bi";
import { Page } from "../components/Page";

const Users: React.FunctionComponent = () => {
    const values = ['15', 'John Doe/john.doe@gmail.com', 'Jojo2d', 'PREMIUM', '13', '4', 'APPROVED', '28 Dec. 2021']
    const header = ['id', 'basic info', 'username', 'pricing', 'comments', 'reviews', 'status', 'created date', 'actions']
    return(
        <>
            <Page title={'Users'} total='3 492' values={values} header={header}>
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
