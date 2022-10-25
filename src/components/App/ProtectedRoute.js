import React from 'react'
import { Navigate } from 'react-router-dom'

export default function ProtectedRoute({ children }) {
    //CONSTANTE QUE ALMACENA EL TOKEN DEL USER
    const user = localStorage.getItem("user")
    //CONDICION QUE VALIDA SI EL USER EXISTE
    //SI NO EXISTE, DEVUELVE AL LOGIN
    if(!user){
        return <Navigate to='/login'></Navigate>
    }
    //SI EXISTE, MUESTRA EL CHAT
    return (
        <>{children}</>
    )
}
