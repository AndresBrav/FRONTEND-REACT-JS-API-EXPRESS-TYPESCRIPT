import React, { useContext, useState } from 'react'
import BackToHomePerfil from '../../Shared/BackToHomePerfil'
import { useAuthRedirect } from '../../../hooks/useAuthRedirect';
import { TokenContext } from '../../../Contexts/TokenContext';
import axios from 'axios'
const API_CARS = import.meta.env.VITE_API_CARS; /* http://localhost:3000/cars/ */

const SaveFile = () => {
  useAuthRedirect(); // Protect this page redirect login if don't find token
  const { keyAccess, setKeyAccess } = useContext(TokenContext);
  const [tipoGuardado, setTipoGuardado] = useState("")
  const [msg, setMsg] = useState("")
  const [archivoB64, setArchivoB64] = useState("")

  const handleSavedFormat = (e) => {
    setTipoGuardado(e.target.value)
  }

  const handleSavedFile = async () => {
    try {
      const response = await axios.post(
        `${API_CARS}savePdf/list/`,
        { tipoGuardado },
        {
          headers: {
            "x-api-token": keyAccess,
          },
        }
      )
      setMsg(response.data.msg)
      setArchivoB64(response.data.archivoB64
      )
      console.log(response)
    } catch (error) {
      console.log("Error saving file", error)
    }
  }

  return (
    <>
      <BackToHomePerfil />
      <label className='labelconsult' >Ingrese el formato pdf o txt</label>
      <div className='labelconsult'>
        <input
          type="text"
          placeholder="formato"
          value={tipoGuardado}
          onChange={handleSavedFormat}
        />
      </div>
      <button
        type="button"
        className="custom-btn"
        onClick={handleSavedFile}>
        Saved File list
      </button>
      <div>
        {msg && <p className='pConsultDetails'>{msg}</p>}
      </div>
      <div>
        {archivoB64 && <p className='pConsultDetails2'>{archivoB64}</p>}
      </div>
    </>
  )
}

export default SaveFile