import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useSelector , useDispatch} from 'react-redux';
import { ConstantServerURL } from "../../ConstUrl";
import "./index.scss";
import { TURNOFF, TURNON } from "../../redux/slices/loaderslice";

const Adduser = () => {
  const [Useremail, setUeremail] = useState("");

  const Loader = useSelector((state => state.Loader))
  const dispatch = useDispatch();

  const HandleOnUserEmailSubmit = async (e) => {
    dispatch(TURNON())
    e.preventDefault();
    const AuthToken = localStorage.getItem("AuthToken");
    try {
      const response = await fetch(`${ConstantServerURL}/add`, {
        method: "POST",
        headers: {
          authorization: AuthToken,
          "content-type": "application/json",
        },
        body: JSON.stringify({ Useremail }),
      });
      const json = await response.json();
      toast(`${json.msg}`);
      dispatch(TURNOFF());
    } catch (error) {
      dispatch(TURNOFF());
      console.error("Error", error);
    }
     
  };

  return (
    <div className="Main-welcome">
      <div className="Navtop"></div>
      <div className="Chatarea">

        {Loader ?(
          <div className="loader-container">
            <span className="loader"></span>
          </div>
        ) : (
          <form onSubmit={HandleOnUserEmailSubmit}>
          <div className="create-groups-flex">
            <label htmlFor="groupName">User Email:</label>
            <input
              onChange={(e) => {
                setUeremail(e.target.value);
              }}
              type="email"
              id="groupName"
              name="groupName"
              required
            />
            <button type="submit">Add to Chat</button>
          </div>
        </form>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Adduser;
