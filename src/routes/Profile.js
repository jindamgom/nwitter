import { authService,dbService } from "fbase";
import {useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";

const Profile = ({userObj,refreshUser}) => {
    const history = useNavigate ();
    const [newDisplayName,setNewDisplayName] = useState(userObj.displayName);

    const onChange= (event) =>{
        const{
            target:{value},
        }=event;
        setNewDisplayName(value);
    }

    const onSubmit = async(event)=>
    {
        event.preventDefault();
        if(userObj.displayName!==newDisplayName)
        {
            await userObj.updateProfile({displayName : newDisplayName});
            refreshUser();
        }
    }

    const onLogOutClick = () => {
            authService.signOut();
            history("/");
    };

    const getMyNweets = async()=>{
        const nweets = await dbService.collection("nweets")
                        .where("creatorId","==",userObj.uid)
                        .orderBy("createdAt","asc")
                        .get();

                        console.log(nweets.docs.map((doc)=>doc.data()));
    }
    
   

    //profile컴포넌트가 렌더링 된 이 후 실행되는 함수.
    useEffect(()=>{
        getMyNweets();
    },[]);

    return(
        <div className="container">
        <form onSubmit={onSubmit} className="profileForm">
        <input 
            onChange={onChange} 
            type="text" 
            placeholder="display name" 
            value={newDisplayName}
            autoFocus
            className="formInput"
        />
        <input 
            type="submit" 
            value="update profile"
            className="formBtn"
            style={{
                marginTop:10,
            }}
        />
        </form>
            <span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>
                Log Out
            </span>
        </div>
    );
};
export default Profile;