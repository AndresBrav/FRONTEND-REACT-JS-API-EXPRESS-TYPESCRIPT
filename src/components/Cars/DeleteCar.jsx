import React, { useContext, useState } from 'react'
import { useAuthRedirect } from '../../hooks/useAuthRedirect'; /* import hook */
import { TokenContext } from '../../Contexts/TokenContext';
import axios from 'axios';
import BackToHomePerfil from '../Shared/BackToHomePerfil';

const API_CARS = import.meta.env.VITE_API_CARS;

const DeleteCar = () => {
  useAuthRedirect(); // Protect this page redirect login if don't find token
  const { keyAccess } = useContext(TokenContext);

  const [number, setNumber] = useState("")
  const [message, setMessage] = useState("")

  const handleConsultDelete = (e) => {
    setNumber(e.target.value)
  }

  const handleConsultDeleteButton = async () => {
    // try {
    //   const response = await axios.delete(`${API_USERS}delUsers/${number}`, {
    //     headers: {
    //       "x-api-token": keyAccess,
    //     },
    //   });
    //   console.log(response.data.msg);
    //   setMessage(response.data.msg)
    // } catch (error) {
    //   console.error("Error deleting user:", error);
    // }
    axios.delete(
      `${API_CARS}delCar/${number}`,
      {
        headers: {
          "x-api-token": keyAccess,
        },
      }
    )
      .then((response) => {
        console.log(response);
        setMessage(response.data.msg)
      })
      .catch((error) => {
        console.log("error deleting car")
      })
  }


  return (
    <>
      <BackToHomePerfil />
      <div className='labelconsult'>Delete Car</div>

      <label className='labelconsult' >Ingrese un número</label>
      <div className='labelconsult'>
        <input
          type="text"
          placeholder="Number"
          value={number}
          onChange={handleConsultDelete}
        />
      </div>
      <button
        type="button"
        className="custom-btn"
        onClick={handleConsultDeleteButton}>
        Delete One Car
      </button>
      <div>
        {message && <p className='pConsultDetails'>{message}</p>}
      </div>
    </>
  )
}

export default DeleteCar