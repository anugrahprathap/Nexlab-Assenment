import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import Axios from 'axios';

import Header from './header';
import SideBar from './SideBar';
import { useNavigate } from "react-router-dom";
function ViewTask() {

    const navigate = useNavigate(); 

  const iconStyleLogo = {
   
      justifyContent: 'center', // Center horizontally
      alignItems: 'center', // Center vertically
      width: '80px',
      height: '80px',
      fontColor: '',
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
    
    
    
    
      const config = require('./config.json');
      const serverAddress = config.serverAddress;

  const [apps, setApps] = useState([]);

  useEffect(() => {
    Axios.get(`${serverAddress}/get_all_apps/`,{headers: {
      'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`, 
    },})
      .then((response) => {
        console.log(response.data)
        setApps(response.data);
      })
      .catch((error) => {
        console.error('Error fetching apps:', error);
      });
  }, []);

  const hasCompletedTask = (appId) => {
    const headers = {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${localStorage.getItem('token')}`, // Replace with your authentication method
      };
    // Make an API request to check if data exists in the UploadImage database for the user and app
    Axios.get(`${serverAddress}/check_task_completion/${appId}/`,{headers})
      .then((response) => {
        console.log(response.data)
        if (response.data.completed) {
          alert('You have already completed this task.'); // Display a message
        } else {
            navigate(`/task/${appId}/`); // Navigate to the task detail page
        }
      })
      .catch((error) => {
        console.error('Error checking task completion:', error);
      });
  };

  return (
    <div className="" style={containerStyle}>
      <Header/>
      <div className="col-md-12 mb-3" style={flexContainerStyle}>
        <SideBar/>
        <div className="col-md-9" style={mainContentStyle}>
          <div className="main-section">
            
          <div className="" >
        
      {apps.map((app, index) => (
        <div key={index} style={{ backgroundColor: '#dfe1e6',border: '2px solid #a6a8ad',display:'flex',flexDirection:'row',justifyContent:'space-between', padding: '30px', margin: '5px' }}>
          
          
          <img style={iconStyleLogo} src= {app.logo}/>
          
          <div className='mx-3' style={{backgroundColor:''}}>
          <b  className="font-size-36 font-family-arial" style={{fontSize:'25px',fontFamily:'Arial, Helvetica, sans-serif'}}>{app.app_name}</b> <br />
          <span onClick={() => hasCompletedTask(app.id)}
          style={{ fontSize: '18px', fontFamily: 'Arial, Helvetica, sans-serif',textDecoration:'underline',color:'blue' }}>
            
                View detail {'>'}
              
           </span>
          </div>
            <div style={{width:'50%'}}></div>
            <button className='px-3 mb-3' style={{border:'1px solid lightgreen', backgroundColor:'lightblue',width:'100px', color:'black'}} >{app.app_point} Points</button>
        </div>
        ))}
            </div>
              
          </div>
        </div>
      </div>
      <footer style={{ backgroundColor: 'rgb(193, 197, 197)' }} className="text-center mt-0 mb-0">
        <p>Copyright &copy; 2023</p>
      </footer>
    </div>
  );
}

export default ViewTask;
