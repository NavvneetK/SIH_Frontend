import React, { useState } from 'react';
import '../css/Monitor.css';
import img from '../assets/audioGraph.png';

function Monitor() {
  // States for each condition
  const [isTeacherPresent, setIsTeacherPresent] = useState(false);
  const [isVoiceAudible, setIsVoiceAudible] = useState(false);
  const [areHandsRaised, setAreHandsRaised] = useState(false);
  const [isWhiteBoardInUse, setIsWhiteBoardInUse] = useState(false);

  // Event handlers
  const handleTeacherPresence = () => {
    setIsTeacherPresent(!isTeacherPresent);
  };

  const handleVoiceAudibility = () => {
    setIsVoiceAudible(!isVoiceAudible);
  };

  const handleHandRaising = () => {
    setAreHandsRaised(!areHandsRaised);
  };

  const handleWhiteBoardUsage = () => {
    setIsWhiteBoardInUse(!isWhiteBoardInUse);
  };

  return (
    <div className="monitoring-container">
      <header className="monitoring-header">Monitoring</header>
      <div className="content-container">
        <div className="left-panel">
          <div className="card">
            <center>Audio Detection</center>
            <img src={img} alt="Graph of audio" style={{ width: '400px', height: '300px' }} />

          </div>
          
        </div>
        <div className="right-panel">
        <div className="card">
            <h4>How our system is improving interactions? Check for Answers:</h4>
            <div className="functions">
              <div>
                <button className="function-button" onClick={handleTeacherPresence}>
                  Is Teacher present?
                </button>
                <span>{isTeacherPresent ? 'Yes' : 'No'}</span>
              </div>
              <div>
                <button className="function-button" onClick={handleVoiceAudibility}>
                  Is teacher's voice audible from last?
                </button>
                <span>{isVoiceAudible ? 'Yes' : 'No'}</span>
              </div>
              <div>
                <button className="function-button" onClick={handleHandRaising}>
                  Are Students raising their hands?
                </button>
                <span>{areHandsRaised ? 'Yes' : 'No'}</span>
              </div>
              <div>
                <button className="function-button" onClick={handleWhiteBoardUsage}>
                  Is there a WhiteBoard in use?
                </button>
                <span>{isWhiteBoardInUse ? 'Yes' : 'No'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Monitor;
