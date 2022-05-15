import { IconBaseProps } from "react-icons";
import { useLocation, useNavigate } from "react-router-dom";

export interface IDrawerProps {
    title: string;
    selectedIcon: IconBaseProps;
    outlineIcon: IconBaseProps;
}


export const Drawer: React.FC<IDrawerProps> = ({ title, selectedIcon, outlineIcon }) => {

    const navigate = useNavigate();
    const location = useLocation();
    const isSelected = location.pathname.split('/')[2] === title.toLowerCase()
    const selectedStyle = isSelected ? "mb-2 bg-blue bg-opacity-60 rounded shadow font-bold" : "mb-2 rounded hover:shadow hover:bg-blue hover:font-bold hover:bg-opacity-20"

    return (
        <>
            <li className={selectedStyle} onClick={() => { navigate(title.toLowerCase())}}>
                <div className="inline-block w-full h-full px-3 py-2 text-primary pt-3.5">
                    <div className="inline-block w-5 h-8 mr-5 align-middle text-primary dark:text-white">
                        {isSelected ?
                            selectedIcon
                        :
                            outlineIcon
                        }
                    </div>
                    <label className="text-primary dark:text-white">
                        {title}
                    </label>
                </div>
            </li>
        </>
    );
};