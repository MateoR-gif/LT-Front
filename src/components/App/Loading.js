import React, { useCallback, useEffect, useState } from 'react'
import { GlobalMsgRoute } from '../../utils/APIRoutes'
import loading from "../../assets/loading.gif"
import slowLoading from "../../assets/slowLoading.gif"
import axios from 'axios'

export default function Loading({ children }) {
    //CONSTATE QUE GUARDA EL MENSAJE DE ERROR
    const [error, setError] = useState('> Cargando...')
    //CONSTANTE QUE GUARDA EL GIF
    const [gif, setGif] = useState(loading)
    //CONSTANTE QUE CONTROLA EL ESTADO CARGANDO
    const [isLoading, setIsLoading] = useState(true)
    //METODO QUE VERIFICA LA CONEXION
    const getGlobalMessages = useCallback(async () => {
        try {
            await axios.get(GlobalMsgRoute)
            setError("> Cargando... Listo")
            setTimeout(() => {
                setIsLoading(false)
            }, 1000)
        } catch (error) {
            setError("Nuestros servicios no están disponibles")
            setGif(slowLoading)
        }
    }, [])
    //USE EFFECT QUE EJECUTA EL GET GLOBAL AL CARGAR LA PAGINA
    useEffect(() => {
        getGlobalMessages()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if(isLoading){
        return(
            <div className='charger__container'>
                <h1 className='orange'>{error}</h1>
                <img src={gif} alt='loading.gif'></img>
            </div>
        )
    }
    return (
        <div>{children}</div>
    )
}
