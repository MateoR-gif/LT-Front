import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import { connectedUsersRoute, host } from '../../utils/APIRoutes'

const socket = io(host)

export default function ConnectedUsers({ extractInfo }) {
    // CONSTANTE QUE GUARDA LA NOTIFICACION
    const [notify, setNotify] = useState('')
    // CONSTANTE QUE GUARDA LOS USUARIOS CONECTADOS
    const [connectedUsers, setConnectedUsers] = useState([])
    // CONEXIÓN CON LOS SOCKETS
    useEffect(() => {
        const userOff = (user) => {
            setNotify(`${user.username} se ha desconectado.`)
            setTimeout(() => {
                setNotify('')
            }, 1000)
            const temp = connectedUsers
            setConnectedUsers(temp.filter((temp) => temp.username !== user.username))
        }
        const userOn = (user) => {
            setNotify(`${user.username} se ha conectado.`)
            setTimeout(() => {
                setNotify('')
            }, 1000)
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
        <div className='yellow connected__users'>
            <div className=''>
                <div className='title__container'>
                    <h3 className='title yellow'>Usuarios Conectados</h3>
                </div>
                {
                    connectedUsers.length === 0 ? 'No hay usuarios conectados'
                        : connectedUsers.map((user, index) => {
                            return (
                                <div className='orange' key={index}>
                                    <p
                                        onClick={() => extractInfo(user)}
                                        className='connected__username'
                                    >{'> '}{user.username}</p>
                                </div>
                            )
                        })
                }
            </div>
            <div>
                {notify}
            </div>
        </div>
    )
}
