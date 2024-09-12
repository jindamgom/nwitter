import Nweet from "components/Nweet";
import { dbService} from "fbase";
import {useEffect, useState} from "react";
import NweetFactory from "components/NweetFactory";

const Home = ({userObj}) => {
    const [nweets,setNweets] = useState([]);

    //실시간 db 위한 onSnapshot함수적용
    useEffect(()=>{
       dbService.collection("nweets")
       .orderBy("createdAt","desc")
       .onSnapshot((snapshot)=>{
        const newArray = snapshot.docs.map((document)=>({
            id : document.id,...document.data(),
        }));
        setNweets(newArray);
       });
    },[]);
    
    return (
        <div className="container">
            {/* 기존 폼을 컴포넌트화 함 */}
            <NweetFactory userObj={userObj}/>
         <div style={{marginTop:30}}>
                {nweets.map((nweet)=>(
                    <Nweet 
                        key = {nweet.id} 
                        nweetObj={nweet}
                        isOwner={nweet.creatorId === userObj.uid}
                    />
                ))}
            </div>
        </div>
    );

};
    
export default Home;