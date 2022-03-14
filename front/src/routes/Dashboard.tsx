import { RootState, useSelector } from "../store/storee";
import { logout } from "../slices/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
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


const Dashboard: React.FunctionComponent = () => {

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
        navigate("/")
    }

    return(
        // <div className="justify-center items-center flex mt-8 flex-col w-screen h-screen">
        //     <label className="my-2">
        //         {user?.displayName ? user?.displayName : "No Name Yet"}
        //     </label>
        //     <label className="my-2">
        //         {user?.email}
        //     </label>
        //     <button className={`bg-primary py-2 my-2 px-8 text-sm text-white rounded border border-primary focus:outline-none`} onClick={() => {handleLogout()}}>
        //         Logout
        //     </button>
        // </div>
        <body>
            <div className="flex h-screen">
                <div className="px-4 py-2 bg-white-light lg:w-1/6">
                    <button className="inline w-8 h-8 lg:hidden" type="button"
                        onClick={() => setNavbarOpen(!navbarOpen)}>
                            {navbarOpen ?
                                <MdClose color='black' size={24}/>
                            :
                                <GiHamburgerMenu color='black' size={24}/>
                            }
                    </button>
                    <div className={"lg:block flex-col" + (navbarOpen ? " flex" : " hidden")}>
                        <div className="mb-6 border-b-2 border-b-brown pb-6">
                            <img className='h-10' src={"src/assets/longlogo2.svg"}/>
                        </div>
                        
                        <div className="border-b-2 border-b-brown h-15 flex pb-5">
                            <div className="bg-blue w-12 h-12 rounded-md items-center justify-center flex">
                                <RiUser3Line size={30} color='black'/>
                            </div>

                            <div className="flex flex-col pt-0.5">
                                <label className="mx-2 text-sm">Admin</label>
                                <label className="mx-2 font-bold text-m">
                                    {user?.displayName ? user?.displayName : ""}
                                </label>
                            </div>

                            <button className="ml-4" type='button' onClick={() => {handleLogout()}}>
                                <FiLogOut size={30}/>
                            </button>
                        </div>

                        <ul>
                            <Drawer title="Dashboard" isSelected={false} outlineIcon={<AiOutlineHome size={24}/>} selectedIcon={<AiFillHome size={24}/>}/>
                            <Drawer title="Items" isSelected={false} outlineIcon={<MdOutlineDashboardCustomize size={24}/>} selectedIcon={<MdDashboardCustomize size={24}/>}/>
                            <Drawer title="Users" isSelected={false} outlineIcon={<RiUser3Line size={24}/>} selectedIcon={<RiUser3Fill size={24}/>}/>
                            <Drawer title="Comments" isSelected={false} outlineIcon={<FaRegCommentDots size={24}/>} selectedIcon={<FaCommentDots size={24}/>}/>
                            <Drawer title="Review" isSelected={false} outlineIcon={<AiOutlineStar size={26}/>} selectedIcon={<AiFillStar size={26}/>}/>
                         </ul>
                        {/* <div className="inset-x-0 bottom-0 absolute items-center bg-blue-light">
                            <label>© Coaching Studio, 2021.</label>
                            <label>Create by the Creative Studio</label>
                        </div> */}
                    </div>
                </div>
            </div>
        </body>
    );
};

export default Dashboard
