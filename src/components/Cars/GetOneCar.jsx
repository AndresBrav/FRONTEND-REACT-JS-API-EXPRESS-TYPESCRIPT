import React, { useContext, useState } from 'react'
import BackToHomePerfil from '../Shared/BackToHomePerfil'
import { useAuthRedirect } from '../../hooks/useAuthRedirect';
import { TokenContext } from '../../Contexts/TokenContext';
import axios from 'axios'
const API_CARS = import.meta.env.VITE_API_CARS; /* http://localhost:3000/cars/ */

const GetOneCar = () => {
  useAuthRedirect(); // Protect this page redirect login if don't find token
  const { keyAccess, setKeyAccess } = useContext(TokenContext);
  const [car, setCar] = useState({})
  const [number, setNumber] = useState("")
  const [message, setMessage] = useState("")

  const handleConsultOneDetail = (e) => {
    setNumber(e.target.value)
  }

  const handleConsultOneDetails = async () => {
    try {
      const response = await axios.get(`${API_CARS}getOne/${number}`,
        {
          headers: {
            "x-api-token": keyAccess,
          },
        });

      if (response.data.msg) {
        setMessage(`the car with  id:${number} does not exist`)
        setCar({}) /* update user*/
      }
      else {
        console.log(response.data)
        setCar(response.data)
        setMessage("") /* update message */
      }
    } catch (error) {
      console.error("Error fetching cars:", error);
    }
  }

  return (
    <>
      <BackToHomePerfil />
      <div className='labelconsult'>ConsultOneDetail</div>

      <label className='labelconsult' >Enter the Car ID</label>
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
        className="custom-btn"
        onClick={handleConsultOneDetails}>
        Consult One Details
      </button>
      {car && Object.keys(car).length > 0 && (
        <>
          <p className='pConsultDetails'><strong>ID:</strong> {car.id}</p>
          <p className='pConsultDetails'><strong>Nombre:</strong> {car.nombre}</p>
          <p className='pConsultDetails'><strong>Descripcion:</strong> {car.descripcion}</p>
          <p className='pConsultDetails'><strong>Precio:</strong> {car.precio}</p>
          <p className='pConsultDetails'><strong>Stock:</strong> {car.stock}</p>
        </>
      )}

      <div>
        {message && <p className='pConsultDetails'>{message}</p>}
      </div>
    </>
  )
}

export default GetOneCar