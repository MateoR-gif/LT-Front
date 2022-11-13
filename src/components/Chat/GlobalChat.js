import axios from 'axios'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { io } from 'socket.io-client'
import { GlobalMsgRoute, host } from '../../utils/APIRoutes'

//INSTANCIA DEL CLIENTE SOCKET
const socket = io(host)

export default function GlobalChat() {
    
    // CONSTANTE QUE GUARDA LA NOTIFICACION
    const [notify, setNotify] = useState('')
    // CONSTANTE QUE GUARDA EL ESTADO 'istyping'
    const [isTyping, setIsTyping] = useState(false)
    // CONSTANTE QUE ALMACENA EL USUARIO
    const user = JSON.parse(localStorage.getItem("user"))
    // CONSTANTE QUE ALMACENA LOS MENSAJES
    const [messages, setMessages] = useState([])
    // CONSTANTE QUE ALMACENA EL MENSAJE QUE SE VA A ENVIAR
    const [toSend, setToSend] = useState({
        message: '',
        from: user.username
    })
    //CONSTANTE QUE TIENE LA REFERENCIA DEL ULTIMO MENSAJE RECIBIDO
    const messagesRef = useRef(null)
    // MÉTODO QUE ACTUALIZA EL ESTADO DEL MENSAJE QUE SE VA A ENVIAR
    const handleChange = ({ target: { name, value } }) => {
        socket.emit('typing', true)
        setIsTyping(true)
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
    useEffect(() => {
        if (toSend.message === '') {
            setTimeout(() => {
                setIsTyping(false)
                socket.emit('noTyping', false)
            }, 1000)
        }
    }, [toSend])
    // USEEFFECT
    useEffect(() => {
        getGlobalMessages()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    //USE EFFECT QUE HACE SCROLL AL ULTIMO MENSAJE
    useEffect(() => {
        messagesRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages])
    // USE EFFECT QUE SE COMUNICA CON LOS SOCKETS
    useEffect(() => {
        const someoneTyping = (data) => {
            setIsTyping(data)
        }
        const recieveMessage = (message) => {
            setMessages([...messages, {
                message: message.message,
                from: message.from
            }])
        }
        socket.on("message", recieveMessage)
        socket.on("typing", someoneTyping)
        socket.on("noTyping", someoneTyping)
        socket.on('clean-global-chat', (data) => {
            setMessages('')
            setIsTyping(false)
            setNotify(data)
            setTimeout(() => {
                setNotify('')
            }, 1000)
        })
        return () => {
            socket.off("message", recieveMessage)
            socket.off("typing", someoneTyping)
            socket.off("noTyping", someoneTyping)
            socket.off('clean-global-chat', (data) => {
                setMessages('')
                setIsTyping(false)
                setNotify(data)
                setTimeout(() => {
                    setNotify('')
                }, 1000)
            })
        }
    }, [messages])
    // MÉTODO QUE ENVÍA EL MENSAJE
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await axios.post(GlobalMsgRoute, toSend)
            socket.emit('message', toSend)
            const newMessage = {
                message: toSend.message,
                from: 'Tú'
            }
            setToSend({ ...toSend, message: '' })
            setMessages([...messages, newMessage])
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className='yellow chat__container'>
            <div className='global__chat__container'>
                <div className='title__container'>
                    <h3 className='title yellow'>Chat Global</h3>
                </div>
                <div className='messages__container'>
                    {
                        messages.length === 0 ? 'No hay mensajes' : messages.map((message, index) => {
                            return (
                                <div key={index}>
                                    <p className='orange'></p>
                                    {message.from === user.username
                                    ?
                                    <p className='yellow'>Tú, dice: {message.message}</p>
                                    :
                                    <p className='orange'>{message.from}, dice: {message.message}</p>
                                    }
                                </div>
                            )
                        })
                    }
                    <div ref={messagesRef}/>
                </div>
                <div className='chat__input__container'>
                    <form onSubmit={handleSubmit} className='form__chat'>
                        <input
                            onChange={handleChange}
                            name='message'
                            className='chat__input'
                            value={toSend.message}
                            maxLength={101}
                            autoComplete='off'
                        />
                        <button className='button__chat'>Enviar</button>
                    </form>
                    <div>
                        <p className=''>{isTyping ? 'Alguien está escribiendo...' : '...'}</p>
                        <p>{notify}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}