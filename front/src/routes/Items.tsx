import { useState, useEffect } from "react";
import { AiOutlinePlusCircle, AiOutlineLock } from "react-icons/ai";
import { BiTrash } from "react-icons/bi";
import { IMovie } from "../../../common/page";
import { ActivityIndicator } from "../components/ActivityIndicator";
import { Dropdown } from "../components/Dropdown";
import { Form } from "../components/Form";
import { Modal } from "../components/Modal";
import { Page } from "../components/Page";
import { createMovies, getMovies, deleteMovies, updateMovies } from "../slices/info";
import { useAppSelector, useAppDispatch } from "../store/hooks";


const Items: React.FunctionComponent = () => {
    const header = ['id', 'title', 'rating', 'category', 'views', 'status', 'created date', 'actions'];
    const [movieId, setMovieId] = useState<IMovie>();
    const [isLoading, setLoading] = useState<boolean>(true);
    const [showModal, setShowModal] = useState(false);
    const [toDelete, setDelete] = useState(false);
    const [createMovieModal, setCreateMovieModal] = useState(false);
    const [movie, setMovie] = useState({title: ""});
    const [final, setFinal] = useState<string>('category');
    const category = ['MOVIE', 'TV SHOW', 'CARTOON', 'ANIME', 'COMIC',];
    const { movies, users } = useAppSelector(state => state.info);

    const dispatch = useAppDispatch();

    useEffect(() => {
        setLoading(true);
        fetchMovies();
    }, []);

    const handleChange = (prop: keyof typeof movie, value: string) => {
        setMovie({
            ...movie,
            [prop]: value
        });
    };

    const handleCreateMovie = async () => {
        if (movie.title && final !== 'category') {
            setCreateMovieModal(false);
            setLoading(true);

            const obj = {
                ...movie,
                rating: Math.floor(Math.random() * 11),
                views: Math.floor(Math.random() * (users.length + 1)),
                category: final,
                status: true,
                creationDate: new Date().toLocaleString()
            }
            await dispatch(createMovies({movie: obj}))
            await fetchMovies();
        }
    }
    
    const fetchMovies = async () => {
        await dispatch(getMovies());
        setLoading(false);
    }

    const handleAction = async () => {
        setShowModal(false);
        setLoading(true);
        const obj = {what: movieId?.title!}

        await dispatch(toDelete ? deleteMovies(obj) : updateMovies(obj));

        await fetchMovies();
    }

    const handleClick = () => {
        setMovie({title: ""});
        setFinal("category");
        setCreateMovieModal(true);
    }

    return(
        <>
            <Modal setShowModal={setCreateMovieModal} showModal={createMovieModal} buttons='cancel/add movie' onApply={handleCreateMovie} title="Add a movie">
                <Form name="Title" type='text' placeholder='Enter title' onChange={(e) => {handleChange('title', e.target.value)}} value={movie.title}/>
                <Dropdown color="bg-blue" display={final} setDisplay={setFinal} title='Category' values={category}/>
            </Modal>
            <Modal setShowModal={setShowModal} showModal={showModal} onApply={handleAction} buttons='no/confirm' title={toDelete ? "Delete movie" : "Change status"}>
                <div className="dark:text-white">
                    {toDelete ? "Are you sure you want to delete this movie?" : "Are you sure you want to change the status of this movie?"}
                </div>
            </Modal>
            {isLoading ? (
                <ActivityIndicator/>
            )
            :
                <Page fetchInfo={() => fetchMovies()} title={'Movies'} total={movies.length.toString()} values={movies} header={header} icon={<AiOutlinePlusCircle size={20}/>} setId={setMovieId} handleClick={handleClick}>
                    <div className="flex items-center space-x-5 justify-center"> 
                        <button className="bg-green-light h-6 flex items-center justify-center bg-opacity-20 rounded-lg w-6 shadow-xs" onClick={() => {setDelete(false); setShowModal(true)}}>
                            <AiOutlineLock size={18} className='text-green-darker'/>
                        </button>
                        <button className="bg-red-light h-6 flex items-center bg-opacity-20 rounded-lg w-6 justify-center shadow-xs" onClick={() => {setDelete(true); setShowModal(true)}}>
                            <BiTrash size={18} className='text-red-dark dark:text-red'/>
                        </button>
                    </div>
                </Page>
            }
        </>
    );
};

export default Items
