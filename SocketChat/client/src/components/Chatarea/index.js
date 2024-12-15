import React from "react";
import './index.scss'
import { useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoSend } from "react-icons/io5";
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import Chats from "../Chats";
import { socket } from '../../socket'
import PreviousMesssages from '../previousmesssages'
import { flushmessages } from '../../redux/slices/messagesslice';
import { ConstantServerURL } from "../../ConstUrl";



const Chatarea = () => {

    var Message;
    const location = useLocation();
    const chatid = location.state.chatid;
    const dispatch = useDispatch()
    const [loader,setLoader] = useState(true)
    
    useEffect(() => {
        LoadPreviousMessages()
        dispatch(flushmessages("flushit"))
        socket.emit('leave-prev-chat');
        socket.emit('pv-chat', chatid)
    },[location.pathname])

    const [PrevChats, SetPrevChats] = useState([]);

    const LoadPreviousMessages = async () => {
        setLoader(true)
        const AuthToken = localStorage.getItem("AuthToken");
        const response = await fetch(`${ConstantServerURL}/allchats/getallmessages`, {
          method: "POST",
          headers: {
            "content-type": "application/json",
            authorization: AuthToken,
          },
          body: JSON.stringify({ chatid: chatid }),
        });
        const json = await response.json()
        SetPrevChats(json.previousmessages);
        setLoader(false)
      };
        
     
      const handlesendarrow = () => {
            socket.emit('send-message', {
                MsgId : location.state.chatid,
                ActualMessage : Message,
                SendedBy : location.state.SendedBy,
                Timestamp : new Date().toISOString()
            } , location.state.chatid)
            document.getElementById('myTextarea').value = '';
      }

    return (
        <div className="MainChatArea">
            <div className="Navtop">
                <Loadtopnav ChatName={`${location.state.ChatName}`} />
            </div>
            <div className="Chatarea">
                {loader ? (<>
                    <div className="loader-container">
                        <span className="loader"></span>
                    </div>
                </>) : (<>
                    {PrevChats == [] ? ( <></>) : (<>
                    <PreviousMesssages Prvmsg={PrevChats} you={location.state.you}/>
                </>)}
                </>)}
                
                <Chats Chatid={chatid} you={location.state.you}/>
            </div>
            <div id="appending" className="Inputarea">
                <div className="outer-text-area-styling">
                    <textarea 
                    rows='1' spellCheck="false"
                    id="myTextarea" onChange={(e) => Message=e.target.value} 
                    className="inputelem" 
                    placeholder="Type a message...."
                    />
                </div>
                <IoSend onClick={handlesendarrow} className="Send-chat-button" />
            </div>
        </div>
    );
}




const Loadtopnav = ({ChatName}) => {
    return(
        <div className="maintop">
            <div className="mainpfp">
                <FaUserCircle />
            </div>
            <div className="maintopic">
                <p className="topicname">
                    {ChatName}
                </p>
                <p className="topicstatus">
                    status
                </p>
            </div>
            <div className="maindelete">
                <MdDelete />
            </div>
        </div>
    );
}

export default Chatarea;

