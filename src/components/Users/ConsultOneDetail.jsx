import React, { useContext, useState } from 'react'
import { useAuthRedirect } from '../../hooks/useAuthRedirect';
import '../../assets/styles/designFonts.css'
import axios from 'axios';
import { TokenContext } from '../../Contexts/TokenContext';

const API_USERS = import.meta.env.VITE_API_USERS;

const ConsultOneDetail = () => {
  useAuthRedirect(); // Protect this page redirect login if don't find token
  const { keyAccess } = useContext(TokenContext);

  const [number, setNumber] = useState("")
  const [user, setUser] = useState({})
  const [message, setMessage] = useState("")

  const handleConsultOneDetail = (e) => {
    setNumber(e.target.value)
  }

  const handleConsultOneDetails = async () => {
    try {
      const response = await axios.get(`${API_USERS}getUsers/${number}`,
        {
          headers: {
            "x-api-token": keyAccess,
          },
        });

      if (response.data.msg) {
        setMessage(`the user with  id:${number} does not exist`)
        setUser({}) /* update user*/
      }
      else {
        console.log(response.data)
        setUser(response.data)
        setMessage("") /* update message */
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }

  return (
    <>
      <div className='labelconsult'>ConsultOneDetail</div>

      <label className='labelconsult' >Ingrese un número</label>
      <div className='labelconsult'>
        <input
          type="text"
          placeholder="Number"
          value={number}
          onChange={handleConsultOneDetail}
        />
      </div>
      <button
        type="button"
        className="btn btn-primary w-25 mx-auto d-block mt-4"
        onClick={handleConsultOneDetails}>
        Consult One Details
      </button>
      {user && Object.keys(user).length > 0 && (
        <>
          <p className='pConsultDetails'><strong>ID:</strong> {user.id}</p>
          <p className='pConsultDetails'><strong>Login:</strong> {user.login}</p>
          <p className='pConsultDetails'><strong>Clave:</strong> {user.clave}</p>
          <p className='pConsultDetails'><strong>Estado (sts):</strong> {user.sts}</p>
          <p className='pConsultDetails'><strong>Tipo:</strong> {user.tipo}</p>
        </>
      )}

      <div>
        {message && <p className='pConsultDetails'>{message}</p>}
      </div>
    </>
  )
}

export default ConsultOneDetail