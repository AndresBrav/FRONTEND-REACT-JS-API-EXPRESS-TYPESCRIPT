import { useState } from 'react'
import axios from 'axios';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import StartPerfil from './components/StartPerfil';
import { TokenProvider } from './Contexts/TokenProvider'
import ConsultDetails from './components/Users/ConsultDetails';
import ConsultOneDetail from './components/Users/ConsultOneDetail';
import AddUser from './components/Users/AddUser'
import UpdateUser from './components/Users/UpdateUser'
import DeleteUser from './components/Users/DeleteUser'


function App() {
  return (
    <>
      <TokenProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/inicioPerfil" element={<StartPerfil />} />
            <Route path="/consultdetails" element={<ConsultDetails />} />
            <Route path="/consultonedetail" element={<ConsultOneDetail />} />
            <Route path="/addUser" element={<AddUser />} />
            <Route path="/updateUser" element={<UpdateUser />} />
            <Route path="/deleteUser" element={<DeleteUser />} />
          </Routes>
        </BrowserRouter>
      </TokenProvider>
    </>
  )
}

export default App
