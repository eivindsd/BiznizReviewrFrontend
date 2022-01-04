import React, { useContext } from 'react';
import { LoggedInContext } from "../LoggedInContext";

const LandingPage = () => {

    const { setIsLoggedIn } = useContext(LoggedInContext);

    return (
        <div>
            <h1>Du er logget inn :))</h1>
            <button onClick={() => setIsLoggedIn(false)}>Logg ut</button>
        </div>
    );
};

export default LandingPage;