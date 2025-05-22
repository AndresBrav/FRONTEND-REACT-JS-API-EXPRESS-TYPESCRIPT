import React, { useContext, useState } from 'react'
import { useAuthRedirect } from '../../hooks/useAuthRedirect'; /* import hook */
import { TokenContext } from '../../Contexts/TokenContext';
import axios from 'axios';
const API_USERS = import.meta.env.VITE_API_USERS;


const DeleteUser = () => {
  useAuthRedirect(); // Protect this page redirect login if don't find token
  const { keyAccess } = useContext(TokenContext);

  const [number, setNumber] = useState("")
  const [message, setMessage] = useState("")

  const handleConsultDelete = (e) => {
    setNumber(e.target.value)
  }

  const handleConsultDeleteButton = async () => {
    try {
      const response = await axios.delete(`${API_USERS}delUsers/${number}`, {
        headers: {
          "x-api-token": keyAccess,
        },
      });
      console.log(response.data.msg);
      setMessage(response.data.msg)
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  }

  return (
    <>
      <>
        <div className='labelconsult'>Delete User</div>

        <label className='labelconsult' >Ingrese un número</label>
        <div className='labelconsult'>
          <input
            type="text"
            placeholder="Number"
            value={number}
            onChange={handleConsultDelete}
          />
        </div>
        <button
          type="button"
          className="btn btn-primary w-25 mx-auto d-block mt-4"
          onClick={handleConsultDeleteButton}>
          Delete One User
        </button>
        <div>
          {message && <p className='pConsultDetails'>{message}</p>}
        </div>
      </>
    </>
  )
}

export default DeleteUser