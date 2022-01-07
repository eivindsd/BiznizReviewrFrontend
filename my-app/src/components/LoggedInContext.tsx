import React, { useState, createContext } from 'react';

interface LoggedInContextInterface {
    isLoggedIn: boolean;
    setIsLoggedIn: (isLoggedIn: boolean) => void;
    userId: string;
    setUserId: (userId: string) => void;
    userName: string | undefined;
    setUserName: (name: string | undefined) => void;
    isAdmin: boolean;
    setAdmin: (isAdmin: boolean) => void;
}

const LoggedInDefaultValues: LoggedInContextInterface = {
    isLoggedIn: false,
    setIsLoggedIn: isLoggedIn => isLoggedIn,
    userId: "",
    setUserId: userId => userId,
    userName: "",
    setUserName: userName => userName,
    isAdmin: false,
    setAdmin: isAdmin => isAdmin,
 }

export const LoggedInContext = createContext<LoggedInContextInterface>(LoggedInDefaultValues);

const LoggedInContextProvider: React.FC = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(LoggedInDefaultValues.isLoggedIn);
    const [userId, setUserId] = useState<string>(LoggedInDefaultValues.userId);
    const [userName, setUserName] = useState<string | undefined>(LoggedInDefaultValues.userName);
    const [isAdmin, setAdmin] = useState<boolean>(LoggedInDefaultValues.isAdmin);

    return (
        <LoggedInContext.Provider 
            value={{isLoggedIn, setIsLoggedIn, userId, setUserId, userName, setUserName, isAdmin, setAdmin}}
            >
                {children}
        </LoggedInContext.Provider>
    )
}
export default LoggedInContextProvider


