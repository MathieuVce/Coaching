import { AiFillStar } from "react-icons/ai";
import { truncateString } from "../utils/Utils";


export interface ITableRowProps {
    head: string[];
    values: string[];
}

export const TableRow: React.FC<ITableRowProps> = ({ head, values }) => {

    const basicStyle = "text-lg md:text-sm sm:text-xs font-medium text-primary flex items-center justify-start px-5 h-10"
    const emailStyle = "text-sm font-light text-blue-light flex items-center justify-start pl-5"

    return (
        <>
            <tr>
                {values.map((value, i) => {
                    return (
                        <td className="px-1 py-2 whitespace-no-wrap" key={i}>
                            <section className={head[i] === 'email' ? emailStyle : head[i] === 'text' ? emailStyle : basicStyle}>
                                {head[i] === 'email' ? truncateString(value, 7) : head[i] === 'text' ? truncateString(value, 18) : value}
                                {head[i] === 'rating' && (
                                    <article className="pl-1">
                                        <AiFillStar size={20} color="#0AC5CD"/>
                                    </article>
                                )}
                            </section>
                        </td>
                    )
                })}
            </tr>
        </>
    )
}