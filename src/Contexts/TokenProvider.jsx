import { useEffect, useState } from "react";
import { TokenContext } from "./TokenContext";

export function TokenProvider({ children }) {

    const [claveAcceso, setClaveAcceso] = useState('');


    // Load the token from localStorage when starting the app if it is already saved in the browser the key reloads it.
    useEffect(() => {
        const savedToken = localStorage.getItem("token");
        if (savedToken) {
            setClaveAcceso(savedToken);
        }
    }, []);

    // Save in localStorage each time you change the token
    useEffect(() => {
        if (claveAcceso) {
            localStorage.setItem("token", claveAcceso);
        }
    }, [claveAcceso]);

    return (
        <TokenContext.Provider value={{ claveAcceso, setClaveAcceso }}>
            {children}
        </TokenContext.Provider>
    );
}