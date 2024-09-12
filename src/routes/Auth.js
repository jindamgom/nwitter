import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter,faGoogle,faGithub } from "@fortawesome/free-brands-svg-icons";
import { authService,firebaseInstance} from "fbase";
import AuthForm from "components/AuthForm";

const Auth = () =>{
 
    const onSocialClick = async (event) =>{
        //console.log(event.target.name);
        try{
        const{
            target : {name},
        } = event;
        let provider;
        if(name=="google")
        {
            provider = new firebaseInstance.auth.GoogleAuthProvider();
        }
        else if(name=="github")
        {
            provider = new firebaseInstance.auth.GithubAuthProvider();
        }
        const data = await authService.signInWithPopup(provider);
        console.log(data);
        }
        //팝업창을 강제로 닫거나 기타 등등 문제
        catch(error)
        {
            if (error.code === 'auth/popup-closed-by-user') {
                // 사용자에게 팝업을 닫았음을 알리고 다시 시도하도록 유도
                alert('팝업이 닫혔습니다. 다시 시도해주세요.');
              } else {
                // 다른 오류 처리
                console.error(error);
              }
        }
        };
        

    return(
        <div className="authContainer">
            <FontAwesomeIcon
                icon={faTwitter}
                color={"#04AAFF"}
                size="3x"
                style={{marginBottom:30}}
            />
            <AuthForm/>
            <div className="authBtns">
                <br/>
                <button onClick={onSocialClick} name="google" className="authBtn">
                    Continue with Google <FontAwesomeIcon icon={faGoogle}/></button>
                <button onClick={onSocialClick} name="github" className="authBtn">
                    Continue with Github <FontAwesomeIcon icon={faGithub}/></button>
            </div>
        </div>
    );
};
export default Auth;