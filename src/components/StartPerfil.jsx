import React, { useContext } from 'react'
import { TokenContext } from '../Contexts/TokenContext';
const StartPerfil = () => {
  const { claveAcceso } = useContext(TokenContext);
  return (
    <>
      <div>StartPerfil</div>
      {claveAcceso}
    </>
  )
}

export default StartPerfil