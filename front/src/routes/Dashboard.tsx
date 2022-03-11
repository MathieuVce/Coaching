import { RootState, useSelector } from "../store/storee";
import { logout } from "../slices/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAlert } from 'react-alert'


const Dashboard: React.FunctionComponent = () => {

    const { user } = useSelector((state: RootState) => state.auth);
    const { authenticated } = useSelector((state: RootState) => state.auth);
    const navigate = useNavigate(); 
    const dispatch = useDispatch();
    const alert = useAlert()

    const handleLogout = () => {
        dispatch(logout())
        if (!authenticated) {
            // alert.success(
            //     <label className='text-blue'>Successfully logged out</label>
            // )
            navigate("/")
        }
    }

    return(
        <div className="justify-center items-center flex mt-8 flex-col">
            <label className="my-2">
                {user?.displayName ? user?.displayName : "No Name Yet"}
            </label>
            <label className="my-2">
                {user?.email}
            </label>
            <button className={`bg-primary py-2 my-2 px-8 text-sm text-white rounded border border-primary focus:outline-none`} onClick={() => {handleLogout()}}>
                Logout
            </button>
        </div>
    );
};

export default Dashboard
