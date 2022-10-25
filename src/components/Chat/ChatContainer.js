import React from 'react'
import GlobalChat from './GlobalChat'

export default function ChatContainer(props) {

    const typeChat = props.type

    switch (typeChat) {
        case null:
            return (
                <div className='chat__container'>
                    <h4 className='yellow'>Seleccione un Chat</h4>
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
