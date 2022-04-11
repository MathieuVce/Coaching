import { AiOutlineStar } from "react-icons/ai";
import { FaRegCommentDots } from "react-icons/fa";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { RiUser3Line } from "react-icons/ri";
import { NewItems } from "../components/NewItems";
import { Table } from "../components/Table";
import { useNavigate } from "react-router-dom";

const Dashboard: React.FunctionComponent = () => {

    const headItems = ['id', 'title', 'category', 'rating']
    const headUsers = ['id', 'fullname', 'email', 'username']
    const headReviews = ['id', 'item', 'author', 'rating']
    const headComments = ['id', 'item', 'text', 'author']
    const valuesItems = ['10', 'Spider-Man', 'Movie', '9.5']
    const valuesUsers = ['10', 'John Doe', 'john.doe@gmail.com', 'Jojo2d']
    const valuesReviews = ['10', 'Spider-Man', 'John Doe', '9.2']
    const valuesComments = ['10', 'Spider-Man', 'What a movie !!! So many visual effects...', 'John Doe']

    const navigate = useNavigate();

    return(
        <>
            <div className="w-full mx-6 py-2 pr-4 pb-8">
                <div className="border-b py-3">
                    <label className="text-primary text-4xl font-bold">Dashboard</label>
                </div>
                <div className="container mt-8">
                    <div className="flex flex-wrap sm:grid gap-6 lg:grid-cols-4 md:grid-cols-2">
                        <NewItems title="New Items" count="14 500" icon={<MdOutlineDashboardCustomize color="#0AC5CD" size={35}/>}/>
                        <NewItems title="New Reviews" count="10 122" icon={<AiOutlineStar color="#0AC5CD" size={36}/>}/>
                        <NewItems title="New Users" count="4 392" icon={<RiUser3Line color="#0AC5CD" size={35}/>}/>
                        <NewItems title="New Comments" count="21 122" icon={<FaRegCommentDots color="#0AC5CD" size={34}/>}/>
                    </div>
        
                    <div className="grid gap-6 lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 mt-6">
                        <Table title="Latest Items" onClick={() => {navigate("/home/items")}} head={headItems} values={valuesItems} icon={<MdOutlineDashboardCustomize size={40}/>}/>
                        <Table title="Latest Reviews" onClick={() => {navigate("/home/reviews")}} head={headReviews} values={valuesReviews} icon={<AiOutlineStar size={40}/>}/>
                        <Table title="Latest Users" onClick={() => {navigate("/home/users")}} head={headUsers} values={valuesUsers} icon={<RiUser3Line size={40}/>}/>
                        <Table title="Latest Comments" onClick={() => {navigate("/home/comments")}} head={headComments} values={valuesComments} icon={<FaRegCommentDots size={40}/>}/>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dashboard
