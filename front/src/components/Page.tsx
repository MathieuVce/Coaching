import { IconBaseProps } from "react-icons";
import { ScrollView } from "./ScrollView";
import { IMovie, IPageType, IUser } from "../../../common/page";
import { SetStateAction, useState } from "react";
import { Pagination } from "./PaginationList";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { ActivityIndicator } from "./ActivityIndicator";
import { Modal } from "./Modal";
import { DragAndDrop } from "./DragAndDrop";
import { uploadFile } from "../slices/file";
import { ICreateComment, ICreateReview } from "../../../common/info";
import { createComments, createReviews, createUsers, createMovies } from "../slices/info";
import { RightHeader } from "./RightHeader";
import { sortBy } from "../utils/Utils";

interface IPageProps {
    title: string;
    total: string;
    header: string[];
    values: any[];
    icon: IconBaseProps;
    setId: React.Dispatch<React.SetStateAction<any>>;
    handleClick: () => void;
    fetchInfo: () => Promise<void>
}

export const Page: React.FC<IPageProps> = ({ title, total, header, values, icon, setId, handleClick, fetchInfo, children }) => {
    const tab: {[key: string]: IPageType} = {"comments": IPageType.COMMENT, "users": IPageType.USER, "reviews": IPageType.REVIEW, "movies": IPageType.ITEM};
    const [sortName, setSortName] = useState<string>("ID");
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

    const dispatch = useAppDispatch();

    // const paginateFront = () => setCurrentPage(currentPage + 1);
    // const paginateBack = () => setCurrentPage(currentPage - 1);
    const paginate = (pageNumber: SetStateAction<number>) => setCurrentPage(pageNumber);

    //            date not filtered
    const sortValues = async (head: string) => {
        const toSortAsc = ["toSortAsc", ['item', 'title', 'category', 'status', 'username', 'pricing', 'basic info']];
        const toSortDesc = ["toSortDesc", ['views', 'rating']];
        const toSortMinus = ["toSortMinus", ['comments', 'reviews']];
        const toSort = [toSortAsc, toSortDesc, toSortMinus];

        toSort.map((array) => {
            if (array[1].includes(head)) {
                setFilteredArray([...filteredArray.sort((a, b) => sortBy[array[0].toString()](a,b,head))]);
                setSortName(head);
            }
        })
        if (sortBy.hasOwnProperty(head) && typeof(sortBy[head]) === 'function')  {
            setFilteredArray([...filteredArray.sort((a, b) => sortBy[head](a,b))]);
            setSortName(head);
        } else
            return;
    };

    const handleOnChange = (e: any) => {
        const files = [...e.target.files];

        if (files.some((file) => file.name.toLowerCase().endsWith('.csv')) === false) {
            alert('Only following file format is acceptable: .csv');
            return;
        }
        setFile(e.target.files[0]);
    };
    
    const createInfo = async (callback: string) => {
        const callbackList: {[key: string]: Function} = {
            'movies': async function createUser(movie: IMovie[]) {
                for (let i = 0; i < movie.length; i++) {
                    await dispatch(createMovies({movie: movie[i]}));
                }
            },
            'comments': async function createComment(comment: ICreateComment[]) {
                for (let i = 0; i < comment.length; i++) {
                    await dispatch(createComments({comment: comment[i]}));
                }
            },
              'reviews': async function createReview(review: ICreateReview[]) {
                for (let i = 0; i < review.length; i++) {
                    await dispatch(createReviews({review: review[i]}));
                }
            },
              'users': async function createUser(user: IUser[]) {
                for (let i = 0; i < user.length; i++) {
                    await dispatch(createUsers({user: user[i]}));
                }
            },
        } 

        if (callbackList.hasOwnProperty(callback) && typeof(callbackList[callback]) === 'function')  {
            await callbackList[callback](valuesArr);
            await fetchInfo();
        }
    };

    const handleOnSubmit = async (e: any) => {
        e.preventDefault();
        setLoading(true);
        if (file) {
            await dispatch(uploadFile({file: file, type: tab[title.toLowerCase()]}));
            console.log(valuesArr, 'la liste des valeurs');
            //valuesarr not update on time
            await createInfo(title.toLowerCase());
            await fetchInfo();
        }
        setShowModal(false);
        setFile(undefined);
        setLoading(false);
    };

    const onUpload = (file: File) => {
        setFile(file);
        setShowModal(true);
    };

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
            <div className="flex flex-col mr-5 w-full pb-5 dark:bg-primary">
                <section className="h-16 flex items-center justify-start flex-row mx-4 mt-2 pb-4 dark:text-white">
                    <h1 className="font-semibold text-3xl pr-2">{title}</h1>
                    <p className="font-light text-base pt-2 text-brown whitespace-nowrap">{total} total</p>
                    <RightHeader sortName={sortName} title={title} handleClick={handleClick} icon={icon} header={header} values={values} setFilteredArray={setFilteredArray} handleUpload={() => {setShowModal(true);setFile(undefined);}} />
                </section>
                {isLoading ? (
                    <ActivityIndicator/>
                )
                : (
                    <section className="border-t border-t-blue-light dark:border-t-primary-light mx-4 px-4">
                        <DragAndDrop onUpload={onUpload}/>
                        <ScrollView sortValues={sortValues} header={header} body={currentItems} child={children} setId={setId} type={tab[title.toLowerCase()]} currentPage={currentPage} itemsPerPage={itemsPerPage}/>
                        {/* <Pagination
                            itemsPerPage={itemsPerPage}
                            totalItems={filteredArray.length}
                            paginateBack={paginateBack}
                            paginateFront={paginateFront}
                            currentPage={currentPage}
                        /> */}
                        {filteredArray.length !== 0 && (
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