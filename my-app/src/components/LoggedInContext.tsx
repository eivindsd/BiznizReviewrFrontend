import React, { useState, createContext } from 'react';

interface LoggedInContextInterface {
    isLoggedIn: boolean;
    setIsLoggedIn: (isLoggedIn: boolean) => void;
    userId: string;
    setUserId: (userId: string) => void;
    userName: string | undefined;
    setUserName: (name: string | undefined) => void;
}

const LoggedInDefaultValues: LoggedInContextInterface = {
    isLoggedIn: false,
    setIsLoggedIn: isLoggedIn => isLoggedIn,
    userId: "",
    setUserId: userId => userId,
    userName: "",
    setUserName: userName => userName
 }

export const LoggedInContext = createContext<LoggedInContextInterface>(LoggedInDefaultValues);

const LoggedInContextProvider: React.FC = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(LoggedInDefaultValues.isLoggedIn);
    const [userId, setUserId] = useState<string>(LoggedInDefaultValues.userId);
    const [userName, setUserName] = useState<string | undefined>(LoggedInDefaultValues.userName);

    return (
        <LoggedInContext.Provider 
            value={{isLoggedIn, setIsLoggedIn, userId, setUserId, userName, setUserName}}
            >
                {children}
        </LoggedInContext.Provider>
    )
}
export default LoggedInContextProvider


