import { AiFillStar } from "react-icons/ai";
import { IMovie } from "../../../common/page";
import { truncateString, useBreakpoints } from "../utils/Utils";


export interface ITableRowProps {
    head: string[];
    values: {[key: string]: string | number | undefined};
    index: number;
}

export const TableRow: React.FC<ITableRowProps> = ({ head, values, index }) => {
    const {isXs, isSm, isMd, isLg} = useBreakpoints();
    const basicStyle = "md:text-sm sm:text-xs whitespace-no-wrap text-center text-sm flex items-center justify-center h-10 dark:text-white"
    const emailStyle = "text-sm font-light text-blue-light flex whitespace-no-wrap items-center justify-start pl-5"

    return (
        <>
            <tr>
                {Object.keys(values).map((value, i) => {
                    return (
                        <td className="px-1 py-2" key={i}>
                            <section className={head[i] === 'email' ? emailStyle : head[i] === 'text' ? emailStyle : basicStyle}>
                                {(head[i] === 'email' || head[i] === 'text') ? truncateString(values[value]!.toString(), isXs ? 5 : isSm ? 40 : isMd ? 85 : isLg ? 6 : 10) : values[value]}
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