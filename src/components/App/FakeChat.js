import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import slowLoading from "../../assets/slowLoading.gif"
import { connectedUsersRoute } from '../../utils/APIRoutes'
import noBitches from '../../assets/noBitches.gif'

export default function FakeChat() {
    const navigate = useNavigate()
    const [isTrolled, setIsTrolled] = useState(false)
    const user = JSON.parse(localStorage.getItem("user"))
    const [msg, setMsg] = useState('no bitches?')
    const logout = async () => {
        setMsg('XDXDXDXDXD')
        const data = {
            'username': user.username
        }
        await axios.delete(connectedUsersRoute, { data })
        setTimeout(() => {
            localStorage.removeItem('user')
            navigate('/login')
        }, 5000)
    }
    const XD = () => {
        setIsTrolled(true)
    }
    if (isTrolled) {
        return (
            <div>
                <img src={noBitches} alt='no bitches?'></img>
                <p className='orange'>{msg}</p>
                <br></br>
                <button onClick={logout}>*agachar la cabeza e irse</button>
            </div>
        )
    }
    return (
        <div className='component__chat__container'>
            <div className='chat__controllers yellow'>
                <div className='title__container'>
                    <h3 className='title yellow'>Bienvenido, ${user.username}</h3>
                </div>
                <button onClick={XD}>Chat Global</button>
                <button onClick={XD}>Ver Usuarios Conectados</button>
                <button onClick={XD}>Limpiar Chat Global</button>
                <button onClick={XD}>Desconectar Usuarios (Todos)</button>
                <button onClick={XD}>Desconectarse</button>
            </div>
            <div className='chat__container yellow'>
                <div className='title__container center'>
                    <h3 className='title yellow'>Seleccione un Chat</h3>
                </div>
                <img src={slowLoading} alt='slowloading.gif'></img>
            </div>
            <div className='yellow connected__users'>
                <div className='title__container'>
                    <h3 className='title yellow'>Usuarios Conectados</h3>
                </div>
                <p
                    onClick={XD}
                    className='connected__username'
                >
                    {'> '}{user.username}
                </p>
            </div>
        </div>
    )
}
