import { useMemo } from "react";
import { AiFillStar } from "react-icons/ai";
import { RiUser3Line } from "react-icons/ri";
import { headTableStyle, truncateString } from "../utils/Utils";

export interface IScrollViewProps {
    header: string[];
    body: string[];
    child: React.ReactNode;
}

export const ScrollView: React.FC<IScrollViewProps> = ({ header, body, child }) => {

    return (
        <>
            <table className="border-collapse w-full">
                <thead>
                    <tr>
                        {header?.map((value, i) => {

                            const wrapperStyle = useMemo(() => {
                                return headTableStyle[value] + "text-left";
                            }, [value]);
                            
                            return (
                                <th className={`${headTableStyle[value]} text-left py-3 text-sm font-light leading-4 text-brown uppercase`} key={i}>{value}</th> 
                                // <th key={i}>
                                //     <section className={wrapperStyle}>
                                //         <label className="text-left text-sm font-light leading-4 text-brown uppercase">
                                //             {value}
                                //         </label>
                                //     </section>
                                // </th> 
                            )
                        })}
                    </tr>
                </thead>
                <tbody>
                    {Array.from({ length: 10 }, (_, i) =>
                    <tr>
                        {body?.map((value, i) => {
                            return (
                                <td key={i}>
                                    <section className={`flex text-left py-6 -mx-5 my-1 px-4 text-sm font-semibold leading-4 bg-white-light ${i == 0 ? 'rounded-l-lg' : 'rounded-none'}`}>
                                        {header[i] === 'text' ? truncateString(value, 26) : value}
                                        {header[i] === 'rating' && (
                                            <article className="pl-1">
                                                <AiFillStar size={16} color="#0AC5CD"/>
                                            </article>
                                        )}
                                    </section>
                                </td>
                            )
                        })}
                        <td>
                            <section className=" py-5 -mr-5 bg-white-light rounded-r-lg">
                                {child}
                            </section>

                        </td>
                    </tr>
                    )}
                </tbody>
            </table>
        </>
    )
}