import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function NotFound() {

  const navigate = useNavigate()

  return (
    <div>
      <p className='orange'>{'>'} La ruta seleccionada no fue encontrada y será redireccionado a la página principal</p>
      <br></br>
      <button onClick={()=>navigate("/")}>Aceptar</button>
    </div>
  )
}