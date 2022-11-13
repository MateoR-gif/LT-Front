import React from 'react'

export default function UserProfile(props) {

    const userProfileData = props.userProfileData
    const connectedAt = new Date(userProfileData.connectedAt)

    return (
        <div className='chat__container yellow'>
            <div className='title__container'>
                <h3 className='title yellow'>
                    {'> '}{userProfileData.username}
                </h3>
            </div>
            <p className='orange'>E-Mail: {userProfileData.email}</p>
            <p className='orange'>Conectado desde: {connectedAt.toLocaleString() === 'Invalid Date' ?
                'Recargue para obtener el dato' : connectedAt.toLocaleString()}</p>
        </div>
    )
}
