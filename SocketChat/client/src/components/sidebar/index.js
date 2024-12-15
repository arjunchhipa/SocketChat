import { useState, useEffect } from "react";
import { FaRegUserCircle, FaRandom } from "react-icons/fa";
import { TiGroup } from "react-icons/ti";
import { IoMdPersonAdd, IoMdMoon } from "react-icons/io";
import { GoSearch } from "react-icons/go";
import { CiFilter } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import "./index.scss";
import "../mystyles.scss";
import { useDispatch, useSelector } from "react-redux";
import { TURNOFF } from "../../redux/slices/loaderslice";
import { Link } from "react-router-dom";
import { ConstantServerURL } from "../../ConstUrl";



const Sidebar = () => {
  const navigate = useNavigate();
  const Loader = useSelector((state) => state.Loader);
  const dispatch = useDispatch();
  const [chats, setchats] = useState(<div></div>);


  useEffect(() => {
    try {
      const LoadChats = async () => {
        const AuthToken = localStorage.getItem("AuthToken");
        const response = await fetch(`${ConstantServerURL}/allchats`, {
          method: "GET",
          headers: {
            "content-type": "application/json",
            authorization: AuthToken,
          },
        });
        const json = await response.json();
        setchats(<ChatFormat convo={json.conversations} you={json.you} yourmail={json.yourmail}/>);
        dispatch(TURNOFF());
      };
      LoadChats();
    } catch (error) {
      console.error("Error", error);
      dispatch(TURNOFF());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="Mainsidebar">
      <div className="navheader">
        <span className="icons mainuser">
          <FaRegUserCircle />
        </span>
        <span className="icons">
          <FaRandom />
        </span>
        <span
          onClick={() => {
            navigate("add");
          }}
          className="icons"
        >
          <IoMdPersonAdd />
        </span>
        <span className="icons">
          <IoMdMoon />
        </span>
        <span
          onClick={() => {
            navigate("creategroup");
          }}
          className="icons"
        >
          <TiGroup />
        </span>
      </div>
      <div className="searchandfilter">
        <div className="search">
          <label htmlFor="myInput" className="searchicon">
            <GoSearch />
          </label>
          <input
            type="text"
            id="myInput"
            placeholder="Search chat"
            className="searchinput"
          />
        </div>
        <div className="filter">
          <CiFilter />
        </div>
      </div>
      <div id="brute-forced" className="conversation">
        {Loader ? (
          <div className="loader-container">
            <span className="loader"></span>
          </div>
        ) : (
          chats
        )}
      </div>
      <div className="brute-forcing-the-overflow"></div>
    </div>
  );
};

const ChatFormat = ({ convo, you , yourmail }) => {
  const navigate = useNavigate();

  const HandleIndiConvoRender = (chatid) => {};

  return (
    <div className="chat-container">
      {convo.map((curConvo, index) => (
        <Link
          to={`./chat/${index}/${curConvo.chatname.find((name) => name !== you)}`}
          state={{ 
            chatid : curConvo.chatid, 
            SendedBy : curConvo.chatname.find((name) => name == you),
            ChatName : curConvo.chatname.find((name) => name !== you),
            you : you,
          }}
          key={index}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <div
            onClick={HandleIndiConvoRender(curConvo.chatid)}
            className={`indi-convo`}
          >
            <p className="convo-icon">
              {curConvo.chatname.find((name) => name !== you)?.[0]}
            </p>
            <p className="convo-name">
              {curConvo.chatname.find((name) => name !== you)}
            </p>
            <p className="convo-lastM">start chatting now</p>
            <p className="convo-timestamp">today</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Sidebar;
