import { useState } from 'react'
import axios from 'axios';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import StartPerfil from './components/StartPerfil';
import { TokenProvider } from './Contexts/TokenProvider'

function App() {
  return (
    <>
      <TokenProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/inicioPerfil" element={<StartPerfil />} />
          </Routes>
        </BrowserRouter>
      </TokenProvider>
    </>
  )
}

export default App
