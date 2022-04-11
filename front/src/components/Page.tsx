import { ScrollView } from "./ScrollView";

export interface IPageProps {
   title: string;
   total: string;
   header: string[];
   values: string[];
}

export const Page: React.FC<IPageProps> = ({ title, total, header, values, children }) => {
    
    return (
        <>
            <div className="h-screen  flex flex-col">
                <section className="h-16 flex items-center justify-start flex-row mx-4 mt-2 pb-4">
                    <h1 className="font-semibold text-3xl pr-2">{title}</h1>
                    <p className="font-light text-base pt-2 text-brown">{total} total</p>
                </section>
                <section className="border-t mx-4 px-4 overflow-scroll">
                    <ScrollView header={header} body={values} child={children}/>
                </section>
            </div>
        </>
    )
}