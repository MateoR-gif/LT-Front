import React from 'react'
import { useState, useEffect } from 'react'
import { host, loginRoute } from '../utils/APIRoutes'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import { io } from 'socket.io-client'

const socket = io(host)

export default function Login({ extractInfo }) {
    // INSTANCIA DEL USENAVIGATE //
    const navigate = useNavigate()
    // USE EFFECT //
    useEffect(() => {
        if (localStorage.getItem("user")) {
            navigate("/")
        }
    }, [navigate])
    // CONSTANTE PARA LOS DATOS DEL USUARIO //
    const [user, setUser] = useState({
        email: "",
        password: ""
    })
    // CONSTANTE PARA LOS MENSAJES DE ERROR //
    const [error, setError] = useState('')
    // MÉTODO QUE ACTUALIZA LOS DATOS DEL USUARIO //
    const handleChange = ({ target: { name, value } }) => {
        setError("")
        setUser({ ...user, [name]: value })
    }

    //MÉTODO QUE CONTROLA EL LOGIN//
    const handleSummit = () => {
        if (handleValidate()) {
            login()
        }
    }

    // MÉTODO QUE VALIDA LOS DATOS DEL FORMULARIO//
    const handleValidate = () => {
        var emailValido = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        if (!user.email.match(emailValido)) {
            setError('Por favor ingrese un email válido')
            return false
        } else if (user.password.length < 6) {
            setError('La contraseña debe tener mínimo 6 caracteres')
            return false
        }
        return true
    }

    // MÉTODO LOGIN //
    const login = async () => {
        try {
            const login = await axios.post(loginRoute, user)
            if (login.data.ok) {
                delete login.data.user.password
                extractInfo(login.data.user.rol)
                delete login.data.user.rol
                localStorage.setItem("user", JSON.stringify(login.data.user))
                socket.emit("user-on", login.data.user)
                navigate("/")
            }
        } catch (error) {
            setError(error.response.data.msg)
        }
    }
    return (
        <div className='component__container'>
            <div className='form__container'>
                <div className='title__container'>
                    <h2 className='orange'>{'>'} Let's Talk</h2>
                </div>
                <div className='email input__container'>
                    <input
                        className='email__input'
                        type='email'
                        name='email'
                        onChange={handleChange}
                        // eslint-disable-next-line no-template-curly-in-string
                        placeholder='> E-Mail: ${email}'
                        autoComplete='off'
                    />
                </div>
                <div className='password input__container'>
                    <input
                        className='password__input'
                        type='password'
                        name='password'
                        onChange={handleChange}
                        // eslint-disable-next-line no-template-curly-in-string
                        placeholder='> Contraseña: ${password}'
                    />
                </div>
                <div className='control__buttons'>
                    <div className='login__button__container input__container'>
                        <button onClick={handleSummit} className='login__button'>Ingresar</button>
                    </div>
                    <div className='link__register__container'>
                        <Link to={'/register'}>{'>'} Registrarse</Link>
                    </div>
                </div>
                <div className='error__msg__container'>
                    <p className='error__msg orange'>{error}</p>
                </div>
            </div>
        </div>
    )
}
