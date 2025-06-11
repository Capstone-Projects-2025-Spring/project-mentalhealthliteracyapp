import React, { useRef, useState } from 'react';
import sharkGif from '../assets/sharky.gif';

interface VideoCardProps {
  videoUrl: string;
  username: string;
  description: string;
  likes: number;
}

const VideoCard: React.FC<VideoCardProps> = ({ videoUrl, username, description, likes }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const isGif = videoUrl.toLowerCase().endsWith('.gif');

  return (
    <div className="video-card">
      {isGif ? (
        <img
          src={videoUrl}
          alt="Dancing shark"
          className="video-player"
        />
      ) : (
        <video
          ref={videoRef}
          onClick={togglePlay}
          loop
          src={videoUrl}
          className="video-player"
        />
      )}
      <div className="video-info">
        <div className="video-details">
          <h4>{username}</h4>
          <p>{description}</p>
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
  );
};

export default VideoCard;
