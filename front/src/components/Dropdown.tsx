import { MouseEventHandler, useState } from "react";

interface IDropdownProps {
    title: string;
    values: string[];
    color: string;
    display: string;
    setDisplay: React.Dispatch<React.SetStateAction<string>>;
}


export const Dropdown: React.FC<IDropdownProps> = ({ title, color, values, display, setDisplay}) => {

    return (
        <div className="group inline-block">
            <label className="block py-1">
                {title}
            </label>
            <button className="outline-none focus:outline-none border px-3 py-2 bg-white rounded-md flex items-center w-72">
                <span className={`pr-1 font-sm flex-1 ${display === 'pricing' && 'text-brown'}`}>{display.toUpperCase()}</span>
                <span>
                    <svg
                        className="fill-current h-4 w-4 transform group-hover:-rotate-180
                        transition duration-150 ease-in-out"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                    >
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                    </svg>
                </span>
            </button>
            <ul className="bg-white border-b border-r border-l rounded-bl-lg rounded-br-lg transform scale-0 group-hover:scale-100 absolute w-72 transition duration-150 ease-in-out origin-top">
                {values.map((value, index) => (
                    <li key={index} className={`rounded-sm px-3 py-1 hover:${color} hover:bg-opacity-60 `} onClick={() => {setDisplay(value)}}>
                        <span className="font-sm">{value.toUpperCase()}</span>
                    </li>
                ))}                                       
            </ul>
        </div>
    );
}
