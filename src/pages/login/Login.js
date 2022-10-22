import React from 'react'
import { useState, useEffect } from 'react'
import { loginRoute } from '../../utils/APIRoutes'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Login() {
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
        setError ("")
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
            console.log('Email inválido')
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
            console.log(login.data)
            if (login.data.ok) {
                delete login.data.user.password
                localStorage.setItem("user", JSON.stringify(login.data.user))
                console.log(localStorage.getItem("user"))
                navigate("/")
            }
        } catch (error) {
            console.log(error)
            setError(error.response.data.msg)
        }
    }
    return (
        <div className='login__container'>
            <div className='email__input__container'>
                <input
                    className='email__input'
                    type='email'
                    name='email'
                    onChange={handleChange}
                    placeholder='Correo'
                />
            </div>
            <div className='password__input__container'>
                <input
                    className='password__input'
                    type='password'
                    name='password'
                    onChange={handleChange}
                    placeholder='Contraseña'
                />
            </div>
            <div className='login__button__container'>
                <button onClick={handleSummit} className='login__button'>Ingresar</button>
            </div>
            <div className='error__msg__container'>
                <p className='error__msg'>{error}</p>
            </div>
        </div>
    )
}
