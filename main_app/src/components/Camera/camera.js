import React, { useRef, useState } from 'react';
import "./camera.css";

const CameraComponent = () => {
  const videoRef = useRef(null);
  const [imgData, setImgData] = useState(null);
  const [imgPath, setImgPath] = useState(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
    } catch (err) {
      console.error('error getting camera', err);
    }
  };

  const captureImage = async () => {
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(videoRef.current, 0, -100, canvas.width - 280, canvas.height - 160);
    const imageData = canvas.toDataURL('image/png');
    setImgData(imageData);

    setImgPath('flask-server/main_app/src/components/Camera/result.png');
  
    // Convert data URL to Blob
    const blob = dataURLtoBlob(imageData);
    const file = new File([blob], 'captured_image.png', { type: 'image/png' });
  
    const formData = new FormData();
    formData.append('file', file);
  
    try {
      const response = await fetch('http://127.0.0.1:5000/upload', {
        method: 'POST',
        body: formData,
      });
  
      const result = await response.json();
      alert(result.message);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };
  
  // Function to convert data URL to Blob
  function dataURLtoBlob(dataURL) {
    const arr = dataURL.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  }

  return (
    <div className='body'>
      <div className='body2'>
        <button className="b1" onClick={startCamera}>Start</button>
        <button className="b2" onClick={captureImage}>End</button>c

      </div>
      <hr />
      {imgData && <img src={imgData} alt="Captured" />}
      <video className="img" ref={videoRef} autoPlay playsInline style={{ width: 150, height: 100 }} />
    </div>
  );
};

export default CameraComponent;
