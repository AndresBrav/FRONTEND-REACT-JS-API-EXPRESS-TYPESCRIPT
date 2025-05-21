import React, { useEffect, useState } from 'react'

const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleUsernameChange = (e) => {
        setUsername(e.target.value)
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

    useEffect(() => {
        console.log(username)
        console.log(password)
    }, [username, password])


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
                    <button type="button" className="btn btn-primary w-100">Log in</button>
                </div>
            </div>
        </>
    )
}

export default Login