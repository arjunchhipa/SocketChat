import './index.scss'
import { useSelector } from 'react-redux';
const PreviousMesssages = ({ Prvmsg , you}) => {

    return (
        <div>
            <div className='Main-Message-area'>
                 {Prvmsg.map((indimsg,index) => (
                    <div key={index} className={you === indimsg.Username ? 'self-msg' : 'rando-msg'}>
                        <div className='upperflex'>
                        <div className='SendedByName'>{indimsg.Username.charAt(0).toUpperCase() + indimsg.Username.slice(1)}</div>
                        <div className='TimeStampOfMessage'> {new Date(indimsg.Time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                        </div>
                        <p className='Message-itself'>{indimsg.ActualMessage}</p>
                    </div>
                 ))}
            </div>
        </div>
    );
}

export default PreviousMesssages;