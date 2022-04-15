import { IconBaseProps } from "react-icons";
import { ScrollView } from "./ScrollView";


import { IComment, IUser } from "../../../common/page";

export interface IPageProps {
   title: string;
   total: string;
   header: string[];
   values: any[];
   icon: IconBaseProps;
   setId: React.Dispatch<React.SetStateAction<string | undefined>>;
   handleClick: () => void;
}

export const Page: React.FC<IPageProps> = ({ title, total, header, values, icon, setId, handleClick, children }) => {
    
    return (
        <>
            <div className="h-screen  flex flex-col">
                <section className="h-16 flex items-center justify-start flex-row mx-4 mt-2 pb-4">
                    <h1 className="font-semibold text-3xl pr-2">{title}</h1>
                    <p className="font-light text-base pt-2 text-brown">{total} total</p>
                    <article className="ml-auto pr-5">
                        <button className="bg-white-light h-8 flex items-center justify-center rounded-lg w-8" onClick={handleClick}>
                            {icon}
                        </button>
                    </article>
                </section>
                <section className="border-t mx-4 px-4">
                    <ScrollView header={header} body={values} child={children} setId={setId}/>
                </section>
            </div>
        </>
    )
}