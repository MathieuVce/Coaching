import { RootState, useSelector } from "../store/storee";
import { logout } from "../slices/auth";
import { useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { useAlert } from 'react-alert'
import { MdClose, MdDashboardCustomize, MdOutlineDashboardCustomize } from "react-icons/md"
import { AiFillHome, AiFillStar, AiOutlineHome, AiOutlineStar } from "react-icons/ai";
import { RiUser3Line, RiUser3Fill } from "react-icons/ri";
import { FaRegCommentDots,  } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { FaCommentDots } from "react-icons/fa";
import { Drawer } from "../components/DrawerItem";
import { GiHamburgerMenu } from "react-icons/gi";
import { useEffect, useState } from "react";
import longlogo2 from "../assets/longlogo2.svg"
import longlogo3 from "../assets/longlogo3.svg"



const Home: React.FunctionComponent = () => {

    const { user } = useSelector((state: RootState) => state.auth);
    const [mode, setMode] = useState<"light" | "dark" | undefined>(
        window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? "dark" :"light"
    );
    const [navbarOpen, setNavbarOpen] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const alert = useAlert()

    const handleLogout = () => {
        dispatch(logout())
            // alert.success(
            //     <label className='text-blue'>Successfully logged out</label>
            // )
        navigate("/login")
    };

    useEffect(() => {
        const modeMe = (e: any) => {
          setMode(e.matches ? "dark" : "light");
        }  
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', modeMe);
        return window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', modeMe);
    }, []);
    
    return(
        <>
            <div className="flex bg-white dark:bg-primary min-w-full">
                <div className="px-4 py-2 bg-white-light dark:bg-primary-light lg:w-1/4 md:1/3 sm:1/2">
                    <button className="inline w-8 h-8 lg:hidden" type="button"
                        onClick={() => setNavbarOpen(!navbarOpen)}>
                            {navbarOpen ?
                                <MdClose className="text-primary dark:text-white" size={24}/>
                            :
                                <GiHamburgerMenu className="text-primary dark:text-white" size={24}/>
                            }
                    </button>
                    <section className={"lg:block flex-col" + (navbarOpen ? "flex" : " hidden")}>
                        <article className="mb-6 border-b border-b-blue-light dark:border-b-white pb-6">
                            <img className='h-10' src={mode === 'dark' ? longlogo3 : longlogo2}/>
                        </article>
                        
                        <article className="h-15 flex md:w-64">
                            <section className="bg-blue bg-opacity-30 dark:fill-white dark:bg-opacity-60 w-12 h-12 rounded-md items-center justify-center flex">
                                <RiUser3Line size={30}  className="fill-primary dark:fill-white"/>
                            </section>

                            <section className="flex flex-col pt-0.5 dark:text-white">
                                <label className="mx-2 text-sm">Admin</label>
                                <label className="mx-2 font-bold text-m">
                                    {user?.displayName}
                                </label>
                            </section>

                            <button className="flex items-center justify-end ml-auto md:pr-4" type='button' onClick={handleLogout}>
                                <FiLogOut size={30} className="text-primary dark:text-white"/>
                            </button>
                        </article>
                        <ul className="mt-8 border-t border-t-blue-light dark:border-t-white pt-8">
                            <Drawer title="Dashboard" isSelected={false} outlineIcon={<AiOutlineHome size={24} className="fill-primary dark:fill-white"/>} selectedIcon={<AiFillHome size={24} className="fill-primary dark:fill-white"/>}/>
                            <Drawer title="Items" isSelected={false} outlineIcon={<MdOutlineDashboardCustomize size={24} className="fill-primary dark:fill-white"/>} selectedIcon={<MdDashboardCustomize size={24} className="fill-primary dark:fill-white"/>}/>
                            <Drawer title="Users" isSelected={false} outlineIcon={<RiUser3Line size={24} className="fill-primary dark:fill-white"/>} selectedIcon={<RiUser3Fill size={24} className="fill-primary dark:fill-white"/>}/>
                            <Drawer title="Comments" isSelected={false} outlineIcon={<FaRegCommentDots size={24} className="fill-primary dark:fill-white"/>} selectedIcon={<FaCommentDots size={24} className="fill-primary dark:fill-white"/>}/>
                            <Drawer title="Reviews" isSelected={false} outlineIcon={<AiOutlineStar size={26}/>} selectedIcon={<AiFillStar size={26} />}/>
                        </ul>
                        <article className="fixed mt-40 flex flex-col justify-center text-base font-thin">
                            <label>© Coaching Studio, 2021.</label>
                            <label>Created by the Creative Studio</label>
                        </article>
                    </section>
                </div>
                <Outlet />
            </div>
        </>
    );
};

export default Home
