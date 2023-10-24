import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import Axios from 'axios';

import Header from './header';

import SideBar from './SideBar';
function UserHome() {




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

  const config = require('./config.json');
  const serverAddress = config.serverAddress;



    

  const [apps, setApps] = useState([]);

  useEffect(() => {
    Axios.get(`${serverAddress}/get_all_apps/`)
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
