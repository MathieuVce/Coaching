import { AiOutlineEye } from "react-icons/ai";
import { BiTrash } from "react-icons/bi";
import { Page } from "../components/Page";


const Reviews: React.FunctionComponent = () => {

    const values = ['10', 'Spider-Man', 'John Doe', 'What a movie !!! So many visual effects, what a movie !!! So many visual effects, What a movie !!! So many visual effects', '9.2', '23 Dec. 2021']
    const header = ['id', 'item', 'author', 'text', 'rating', 'created date', 'actions']
    return(
        <>
            <Page title={'Reviews'} total='10 122' values={values} header={header}>
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
