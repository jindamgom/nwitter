import { HashRouter as Router,Route,Routes } from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Profile from "routes/Profile";
import Navigation from "./Navigation";

// 상위 컴포넌트에서 받은 프롭스를 구조분해 할당으로 사용한다. 
const AppRouter = ({isLoggedIn}) =>
{
    return(
        <Router>
          {isLoggedIn && <Navigation/>}
                <Routes>
        {isLoggedIn ? (
          <>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/profile" element={<Profile />}></Route>
          </>    
        ) : (
          <Route exact path="/" element={<Auth />}></Route>
        )}
        {/* <Route path="*" element={<Navigate replace to="/" />} />     */}
      </Routes>
        </Router>    
    );
};

export default AppRouter;