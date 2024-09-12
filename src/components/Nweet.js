import { dbService,storageService } from "fbase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash,faPencilAlt } from "@fortawesome/free-solid-svg-icons";

const Nweet = ({nweetObj,isOwner})=>{
    const onDeleteClick = async() =>{
        const ok = window.confirm("삭제하시겠습니까?");
        // console.log(ok);

        //확인을 눌렀을 경우..
        if(ok)
        {
            // console.log(nweetObj.id);
            await dbService.doc(`nweets/${nweetObj.id}`).delete();
            // console.log(data);
            if(nweetObj.attachmentUrl !=="")
                await storageService.refFromURL(nweetObj.attachmentUrl).delete();
        }
    }

    return(
        <div className="nweet">
            
            <h4>{nweetObj.text}</h4>
            {nweetObj.attachmentUrl && (
                <img src={nweetObj.attachmentUrl} width="100px" height="100px"/>
            )}
            {isOwner &&(
                <div className="nweet__actions">
                    <span onClick={onDeleteClick}>
                        <FontAwesomeIcon icon={faTrash}/>
                    </span>
                </div>          
            )}
        </div>
    );
};
export default Nweet;