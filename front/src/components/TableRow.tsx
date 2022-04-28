import { AiFillStar } from "react-icons/ai";
import { IMovie } from "../../../common/page";
import { truncateString } from "../utils/Utils";


export interface ITableRowProps {
    head: string[];
    values: {[key: string]: string | number | undefined};
    index: number;
}

export const TableRow: React.FC<ITableRowProps> = ({ head, values, index }) => {

    const basicStyle = "md:text-sm sm:text-xs whitespace-no-wrap text-center text-sm flex items-center justify-center h-10 dark:text-white"
    const emailStyle = "text-sm font-light text-blue-light flex whitespace-no-wrap items-center justify-start pl-5"

    return (
        <>
            <tr>
                <td className="px-1 py-2 text-center text-sm">
                    {index}
                </td>
                {Object.keys(values).map((value, i) => {
                    return (
                        <td className="px-1 py-2" key={i}>
                            <section className={head[i+1] === 'email' ? emailStyle : head[i+1] === 'text' ? emailStyle : basicStyle}>
                                {head[i+1] === 'email' ? truncateString(values[value]!.toString(),7) : head[i+1] === 'text' ? truncateString(values[value]!.toString(), 18) : values[value]}
                                {head[i+1] === 'rating' && (
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