import { IconBaseProps } from "react-icons";

export interface INewItemsProps {
    title: string;
    count: string;
    icon: IconBaseProps
}

export const NewItems: React.FC<INewItemsProps> = ({ title, icon, count }) => {
    return (
        <>
            <div className="flex w-full py-3 bg-white-light dark:bg-primary-light overflow-x-hidden rounded-xl shadow-md">
                <div className="flex flex-row w-full justify-between">
                    <div className="pl-3 flex flex-col justify-start">
                        <div>
                            <label className="text-primary dark:text-white text-sm">{title}</label>
                        </div>
                        <div>
                            <h4 className="text-2xl font-semibold text-primary dark:text-white">{count}</h4>
                        </div>
                    </div>
                    <div className="flex items-end mr-2">
                        {icon}
                    </div>
                </div>
            </div>
        </>
    )
};