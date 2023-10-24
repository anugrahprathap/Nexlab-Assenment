import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser,faHome ,faRightToBracket, faDatabase} from '@fortawesome/free-solid-svg-icons';
import Axios from 'axios';
import jwtDecode from 'jwt-decode';

import { faCalendarCheck } from '@fortawesome/free-regular-svg-icons';
import ViewTask from './ViewTask';
import Header from './header';

import SideBar from './SideBar';
function UserHome() {
  const [viewTaskVisible, setViewTaskVisible] = useState('');


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

  useEffect(() => {
    Axios.get('http://127.0.0.1:8000/get_all_apps/')
      .then((response) => {
        setApps(response.data);
      })
      .catch((error) => {
        console.error('Error fetching apps:', error);
      });
  }, []);

  return (
    <div className="" style={containerStyle}>
      <Header/>
      <div className="col-md-12 mb-3" style={flexContainerStyle}>
        <SideBar/>
        <div className="col-md-9" style={mainContentStyle}>
          <div className="main-section">
            
          
              
          </div>
        </div>
      </div>
      <footer style={{ backgroundColor: 'rgb(193, 197, 197)' }} className="text-center mt-0 mb-0">
        <p>Copyright &copy; 2023</p>
      </footer>
    </div>
  );
}

export default UserHome;
