import { AiFillStar } from "react-icons/ai";
import { RiUser3Line } from "react-icons/ri";
import { IPageType } from "../../../common/page";
import { truncateString, useBreakpoints } from "../utils/Utils";

export interface IScrollViewProps {
    type : IPageType
    header: string[];
    body: any[];
    child: React.ReactNode;
    setId: React.Dispatch<React.SetStateAction<any>>;
    currentPage: number;
    itemsPerPage: number;
    sortValues: (head: string) => void
}

export const ScrollView: React.FC<IScrollViewProps> = ({ header, body, setId, type, child, itemsPerPage, currentPage, sortValues }) => {

    const {isXs, isSm, isMd, isLg} = useBreakpoints();
    const toSort = header.filter(item => !['id', 'text', 'actions'].includes(item));

    return (
        <>
            {/* <div className="col-span-full xl:col-span-6 bg-white shadow-lg rounded-sm border border-slate-200">
                <div className="overflow-x-scroll">
                    <table className="table-auto w-full">
                        <thead className="text-xs font-semibold uppercase text-slate-400 bg-slate-50">
                            <tr>
                                <th className="p-2 whitespace-nowrap">
                                    <div className="font-semibold text-left">Name</div>
                                </th>
                                <th className="p-2 whitespace-nowrap">
                                    <div className="font-semibold text-left">Email</div>
                                </th>
                                <th className="p-2 whitespace-nowrap">
                                    <div className="font-semibold text-left">Spent</div>
                                </th>
                                <th className="p-2 whitespace-nowrap">
                                    <div className="font-semibold text-center">Country</div>
                                </th> 
                                {header?.map((value, i) => {
                                    if (value !== 'title' || type === IPageType.ITEM) {
                                        return (
                                            <th className="p-2 whitespace-nowrap" key={i}>
                                                <button onClick={() => {sortValues(header[i])}} className={`text-left text-sm font-light uppercase text-brown tracking-wider ${toSort.includes(header[i]) ? 'hover:underline' : 'cursor-default'}`}>
                                                    {value}
                                                </button>
                                            </th> 
                                        )
                                    }
                                })}
                            </tr>
                        </thead>
                        <tbody className="text-sm divide-y divide-slate-100">
                            <tr>
                                <td className="p-2 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="w-10 h-10 shrink-0 mr-2 sm:mr-3">
                                        </div>
                                        <div className="font-medium text-slate-800">Alex Shatov</div>
                                    </div>
                                </td>
                                <td className="p-2 whitespace-nowrap">
                                    <div className="text-left">alexshatov@gmail.com</div>
                                </td>
                                <td className="p-2 whitespace-nowrap">
                                    <div className="text-left font-medium text-green-500">$2,890.66</div>
                                </td>
                                <td className="p-2 whitespace-nowrap">
                                    <div className="text-lg text-center">🇺🇸</div>
                                </td>
                            </tr>

                        </tbody>
                    </table>
                </div>
            </div> */}

            <div className="py-4 flex flex-grow">
                <div className="inline-block">
                    <table className="w-full leading-normal table-fixed ">
                        <thead>
                            <tr>
                            {header?.map((value, i) => {
                                if (value !== 'title' || type === IPageType.ITEM) {
                                    return (
                                        <th className="px-4" key={i}>
                                            <button onClick={() => {sortValues(header[i])}} className={`text-left text-xs font-light uppercase text-brown tracking-wider whitespace-nowrap ${toSort.includes(header[i]) ? 'hover:underline' : 'cursor-default'}`}>
                                                {value}
                                            </button>
                                        </th> 
                                    )
                                }
                            })}
                            </tr>
                        </thead>
                        <tbody>
                            {body?.map((value, i) => {
                                return (
                                    <tr key={i}>
                                        <td className="rounded-l-md">
                                            <article className="bg-white-light dark:bg-primary-light dark:text-white py-6 rounded-l-md text-center -mx-1 my-1">
                                                {(currentPage * itemsPerPage - (itemsPerPage - 1)) + i}
                                            </article>
                                        </td>
                                        {type === IPageType.USER && (
                                            <>
                                                <td className="flex items-center">
                                                    <article className="bg-white-light dark:bg-primary-light dark:text-white-light flex items-center px-6 my-1 -ml-10 min-w-full">
                                                        <section className="bg-blue bg-opacity-30 dark:bg-opacity-70 w-12 h-12 rounded-md items-center justify-center flex mr-2 dark:text-white">
                                                            <RiUser3Line size={30}/>
                                                        </section>

                                                        <article className="flex flex-col py-4">
                                                                <p className="font-medium text-md">{value.info.split('/')[0]}</p>
                                                                <p className="font-light text-xs text-brown">{value.info.split('/')[1]}</p>
                                                        </article>
                                                    </article>
                                                </td>
                                                {Object.keys(value).map((key, index, {length}) => {
                                                    if ( index > 2 && index < length) {
                                                        return (
                                                            <td key={index}>
                                                                <article className={`${(value.status === 'APPROVED' && key == 'status') ? 'text-green-darker' : (value.status === 'BANNED' && key == 'status') ? 'text-red' : 'text-primary dark:text-white-light'} bg-white-light dark:bg-primary-light py-6 text-center text-sm px-6 -mx-2 my-1`}>
                                                                    {value[key]}
                                                                </article>
                                                            </td>
                                                        )
                                                    }
                                                })}
                                            </>
                                        )}
                                        {type === IPageType.ITEM && (
                                            <>
                                                {Object.keys(value).map((key, index) => {
                                                    return (
                                                        <td key={index}>
                                                            <article className={`${(value.status === 'VISIBLE' && key == 'status') ? 'text-green-darker' : (value.status === 'HIDDEN' && key == 'status') ? 'text-red' : 'text-primary dark:text-white-light'} bg-white-light dark:bg-primary-light py-6 flex items-center justify-center whitespace-nowrap px-6 -mx-1 my-1`}>
                                                                {(key === 'title') ? (
                                                                    truncateString(value[key], isXs ? 5 : isSm ? 8 : isMd ? 10 : isLg ? 13 : 15)
                                                                ) : (
                                                                    value[key]
                                                                )}
                                                                {key == 'rating' && (
                                                                    <article className="pl-1">
                                                                        <AiFillStar size={20} color="#0AC5CD"/>
                                                                    </article>
                                                                )}
                                                            </article>
                                                        </td>
                                                    )
                                                })}
                                            </>
                                        )}
                                        {(type === IPageType.REVIEW || type == IPageType.COMMENT) && (
                                            <>
                                                {Object.keys(value).map((key, index, {length}) => {
                                                    if (length - 1 !== index) {
                                                            return (
                                                                <td className="rounded-l-md" key={index}>
                                                                    <article className="bg-white-light dark:bg-primary-light dark:text-white-light py-6 rounded-l-md text-center justify-center px-6 -mx-1 my-1 whitespace-nowrap flex items-center">
                                                                        {(key === 'review' || key === 'comment' || key === 'author' || key === 'item') ? (
                                                                            truncateString(value[key] || '--no info--', isXs ? 5 : isSm ? 8 : isMd ? 10 : isLg ? 13 : 15)
                                                                        ) : key == 'creationDate' ? (
                                                                            value[key].split(',')[0]
                                                                        ) : (
                                                                            value[key] || '--no info--'
                                                                        )}
                                                                        {key == 'rating' && (
                                                                            <article className="pl-1">
                                                                                <AiFillStar size={20} color="#0AC5CD"/>
                                                                            </article>
                                                                        )}
                                                                    </article>
                                                                </td>
                                                            );
                                                        }
                                                    }
                                                )}
                                            </>
                                        )}
                                         <td>
                                            <article className="bg-white-light dark:bg-primary-light dark:text-white-light py-6 px-4 rounded-r-md" onClick={() => {setId(value)}}>
                                                {child}
                                            </article>
                                        </td>
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

