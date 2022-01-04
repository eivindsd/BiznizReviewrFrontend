import React, { useState, createContext } from 'react';

interface LoggedInContextInterface {
    isLoggedIn: boolean;
    setIsLoggedIn: (isLoggedIn: boolean) => void;
    userId: String;
    setUserId: (userId: String) => void;
}

const LoggedInDefaultValues: LoggedInContextInterface = {
    isLoggedIn: false,
    setIsLoggedIn: isLoggedIn => isLoggedIn,
    userId: "",
    setUserId: userId => userId
 }

export const LoggedInContext = createContext<LoggedInContextInterface>(LoggedInDefaultValues);

const LoggedInContextProvider: React.FC = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(LoggedInDefaultValues.isLoggedIn);
    const [userId, setUserId] = useState<String>(LoggedInDefaultValues.userId);

    return (
        <LoggedInContext.Provider 
            value={{isLoggedIn, setIsLoggedIn, userId, setUserId}}
            >
                {children}
        </LoggedInContext.Provider>
    )
}
export default LoggedInContextProvider


