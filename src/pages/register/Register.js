import React, { useState } from 'react'

export default function Register() {
  const [error, setError] = useState('Todo en orden, putos!')
  const handleChange = ({ target: { name, value } }) => {
    setUser ({ ...user, [name]: value})
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
      <div className='password__input__container'>F
        <input
          className='password__input'
          type='password'
          name='password'
          onChange={handleChange}
          placeholder='Contraseña'
        />

      </div>
      <div className='register__buton__container'>
        <button className='register__button'> Registrarse </button>
      </div>
      <div className='error__msg__container'>
        <p className='error__msg'>{error}</p>
      </div>
    </div>
  )
}
