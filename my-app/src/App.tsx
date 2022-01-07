import "./components/LoginComponent/Login";
import Login from "./components/LoginComponent/Login";
import { LoggedInContext } from "./components/LoggedInContext";
import { useContext, useEffect } from "react";
import LandingPage from "./components/LandingPage/LandingPage";
import Statistics from "./components/StatisticsComponent/Statistics";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserComponent } from "./components/UserComponent/UserComponent";
import { BusinessComponent } from "./components/BusinessComponent/BusinessComponent";

function App() {
  const { isLoggedIn } = useContext(LoggedInContext);

  useEffect(() => {
  }, [isLoggedIn])

  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<div className="App">
                                  {isLoggedIn && <LandingPage />}
                                  {!isLoggedIn &&  <Login /> }
                                  </div>}/>
          <Route path="stats" element={<Statistics />} />
          <Route path="user/:userIdURL" element={<UserComponent />} />
          <Route path="business/:businessIdURL" element={<BusinessComponent />} />
        </Routes>
    </BrowserRouter>
    
  );
}

export default App;
