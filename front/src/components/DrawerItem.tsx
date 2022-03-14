import { IconBaseProps, IconType } from "react-icons";

export interface IDrawerProps {
    title: string;
    isSelected: boolean;
    selectedIcon: IconBaseProps;
    outlineIcon: IconBaseProps;
}


export const Drawer: React.FC<IDrawerProps> = ({isSelected, title, selectedIcon, outlineIcon}) => {
    const selected = isSelected ? "mb-2 bg-blue rounded shadow" : "mb-2 rounded hover:shadow hover:bg-blue"

    return (
        <>
            <li className={selected}>
                <div className="inline-block w-full h-full px-3 py-2 font-bold text-primary pt-3.5">
                    <div className="inline-block w-5 h-8 mr-5 align-middle">
                        {isSelected ?
                            selectedIcon
                        :
                            outlineIcon
                        }
                    </div>
                    {title}
                </div>
            </li>
        </>
    );
};