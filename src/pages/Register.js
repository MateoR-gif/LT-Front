import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom/dist'
import { loginRoute, registerRoute } from '../utils/APIRoutes'

export default function Register() {
  //INSTANCIA DEL USENAVIGATE
  const navigate = useNavigate()
  // USE EFFECT //
  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/")
    }
  }, [navigate])
  //CONSTANTE PARA LOS DATOS DEL USUARIO
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
    repassword: '',
  })
  //CONSTANTE PARA LOS MENSAJES DE ERROR
  const [error, setError] = useState('')
  //MÉTODO QUE ACTUALIZA LOS DATOS DEL USUARIO
  const handleChange = ({ target: { name, value } }) => {
    setError('') //LIMPIA EL MENSAJE DE ERROR
    setUser({ ...user, [name]: value })
  }
  //METODO QUE MANEJA EL REGISTRO
  const handleSubmit = async () => {
    setUser({ ...user, repassword: '' })
    if (handleValidate()) {
      try {
        delete user.repassword
        const registro = await axios.post(registerRoute, user)
        setError(registro.data.msg + ", Ingresando...")
        login()
      } catch (error) {
        setError(error.response.data.msg)
      }
    }
  }
  //METODO QUE VALIDA EL FORMULARIO
  const handleValidate = () => {
    var emailValido = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    if (!user.email.match(emailValido)) {
      console.log('Email inválido')
      setError('Por favor ingrese un email válido')
      return false
    } else if (user.username.length < 3 ) {
      setError('El nombre de usuario tiene que tener mínimo 3 caracteres')
      return false
    } else if (user.username.length > 15 ) {
      setError('El nombre de usuario no puede exceder los 15 caracteres')
      return false
    }
    else if (user.password.length < 6) {
      setError('La contraseña debe tener mínimo 6 caracteres')
      return false
    } else if (user.password !== user.repassword) {
      setError('Las contraseñas no coinciden')
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
    <div className='component__container'>
      <div className='form__container'>
        <div className='title__container'>
          <h2 className='orange'>{'>'} Let's Talk</h2>
        </div>
        <div className='username__input__container'>
          <input
            className='username__input'
            type='text'
            name='username'
            onChange={handleChange}
            // eslint-disable-next-line no-template-curly-in-string
            placeholder='> Nombre de Usuario: ${username}'
            autoComplete='off'
          />

        </div>
        <div className='email__input__container'>
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
        <div className='password__input__container'>
          <input
            className='password__input'
            type='password'
            name='password'
            onChange={handleChange}
            value={user.password}
            // eslint-disable-next-line no-template-curly-in-string
            placeholder='> Contraseña: ${password}'
          />

        </div>
        <div className='password__input__container'>
          <input
            className='password__input'
            type='password'
            name='repassword'
            onChange={handleChange}
            value={user.repassword}
            // eslint-disable-next-line no-template-curly-in-string
            placeholder='> Repetir Contraseña: ${repassword}'
          />

        </div>
        <div className='control__buttons'>
          <div className='register__buton__container'>
            <button className='register__button' onClick={handleSubmit}> Registrarse </button>
          </div>
          <div className='link__login__container'>
            <Link to={'/login'}>{'>'} Ya tengo una cuenta</Link>
          </div>
        </div>
        <div className='error__msg__container'>
          <p className='error__msg orange'>{error}</p>
        </div>
      </div>
    </div>
  )
}
