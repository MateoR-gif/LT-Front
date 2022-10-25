import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import { connectedUsersRoute, host } from '../../utils/APIRoutes'

const socket = io(host)

export default function ConnectedUsers() {
    // CONSTANTE QUE GUARDA LOS USUARIOS CONECTADOS
    const [connectedUsers, setConnectedUsers] = useState([])
    // CONEXIÓN CON LOS SOCKETS
    useEffect(() => {
        const userOff = (user) => {
            const temp = connectedUsers
            console.log(temp)
            console.log(user.username)
            setConnectedUsers(temp.filter((temp) => temp.username !== user.username))
        }
        const userOn = (user) => {
            setConnectedUsers([...connectedUsers, user])
        }
        socket.on("user-off", userOff)
        socket.on("user-on", userOn)
        return () => {
            socket.off("user-off", userOff)
            socket.off("user-on", userOn)
        }
    }, [connectedUsers])
    // CARGA LOS USUARIOS CONECTADOS AL CARGAR EL COMPONENTE
    useEffect(() => {
        getConnectedUsers()
    }, [])
    // MÉTODO QUE CARGA LOS USUARIOS
    const getConnectedUsers = async () => {
        try {
            const usersOn = await axios.get(connectedUsersRoute)
            setConnectedUsers(usersOn.data.users)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className='connected__users'>
            <div className='orange'>
                <h1>Usuarios Conectados</h1>
                {
                    connectedUsers.length === 0 ? 'No hay usuarios conectados' : connectedUsers.map((user) => {
                        return (
                            <div>
                                {'> '}{user.username}
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
