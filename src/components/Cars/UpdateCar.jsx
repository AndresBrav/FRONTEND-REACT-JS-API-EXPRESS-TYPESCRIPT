import React, { useContext, useState } from 'react'
import BackToHomePerfil from '../Shared/BackToHomePerfil';
import { useAuthRedirect } from '../../hooks/useAuthRedirect';
import { TokenContext } from '../../Contexts/TokenContext';
import axios from 'axios';

const API_CARS = import.meta.env.VITE_API_CARS;

const UpdateCar = () => {

  useAuthRedirect(); // Protect this page redirect login if don't find token
  const [nombre, setNombre] = useState("")
  const [descripcion, setDescripcion] = useState("")
  const [precio, setPrecio] = useState(0)
  const [stock, setStock] = useState(0)
  const { keyAccess, setKeyAccess } = useContext(TokenContext);
  const [message, setMessage] = useState("")
  const [number, setNumber] = useState("")

  const handleConsultUpdate = (e) => {
    setNumber(e.target.value)
  }

  const handleGetCarDB = async () => {
    try {
      const response = await axios.get(`${API_CARS}getOne/${number}`, /* bring one user */
        {
          headers: {
            "x-api-token": keyAccess,
          },
        });

      console.log(response)

      if (response.data.msg) {
        setMessage(`the car with id: ${number} does not exists`)
        setNombre("")
        setDescripcion("")
        setPrecio(0)
        setStock(0)
      }
      else {
        setMessage("") /* update message */
        setNombre(response.data.nombre)
        setDescripcion(response.data.descripcion)
        setPrecio(response.data.precio)
        setStock(response.data.stock)
      }
    } catch (error) {
      console.error("Error fetching car:", error);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${API_CARS}updateCar/${number}`,
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
      console.log("Error updating car")
    }
  }


  return (
    <>
      <BackToHomePerfil />

      <div className='labelconsult'>Update Car</div>

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
        onClick={handleGetCarDB}>
        Bring Data Car
      </button>
      <div>
        {message && <p className='pConsultDetails'>{message}</p>} {/* message */}
      </div>
      <div className="d-flex justify-content-center align-items-center vh-100">
        <form onSubmit={handleSubmit} className="p-4 border rounded bg-dark" style={{ minWidth: "300px" }}>
          <input
            type="text"
            placeholder="Write a nombre"
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
            type="text"
            placeholder="Write a precio"
            value={precio}
            onChange={(e) => setPrecio(parseFloat(e.target.value))}
            className="form-control mb-3"
          />

          <input
            type="text"
            placeholder="Write a stock"
            value={stock}
            onChange={(e) => setStock(parseInt(e.target.value))}
            className="form-control mb-3"
          />
          <button type="submit" className="btn btn-secondary w-100">Enviar</button>
        </form>
      </div>

    </>
  )
}

export default UpdateCar