import React, { useContext, useState } from 'react'
import BackToHomePerfil from '../Shared/BackToHomePerfil';
import { useAuthRedirect } from '../../hooks/useAuthRedirect';
import { TokenContext } from '../../Contexts/TokenContext';
import axios from 'axios';

const API_CARS = import.meta.env.VITE_API_CARS;

const AddCar = () => {
  useAuthRedirect(); // Protect this page redirect login if don't find token

  const [nombre, setNombre] = useState("")
  const [descripcion, setDescripcion] = useState("")
  const [precio, setPrecio] = useState(0)
  const [stock, setStock] = useState(0)
  const { keyAccess, setKeyAccess } = useContext(TokenContext);
  const [message, setMessage] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevents page reloading
    console.log(nombre)
    console.log(descripcion)
    console.log(precio)
    console.log(stock)

    try {
      const response = await axios.post(`${API_CARS}addCar/`,
        { nombre, descripcion, precio, stock },
        {
          headers: {
            "x-api-token": keyAccess,
          },
        }
      )
      console.log(response)
      setMessage(response.data.msg)
    } catch (error) {
      console.log("Error adding car")
    }
  }

  return (
    <>
      <BackToHomePerfil />
      <div className='addUserDiv'>Add Car</div>
      {message && <p className='pConsultDetails'>{message}</p>}
      <br />
      <div className="d-flex justify-content-center align-items-center">
        <form onSubmit={handleSubmit} className="p-4 border rounded " style={{ minWidth: "300px" }}>
          <input
            type="text"
            placeholder="Write a name car"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="form-control mb-3"
          />

          <input
            type="text"
            placeholder="Write a descripcion"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            className="form-control mb-3"
          />

          <input
            type="number"
            placeholder="Write the price"
            value={precio}
            onChange={(e) => setPrecio(parseFloat(e.target.value))}
            className="form-control mb-3"
          />

          <input
            type="number"
            placeholder="Write a stock"
            value={stock}
            onChange={(e) => setStock(parseInt(e.target.value))}
            className="form-control mb-3"
          />

          <button type="submit" className="btn-form">Enviar</button>
        </form>
      </div>
    </>
  )
}

export default AddCar