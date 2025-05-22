import React, { useContext, useState } from 'react'
import { useAuthRedirect } from '../../hooks/useAuthRedirect';
import { TokenContext } from '../../Contexts/TokenContext';
const API_USERS = import.meta.env.VITE_API_USERS; /* http://localhost:3000/users/ */
import axios from 'axios';

const AddUser = () => {
  useAuthRedirect();
  const [login, setLogin] = useState("")
  const [clave, setClave] = useState("")
  const [sts, setSts] = useState("")
  const [tipo, setTipo] = useState("")
  const { keyAccess, setKeyAccess } = useContext(TokenContext);
  const [message, setMessage] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevents page reloading
    console.log(login)
    console.log(clave)
    console.log(sts)
    console.log(tipo)

    try {
      const response = await axios.post(`http://localhost:3000/users/addUser/`,
        { login, clave, sts, tipo },
        {
          headers: {
            "x-api-token": keyAccess,
          },
        }
      )
      console.log(response)
      setMessage(response.data.msg)
    } catch (error) {
      console.log("Error adding user")
    }
  }


  return (
    <>
      <div className='addUserDiv'>Add User</div>
      {message && <p className='pConsultDetails'>{message}</p>}
      <div className="d-flex justify-content-center align-items-center vh-100">
        <form onSubmit={handleSubmit} className="p-4 border rounded bg-dark" style={{ minWidth: "300px" }}>
          <input
            type="text"
            placeholder="Write a login"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            className="form-control mb-3"
          />

          <input
            type="text"
            placeholder="Write a clave"
            value={clave}
            onChange={(e) => setClave(e.target.value)}
            className="form-control mb-3"
          />

          <input
            type="text"
            placeholder="Write a sts"
            value={sts}
            onChange={(e) => setSts(e.target.value)}
            className="form-control mb-3"
          />

          <input
            type="text"
            placeholder="Write a tipo"
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            className="form-control mb-3"
          />

          <button type="submit" className="btn btn-secondary w-100">Enviar</button>
        </form>
      </div>
      

    </>
  )
}

export default AddUser