import { useMemo, useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { RiUser3Line } from "react-icons/ri";
import { headTableStyle, truncateString, useBreakpoints } from "../utils/Utils";

export interface IScrollViewProps {
    header: string[];
    body: string[];
    child: React.ReactNode;
}

export const ScrollView: React.FC<IScrollViewProps> = ({ header, body, child }) => {

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
                                    <th className="pl-5 before:py-4 text-left text-sm font-light uppercase text-brown tracking-wider" key={i}>{value}</th> 
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
                                            <section className={`flex min-w-max -mx-1 items-center px-6 leading-4 bg-white-light my-1 ${i == 0 ? 'rounded-l-xl' : 'rounded-none'}`}>
                                                {header[i] === 'basic info' ? (
                                                    <article className="flex items-center">
                                                        <section className="bg-blue bg-opacity-30 w-12 h-12 rounded-md items-center justify-center flex mr-2">
                                                            <RiUser3Line size={30} color='black'/>
                                                        </section>

                                                        <article className="flex flex-col py-4">
                                                                <p className="font-medium text-md">{value.split('/')[0]}</p>
                                                                <p className="font-light text-xs text-brown">{value.split('/')[1]}</p>
                                                        </article>
                                                    </article>
                                                ) : 
                                                    <p className={`${value === 'APPROVED' ? 'text-green' : value === 'BANNED' ? 'text-red' : 'text-primary'} py-6 font-medium text-md`}>
                                                        {header[i] === 'text' ? (truncateString(value, isXs ? 5 : isSm ? 20 : isMd ? 60 : isLg ? 85 : 100)) : value}
                                                    </p>
                                                }
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
                                    <section className="px-5 py-5 bg-white-light text-sm rounded-r-xl">
                                        {child}
                                    </section>

                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

