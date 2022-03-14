import { AiOutlineStar } from "react-icons/ai";
import { FaRegCommentDots } from "react-icons/fa";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { RiUser3Line } from "react-icons/ri";
import { NewItems } from "../components/NewItems";
import { Table } from "../components/Table";

const Dashboard: React.FunctionComponent = () => {

    const headItems = ['id', 'title', 'category', 'rating']
    const headUsers = ['id', 'fullname', 'email', 'username']
    const headReviews = ['id', 'item', 'author', 'rating']
    const headComments = ['id', 'item', 'text', 'author']
    const valuesItems = ['10', 'Spider-Man', 'Movie', '9.5']
    const valuesUsers = ['10', 'John Doe', 'john.doe@gmail.com', 'Jojo2d']
    const valuesReviews = ['10', 'Spider-Man', 'John Doe', '9.2']
    const valuesComments = ['10', 'Spider-Man', 'What a movie !!! So many visual effects...', 'John Doe']
    return(
        <>
            <div className="w-full px-4 py-2">
                <div className="container mx-auto mt-12">
                    <div className="grid gap-4 lg:grid-cols-4 md:grid-cols-2">
                        <NewItems title="New Items" count="14 500" icon={<MdOutlineDashboardCustomize size={30}/>}/>
                        <NewItems title="New Reviews" count="10 122" icon={<RiUser3Line size={30}/>}/>
                        <NewItems title="New Items" count="14 500" icon={<FaRegCommentDots size={29}/>}/>
                        <NewItems title="New Items" count="14 500" icon={<AiOutlineStar size={32}/>}/>
                    </div>
        
                    <div className="grid gap-4 lg:grid-cols-2 md:grid-cols-1">
                        <Table head={headItems} values={valuesItems}/>
                        <Table head={headUsers} values={valuesUsers}/>
                        <Table head={headReviews} values={valuesReviews}/>
                        <Table head={headComments} values={valuesComments}/>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dashboard
