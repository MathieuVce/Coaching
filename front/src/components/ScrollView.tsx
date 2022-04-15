import { RiUser3Line } from "react-icons/ri";
import { IComment, IUser } from "../../../common/page";
import { truncateString, useBreakpoints } from "../utils/Utils";

export interface IScrollViewProps {
    header: string[];
    body: any[];
    child: React.ReactNode;
   setId: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export const ScrollView: React.FC<IScrollViewProps> = ({ header, body, setId, child }) => {

    const {isXs, isSm, isMd, isLg} = useBreakpoints();

    return (
        <>
            <div className="py-4">
                <div className="inline-block min-w-full">
                    <table className="min-w-full leading-normal">
                        <thead>
                            <tr>
                            {header?.map((value, i) => {
                                return (
                                    <th className="pl-5 before:py-4 text-left text-sm font-light uppercase text-brown tracking-wider whitespace-nowrap" key={i}>{value}</th> 
                                    )
                            })}
                            </tr>
                        </thead>
                        <tbody>
                            {body?.map((value, i) => {
                                return (
                                    <tr key={i}>
                                            {/* users */}
                                            <td className="rounded-l-md">
                                                <article className="bg-white-light py-6 rounded-l-md text-center px-6 -mx-1 my-1">
                                                    {i}
                                                </article>
                                            </td>
                                            <td className="flex items-center">
                                                <article className="bg-white-light flex items-center px-6 my-1 -mx-1 min-w-full">
                                                    <section className="bg-blue bg-opacity-30 w-12 h-12 rounded-md items-center justify-center flex mr-2">
                                                        <RiUser3Line size={30} color='black'/>
                                                    </section>

                                                    <article className="flex flex-col py-4">
                                                            <p className="font-medium text-md">{value.info.split('/')[0]}</p>
                                                            <p className="font-light text-xs text-brown">{value.info.split('/')[1]}</p>
                                                    </article>
                                                </article>
                                            </td>
                                            <td>
                                                <article className="bg-white-light py-6 text-center px-6 -mx-2 my-1">
                                                    {value.username}
                                                </article>
                                            </td>
                                            <td className="uppercase">
                                                <article className="bg-white-light py-6 text-left px-6 -mx-1 my-1">
                                                    {value.pricing}
                                                </article>
                                            </td>
                                            <td>
                                                <article className="bg-white-light py-6 text-center px-6 -mx-1 my-1">
                                                    {value.comments.length}
                                                </article>
                                            </td>
                                            <td>
                                                <article className="bg-white-light py-6 text-center px-6 -mx-1 my-1">
                                                    {value.reviews.length}
                                                </article>
                                            </td>
                                            <td className={`${value.status === 'approved' ? 'text-green' : 'text-red-dark'}`}>
                                                <article className="bg-white-light py-6 text-left px-6 -mx-1 my-1">
                                                    {value.status.toUpperCase()}
                                                </article>
                                            </td>
                                            <td>
                                                <article className="bg-white-light py-6 text-right px-6 -mx-1 my-1 ">
                                                    {value.creationDate.split(',')[0]}
                                                </article>
                                            </td>
                                            <td>
                                                <article className="bg-white-light py-6 px-4 rounded-r-md" onClick={() => {setId(value.username)}}>
                                                    {child}
                                                </article>
                                            </td>

                                            {/* comments */}
                                            {/* <td className="rounded-l-md">
                                                <article className="bg-white-light py-6 rounded-l-md text-center px-6 -mx-1 my-1">
                                                    {i}
                                                </article>
                                            </td>
                                            <td className="rounded-l-md">
                                                <article className="bg-white-light py-6 rounded-l-md text-center px-6 -mx-1 my-1 whitespace-nowrap">
                                                    {value.item}
                                                </article>
                                            </td>
                                            <td className="rounded-l-md">
                                                <article className="bg-white-light py-6 rounded-l-md text-center px-6 -mx-1 my-1">
                                                    {value.user}
                                                </article>
                                            </td>
                                            <td className="rounded-l-md">
                                                <article className="bg-white-light py-6 rounded-l-md text-left px-6 -mx-1 my-1 whitespace-nowrap">
                                                    {truncateString(value.comment, isXs ? 5 : isSm ? 20 : isMd ? 60 : isLg ? 85 : 100)}
                                                </article>
                                            </td>
                                            <td className="rounded-l-md">
                                                <article className="bg-white-light py-6 rounded-l-md text-center px-6 -mx-1 my-1">
                                                    {value.creationDate.split(',')[0]}
                                                </article>
                                            </td>
                                            <td>
                                                <article className="bg-white-light py-6 px-4 rounded-r-md" onClick={() => {setId(value.comment)}}>
                                                    {child}
                                                </article>
                                            </td> */}
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

