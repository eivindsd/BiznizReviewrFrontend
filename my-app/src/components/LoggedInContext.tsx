import * as React from "react";

interface LoggedInContextInterface {
    loggedIn: boolean;
    setLoggedIn?: () => void
    userId: String
    setUserId?: () => void
}

const LoggedInDefaultValues: LoggedInContextInterface = {
    loggedIn: false,
    userId: "",
 }

export const LoggedInContext = React.createContext<LoggedInContextInterface>(LoggedInDefaultValues);

const LoggedInContextProvider: React.FC = ({ children }) => {
    const [loggedIn, setLoggedIn] = React.useState<boolean>(LoggedInDefaultValues.loggedIn);
    const [userId, setUserId] = React.useState<String>(LoggedInDefaultValues.userId);

    const toggleLoggedIn = () => {
        setLoggedIn(!loggedIn);
    }

    return (
        <LoggedInContext.Provider 
        value={{
            loggedIn,
            userId,
        }}>
            {children}
        </LoggedInContext.Provider>
    )
}
export default LoggedInContextProvider


