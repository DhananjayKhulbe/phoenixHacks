import React from "react";
import "./Popup.css";
export const Popup = ({ text, closePopup }) => {  
  return (    
  <div className="popup-container">     
    <div className="popup-body">      
      <h1 className="head">{text}</h1>   

      <div className="body">

        <p>Name: </p>
        <p>Age: </p>
        </div>   
       

      <div>
      <button onClick={closePopup}>Close X</button> 
        </div>   
    </div>    
  </div>  
  );};