import React from "react";
import "./index.scss";
import { ToastContainer, toast } from "react-toastify";

const Creategroup = () => {

  const CreateGroupFunc = () => {
    toast("In development...")
  }

  return (
    <div className="Main-welcome">
      <div className="Navtop">
      </div>
      <div className="Chatarea">
        <form>
          <div className="create-groups-flex">
            <label htmlFor="groupName">Group Name:</label>
            <input type="text" id="groupName" name="groupName" required />
            <label htmlFor="groupDescription">Group Description:</label>
            <input type="text" id="groupDescription" name="groupDescription" required />
            <label htmlFor="groupMembers">Max Members:</label>
            <input type="Number" id="groupMembers" name="groupMembers" required />
            <button onClick={CreateGroupFunc} type="submit">Create Group</button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Creategroup;
