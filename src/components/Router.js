import { useState } from "react";
import { HashRouter as Router,Route,Routes } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";

const AppRouter = () =>
{
    //setIsLoggedIn은 변수가 아닌 isLoggedIn을 변경할 때 사용하는 함수
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    return(
        <Router>
                <Routes>
        {isLoggedIn ? (
          <Route exact path="/" element={<Home />}></Route>
        ) : (
          <Route exact path="/" element={<Auth />}></Route>
        )}
      </Routes>
        </Router>    
    );
};

export default AppRouter;