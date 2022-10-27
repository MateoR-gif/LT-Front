import React from 'react'

export default function UserProfile(props) {

    const userProfileData = props.userProfileData
    console.log(userProfileData)

    return (
        <div className='chat__container yellow'>
            <div className='title__container'>
                <h3 className='title yellow'>
                    {'> '}{userProfileData.username}
                </h3>
            </div>
        </div>
    )
}
