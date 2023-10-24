import React,{ useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';


function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const config = require('./config.json');
    const serverAddress = config.serverAddress;
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    console.log(formData.get('username'))
    try {
      const apiUrl = `${serverAddress}/register/`; // The URL to your Django registration endpoint
      const response = await axios.post(apiUrl, {
        username: formData.get('username'),
        email: formData.get('email'),
        password: formData.get('password'),
      });

      if (response.status === 201) {
        alert('User registered successfully');
        console.log('User registered successfully');
      } else {
        console.error('Failed to register user');
      }
    } catch (error) {
      console.error('Error while making the request:', error);
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
    padding: '20px',
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
            <h1>Register</h1>
            </div>
            


            <div className="form-group mb-3">
                <input type="text" className="form-control" required name="username" placeholder="Username" 
                 value={username}
                 onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div className="form-group mb-3">
                <input type="email" className="form-control" required name="email" placeholder="Email"
                 value={email}
                 onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className="form-group mb-3">
                <input type="password" className="form-control" required name="password" placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
            </div>


            <div className="text-center">
              {/* <button type="submit" className="btn btn-primary col-md-5 mx-1 mb-2">Login</button> */}
              <button type="submit" className="btn btn-outline-primary col-md-5 mb-2">Register</button>
              <br />    
              <span >Already a user <a href="/login" style={{ textDecoration:'none'}}>Login?</a></span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
