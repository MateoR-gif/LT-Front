import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Chat() {
  // INSTANCIA DE USENAVIGATE //
  const navigate = useNavigate()
  // CONSTANTE CON LOS DATOS DEL USUARIO ACTUAL //
  const user = JSON.parse(localStorage.getItem("user"))
  // MÉTODO LOGOUT //
  const logOut = () => {
    localStorage.removeItem('user')
    navigate("/login")
  }
  return (
    <div>
      Bienvenido al Chat, {user.username}
      <button onClick={logOut}>Salir</button>
    </div>
  )
}
