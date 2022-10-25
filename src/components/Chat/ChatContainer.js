import React from 'react'
import GlobalChat from './GlobalChat'
import slowLoading from "../../assets/slowLoading.gif"

export default function ChatContainer(props) {
    //CONSTANTE QUE ALMACENA EL TIPO DEL CHAT EN PANTALLA
    const typeChat = props.type
    //CONDICIONALES QUE RENDERIZAN DEPENDIENDO DEL TIPO DE CHAT
    switch (typeChat) {
        case null:
            return (
                <div className='chat__container yellow'>
                    <div className='title__container center'>
                        <h3 className='title yellow'>Seleccione un Chat</h3>
                    </div>
                    <img src={slowLoading} alt='slowloading.gif'></img>
                </div>
            )
        case 'Global':
            return (
                <GlobalChat className='chat__container'></GlobalChat>
            )
        default:
            break;
    }
}
