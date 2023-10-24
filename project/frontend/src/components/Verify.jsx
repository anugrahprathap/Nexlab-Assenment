import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import Axios from 'axios';
import Header from './header';
import AdminSideBar from './AdminSidebar';
import ImageViewer from './ImageViewer';
import { useNavigate } from 'react-router-dom';
function Verify() {
    
  const navigate = useNavigate()


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

  const imageContent = {
    display:'flex',
    justifyContent:'space-between', // Center horizontally
    alignItems: 'center', // Center vertically
    width: '100%',
    height: '100px',
    backgroundColor:'#dfe1e6'
    
  };

  const imageStyle = {
    width: '200px',
    height: '80px',
  };

  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const config = require('./config.json');
  const serverAddress = config.serverAddress;
  const openImageViewer = (imageUrl) => {
    
    setSelectedImage(imageUrl);
  };

  const closeImageViewer = () => {
    setSelectedImage(null);
  };
// State to store the fetched images

  useEffect(() => {
    // Make an API request to fetch images from the server
    Axios.get('http://127.0.0.1:8000/view-images/')
      .then((response) => {
        console.log(response.data)
        setImages(response.data); // Update the state with fetched images
      })
      .catch((error) => {
        console.error('Error fetching images:', error);
      });
  }, []);
  

  const handleImageVerification = (imageId, img_status) => {
    Axios.post(`${serverAddress}/verify-image/${imageId}/${img_status}/`)
      .then((response) => {
        console.log(response.data);
        alert("Verified Successfully")
        navigate('/verify')
      })
      .catch((error) => {
        console.error('Error verifying image:', error);
      });
  };

  

  return (
    <div className="" style={containerStyle}>
      <Header/>
      <div className="col-md-12 mb-3" style={flexContainerStyle}>
        <AdminSideBar/>
        <div className="col-md-9" style={mainContentStyle}>
          <div className="main-section">
          <h1>Verify Images</h1>
            <div className="image-gallery">
            {images.map((image, index) => (
                <div key={index} className="image-item m-3 p-3 " style={imageContent}>
                    
                <img style={imageStyle}
                    src={`http://127.0.0.1:8000${image.image}`} // Replace with the actual image URL field from your data
                    alt={`Image ${index}`}
                    onClick={() => openImageViewer(`http://127.0.0.1:8000${image.image}`)}
                />
                <p>Username: {image.user.username}</p>
                <p>App Name: {image.app.app_name}</p> 
                <p>Link: <a href={image.app.app_link}>{image.app.app_link}</a></p>
                <button className='btn btn-primary' onClick={() => handleImageVerification(image.id, 'accept')}>Accpect</button>
                <button className='btn btn-danger'  onClick={() => handleImageVerification(image.id, 'reject')}>Reject</button>
                </div>
            ))}
            </div>
            {selectedImage && (
              <ImageViewer image={selectedImage} onClose={closeImageViewer} />
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

export default Verify;
