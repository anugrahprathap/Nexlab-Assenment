
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser,faHome ,faRightToBracket, faDatabase} from '@fortawesome/free-solid-svg-icons';
import Axios from 'axios';


import { faCalendarCheck } from '@fortawesome/free-regular-svg-icons';
import ViewTask from './ViewTask';
import { Button } from 'bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext'; 
function SideBar(){
 
    const sidebarStyle = {
        backgroundColor: '#dfe1e6',
        width: '20%',
        padding: '10px',
        paddingTop: '80px',
        paddingLeft: '20px',
      };
    
      const mainContentStyle = {
        backgroundColor: 'white',
        width: '80%',
        padding: '20px',
        marginTop: '80px',
      };
    
      const containerStyle = {
        height: '100%', // Set the container height to 100%
        width: '100%',
      };
    
      const flexContainerStyle = {
        display: 'flex',
        backgroundColor: '#dfe1e6',
        height: '100vh', // Set the flex container height to 100%
        width: '100vw',
      };
    
    
      const iconStyle = {
       
          justifyContent: 'center', // Center horizontally
          alignItems: 'center', // Center vertically
          width: '20px',
          height: '15px',
          fontColor: '',
        };
    
    
      
      
      
    
      const [apps, setApps] = useState([]);
    
     
    return (
        <div className="col-md-3" style={sidebarStyle}>
          <a href="/home" className="btn btn-primary col-md-6 mb-3">
            <FontAwesomeIcon className='mx-1' style={{ ...iconStyle, color: 'white' }} icon={faHome} />Home</a>
            <br />
            <a href="/home" className="btn btn-outline-primary col-md-6 mb-3">
              
            <FontAwesomeIcon className='mx-1' style={{ ...iconStyle, color: '' }} icon={faUser} />Profile</a>
        
        <br />
        
        <Link to='/points'> 
        <button className="btn btn-outline-primary col-md-6 mb-3">
              
            <FontAwesomeIcon className='mx-1' style={{ ...iconStyle }} icon={faDatabase} />Points</button>
        </Link>
        <br />
        <Link to='/tasks'> 
        <button className="btn btn-outline-primary col-md-6 mb-3"        >
              
            <FontAwesomeIcon className="mx-1" style={{ ...iconStyle ,color: ''}} icon={faCalendarCheck} />Task</button>
        </Link>
        
        
        <br />
        <button className="btn btn-outline-primary col-md-6 mb-3">
              
            <FontAwesomeIcon onClick={{}} className=' mx-1' style={{ ...iconStyle, color: '' }} icon={faRightToBracket} />Logout</button>
        
        <br />
      
        </div>
    )
}

export default SideBar;