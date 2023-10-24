
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus,faHome ,faRightToBracket, faDatabase} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function AdminSideBar(){
 
    const sidebarStyle = {
        backgroundColor: '#dfe1e6',
        width: '20%',
        padding: '10px',
        paddingTop: '80px',
        paddingLeft: '20px',
      };
    
    
      const iconStyle = {
       
          justifyContent: 'center', // Center horizontally
          alignItems: 'center', // Center vertically
          width: '20px',
          height: '15px',
          fontColor: '',
        };
    
    
      
      
      
    

    
     
    return (
        <div className="col-md-3" style={sidebarStyle}>
          <a href="/home" className="btn btn-primary col-md-7 mb-3">
            <FontAwesomeIcon className='mx-1' style={{ ...iconStyle, color: 'white' }} icon={faHome} />Home</a>
            <br />
            <a href="/verify" className="btn btn-outline-primary col-md-7 mb-3">
              
            <FontAwesomeIcon className='mx-1' style={{ ...iconStyle, color: '' }} icon={faDatabase} />Verify Points</a>
        
        <br />
        
      
        
        <Link to='/add_app'> 
        <button className="btn btn-outline-primary col-md-7 mb-3"        >
              
            <FontAwesomeIcon className="mx-1" style={{ ...iconStyle ,color: ''}} icon={faPlus} />Add App</button>
        </Link>
        
        
        <br />
        <button className="btn btn-outline-primary col-md-7 mb-3">
              
            <FontAwesomeIcon  className=' mx-1' style={{ ...iconStyle, color: '' }} icon={faRightToBracket} />Logout</button>
        
        <br />
      
        </div>
    )
}

export default AdminSideBar;