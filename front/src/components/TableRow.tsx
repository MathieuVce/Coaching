import { useState } from "react";
import { AiFillStar } from "react-icons/ai";


export interface ITableRowProps {
    head: string[];
    values: string[];
}

export const TableRow: React.FC<ITableRowProps> = ({ head, values }) => {

    const basicStyle = "text-sm font-medium text-primary flex items-center px-5"
    const emailStyle = "text-xs font-light text-blue-light flex items-center px-5"
    const [newValues, setValues] = useState(values)

    return (
        <>
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
    )
}