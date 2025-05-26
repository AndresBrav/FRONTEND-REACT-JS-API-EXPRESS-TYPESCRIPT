import React, { useContext, useState } from 'react'
import BackToHomePerfil from '../../Shared/BackToHomePerfil'
import { useAuthRedirect } from '../../../hooks/useAuthRedirect';
import { TokenContext } from '../../../Contexts/TokenContext';
import axios from 'axios'
const API_CARS = import.meta.env.VITE_API_CARS; /* http://localhost:3000/cars/ */


const ListFiles = () => {
  useAuthRedirect(); // Protect this page redirect login if don't find token
  const { keyAccess, setKeyAccess } = useContext(TokenContext);
  const [files, setFiles] = useState([])

  const handleConsultFiles = async () => {
    try {
      const response = await axios.get(
        `${API_CARS}listFiles`,
        {
          headers: {
            "x-api-token": keyAccess,
          },
        })
      console.log(response)
      // setCars(response.data)  /* we fill the array with the cars */
      setFiles(response.data.files)

    } catch (error) {
      console.log("error fetching files")
    }
  }

  return (
    <>
      <BackToHomePerfil />
      <button
        type="button"
        className="custom-btn"
        onClick={handleConsultFiles}>
        List files
      </button>
      <br />
      <div>
        {files.length > 0 && (
          <ul>
            {files.map((file,index) => (
              <li key={index}>
                <p className='pConsultDetails'><strong>Name file: </strong> {file}</p>
                <hr />
                <hr />
                <hr />
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  )
}

export default ListFiles