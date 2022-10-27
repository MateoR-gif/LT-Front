import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { io } from 'socket.io-client'
import ChatContainer from '../components/Chat/ChatContainer'
import ConnectedUsers from '../components/Chat/ConnectedUsers'
import { allConnectedUsersRoute, connectedUsersRoute, host } from '../utils/APIRoutes'

const socket = io(host)

export default function Chat(props) {
  // INSTANCIA DE USENAVIGATE //
  const navigate = useNavigate()
  // CONSTANTE CON LOS DATOS DEL USUARIO ACTUAL //
  const user = JSON.parse(localStorage.getItem("user"))
  // CONSTANTE QUE ALMACENA EL TIPO DE CHAT SELECCIONADO
  const [typeChat, setType] = useState(null)
  // CONSTANTE QUE ALMACENA LA INFORMACION DE PERFIL DE USUARIO
  const [userProfileData, setUserProfileData] = useState(null)

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

  //MÉTODO QUE TRAE EL ESTADO DEL USUARIO DEL COMPONENTE CONNECTED USERS
  const handleExtract = (data) => {
    setUserProfileData(data)
    setType('UserProfile')
  }

  //MÉTODO QUE DESCONECTA A TODOS LOS USUARIOS
  const disconnectAll = async() => {
    try {
      await axios.delete(allConnectedUsersRoute)
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div className='component__chat__container'>
      <div className='chat__controllers yellow'> {/* Botones */}
        <div className='title__container'>
          <h3 className='title yellow'>Bienvenido, 
          {user.rol === 'Admin' ? ` $${user.username}` : ` ~${user.username}`}</h3>
        </div>
        <button onClick={() => setType('Global')}>Chat Global</button>
        {user.rol === 'Admin' ? <button>Limpiar Chat Global</button> : null}
        {user.rol === 'Admin' ? <button onClick={disconnectAll}>Desconectar Usuarios (Todos)</button> : null}
        <button onClick={logOut}>Desconectarse</button>
      </div>
      <ChatContainer className='chat__container' type={typeChat} userProfileData={userProfileData}></ChatContainer>
      <ConnectedUsers className='connected__users' extractInfo={handleExtract}></ConnectedUsers>
    </div>
  )
}
