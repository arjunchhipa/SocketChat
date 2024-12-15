import './index.scss'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

const Chats = ({Chatid, you}) => {
    const Messages = useSelector((state) => state.Messages);
    const FilteredMessages = Messages.filter(obj => obj.MsgId === Chatid)
    console.log(Messages)
    return (
        <div>
            <div className='Main-Message-area'>
                 {FilteredMessages.map((indimsg,index) => (
                    <div key={index} className={you === indimsg.SendedBy ? 'self-msg' : 'rando-msg'}>
                        <div className='upperflex'>
                        <div className='SendedByName'>{indimsg.SendedBy.charAt(0).toUpperCase() + indimsg.SendedBy.slice(1)}</div>
                        <div className='TimeStampOfMessage'> {new Date(indimsg.Timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                        </div>
                        <p className='Message-itself'>{indimsg.ActualMessage}</p>
                    </div>
                 ))}
            </div>
        </div>
    );
}

export default Chats;