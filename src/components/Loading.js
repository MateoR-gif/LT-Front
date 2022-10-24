import React, { useCallback, useEffect, useState } from 'react'
import { GlobalMsgRoute } from '../utils/APIRoutes'
import loading from "../assets/loading.gif"
import axios from 'axios'

export default function Loading({ children }) {

    const [error, setError] = useState('Cargando...')

    const [isLoading, setIsLoading] = useState(true)

    const getGlobalMessages = useCallback(async () => {
        try {
            await axios.get(GlobalMsgRoute)
            setError("Cargando... Listo")
            setTimeout(() => {
                setIsLoading(false)
            }, 1000)
        } catch (error) {
            setError("Nuestros servicios no están disponibles")
        }
    }, [])

    useEffect(() => {
        getGlobalMessages()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if(isLoading){
        return(
            <div>
                <img src={loading} />
                {error}
            </div>
        )
    }
    return (
        <div>{children}</div>
    )
}
