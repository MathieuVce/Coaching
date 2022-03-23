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
import { useState } from "react";
import longlogo2 from "../assets/longlogo2.svg"


const Home: React.FunctionComponent = () => {

    const { user } = useSelector((state: RootState) => state.auth);

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
    }

    return(
        <>
            <body className="flex h-screen">
                <div className="px-4 py-2 bg-white-light lg:w-1/4 md:1/4 sm:1/2">
                    <button className="inline w-8 h-8 lg:hidden" type="button"
                        onClick={() => setNavbarOpen(!navbarOpen)}>
                            {navbarOpen ?
                                <MdClose color='black' size={24}/>
                            :
                                <GiHamburgerMenu color='black' size={24}/>
                            }
                    </button>
                    <section className={"lg:block flex-col" + (navbarOpen ? "flex" : " hidden")}>
                        <article className="mb-6 border-b border-b-primary pb-6">
                            <img className='h-10' src={longlogo2}/>
                        </article>
                        
                        <article className="h-15 flex md:w-64">
                            <section className="bg-blue bg-opacity-70 w-12 h-12 rounded-md items-center justify-center flex">
                                <RiUser3Line size={30} color='black'/>
                            </section>

                            <section className="flex flex-col pt-0.5">
                                <label className="mx-2 text-sm">Admin</label>
                                <label className="mx-2 font-bold text-m">
                                    {user?.displayName ? user?.displayName : ""}
                                </label>
                            </section>

                            <button className="ml-auto" type='button' onClick={() => {handleLogout()}}>
                                <FiLogOut size={30}/>
                            </button>
                        </article>

                        <ul className="mt-8 border-t border-t-primary pt-8">
                            <Drawer title="Dashboard" isSelected={false} outlineIcon={<AiOutlineHome size={24}/>} selectedIcon={<AiFillHome size={24}/>}/>
                            <Drawer title="Items" isSelected={false} outlineIcon={<MdOutlineDashboardCustomize size={24}/>} selectedIcon={<MdDashboardCustomize size={24}/>}/>
                            <Drawer title="Users" isSelected={false} outlineIcon={<RiUser3Line size={24}/>} selectedIcon={<RiUser3Fill size={24}/>}/>
                            <Drawer title="Comments" isSelected={false} outlineIcon={<FaRegCommentDots size={24}/>} selectedIcon={<FaCommentDots size={24}/>}/>
                            <Drawer title="Reviews" isSelected={false} outlineIcon={<AiOutlineStar size={26}/>} selectedIcon={<AiFillStar size={26}/>}/>
                        </ul>
                        {/* <div className="inset-x-0 bottom-0 absolute items-center bg-blue-light">
                            <label>© Coaching Studio, 2021.</label>
                            <label>Create by the Creative Studio</label>
                        </div> */}
                    </section>
                </div>
                <Outlet />
            </body>
        </>
    );
};

export default Home
