import React from 'react'
import { Link } from 'react-router-dom'
import '../../assets/styles/designFonts.css'

const BackToHomePerfil = () => {
    return (
        <div className='containerHome'>
            <Link className='containerHomeLi' to="/homePerfil">
                Back to home
            </Link>
        </div>
    )
}

export default BackToHomePerfil