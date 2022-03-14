import { IconBaseProps } from "react-icons";

export interface INewItemsProps {
    title: string;
    count: string;
    icon: IconBaseProps
}

export const NewItems: React.FC<INewItemsProps> = ({ title, icon, count }) => {
    return (
        <>
            <div className="flex items-center pl-4 py-6 bg-white-light rounded-xl shadow-md">
                <div className="p-3 bg-blue rounded-lg">
                    {icon}
                </div>
                <div className="mx-4">
                    <h4 className="text-2xl font-semibold text-primary">{count}</h4>
                    <div className="text-primary">{title}</div>
                </div>
            </div>
        </>
    )
};