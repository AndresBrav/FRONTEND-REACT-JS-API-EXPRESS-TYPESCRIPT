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
import AddCar from './components/Cars/AddCar'
import DeleteCar from './components/Cars/DeleteCar'
import GetCars from './components/Cars/GetCars'
import GetOneCar from './components/Cars/GetOneCar'
import UpdateCar from './components/Cars/UpdateCar'
import ListFiles from './components/Cars/Files/ListFiles'
import SaveFile from './components/Cars/Files/SaveFile'
import SaveOneFile from './components/Cars/Files/SaveOneFile'
import UploadFTP from './components/Cars/Files/UploadFTP'
import GenerateB64 from './components/Cars/Files/GenerateB64'
import ConvertB64toFile from './components/Cars/Files/ConvertB64toFile'

function App() {
  return (
    <>
      <TokenProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/homePerfil" element={<StartPerfil />} />
            <Route path="/consultdetails" element={<ConsultDetails />} />
            <Route path="/consultonedetail" element={<ConsultOneDetail />} />
            <Route path="/addUser" element={<AddUser />} />
            <Route path="/updateUser" element={<UpdateUser />} />
            <Route path="/deleteUser" element={<DeleteUser />} />
            <Route path="/getCars" element={<GetCars />} />
            <Route path="/getOneCar" element={<GetOneCar />} />
            <Route path="/addCar" element={<AddCar />} />
            <Route path="/updateCar" element={<UpdateCar />} />
            <Route path="/deleteCar" element={<DeleteCar />} />
            <Route path="/listFiles" element={<ListFiles />} />
            <Route path="/saveFile" element={< SaveFile />} />
            <Route path="/saveOneFile" element={< SaveOneFile />} />
            <Route path="/uploadFtp" element={< UploadFTP />} />
            <Route path="/generateB64" element={< GenerateB64 />} />
            <Route path="/convertB64toFile" element={< ConvertB64toFile />} />
          </Routes>
        </BrowserRouter>
      </TokenProvider>
    </>
  )
}

export default App
