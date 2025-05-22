import { useEffect, useState } from "react";
import { TokenContext } from "./TokenContext";

export function TokenProvider({ children }) {

    const [keyAccess, setKeyAccess] = useState('');


    // Load the token from localStorage when starting the app if it is already saved in the browser the key reloads it.
    useEffect(() => {
        const savedToken = localStorage.getItem("token");
        if (savedToken) {
            setKeyAccess(savedToken);
        }
    }, []);

    // Save in localStorage each time you change the token
    useEffect(() => {
        if (keyAccess) {
            localStorage.setItem("token", keyAccess);
        }
    }, [keyAccess]);

    return (
        <TokenContext.Provider value={{ keyAccess, setKeyAccess }}>
            {children}
        </TokenContext.Provider>
    );
}