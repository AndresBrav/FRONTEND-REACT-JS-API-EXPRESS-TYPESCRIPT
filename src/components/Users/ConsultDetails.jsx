import React, { useContext, useState } from 'react'
import axios from 'axios'
import { TokenContext } from '../../Contexts/TokenContext';
import { useAuthRedirect } from '../../hooks/useAuthRedirect';

const API_USERS = import.meta.env.VITE_API_USERS; /* http://localhost:3000/users/ */

const ConsultDetails = () => {
  useAuthRedirect(); // Protect this page redirect login if don't find token
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("")
  const { keyAccess, setKeyAccess } = useContext(TokenContext);

  const handleConsultDetails = async (e) => {
    try {
      const response = await axios.get(`${API_USERS}getUsers/`,
        {
          headers: {
            "x-api-token": keyAccess,
          },
        });

      if (response.data === "you do not have permissions to access users") {
        console.log("we don't have array")
        setMessage("you do not have permissions to access users")
      }
      else {
        setUsers(response.data);
        console.log(response.data)
      }

    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }




  return (
    <>
      <button
        type="button"
        className="btn btn-primary w-25 mx-auto d-block mt-4"
        onClick={handleConsultDetails}>
        Consult Details
      </button>
      <div>
        {users.length > 0 && (
          <ul>
            {users.map((user) => (
              <li key={user.id}>
                <p className='pConsultDetails'><strong>ID:</strong> {user.id}</p>
                <p className='pConsultDetails'><strong>Login:</strong> {user.login}</p>
                <p className='pConsultDetails'><strong>Clave:</strong> {user.clave}</p>
                <p className='pConsultDetails'><strong>Estado (sts):</strong> {user.sts}</p>
                <p className='pConsultDetails'><strong>Tipo:</strong> {user.tipo}</p>
                <hr />
                <hr />
                <hr />
              </li>
            ))}
          </ul>
        )}
      </div>
      <div>
        {message && <p className='pConsultDetails'>{message}</p>}
      </div>
    </>
  )
}

export default ConsultDetails