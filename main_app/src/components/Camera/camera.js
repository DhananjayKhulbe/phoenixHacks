import React, { useRef, useState } from 'react';
import "./camera.css";


const CameraComponent = () => {
  const videoRef = useRef(null);
  const [imgData, setImgData] = useState(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
    } catch (err) {
      console.error('error getting camera', err);
    }
  };

  const captureImage = () => {
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(videoRef.current, 0, -100, canvas.width - 280, canvas.height - 160);
    const imageData = canvas.toDataURL('image/png');
    setImgData(imageData);

  
  const link = document.createElement('a');
  link.href = imageData;
  link.download = 'captured_image.png'; 

  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  setImgData(imageData);
  };

  return (
    <div className='body'>
    <div className = 'body2'>
      <button className = "b1" onClick={startCamera}>Start</button>
      <button className = "b2" onClick={captureImage}>End</button>
    </div>
    <hr></hr>
    {imgData && <img src={imgData} alt="Captured" />}
      <video className = "img" ref={videoRef} autoPlay playsInline style={{ width: 150, height: 100 }} />
      
    </div>
  );
};

export default CameraComponent;
