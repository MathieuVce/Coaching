import { Navigate } from "react-router-dom";
import { RootState, useSelector } from "../store/storee";
import { useAlert } from 'react-alert'
import { useLocation } from 'react-router-dom'

export const RequireAuth: React.FC = (props) => {
    const { authenticated } = useSelector((state: RootState) => state.auth);
    const alert = useAlert()
    const location = useLocation();

    if (authenticated) {
        return <>{props.children}</>
    } else {
        // alert.info(
        //     <label className='text-blue'>You must be logged in to proceed</label>
        // )
        console.log("You must be logged in to proceed");
        return <Navigate to="/login" replace state={{ path: location.pathname }}/>
    }
}