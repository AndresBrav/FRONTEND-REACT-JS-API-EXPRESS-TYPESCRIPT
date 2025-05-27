import React, { useContext, useState } from 'react'
import BackToHomePerfil from '../../Shared/BackToHomePerfil'
import { useAuthRedirect } from '../../../hooks/useAuthRedirect';
import { TokenContext } from '../../../Contexts/TokenContext';
import axios from 'axios'
const API_CARS = import.meta.env.VITE_API_CARS; /* http://localhost:3000/cars/ */

const UploadFTP = () => {
  useAuthRedirect(); // Protect this page redirect login if don't find token
  const { keyAccess, setKeyAccess } = useContext(TokenContext);
  const [nombreArchivo, setNombreArchivo] = useState("");
  const [TipoTransferencia, setTipoTransferencia] = useState("binary");
  const [host, setHost] = useState("127.0.0.1");
  const [user, setUser] = useState("ftpuser");
  const [password, setPassword] = useState("123");
  const [msg, setMsg] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${API_CARS}uploadListServer`,
        { nombreArchivo, TipoTransferencia, host, user, password },
        {
          headers: {
            "x-api-token": keyAccess,
          },
        }
      )
      console.log(response)
      setMsg(response.data.msg)
    } catch (error) {
      console.log("Error uploading to FTP")
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
          <input
            type="text"
            placeholder="Write a name file"
            value={nombreArchivo}
            onChange={(e) => setNombreArchivo(e.target.value)}
            className="form-control mb-3"
          />

          <input
            type="text"
            placeholder="Write a type transfer"
            value={TipoTransferencia}
            onChange={(e) => setTipoTransferencia(e.target.value)}
            className="form-control mb-3"
          />

          <input
            type="text"
            placeholder="Write a host"
            value={host}
            onChange={(e) => setHost(e.target.value)}
            className="form-control mb-3"
          />

          <input
            type="text"
            placeholder="Write a user ftp"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            className="form-control mb-3"
          />

          <input
            type="text"
            placeholder="Write a user ftp password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control mb-3"
          />
          <button type="submit" className="btn-form">Enviar</button>
        </form>
      </div>
    </>
  )
}

export default UploadFTP