import { IconBaseProps } from "react-icons";
import { ScrollView } from "./ScrollView";
import { IPageType } from "../../../common/page";
import { SetStateAction, useState } from "react";
import { Pagination } from "./PaginationList";
import { CSVLink } from "react-csv";
import { AiOutlineDownload, AiOutlineSearch, AiOutlineUpload } from "react-icons/ai";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { ActivityIndicator } from "./ActivityIndicator";
import { Modal } from "./Modal";
import { DragAndDrop } from "./DragAndDrop";
import { uploadFile } from "../slices/file";
import { Form } from "./Form";
import { MdClose } from "react-icons/md";

interface IPageProps {
   title: string;
   total: string;
   header: string[];
   values: any[];
   icon: IconBaseProps;
   setId: React.Dispatch<React.SetStateAction<any>>;
   handleClick: () => void;
}

export const Page: React.FC<IPageProps> = ({ title, total, header, values, icon, setId, handleClick, children }) => {
    
    const tab: {[key: string]: IPageType} = {"comments": IPageType.COMMENT, "users": IPageType.USER, "reviews": IPageType.REVIEW, "movies": IPageType.ITEM};
    const tabFilter: {[key: string]: string} = {"comments": 'item', "users": 'name', "reviews": 'item', "movies": 'title'};
    const headers: {[key: string]: {key: string}} = {"created date": {key: 'creationDate'}, "basic info": {key: 'info'}, "author": {key: 'user'}, "text": {key: title.slice(0, -1).toLowerCase()}};
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [isLoading, setLoading] = useState<boolean>(false);
    const [file, setFile] = useState<File>();
    const [showModal, setShowModal] = useState(false);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const [filteredArray, setFilteredArray] = useState<typeof values>([...values]);
    let currentItems = filteredArray.slice(indexOfFirstItem, indexOfLastItem);
    const { valuesArr } = useAppSelector(state => state.file);
    const [onHover, setHover] = useState({'add': false, 'download': false, 'upload': false});
    const [toSearch, setSearch] = useState({name: ""});


    const dispatch = useAppDispatch();

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

    const paginateFront = () => setCurrentPage(currentPage + 1);
    const paginateBack = () => setCurrentPage(currentPage - 1);
    const paginate = (pageNumber: SetStateAction<number>) => setCurrentPage(pageNumber);

    /////        FONCTION A CHANGER        \\\\\
    const sortValues = async (head: string) => {
        if (head === 'rating') {
            setFilteredArray([...filteredArray.sort((a, b) => b.rating - a.rating)]) 
        } else if (head === 'created date') {
            setFilteredArray([...filteredArray.sort((a, b) => +new Date(b.creationDate) - +new Date(a.creationDate))]) 
        } else if (head === 'author') {
            setFilteredArray([...filteredArray.sort((a, b) => a.user < b.user ? -1 : 1)]) 
        } else if (head === 'item') {
            setFilteredArray([...filteredArray.sort((a, b) => a.item < b.item ? -1 : 1)]) 
        } else if (head === 'title') {
            setFilteredArray([...filteredArray.sort((a, b) => a.title < b.title ? -1 : 1)]) 
        } else if (head === 'category') {
            setFilteredArray([...filteredArray.sort((a, b) => a.category < b.category ? -1 : 1)]) 
        } else if (head === 'status') {
            setFilteredArray([...filteredArray.sort((a, b) => a.status < b.status ? -1 : 1)]) 
        } else if (head === 'views') {
            setFilteredArray([...filteredArray.sort((a, b) => b.views - a.views)]) 
        } else if (head === 'username') {
            setFilteredArray([...filteredArray.sort((a, b) => a.username < b.username ? -1 : 1)]) 
        } else if (head === 'pricing') {
            setFilteredArray([...filteredArray.sort((a, b) => a.pricing < b.pricing ? -1 : 1)]) 
        } else if (head === 'comments') {
            setFilteredArray([...filteredArray.sort((a, b) => a.comments > b.comments ? -1 : 1)]) 
        } else if (head === 'reviews') {
            setFilteredArray([...filteredArray.sort((a, b) => a.reviews > b.reviews ? -1 : 1)]) 
        } else if (head === 'basic info') {
            setFilteredArray([...filteredArray.sort((a, b) => a.name < b.name ? -1 : 1)]) 
        }
    };

    const handleOnChange = (e: any) => {
        const files = [...e.target.files];

        if (files.some((file) => file.name.toLowerCase().endsWith('.csv')) === false) {
            alert('Only following file format is acceptable: .csv');
            return;
        }
        setFile(e.target.files[0]);
    };

    const handleOnSubmit = async (e: any) => {
        e.preventDefault();
        setLoading(true);
        if (file) {
            await dispatch(uploadFile({file: file, type: tab[title.toLowerCase()]}));
            console.log(valuesArr);
            // await dispatch(createReviews({review: review}));
            // await dispatch(createUsers({user: obj}));
            // await dispatch(createMovies({movie: obj}));
        }
        setShowModal(false);
        setFile(undefined);
        setLoading(false);
    };

    const onUpload = (file: File) => {
        setFile(file);
        setShowModal(true);
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

    const searchType = (title: string) => {
        setFilteredArray(values.filter(i => i.name.toLowerCase().includes(title.toLowerCase())));
    }

    return (
        <>
            <Modal setShowModal={setShowModal} showModal={showModal} onApply={handleOnSubmit} buttons='go back/upload file' title="Upload a .csv file">
                <form>
                    <input
                        type={"file"}
                        id={"csvFileInput"}
                        accept={".csv"}
                        onChange={handleOnChange}
                        style={{ display: 'none' }}
                    />
                    <section className="bg-blue rounded-lg hover:bg-opacity-70 max-w-xs py-1 shadow-xs flex items-center justify-center">
                        <label htmlFor="csvFileInput" className="text-white uppercase font-semibold">{file?.name || 'Choose a file'}</label>
                    </section>
                </form>
            </Modal>
            <div className="flex flex-col mr-5 min-h-screen pb-5 dark:bg-primary">
                <section className="h-16 flex items-center justify-start flex-row mx-4 mt-2 pb-4 dark:text-white">
                    <h1 className="font-semibold text-3xl pr-2">{title}</h1>
                    <p className="font-light text-base pt-2 text-brown">{total} total</p>
                    <article className="ml-auto flex justify-center items-center space-x-2">
                        <article className='flex'>
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
                        <button className={`bg-white-light dark:bg-primary-light h-8 flex items-center justify-center rounded-lg w-8 shadow-md  ${onHover.upload && 'shadow-inner'}`} onMouseDownCapture={() => handleChangeButton('upload', true)} onMouseLeave={() => handleChangeButton('upload', false)} onClick={() => {setShowModal(true); setFile(undefined);}}>
                            <AiOutlineUpload size={20}/>
                        </button>
                    </article>
                </section>
                {isLoading ? (
                    <ActivityIndicator/>
                )
                : (
                    <section className="border-t mx-4 px-4">
                        <DragAndDrop onUpload={onUpload}/>
                        <ScrollView sortValues={sortValues} header={header} body={currentItems} child={children} setId={setId} type={tab[title.toLowerCase()]} currentPage={currentPage} itemsPerPage={itemsPerPage}/>
                        {/* <Pagination
                            itemsPerPage={itemsPerPage}
                            totalItems={values.length}
                            paginateBack={paginateBack}
                            paginateFront={paginateFront}
                            currentPage={currentPage}
                        /> */}
                        {values.length !== 0 && (
                            <Pagination
                            itemsPerPage={itemsPerPage}
                            totalItems={filteredArray.length}
                            paginate={paginate}
                            currentPage={currentPage}
                            />
                        )}
                    </section>
                )}
            </div>
        </>
    )
}