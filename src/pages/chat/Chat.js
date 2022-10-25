import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { io } from 'socket.io-client'
import ChatContainer from '../../components/ChatContainer'
import ConnectedUsers from '../../components/ConnectedUsers'
import { connectedUsersRoute, host } from '../../utils/APIRoutes'

const socket = io(host)

export default function Chat() {
  // INSTANCIA DE USENAVIGATE //
  const navigate = useNavigate()
  // CONSTANTE CON LOS DATOS DEL USUARIO ACTUAL //
  const user = JSON.parse(localStorage.getItem("user"))
  // METODO QUE CONTENGA EL TIPO DE CHAT SELECCIONADO
  const [typeChat, setType] = useState(null)

  // MÉTODO LOGOUT //
  const logOut = async () => {
    try {
      const data = {
        'username': user.username
      }
      await axios.delete(connectedUsersRoute, { data })
      socket.emit('user-off', user)
      localStorage.removeItem('user')
      navigate("/login")
    } catch (error) {
      console.log(error)
    }

  }

  return (
    <div className='component__chat__container'>
      <div className='chat__controllers'> {/* Botones */}
        <h3 className='orange'>Bienvenido, {user.username}</h3>
        <button onClick={() => setType('Global')}>Chat Global</button>
        <button onClick={logOut}>LogOut</button>
      </div>
      <ChatContainer type={typeChat}></ChatContainer>
      <ConnectedUsers></ConnectedUsers>
    </div>
  )
}
