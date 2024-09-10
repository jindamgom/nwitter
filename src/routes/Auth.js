import { authService,firebaseInstance} from "fbase";
import { useState } from "react";

const Auth = () =>{
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [newAccount,setNewAccount] = useState(true);
    const [error,setError] = useState("");
    const onChange = (event)=>
    {
        // console.log(event.target.name);
        const{
            target : {name,value},
        } = event;
        if(name==="email"){
            setEmail(value);
        }
        else if(name==="password"){
            setPassword(value);
        }
    };

    const onSubmit = async (event)=>
    {
        event.preventDefault();
        try{
            let data;
            if(newAccount)
                {
                    //create newAccount 
                    data = await authService.createUserWithEmailAndPassword(email,password);
                }
                else{
                    //log in
                    data = await authService.signInWithEmailAndPassword(email,password);
                }
                console.log(data);
            }
            catch(error)
            {
                setError(error.message);
                // console.log("에러로그:",error);
            }
       
    };
    const toggleAccount = () => setNewAccount((prev)=>!prev);

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
        <div>
            <form onSubmit={onSubmit}>
                <input 
                    name="email" 
                    type = "email" 
                    placeholder="Email" 
                    required 
                    value={email} 
                    onChange={onChange}/>
                <input 
                    name="password" 
                    type = "password" 
                    placeholder="Password" 
                    required
                    value={password}
                    onChange={onChange}/>
                <input type = "submit" value = {newAccount ? "Create Account" : "Log in"}/>
                <br/>
                {error}
            </form>
            <div>
                <span onClick={toggleAccount}>
                    {newAccount ? "Sign In" : "Create Account"}
                </span>
                <br/>
                <button onClick={onSocialClick} name="google">Continue with Google</button>
                <button onClick={onSocialClick} name="github">Continue with Github</button>
            </div>
        </div>
    );
};
export default Auth;