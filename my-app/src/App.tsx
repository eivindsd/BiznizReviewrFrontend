import "./components/LoginComponent/Login";
import Login from "./components/LoginComponent/Login";
import { LoggedInContext } from "./components/LoggedInContext";
import { useContext, useEffect } from "react";
import LandingPage from "./components/LandingPage/LandingPage";
import Statistics from "./components/StatisticsComponent/Statistics";
import { BrowserRouter, Routes, Route } from "react-router-dom";

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
        </Routes>
    </BrowserRouter>
    
  );
}

export default App;
