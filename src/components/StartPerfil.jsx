import React, { useContext, useEffect, useState } from 'react'
import { TokenContext } from '../Contexts/TokenContext';
import { Link, useNavigate } from 'react-router-dom';
// import '../assets/styles/designBackground.css'
import { useAuthRedirect } from "../hooks/useAuthRedirect";

const StartPerfil = () => {
  useAuthRedirect(); // Protect this page redirect login if don't find token
  const { keyAccess, setKeyAccess } = useContext(TokenContext);
  const navigate = useNavigate();



  const handleLogout = () => {
    setKeyAccess('');
    localStorage.removeItem("token");
    navigate("/")
  }

  return (
    <>
      <ul className='container-header'>
        <li><Link to="/consultdetails">Consult Details</Link></li>
        <li><Link to="/consultonedetail">Consult 1 Detail</Link></li>
        <li><Link to="/addUser">Add User</Link></li>
        <li><Link to="/updateUser">Update User</Link></li>
        <li><Link to="/deleteUser">Delete User</Link></li>
        <button type="button" className="btn btn-secondary" onClick={handleLogout}>Log out</button>
      </ul>
      {/* Menú desplegable para autos */}
      <div className='containerOptions'>
        <details>
          <summary>Cars Options</summary>
          <ul className='container-headerOptions'>
            <li><Link to="/getCars">Get Cars</Link></li>
            <li><Link to="/getOneCar">Get One Car</Link></li>
            <li><Link to="/addCar">Add Car</Link></li>
            <li><Link to="/updateCar">Update Car</Link></li>
            <li><Link to="/deleteCar">Delete Car</Link></li>
          </ul>
        </details>
      </div>
      
    </>
  )
}

export default StartPerfil