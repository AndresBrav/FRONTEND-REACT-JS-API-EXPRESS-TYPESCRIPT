import React, { useContext, useEffect } from 'react'
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
      {/* {claveAcceso} */}
    </>
  )
}

export default StartPerfil