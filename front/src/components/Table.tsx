import { AiFillStar } from "react-icons/ai";

export interface ITableProps {
    head: Array<string>;
    values: Array<string>;
}

export const Table: React.FC<ITableProps> = ({ head, values }) => {

    const basicStyle = "text-sm font-medium leading-5 tracking-wider text-primary flex items-center px-5"
    const emailStyle = "text-xs font-light leading-5 tracking-wider text-brown flex items-center px-5"
    return (
        <>
            <div className="flex flex-col mt-8">
                <div className="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 overflow-visible">
                    <div className="inline-block  overflow-hidden align-middle shadow-md sm:rounded-lg w-full bg-white-light">
                        <table>
                            {head.map((title) => {
                                return (
                                    <th className="px-6 py-3 text-sm font-medium leading-4 tracking-wider text-left text-brown uppercase border-b">{title}</th> 
                                )
                            })}
                            <tbody className="bg-white-light rounded-lg">
                                <tr>
                                    {values.map((value, i) => {
                                        return (
                                            <td className="px-1 py-2 whitespace-no-wrap ">
                                                <div className={head[i] === 'email' ? emailStyle : head[i] === 'text' ? emailStyle : basicStyle}>
                                                    {value}
                                                    {head[i] === 'rating' && (
                                                        <AiFillStar size={20} color="#0AC5CD"/>
                                                    )}
                                                </div>
                                            </td>
                                        )
                                    })}
                                </tr>

                                <tr>
                                    {values.map((value, i) => {
                                        return (
                                            <td className="px-1 py-2 whitespace-no-wrap ">
                                                <div className={head[i] === 'email' ? emailStyle : head[i] === 'text' ? emailStyle : basicStyle}>
                                                    {value}
                                                    {head[i] === 'rating' && (
                                                        <AiFillStar size={20} color="#0AC5CD"/>
                                                    )}
                                                </div>
                                            </td>
                                        )
                                    })}
                                </tr>

                                <tr>
                                    {values.map((value, i) => {
                                        return (
                                            <td className="px-1 py-2 whitespace-no-wrap ">
                                                <div className={head[i] === 'email' ? emailStyle : head[i] === 'text' ? emailStyle : basicStyle}>
                                                    {value}
                                                    {head[i] === 'rating' && (
                                                        <AiFillStar size={20} color="#0AC5CD"/>
                                                    )}
                                                </div>
                                            </td>
                                        )
                                    })}
                                </tr>

                                <tr>
                                    {values.map((value, i) => {
                                        return (
                                            <td className="px-1 py-2 whitespace-no-wrap ">
                                                <div className={head[i] === 'email' ? emailStyle : head[i] === 'text' ? emailStyle : basicStyle}>
                                                    {value}
                                                    {head[i] === 'rating' && (
                                                        <AiFillStar size={20} color="#0AC5CD"/>
                                                    )}
                                                </div>
                                            </td>
                                        )
                                    })}
                                </tr>

                                <tr>
                                    {values.map((value, i) => {
                                        return (
                                            <td className="px-1 py-2 whitespace-no-wrap ">
                                                <div className={head[i] === 'email' ? emailStyle : head[i] === 'text' ? emailStyle : basicStyle}>
                                                    {value}
                                                    {head[i] === 'rating' && (
                                                        <AiFillStar size={20} color="#0AC5CD"/>
                                                    )}
                                                </div>
                                            </td>
                                        )
                                    })}
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}