import React, { useState } from 'react'

export default function Register() {
  //CONSTANTE PARA LOS DATOS DEL USUARIO
  const [user, setUser] = useState ({
    email:'',
    password:'',
    repassword:'',
  }) 
  //CONSTANTE PARA LOS MENSAJES DE ERROR
  const [error, setError] = useState('')
  //MÉTODO QUE ACTUALIZA LOS DATOS DEL USUARIO
  const handleChange = ({ target: { name, value } }) => {
    setError ('') //LIMPIA EL MENSAJE DE ERROR
    setUser ({ ...user, [name]: value})
  }
  //METODO QUE MANEJA EL REGISTRO
  const handleSubmit = () => {
    if(handleValidate()) {
      console.log('Apto para registro')
    }else{
      console.log('No apto para el registro')
    }
  }
  //METODO QUE VALIDA EL FORMULARIO
  const handleValidate = () => {
    var emailValido = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    if(!user.email.match(emailValido)){
      console.log('Email inválido')
      setError('Por favor ingrese un email válido')
      return false
    }else if(user.password.length < 6){
      setError('La contraseña debe tener mínimo 6 caracteres')
      return false
    }else if(user.password !== user.repassword){
      setError('Las contraseñas no coinciden')
      return false
    }
    return true
  }
  return (
    <div className='register__container'>
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
    </div>
  )
}
