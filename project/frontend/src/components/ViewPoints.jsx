import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import Axios from 'axios';
import Header from './header';
import SideBar from './SideBar';

function ViewPoints() {
  const [userPoints, setUserPoints] = useState(null);

  useEffect(() => {
    // Make an API request to fetch user points
    Axios.get('http://127.0.0.1:8000/get-user-points/',{headers: {
        'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('token')}`, 
      },})
      .then((response) => {
        setUserPoints(response.data.points);
      })
      .catch((error) => {
        console.error('Error fetching user points:', error);
      });
  }, []);

  const sidebarStyle = {
    backgroundColor: 'rgb(193, 197, 197)',
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
    height: '100%',
    width: '100%',
  };

  const flexContainerStyle = {
    display: 'flex',
    backgroundColor: '#dfe1e6',
    height: '100vh',
    width: '100vw',
  };

  return (
    <div className="" style={containerStyle}>
      <Header />
      <div className="col-md-12 mb-3" style={flexContainerStyle}>
        <SideBar />
        <div className="col-md-9" style={mainContentStyle}>
          <div className="main-section">
            <h1>User Points</h1>
            {userPoints !== null ? (
              <p>User Points: {userPoints}</p>
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>
      </div>
      <footer style={{ backgroundColor: 'rgb(193, 197, 197)' }} className="text-center mt-0 mb-0">
        <p>Copyright &copy; 2023</p>
      </footer>
    </div>
  );
}

export default ViewPoints;
