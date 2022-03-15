import { IconBaseProps } from "react-icons";

export interface INewItemsProps {
    title: string;
    count: string;
    icon: IconBaseProps
}

export const NewItems: React.FC<INewItemsProps> = ({ title, icon, count }) => {
    return (
        <>
            <div className="flex w-full items-center pl-4 py-3 bg-white-light rounded-xl shadow-md">
                <div className="mx-4 w-2/3">
                    <label className="text-primary">{title}</label>
                    <h4 className="text-2xl font-semibold text-primary">{count}</h4>
                </div>
                <div className="p-3">
                    {icon}
                </div>
            </div>
        </>
    )
};