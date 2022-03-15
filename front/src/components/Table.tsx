import { useState } from "react";
import { IconBaseProps } from "react-icons";
import { AiFillStar } from "react-icons/ai";
import { IoMdRefresh } from "react-icons/io";


export interface ITableProps {
    head: Array<string>;
    values: Array<string>;
    title: string;
    icon: IconBaseProps;
    onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export const Table: React.FC<ITableProps> = ({ head, values, onClick, icon, title }) => {

    const basicStyle = "text-sm font-medium text-primary flex items-center px-5"
    const emailStyle = "text-xs font-light text-blue-light flex items-center px-5"
    const [newValues, setValues] = useState(values)

    const line =    <>
                        <tr>
                            {newValues.map((value, i) => {
                                return (
                                    <td className="px-1 py-2 whitespace-no-wrap" key={i}>
                                        <div className={head[i] === 'email' ? emailStyle : head[i] === 'text' ? emailStyle : basicStyle}>
                                            {value}
                                            {head[i] === 'rating' && (
                                                <div className="pl-1">
                                                    <AiFillStar size={20} color="#0AC5CD"/>
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                )
                            })}
                        </tr>
                    </>

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
                <div className="py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 overflow-visible">
                    <div className="inline-block  overflow-hidden align-middle shadow-md rounded-lg w-full bg-white-light pb-3">
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
                        <table className="w-full">
                            <tbody>
                                <tr>
                                {head.map((title, i) => {
                                    return (
                                        <th className="px-6 py-3 text-xs font-light leading-4 thacking-wider text-left text-brown uppercase" key={i}>{title}</th> 
                                        )
                                    })}
                                </tr>
                            </tbody>
                            <tbody className="bg-white-light border-t border-t-brown">
                                {line}
                                {line}
                                {line}
                                {line}
                                {line}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}