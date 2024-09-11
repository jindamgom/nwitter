import Nweet from "components/Nweet";
import { dbService,storageService } from "fbase";
import {useEffect, useState} from "react";
import {v4 as uuidv4} from "uuid";

const Home = ({userObj}) => {
    //console.log(userObj);
    const [nweet,setNweet] = useState("");
    const [nweets,setNweets] = useState([]);
    const [attachment, setAttachment] = useState("");

    //실시간 db 위한 onSnapshot함수적용
    useEffect(()=>{
       dbService.collection("nweets").onSnapshot((snapshot)=>{
        const newArray = snapshot.docs.map((document)=>({
            id : document.id,...document.data(),
        }));
        setNweets(newArray);
       });
    },[]);


    const onSubmit = async (event) =>{
        //새로고침 방지 
        event.preventDefault();
        let attachmentUrl="";
        if(attachment!==""){
            const attachmentRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`);
            const response = await attachmentRef.putString(attachment,"data_url");
            attachmentUrl = await response.ref.getDownloadURL(); 
        }
        await dbService.collection("nweets").add({
            text: nweet,
            createdAt : Date.now(),
            creatorId : userObj.uid,
            attachmentUrl,
        });
        setNweet("");
        setAttachment(""); //초기화

        // console.log(await response.ref.getDownloadURL());
    };

    const onChange = (event) =>{
        event.preventDefault();
        const{
            target:{value},
        }=event;
        setNweet(value);
    };

    const onFileChange = (event) =>
    {
        // console.log(event.target.files);
        const{
            target:{files},
        }=event;
        const theFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent)=>{
            // console.log(finishedEvent);
            const{
                currentTarget:{result},
            }=finishedEvent;
            setAttachment(result);
        };
        reader.readAsDataURL(theFile);
    }

    //파일 선택 취소 버튼
    const onClaerAttachment = () => setAttachment("");

    return (
        <>
        <form onSubmit={onSubmit}>
            <input
                value={nweet}
                onChange={onChange}
                type="text"
                placeholder="What's on your mind?"
                maxLength={120}
            />
            <input type="file" accept ="image/*" onChange={onFileChange}/>
            <input type="submit" value="Nweet"/>
            <br/>
            <div>
            {attachment && (
                <div>
                    <img src={attachment} width="100px" height="100px"/>
                    <br/>
                    <button onClick={onClaerAttachment}>Clear</button>
            </div>
        )}
            
            </div>
        </form>
        <div>
            {nweets.map((nweet)=>(
                <Nweet 
                    key = {nweet.id} 
                    nweetObj={nweet}
                    isOwner={nweet.creatorId === userObj.uid}
                />
            ))}
        </div>

        </>
    );

};
    
export default Home;