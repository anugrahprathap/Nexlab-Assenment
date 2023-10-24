import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage,faHome } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function HomePage() {

  
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

  const iconContainerStyle = {
    justifyContent: 'center', // Center horizontally
    alignItems: 'center', // Center vertically
    width: '20px',
    height: '15px',
    fontColor: 'black',
  };
  return (
    <div className="" style={containerStyle}>
      
      <div className="col-md-12 mb-3" style={flexContainerStyle}>
      
        <div className="col-md-3" style={sidebarStyle}>
            <br />
            <a href="/" className="btn btn-outline-primary col-md-6 mb-3"><FontAwesomeIcon className='mx-1' style={{ ...iconContainerStyle, color: '' }} icon={faHome} />Home</a>
            
        
        <br />
          <a href="/login" className="btn btn-outline-primary col-md-6 mb-3">Login</a> <br />
          <a href="/register" className="btn btn-primary col-md-6 mb-3">Register</a>
        </div>
        
        <div className="col-md-9" style={mainContentStyle}>
            
          <div className="main-section">
            <h2>Home Page Content</h2>
            <p>Welcome to our home page. You can customize this section with your content.</p>
          </div>
        </div>
      </div>
      <footer style={{ backgroundColor: 'rgb(193, 197, 197)' }} className="text-center mt-0 mb-0">
        <p>Copyright &copy; 2023</p>
      </footer>
    </div>
  );
}

export default HomePage;
