import React, { useState } from 'react';
import sharkGif from '../assets/sharky.gif';

function Video() {
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  return (
    <div className="video-feed">
      <div className="video-card">
        <img 
          src={sharkGif} 
          alt="Dancing shark"
          className="video-player"
        />
        <div className="video-info">
          <div className="video-details">
            <h4>Sharky</h4>
            <p> Dancing shark</p>
          </div>
          <div className="video-actions">
            <button 
              className="action-button"
              onClick={handleLike}
              style={{ color: isLiked ? '#ff4d4d' : 'white' }}
            >
              Like
            </button>
            <button className="action-button">
              Comment
            </button>
            <button className="action-button">
              Follow
            </button>
          </div>
        </div>
      </div>
      <div className="video-card">
        <img 
          src={sharkGif} 
          alt="Dancing shark"
          className="video-player"
        />
        <div className="video-info">
          <div className="video-details">
            <h4>Sharky</h4>
            <p> Dancing shark</p>
          </div>
          <div className="video-actions">
            <button 
              className="action-button"
              onClick={handleLike}
              style={{ color: isLiked ? '#ff4d4d' : 'white' }}
            >
              Like
            </button>
            <button className="action-button">
              Comment
            </button>
            <button className="action-button">
              Follow
            </button>
          </div>
        </div>
      </div>
      <div className="video-card">
        <img 
          src={sharkGif} 
          alt="Dancing shark"
          className="video-player"
        />
        <div className="video-info">
          <div className="video-details">
            <h4>Sharky</h4>
            <p> Dancing shark</p>
          </div>
          <div className="video-actions">
            <button 
              className="action-button"
              onClick={handleLike}
              style={{ color: isLiked ? '#ff4d4d' : 'white' }}
            >
              Like
            </button>
            <button className="action-button">
              Comment
            </button>
            <button className="action-button">
              Follow
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Video;
