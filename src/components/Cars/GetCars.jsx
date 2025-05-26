import React, { useContext, useState } from 'react'
import BackToHomePerfil from '../Shared/BackToHomePerfil'
import { useAuthRedirect } from '../../hooks/useAuthRedirect';
import { TokenContext } from '../../Contexts/TokenContext';
import axios from 'axios'


const API_CARS = import.meta.env.VITE_API_CARS; /* http://localhost:3000/cars/ */

const GetCars = () => {
  useAuthRedirect(); // Protect this page redirect login if don't find token
  const { keyAccess, setKeyAccess } = useContext(TokenContext);
  const [cars, setCars] = useState([])

  const handleConsultCars = async () => {
    try {
      const response = await axios.get(
        `${API_CARS}`,
        {
          headers: {
            "x-api-token": keyAccess,
          },
        })
      console.log(response)
      setCars(response.data)  /* we fill the array with the cars */

    } catch (error) {
      console.log("error fetching datas")
    }
  }


  return (
    <>
      <BackToHomePerfil />
      <button
        type="button"
        className="custom-btn"
        onClick={handleConsultCars}>
        Consult Cars
      </button>
      <div>
        {cars.length > 0 && (
          <ul>
            {cars.map((car) => (
              <li key={car.id}>
                <p className='pConsultDetails'><strong>ID:</strong> {car.id}</p>
                <p className='pConsultDetails'><strong>Nombre:</strong> {car.nombre}</p>
                <p className='pConsultDetails'><strong>Descripcion:</strong> {car.descripcion}</p>
                <p className='pConsultDetails'><strong>Precio:</strong> {car.precio}</p>
                <p className='pConsultDetails'><strong>Stock:</strong> {car.stock}</p>
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

export default GetCars