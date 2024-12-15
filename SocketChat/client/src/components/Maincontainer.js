import './mystyles.scss'
import React from 'react';
import Sidebar from './sidebar'
import Chatarea from './Chatarea';
import Welcome from './welcome';
import Creategroup from './Creategroups';
import { Outlet } from 'react-router-dom';

const Maincontainer = () => {
    return (
        <div className ='conatiner'>
            <Sidebar /> 
            <Outlet />
        </div>
    );
}

export default Maincontainer;
