import React from 'react'
import './index.scss'
import chatimg from '../../Assets/images/chat.gif'

const Welcome = () => {

    return (
        <div className='Main-welcome'>
            <div className="Navtop">
            </div>
            <div className="Chatarea">
                <p className='welcome'>
                    Welcome...
                </p>
                <img className='chatimg' src={chatimg} />
                <p className='desc'>
                    Get started now and connect effortlessly with friends and colleagues on our chat application!
                </p>
            </div>
            <div className="Inputarea">
            </div>
        </div>
    );
}



export default Welcome;
