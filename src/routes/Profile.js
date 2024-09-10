import { authService } from "fbase";
import {useNavigate } from "react-router-dom";

const Profile = () => {
    const history = useNavigate ();

    const onLogOutClick = () => 
        {
            authService.signOut();
            history("/");
        };
    return(
        <>
            <button onClick={onLogOutClick}>Log out</button>
        </>
    );
};
export default Profile;