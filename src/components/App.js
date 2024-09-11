import { useEffect,useState } from "react";
import AppRouter from "components/Router";
import { authService } from "../fbase";

function App() {
  const[init,setInit] = useState(false);
  const [isLoggedIn,setIsLoggedIn] = useState(false);
  const [userObj,setUserObj] = useState(null);
  useEffect(()=>{
    authService.onAuthStateChanged((user)=>{
      if(user) //여기서 로그인 상태 isLoggedIn 변경
      {
        setIsLoggedIn(user);
        setUserObj(user);
      }else
      {
        setIsLoggedIn(false);
      }
      setInit(true);//init상태 변경
    });
  },[]);
  //  setInterval(()=>console.log(authService.currentUser),2000);
  return (
    <>
    {init? (
      <AppRouter isLoggedIn={isLoggedIn} userObj={userObj}/> 
      ): ("initializing...")
    }
    {/* jsx에 js 사용시 중괄호로 감싸기 */}
    {/* <footer>&copy; {new Date().getFullYear()}Nwitter</footer> */}
    </>
  
  );
}
export default App;
