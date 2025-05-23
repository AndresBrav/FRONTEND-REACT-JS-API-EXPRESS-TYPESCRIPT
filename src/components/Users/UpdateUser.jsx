import React, { useContext, useState } from 'react'
import BackToHomePerfil from '../Shared/BackToHomePerfil'
import { useAuthRedirect } from '../../hooks/useAuthRedirect';
import { TokenContext } from '../../Contexts/TokenContext';
import axios from 'axios';
const API_USERS = import.meta.env.VITE_API_USERS; /* http://localhost:3000/users/ */

const UpdateUser = () => {
  useAuthRedirect();
  const [login, setLogin] = useState("")
  const [clave, setClave] = useState("")
  const [sts, setSts] = useState("")
  const [tipo, setTipo] = useState("")
  const { keyAccess, setKeyAccess } = useContext(TokenContext);
  const [message, setMessage] = useState("")
  const [number, setNumber] = useState("")
  const [user, setUser] = useState({})

  const handleConsultUpdate = (e) => {
    setNumber(e.target.value)
  }

  const handleUserDB = async () => {
    try {
      const response = await axios.get(`${API_USERS}getUsers/${number}`, /* bring one user */
        {
          headers: {
            "x-api-token": keyAccess,
          },
        });

      if (response.data.msg) {
        setMessage(`the user with  id:${number} does not exist`)
        setUser({}) /* update user*/
        setLogin("")
        setClave("")
        setSts("")
        setTipo("")
      }
      else {
        // console.log(response.data)
        setUser(response.data)
        setMessage("") /* update message */
        setLogin(response.data.login)
        setClave(response.data.clave)
        setSts(response.data.sts)
        setTipo(response.data.tipo)
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevents page reloading
    console.log(login)
    console.log(clave)
    console.log(sts)
    console.log(tipo)

    try {
      const response = await axios.put(`${API_USERS}update/${number}`,
        { login, clave, sts, tipo },
        {
          headers: {
            "x-api-token": keyAccess,
          },
        }
      )
      // console.log(response)
      setMessage(response.data.msg)
    } catch (error) {
      console.log("Error updating user")
    }
  }


  return (
    <>
      <BackToHomePerfil />
      <div className='labelconsult'>Update User</div>

      <label className='labelconsult' >Enter the user ID </label>
      <div className='labelconsult'>
        <input
          type="text"
          placeholder="Number"
          value={number}
          onChange={handleConsultUpdate}
        />
      </div>
      <button
        type="button"
        className="btn btn-primary w-25 mx-auto d-block mt-4"
        onClick={handleUserDB}>
        Bring Data User
      </button>
      <div>
        {message && <p className='pConsultDetails'>{message}</p>} {/* message */}
      </div>
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

export default UpdateUser