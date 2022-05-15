import { SetStateAction, useState } from "react";
import { CSVLink } from "react-csv";
import { IconBaseProps } from "react-icons";
import { AiOutlineDownload, AiOutlineSearch, AiOutlineUpload } from "react-icons/ai";
import { MdClose } from "react-icons/md";


interface IRightHeaderProps {
    sortName: string;
    title: string;
    handleClick: () => void;
    icon: IconBaseProps;
    header: string[];
    values: any[];
    setFilteredArray: React.Dispatch<SetStateAction<any[]>>;
    handleUpload: () => void;
 }
 
 
 export const RightHeader: React.FC<IRightHeaderProps> = ({ sortName, title, handleClick, icon, header, values, setFilteredArray, handleUpload }) => {
    const headers: {[key: string]: {key: string}} = {"created date": {key: 'creationDate'}, "basic info": {key: 'info'}, "author": {key: 'user'}, "text": {key: title.slice(0, -1).toLowerCase()}};
    const tabFilter: {[key: string]: string} = {"comments": 'item', "users": 'name', "reviews": 'item', "movies": 'title'};
    const [onHover, setHover] = useState({'add': false, 'download': false, 'upload': false});
    const [toSearch, setSearch] = useState({name: ""});
    const csvReport = {
        data: values,
        headers: header.slice(1,-1).map((value) => {
            if (value in headers) {
                return {
                    label: value, key: headers[value].key,
                }
            } else {
                return {
                    label: value, key: value,
                }
            }
        }),
        filename: `${title}.csv`
    };

    const handleChangeButton = (prop: keyof typeof onHover, value: boolean) => {
        setHover({
            ...onHover,
            [prop]: value
        });
    };

    const handleChange = (prop: keyof typeof toSearch, value: string) => {
        setSearch({
            ...toSearch,
            [prop]: value
        });
        searchType(value);
    };

    const searchType = (value: string) => {
        setFilteredArray(values.filter(i => i[tabFilter[title.toLowerCase()]].toLowerCase().includes(value.toLowerCase())));
    }

   return (
     <>
        <article className="ml-auto flex justify-center items-center space-x-2">
            <article className='flex'>
                {sortName && (
                    <label className="px-6 py-1 text-brown font-light whitespace-nowrap">Sorted by: {sortName.toUpperCase()}</label>
                )}
                <input
                    value={toSearch.name}
                    onChange={(e) => {handleChange('name', e.target.value)}}
                    type='text'
                    placeholder={`Find a ${title.toLowerCase().slice(0, -1)}...`}
                    className="px-3 py-1 outline-none rounded-3xl dark:bg-primary-light dark:text-white bg-white-light" 
                    maxLength={20}
                />
                {toSearch.name ? (
                    <button type="button" className="translate-y -translate-x-8" onClick={() => handleChange('name', '')}>
                        <MdClose size={20}/>
                    </button>
                    ) : (
                    <AiOutlineSearch size={20} className='translate-y-1.5 -translate-x-8'/>
                )}
            </article>
            <button className={`bg-white-light dark:bg-primary-light h-8 flex items-center justify-center rounded-lg w-8 shadow-md ${onHover.add && 'shadow-inner'}`} onMouseDownCapture={() => handleChangeButton('add', true)} onMouseLeave={() => handleChangeButton('add', false)} onClick={handleClick}>
                {icon}
            </button>
            <CSVLink {...csvReport} className={`bg-white-light dark:bg-primary-light h-8 w-8 rounded-lg flex items-center justify-center shadow-md  ${onHover.download && 'shadow-inner'}`} onMouseDownCapture={() => handleChangeButton('download', true)} onMouseLeave={() => handleChangeButton('download', false)} separator={";"}>
                <AiOutlineDownload size={20}/>
            </CSVLink>
            <button className={`bg-white-light dark:bg-primary-light h-8 flex items-center justify-center rounded-lg w-8 shadow-md  ${onHover.upload && 'shadow-inner'}`} onMouseDownCapture={() => handleChangeButton('upload', true)} onMouseLeave={() => handleChangeButton('upload', false)} onClick={handleUpload}>
                <AiOutlineUpload size={20}/>
            </button>
        </article>
     </>
   );
 };