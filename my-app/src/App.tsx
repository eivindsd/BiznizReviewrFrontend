import "./components/LoginComponent/Login";
import Login from "./components/LoginComponent/Login";
import { LoggedInContext } from "./components/LoggedInContext";
import { useContext, useEffect } from "react";
import LandingPage from "./components/LandingPage/LandingPage";

function App() {
  const { isLoggedIn } = useContext(LoggedInContext);

  useEffect(() => {
    
  }, [isLoggedIn])

  return (
    <div className="App">
      {isLoggedIn && <LandingPage />}
      {!isLoggedIn &&  <Login /> }
    </div>
    
  );
}

export default App;
