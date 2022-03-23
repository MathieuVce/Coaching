import { IconBaseProps } from "react-icons";
import { IoMdRefresh } from "react-icons/io";
import { TableRow } from "./TableRow";


export interface ITableProps {
    head: string[];
    values: string[];
    title: string;
    icon: IconBaseProps;
    onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export const Table: React.FC<ITableProps> = ({ head, values, onClick, icon, title }) => {

    const handleRefresh = () => {
        // console.log(title.split(' ')[1].toLowerCase())
        // const type = title.split(' ')[1].toLowerCase()

        // switch(type) {
        //     case 'items':
        //         setValues(['11', 'Spider-Man2', 'Movie', '9.8']);
        //         break;
        //     case 'users':
        //         setValues(['11', 'John Doe', 'john.doe@gmail.com', 'Jojo2d']);
        //         break;
        //     case 'reviews':
        //         setValues(['11', 'Spider-Man2', 'John Doe', '9.9']);
        //         break;
        //     case 'comments':
        //         setValues(['11', 'Spider-Man2', 'What a movie !!! So many visual effects...', 'John Doe']);
        //         break;
        //     default:
        //         break;
        // }
    };

    return (
        <>
            <div className="flex flex-col">
                <div className="py-2 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                    <div className="inline-block overflow-x-auto align-middle shadow-md rounded-lg w-full bg-white-light pb-3">
                        <div className="w-full border-b border-b-brown px-5 items-center py-4 flex flex-row">
                            {icon}
                            <label className="font-medium text-lg px-2">{title}</label>
                            <div className="flex flex-row items-center w-full justify-end">
                                <button onClick={() => {handleRefresh()}} >
                                    <IoMdRefresh/>
                                </button>
                                <div className="bg-brown bg-opacity-20 justify-center flex py-1 rounded-lg px-2 ml-5">
                                    <button className="text-xs" onClick={onClick}>View all</button>
                                </div>
                            </div>
                        </div>
                        {/* <table className="w-full table-fixed"> */}
                        <table className="w-full">
                            <tbody>
                                <tr>
                                {head.map((title, i) => {
                                    return (
                                        <th className="px-6 py-3 text-xs font-light leading-4 thacking-wider text-left text-brown uppercase overflow-x-scroll" key={i}>{title}</th> 
                                        )
                                    })}
                                </tr>
                            </tbody>
                            <tbody className="bg-white-light border-t border-t-brown">
                                <TableRow head={head} values={values}/>
                                <TableRow head={head} values={values}/>
                                <TableRow head={head} values={values}/>
                                <TableRow head={head} values={values}/>
                                <TableRow head={head} values={values}/>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}