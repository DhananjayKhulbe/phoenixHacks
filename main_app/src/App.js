import React, { useState, useEffect } from 'react';

import './App.css';
import { Popup } from "./components/Popup/Popup";
import CameraComponent from "./components/Camera/camera";
import Webcam from "react-webcam";


const WebcamComponent = () => <Webcam />;

const Translator = () => {
  const [open, setOpen] = useState(true); 
  const [text, setText] = useState('');
  const [sourceLang, setSourceLang] = useState('en');
  const [targetLang, setTargetLang] = useState('en');
  const [translatedText, setTranslatedText] = useState('');

  useEffect(() => {
    
    
  }, []); 

  const handleTranslate = async () => {
    const response = await fetch(`https://api.translate.com/translate?text=${text}&source=${sourceLang}&target=${targetLang}`);
    const data = await response.json();
    setTranslatedText(data.translatedText);
  };

  const handleCamera = () => {
    console.log('Camera access not implemented yet');
  };

  return (
    <div className="translator">
      
      <h1 className="main_heading">Language Learner 3000</h1>
      <div className="languages">
        <select id="source-lang" value={sourceLang} className="original" onChange={(e) => setSourceLang(e.target.value)}>
          <option value="en">English</option>
          <option value="es">Spanish</option>
        </select>
        <select id="target-lang" value={targetLang} className="translated" onChange={(e) => setTargetLang(e.target.value)}>
          <option value="en">English</option>
          <option value="es">Spanish</option>
        </select>
      </div>
      
      <br />
      <div className="App">
      
    
      </div>
      <CameraComponent />
      

      


      {open ? <Popup text="Welcome to Translator 3000!" closePopup={() => setOpen(false)} /> : null}
      {translatedText && <p>Translated Text: {translatedText}</p>}
    </div>
  );
};

export default Translator;
