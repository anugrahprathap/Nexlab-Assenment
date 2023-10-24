import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { useNavigate  } from 'react-router-dom';

import axios from 'axios';

function Login() {
  const config = require('./config.json');
  const serverAddress = config.serverAddress;
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [userRole, setUserRole] = useState(null);
    const navigate = useNavigate();
    let role =''
    
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        // Replace 'your_login_endpoint' with your actual login API endpoint
        const response = await axios.post(`${serverAddress}/login/`, {
          username: username,
          password: password,
        });
  
        if (response.status === 200) {
          role=response.data.data.role
            setUserRole(response.data.data.role);
            localStorage.setItem('token', response.data.token);
            console.log(response.data.token)
            if(role==='admin'){
                navigate('/add_app')
            }
            else{
                navigate('/home')
            }

          console.log(userRole,'Login successful');
        } else {
          // Handle login failure, e.g., show an error message
          console.error('Login failed');
        }
      } catch (error) {
        // Handle any API call errors, e.g., network issues
        console.error('Error while logging in:', error);
      }
    };

  const containerStyle = {
    height: '100vh',
    width: '100%',
  };

  const navbar = {
    display: 'flex',
    flexDirection:'row',
    backgroundColor: 'rgb(193, 197, 197)',
    height: '80px',
    width: '100vw',
  };

  const mainContentStyle = {
    backgroundColor: 'white',
    width: '100%',
   
    marginTop: '80px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };
  
  const iconContainerStyle = {
    justifyContent: 'center', // Center horizontally
    alignItems: 'center', // Center vertically
    width: '50px',
    height: '30px',
    fontColor: 'black',
  };

  return (
    <div className="" style={containerStyle}>
        
      <div className="">
      
        
        <div style={navbar}>
            <a href="/">
            <FontAwesomeIcon className='m-3' style={{ ...iconContainerStyle, color: '' }} icon={faHome} />
            </a>
        
            
        
        </div>
      
        <div className="col-md-4" style={mainContentStyle}>
          <form onSubmit={handleSubmit}>
            <div className="text-center mb-4">
              <h1>Login</h1>
            </div>
            <div className="form-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="form-group mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-primary col-md-5 mx-1 mb-2">Login</button>
              <br />    
              <span >New a user <a href="/login" style={{ textDecoration:'none'}}>Register?</a></span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
