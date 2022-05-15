import { useState } from "react";
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

    return (
        <>
            <div className="py-4">
                <div className="inline-block min-w-full">
                    <table className="min-w-full leading-normal">
                        <thead>
                            <tr>
                            {header?.map((value, i) => {
                                return (
                                    <th className="px-4" key={i}>
                                        <button onClick={() => {}} className="text-left text-sm font-light uppercase text-brown tracking-wider whitespace-nowrap hover:underline">
                                            {value}
                                        </button>
                                    </th> 
                                    )
                            })}
                            </tr>
                        </thead>
                        <tbody>
                            {body?.map((value, i) => {
                                return (
                                    <tr key={i}>
                                        <td className="rounded-l-md">
                                            <article className="bg-white-light py-6 rounded-l-md text-center px-6 -mx-1 my-1">
                                                {(currentPage * itemsPerPage - (itemsPerPage - 1)) + i}
                                            </article>
                                        </td>
                                        {type == IPageType.USER && (
                                            <>
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
                                                {Object.keys(value).map((key, index, {length}) => {
                                                    if ( index > 2 && index < length) {
                                                        return (
                                                            <td key={index}>
                                                                <article className={`${(value.status === 'APPROVED' && key == 'status') ? 'text-green' : (value.status === 'BANNED' && key == 'status') ? 'text-red-dark' : 'text-primary'} bg-white-light py-6 text-center px-6 -mx-2 my-1`}>
                                                                    {value[key]}
                                                                </article>
                                                            </td>
                                                        )
                                                    }
                                                })}
                                            </>
                                        )}
                                        {type == IPageType.ITEM && (
                                            <>
                                                {Object.keys(value).map((key, index) => {
                                                    return (
                                                        <td key={index}>
                                                            <article className={`${(value.status === 'VISIBLE' && key == 'status') ? 'text-green' : (value.status === 'HIDDEN' && key == 'status') ? 'text-red-dark' : 'text-primary'} bg-white-light py-6 flex items-center justify-center whitespace-nowrap px-6 -mx-1 my-1`}>
                                                                {value[key]}
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
                                        {(type == IPageType.REVIEW || type == IPageType.COMMENT) && (
                                            <>
                                                {Object.keys(value).map((key, index, {length}) => {
                                                    if (length - 1 !== index) {
                                                            return (
                                                                <td className="rounded-l-md" key={index}>
                                                                    <article className="bg-white-light py-6 rounded-l-md text-center px-6 -mx-1 my-1 whitespace-nowrap flex items-center">
                                                                        {(key === 'review' || key === 'comment') ? (
                                                                            truncateString(value[key], isXs ? 5 : isSm ? 20 : isMd ? 60 : isLg ? 85 : 100)
                                                                        ) : key == 'creationDate' ? (
                                                                            value[key].split(',')[0]
                                                                        ) : (
                                                                            value[key] || '--no user--'
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
                                            <article className="bg-white-light py-6 px-4 rounded-r-md" onClick={() => {setId(value)}}>
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

