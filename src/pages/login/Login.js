import React from 'react'
import { useState } from 'react'

export default function Login() {
    // CONSTANTE PARA LOS DATOS DEL USUARIO //
    const [user, setUser] = useState({
        email: "",
        password: ""
    })
    // CONSTANTE PARA LOS MENSAJES DE ERROR //
    const [error, setError] = useState('Todo en Orden')
    // MÉTODO QUE ACTUALIZA LOS DATOS DEL USUARIO //
    const handleChange = ({ target: { name, value } }) => {
        console.log('El elemento: ' + name + ' cambió, se ingresó: ' + value)
        console.log('El estado de user contenía: ' + user[name] + ' lo voy a cambiar a: ' + value)
        setUser({ ...user, [name]: value })
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
                <button className='login__button'>Ingresar</button>
            </div>
            <div className='error__msg__container'>
                <p className='error__msg'>{error}</p>
            </div>
        </div>
    )
}
