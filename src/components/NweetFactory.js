import {useState} from "react";
import { dbService,storageService } from "fbase";
import {v4 as uuidv4} from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons"; 


const NweetFactory = ({userObj}) =>{
    const [nweet,setNweet] = useState("");
    const [attachment, setAttachment] = useState("");

    const onSubmit = async (event) =>{
        //새로고침 방지 
        event.preventDefault();
        //트윗을 단 한글자도 하지 않는 경우 전송하지 않음
        if(nweet==="")
        {
            return;
        }

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
        // reader.readAsDataURL(theFile);
        //파일이 첨부 안되었을 때는 읽지 않도록 조건을 수정한다.
        if(Boolean(theFile))
        {
            reader.readAsDataURL(theFile);
        }
    }

    //파일 선택 취소 버튼
    const onClaerAttachment = () => setAttachment("");






    return (
        <>
        <form onSubmit={onSubmit} className="factoryForm">

            <div className="factoryInput__container">
                <input
                    className="factoryInput__input"
                    value={nweet}
                    onChange={onChange}
                    type="text"
                    placeholder="What's on your mind?"
                    maxLength={120}
                />
                <input type="submit" value="&rarr;" className="factoryInput__arrow"/>
            </div>
            <label htmlFor="attach-file" className="factoryInput__label">
                <span>Add Photos</span>
                <FontAwesomeIcon icon={faPlus}/>
            </label>
            <input
                id="attach-file"
                type="file" 
                accept ="image/*" 
                onChange={onFileChange}
                style={{
                    opacity:0,
                }}
            />
            {attachment && (
                <div className="factoryForm__attachment">
                    <img 
                        src={attachment} 
                        style={{
                            backgroundImage:attachment,
                        }}
                    />
                    <div className="factoryForm__clear" onClick={onClaerAttachment}>
                        <span>Remove</span>
                        <FontAwesomeIcon icon={faTimes}/>
                    </div>
                </div> 
            )}
        </form>
        </>
    );
};

export default NweetFactory;