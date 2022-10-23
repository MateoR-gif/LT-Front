import axios from 'axios'
import React, {useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom/dist'
import { loginRoute, registerRoute } from '../../utils/APIRoutes'

export default function Register() {
  //INSTANCIA DEL USENAVIGATE 
  const navigate = useNavigate()
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
    if (handleValidate()) {
      try {
        delete user.repassword
        const registro = await axios.post(registerRoute, user)
        setError(registro.data.msg + " Ingresando")
        login()
      } catch (error) {

      }
    } else {
      console.log('No apto para el registro')
    }
  }
  //METODO QUE VALIDA EL FORMULARIO
  const handleValidate = () => {
    var emailValido = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    if (!user.email.match(emailValido)) {
      console.log('Email inválido')
      setError('Por favor ingrese un email válido')
      return false
    } else if (user.password.length < 6) {
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
    <div className='register__container'>
      <div className='username__input__container'>
        <input
          className='username__input'
          type='text'
          name='username'
          onChange={handleChange}
          placeholder='Nombre de usuario'
        />
      </div>
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
      <div className='password__input__container'>
        <input
          className='password__input'
          type='password'
          name='repassword'
          onChange={handleChange}
          placeholder='Repetir contraseña'
        />

      </div>
      <div className='register__buton__container'>
        <button className='register__button' onClick={handleSubmit}> Registrarse </button>
      </div>
      <div className='error__msg__container'>
        <p className='error__msg'>{error}</p>
      </div>
      <div className='link__login__container'>
        <Link to={'/login'}>Ya tengo una cuenta</Link>
      </div>
    </div>
  )
}
