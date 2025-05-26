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
        {/* <button type="button" className="btn btn-dark" onClick={handleLogout}>Log out</button> */}
        <button type="button" className='logout-btn' onClick={handleLogout}>Log out</button>
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
        <details>
          <summary>File Cars Options</summary>
          <ul className='container-headerOptions'>
            <li><Link to="/saveFile">Save list Cars</Link></li>
            <li><Link to="/saveOneFile">Save One Car</Link></li>
            <li><Link to="/uploadFtp">Upload FTP</Link></li>
            <li><Link to="/generateB64">Generate B64</Link></li>
            <li><Link to="/convertB64toFile">Convert B64 to File</Link></li>
          </ul>
        </details>
      </div>
      
    </>
  )
}

export default StartPerfil