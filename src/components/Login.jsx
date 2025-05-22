import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TokenContext } from '../Contexts/TokenContext';
import axios from 'axios';
const API_LOGIN = import.meta.env.VITE_API_LOGIN;

const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();
    const { keyAccess, setKeyAccess } = useContext(TokenContext);

    const handleUsernameChange = (e) => {
        setUsername(e.target.value)
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

    useEffect(() => {
        if (keyAccess) { //  Use token from context
            navigate('/homePerfil');
        }
    }, [keyAccess, navigate]);


    const handleLogin = async () => {
        try {
            const { data } = await axios.post(`${API_LOGIN}`,
                { login: username, clave: password },
                { headers: { 'Content-Type': 'application/json' } }
            )
            setKeyAccess(data.result.token)
            console.log(data.result.token)
        }
        catch (error) {
            if (axios.isAxiosError(error)) {
                console.error("Login error:", error.response?.data || error.message);
            } else {
                console.error("Unexpected error:", error);
            }
        }

    }

    return (
        <>
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="p-4 border rounded bg-dark">
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={handleUsernameChange}
                        className="form-control mb-3"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={handlePasswordChange}
                        className="form-control mb-3"
                    />
                    <button
                        type="button"
                        className="btn btn-primary w-100"
                        onClick={handleLogin}>Log in</button>
                </div>
            </div>
        </>
    )
}

export default Login