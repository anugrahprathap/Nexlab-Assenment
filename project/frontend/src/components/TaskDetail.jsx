import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Axios from 'axios';
import SideBar from './SideBar';
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-regular-svg-icons';
import Header from './header';


function TaskDetail() {
  const config = require('./config.json');
  const serverAddress = config.serverAddress;

  const navigate = useNavigate(); 
  const { taskId } = useParams();
  const [task, setTask] = useState({});
 
  const [uploadedImage, setUploadedImage] = useState(null); // State to store the uploaded image file

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
    width: '80px',
    height: '80px',
    fontColor: '',
  };

  const uploadiconStyle = {
    width: '180px',
    height: '180px',
    objectFit: 'contain',
  };

  useEffect(() => {
    const headers = {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${localStorage.getItem('token')}`, // Replace with your authentication method
    };
    Axios.get(`${serverAddress}/get_app/${taskId}/`,{headers})
      .then((response) => {
        setTask(response.data);
        console.log(response.data)
      })
      .catch((error) => {
        console.error('Error fetching task:', error);
      });
       // eslint-disable-next-line
  }, [taskId]);

  const onDrop = useCallback((acceptedFiles) => {
    // Assuming you are uploading a single image
    if (acceptedFiles.length === 1) {
      setUploadedImage(acceptedFiles[0]);
    }
  }, );

  const handleSubmit = async () => {
    console.log('button');
    // Create a FormData object to send the image
    const formData = new FormData();
    formData.append('app', task.id); // Send the app ID
    formData.append('image', uploadedImage); // Send the uploaded image

    try {
        const headers = {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Replace with your authentication method
          };
      // Send a POST request to the server to handle the image and app ID
      const response = await Axios.post(`${serverAddress}/upload_image/`, formData,{ headers } );

      if (response.status === 201) {
        // Handle success, e.g., show a success message
        alert('Image uploaded successfully');
        navigate('/home')
      } else {
        // Handle failure, e.g., show an error message
        console.error('Image upload failed');
      }
    } catch (error) {
      console.error('Error while uploading the image:', error);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className="" style={containerStyle}>
      <Header/>
      <div className="col-md-12 mb-3" style={flexContainerStyle}>
        <SideBar />
        <div className="col-md-9" style={mainContentStyle}>
            
          <div className="main-section m-20px p-3" style={{ backgroundColor: '#dfe1e6' }}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
              }}
            >
              <img style={iconStyle} src={task.logo} alt="task-logo" />
              <div className="mt-1 mx-3">
                <h2>{task.app_name}</h2>
                <span>
                  <a href={task.app_link}>{task.app_link}</a>
                </span>
              </div>
              <div style={{ width: '30vw' }}></div>
              <button
                className="px-3 mb-3 mt-1"
                style={{
                  border: '1px solid lightgreen',
                  backgroundColor: 'lightblue',
                  width: '100px',
                  height: '50px',
                  color: 'black',
                }}
              >
                {task.app_point} Points
              </button>
            </div>
            <div className="m-3 image-upload-container">
              <div
                style={{
                  display: 'flex',
                  backgroundColor: 'white',
                  width: '100%',
                  height: '40vh',
                  flexDirection: 'column',
                  alignContent: 'center',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                }}
                {...getRootProps()}
                className={`image-upload-dropzone ${isDragActive ? 'active' : ''}`}
              >
                <div className="mt-3">
                  <FontAwesomeIcon className="mt-3" style={{ ...uploadiconStyle }} icon={faImage} />
                </div>
                <input {...getInputProps()} />
                {isDragActive ? <p>Drop the image here</p> : <p>Upload the Image to complete the Task</p>}
              </div>
              
              
            </div>
            <div className="text-center">
                <button type="button" onClick={handleSubmit} className="btn btn-primary mt-3">
                  SUBMIT
                </button>
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

export default TaskDetail;
