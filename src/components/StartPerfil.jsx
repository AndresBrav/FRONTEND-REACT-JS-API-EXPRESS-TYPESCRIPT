import React, { useContext } from 'react'
import { TokenContext } from '../Contexts/TokenContext';
import { Link } from 'react-router-dom';
// import '../assets/styles/designBackground.css'

const StartPerfil = () => {
  const { claveAcceso } = useContext(TokenContext);
  return (
    <>
    <ul className='container-header'>
      <li><Link to="/consultdetails">Consult Details</Link></li>
      <li><Link to="/consultonedetail">Consult 1 Detail</Link></li>
      <li><Link to="/addUser">Add User</Link></li>
      <li><Link to="/updateUser">Update User</Link></li>
      <li><Link to="/deleteUser">Delete User</Link></li>
    </ul>
      
      {claveAcceso}
    </>
  )
}

export default StartPerfil