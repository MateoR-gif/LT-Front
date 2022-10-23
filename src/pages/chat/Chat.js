import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ChatContainer from '../../components/ChatContainer'

export default function Chat() {
  // INSTANCIA DE USENAVIGATE //
  const navigate = useNavigate()
  // CONSTANTE CON LOS DATOS DEL USUARIO ACTUAL //
  const user = JSON.parse(localStorage.getItem("user"))
  // METODO QUE CONTENGA EL TIPO DE CHAT SELECCIONADO
  const [typeChat, setType] = useState(null)

  // MÉTODO LOGOUT //
  const logOut = () => {
    localStorage.removeItem('user')
    navigate("/login")
  }

  return (
    <div className='component__chat__container'>
      <div className='chat__controllers'> {/* Botones */}
        <h3 className='orange'>Bienvenido, {user.username}</h3>
        <button onClick={() => setType('Global')}>Chat Global</button>
        <button onClick={logOut}>LogOut</button>
      </div>
      <ChatContainer type={typeChat}></ChatContainer>
    </div>
  )
}
