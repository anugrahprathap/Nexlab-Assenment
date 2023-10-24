import React, { useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';
function Header(){

    const [userDisplayName, setUserDisplayName] = useState(''); 
    useEffect(() => {
      const token = localStorage.getItem('token');
      if (token) {
        decodeToken(token);
       
      }
    }, []);
    const decodeToken = (token) => {
      const decoded = jwtDecode(token);
      console.log(decoded)
      setUserDisplayName(decoded.name); // Extract the username from the token
    };
  
    return(
        <header className="text-center py-4">
        <h1>Hello {userDisplayName}</h1>
      </header>
    )
}

export default Header