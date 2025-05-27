import React, { useContext, useState } from 'react'
import BackToHomePerfil from '../../Shared/BackToHomePerfil'
import { useAuthRedirect } from '../../../hooks/useAuthRedirect';
import { TokenContext } from '../../../Contexts/TokenContext';
import axios from 'axios'
const API_CARS = import.meta.env.VITE_API_CARS;

const ConvertB64toFile = () => {

  useAuthRedirect(); // Protect this page redirect login if don't find token
  const { keyAccess, setKeyAccess } = useContext(TokenContext);
  const [base64Data, setBase64Data] = useState("");
  const [nombreArchivo, setNombreArchivo] = useState("")
  const [extension, setExtension] = useState("pdf")
  const [msg, setMsg] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(base64Data)
    console.log(extension)
    try {
      const response = await axios.post(
        `${API_CARS}ConvertBase64toFile`,
        { base64Data, nombreArchivo, extension },
        {
          headers: {
            "x-api-token": keyAccess,
            "Content-Type": "application/json"
          },
        }
      )
      console.log(response)
      setMsg(response.data.msg)
    } catch (error) {
      console.log("Error converting b64")
      console.error("❌ Error response:", error.response.data);
    }
  }


  return (
    <>
      <BackToHomePerfil />
      <div>
        {msg && <p className='pConsultDetails'>{msg}</p>} {/* message */}
      </div>
      <div className="d-flex justify-content-center align-items-center">
        <form onSubmit={handleSubmit} className="p-4 border rounded" style={{ minWidth: "300px" }}>
          

          <textarea
            placeholder="Write a B64"
            value={base64Data}
            onChange={(e) => setBase64Data(e.target.value)} // limpia espacios ocultos
            className="form-control mb-3"
            rows={10}
          />

          <input
            type="text"
            placeholder="Write a name file"
            value={nombreArchivo}
            onChange={(e) => setNombreArchivo(e.target.value)}
            className="form-control mb-3"
          />

          <select
            value={extension}
            onChange={(e) => setExtension(e.target.value)}
            className="my-select"
          >
            <option className='my-select-option' value="pdf">pdf</option>
            <option className='my-select-option' value="txt">txt</option>
          </select>

          <br />
          <br />
          <button type="submit" className="btn-form">Enviar</button>
        </form>
      </div>
    </>
  )
}

export default ConvertB64toFile
