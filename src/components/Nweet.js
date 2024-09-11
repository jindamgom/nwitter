import { dbService,storageService } from "fbase";

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
        <div>
            <h4>{nweetObj.text}</h4>
            {nweetObj.attachmentUrl && (
                <img src={nweetObj.attachmentUrl} width="100px" height="100px"/>
            )}
            {isOwner &&(
                <>
                <button onClick={onDeleteClick}>삭제</button>
                </>
            )
            }
        </div>
    );
};
export default Nweet;