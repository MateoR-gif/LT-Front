import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import { GlobalMsgRoute, host } from '../utils/APIRoutes'

//INSTANCIA DEL CLIENTE SOCKET
const socket = io(host)

export default function GlobalChat() {

    // CONSTANTE QUE ALMACENA EL USUARIO
    const user = JSON.parse(localStorage.getItem("user"))
    // CONSTANTE QUE ALMACENA LOS MENSAJES
    const [messages, setMessages] = useState([])
    // CONSTANTE QUE ALMACENA EL MENSAJE QUE SE VA A ENVIAR
    const [toSend, setToSend] = useState({
        message: '',
        from: user.username
    })
    // MÉTODO QUE ACTUALIZA EL ESTADO DEL MENSAJE QUE SE VA A ENVIAR
    const handleChange = ({ target: { name, value } }) => {
        setToSend({ ...toSend, [name]: value })
    }
    // MÉTODO QUE OBTIENE LOS MENSAJES
    const getGlobalMessages = useCallback(async () => {
        try {
            const data = await axios.get(GlobalMsgRoute)
            setMessages(data.data.messages)
        } catch (error) {
            console.log(error)
        }
    }, [])
    // USEEFFECT
    useEffect(() => {
        getGlobalMessages()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    // USE EFFECT QUE SE COMUNICA CON LOS SOCKETS
    useEffect(() => {
        const recieveMessage = (message) => {
            setMessages([...messages, {
                message: message.message,
                from: message.from
            }])
        }
        socket.on("message", recieveMessage)
        return () => {
            socket.off("message", recieveMessage)
        }
    }, [messages])
    // MÉTODO QUE ENVÍA EL MENSAJE
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const enviar = await axios.post(GlobalMsgRoute, toSend)
            console.log(enviar)
            socket.emit('message', toSend)
            const newMessage = {
                message: toSend.message,
                from: 'Tú'
            }
            setMessages([...messages, newMessage])
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className='component__container'>
            <div className='form__container'>
                <div className='title__container'>
                    <h3 className='title orange yellow'>Chat Global</h3>
                </div>
                <div className='messages__container'>
                    {
                        messages.length === 0 ? 'No hay mensajes' : messages.map(message => {
                            return (
                                <div key={message._id}>
                                    <p className='orange'>{message.from === user.username ? 'Tú' : message.from}, dice: {message.message}</p>
                                </div>
                            )
                        })
                    }
                </div>
                <div className='chat__input__container'>
                    <form onSubmit={handleSubmit} className='form__chat'>
                        <input
                            onChange={handleChange}
                            name='message'
                            className='chat__input'
                            value={toSend.message}
                            autoComplete='off'
                        />
                        <button className='button__chat'>Enviar</button>
                    </form>
                </div>
            </div>
        </div>
    )
}