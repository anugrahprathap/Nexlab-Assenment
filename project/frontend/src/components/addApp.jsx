import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import Axios from 'axios';
import Header from './header';
import AdminSideBar from './AdminSidebar';
function AddApp() {
  const config = require('./config.json');
  const serverAddress = config.serverAddress;

  const [appCategories, setAppCategories] = useState([
    "Communication",
    "Social Media",
    "Entertainment",
    "Productivity",
    // Add more categories here
  ]);
  setAppCategories('')
  const [subCategories, setSubCategories] = useState({
    "Communication": ["Messaging", "Email", "Video Calls", "Voice Calls"],
    "Social Media": ["Networking", "Photo Sharing", "Video Sharing", "Microblogging"],
    "Entertainment": ["Music", "Video Streaming", "Gaming", "Books", "Movies"],
    "Productivity": ["Task Management", "Note Taking", "Calendar", "Document Editing"],
    // Define subcategories for other categories
  });
  setSubCategories('')
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");

  // Function to update the subcategories based on the selected category
  const updateSubCategories = (category) => {
    setSelectedCategory(category);
    setSelectedSubCategory("");
  };
 console.log(selectedSubCategory);

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
    backgroundColor: '3dfe1e6',
    height: '100vh', // Set the flex container height to 100%
    width: '100vw',
  };

  const iconContainerStyle = {
    justifyContent: 'center', // Center horizontally
    alignItems: 'center', // Center vertically
    width: '300px',
    height: '100px',
    fontColor: '#dfe1e6',
  };

  const iconStyle = {
    width: '200px',
    height: '80px',
  };

  const [appIcon, setAppIcon] = useState(null); // State to store the app icon URL
  const [appLink, setAppLink] = useState('');


  const stripUrl = (url) => {
    if (url.startsWith('http://') || url.startsWith('https://')) {
      // Remove 'http://' or 'https://'
      const strippedUrl = url.replace(/^(https?:\/\/)/, '');
      return strippedUrl;
    }
    return url;
  };
  const strippedUrl = stripUrl(appLink);
 const url = `https://besticon-demo.herokuapp.com/allicons.json?url=${strippedUrl}/`
  const fetchAppIcon = async () => {
    try {
        
      const apiUrl = `http://127.0.0.1:8000/getAppIcon/?url=${url}/`;
      const response = await Axios.get(apiUrl);
  
      if (response.status === 200) {
        const data = response.data
        setAppIcon(data.icon_url)
      } else {
        console.error('Failed to fetch app icon');
      }
    } catch (error) {
      console.error('Error fetching app icon:', error);
    }
  };
  
  

  useEffect(() => {
    // Fetch the app icon when appLink changes
    if (appLink) {
      fetchAppIcon();
    }
  }, [appLink,fetchAppIcon]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
        app_name: e.target.app_name.value,
        app_link: e.target.app_link.value,
        app_category: e.target.app_category.value,
        sub_category: e.target.sub_category.value,
        app_point: e.target.app_point.value,
        logo: appIcon,
      };
    try {
      const apiUrl = `${serverAddress}/add_app/`; 
      const response = await Axios.post(apiUrl, formData);
  
      if (response.status === 201) {
        alert('App added successfully')
        console.log('App added successfully');
      } else {
        console.error('Failed to add the app');
      }
    } catch (error) {
      console.error('Error while making the request:', error);
    }
  };

  return (
    <div className="" style={containerStyle}>
      <Header/>
      <div className="col-md-12 mb-3" style={flexContainerStyle}>
        <AdminSideBar/>
        <div className="col-md-9" style={mainContentStyle}>
          <div className="main-section">
            <form onSubmit={handleSubmit}>
              <div className="text-center mb-4">
                {appIcon ? (
                  
                 <img src={appIcon}  style={{ ...iconStyle, color: 'rgb(193, 197, 197)' }}/>
                ) : (
                  <FontAwesomeIcon style={{ ...iconContainerStyle, color: 'rgb(193, 197, 197)' }} icon={faImage} />
                )}
              </div>
              <div className="row h-100 justify-content-center align-items-center"> {/* Add mx-auto class to center the input fields */}
                <div className="form-group col-md-3 mb-5">
                  <input type="text" className="form-control" required name="app_name" placeholder="App Name" />
                </div>
                <div className="form-group col-md-3 mb-5">
                  <input type="text" className="form-control" name="app_link" placeholder="App Link"  required
                  onChange={(e) => setAppLink(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="row h-100 justify-content-center align-items-center">
        <div className="form-group col-md-3 mb-5">
          <select
            className="form-control"
            name="app_category"
            onChange={(e) => updateSubCategories(e.target.value)}
          >
            <option value="">App Category</option>
            {appCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group col-md-3 mb-5">
          <select className="form-control" name="sub_category">
            <option value="">Sub Category</option>
            {selectedCategory && subCategories[selectedCategory] ? (
              subCategories[selectedCategory].map((subcategory) => (
                <option key={subcategory} value={subcategory}>
                  {subcategory}
                </option>
              ))
            ) : null}
          </select>
        </div>
      </div>
      <div className="row h-100 justify-content-center align-items-center"> {/* Add mx-auto class to center the input fields */}
                
                <div className="form-group col-md-3 mb-5">
                  <input type="number" max='1000' min='10' className="form-control" name="app_point" placeholder="App Point"  required
                  
                  />
                </div>
              </div>
              <div className="text-center">
                <button type="submit" className="btn btn-primary">ADD POINTS</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <footer style={{ backgroundColor: 'rgb(193, 197, 197)' }} className="text-center mt-0 mb-0">
        <p>Copyright &copy; 2023</p>
      </footer>
    </div>
  );
}

export default AddApp;
