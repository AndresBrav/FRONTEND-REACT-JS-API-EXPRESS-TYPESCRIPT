import React, { useContext, useState } from 'react'
import BackToHomePerfil from '../../Shared/BackToHomePerfil'
import { useAuthRedirect } from '../../../hooks/useAuthRedirect';
import { TokenContext } from '../../../Contexts/TokenContext';
import axios from 'axios'
const API_CARS = import.meta.env.VITE_API_CARS;

const GenerateB64 = () => {
  useAuthRedirect(); // Protect this page redirect login if don't find token
  const { keyAccess, setKeyAccess } = useContext(TokenContext);
  const [nombreArchivo, setNombreArchivo] = useState("");
  const [msg, setMsg] = useState("")
  const [base64, setBase64] = useState("")

  const handleGenerateBase64 = async () => {
    const response = await axios.post(
      `${API_CARS}returnBase64File`,
      { nombreArchivo },
      {
        headers: {
          "x-api-token": keyAccess,
        },
      }
    )
    console.log(response)
    setMsg(response.data.msg)
    setBase64(response.data.base64)
  }

  const handleDecodeB64 = () => {
    window.open('https://base64.guru/converter/decode/file',
       '_blank',
        'noopener,noreferrer');
  }


  return (
    <>
      <BackToHomePerfil />
      <label className='labelconsult' >Enter the name file </label>
      <div className='labelconsult'>
        <input
          type="text"
          placeholder="name file"
          value={nombreArchivo}
          onChange={(e) => setNombreArchivo(e.target.value)}
        />
      </div>
      <button
        type="button"
        className="custom-btn"
        onClick={handleGenerateBase64}>
        Generate B64
      </button>
      <br />
      <div>
        {msg && <p className='pConsultDetails'>{msg}</p>}
      </div>
      <div>
        {base64 && <p className='pConsultDetails2'>{base64}</p>}
      </div>
      <button
        type="button"
        className="custom-btn"
        onClick={handleDecodeB64}>
        View B64
      </button>
    </>
  )
}

export default GenerateB64