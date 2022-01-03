import * as React from "react";

interface LoggedInContextInterface {
    loggedIn: boolean;
    userId: String
}

const LoggedInContext = React.createContext<LoggedInContextInterface | null>(null);

export const LoggedInContextProvider: LoggedInContextInterface = {
    loggedIn: false,
    userId: ""
}


