import React from 'react'
import GlobalChat from './GlobalChat'

export default function ChatContainer(props) {

    const typeChat = props.type

    switch (typeChat) {
        case null:
            return (
                <div className='component__container'>
                    <div className='form__container'>
                        <h4 className='yellow'>Seleccione un Chat</h4>
                    </div>
                </div>
            )
        case 'Global':
            return (
                <div className='chat__container'>
                    <GlobalChat></GlobalChat>
                </div>
            )
        default:
            break;
    }
}
