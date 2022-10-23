import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function NotFound() {

  const navigate = useNavigate()

  return (
    <div>
      <p>La ruta seeleccionada no fue encontrada y será redireccionado a la página principal</p>

      <button onClick={()=>navigate("/")}>Aceptar</button>
    </div>
  )
}