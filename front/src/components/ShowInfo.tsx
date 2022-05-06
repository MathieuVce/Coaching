import { AiFillStar } from "react-icons/ai";
import { RiUser3Line } from "react-icons/ri";
import { IPageType, IUser } from "../../../common/page";

interface IShowInfoProps {
    title: string;
    type: IPageType;
    creationDate: string;
    rating?: number;
    text: string;
    user: string;
}


export const ShowInfo: React.FC<IShowInfoProps> = ({ title, type, creationDate, rating, text, user }) => {
    return (
        <>
        <article className="flex items-center my-1 -mx-1 min-w-full">
            <section className="bg-blue bg-opacity-30 dark:bg-opacity-70 w-12 h-12 rounded-md items-center justify-center flex mr-2 dark:text-white">
                <RiUser3Line size={30}/>
            </section>

            <article className="flex flex-col py-4 space-y-1 dark:text-white">
                    <p className="font-medium text-md">{title}</p>
                    <p className="font-medium text-xs text-brown">{creationDate.split(':').slice(0, -1).join(':').replaceAll('/','.')} by <span className="font-semibold text-sm text-primary">{user}</span></p>
            </article>
            {type === IPageType.REVIEW && (   
                <article className="ml-auto">
                    <section className="flex font-bold items-center dark:text-white">
                        {rating}
                        <article className="pl-1">
                            <AiFillStar size={20} color="#0AC5CD"/>
                        </article>
                    </section>
                </article>
            )}
        </article>
        <article className="border-t border-t-brown pt-4 whitespace-pre-wrap dark:text-white break-all">
            {text}
        </article>
        </>
    );
  };