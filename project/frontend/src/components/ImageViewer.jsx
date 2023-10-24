import React from 'react';

const ImageViewer = ({ image, onClose }) => {
       
    console.log(image)
    const imageStyle = {
        width: '200px',
        height: '80px',
      };
  return (
    <div className="modal">
      <div className="modal-content">
        Hello
        <img style={imageStyle} src={image}  />
        <button className='btn btn-primary' onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default ImageViewer;
