import React, { useRef, useState, useEffect } from "react";
import MuxPlayer from "@mux/mux-player-react";

// Styles for VideoCard - normally in VideoCard.css
const videoCardStyles = `
.video-card {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  background: #181818;
  scroll-snap-align: start;
}

.video-player {
  width: 400px;
  height: 700px;
  object-fit: cover;
  border-radius: 8px;
  background: #181818;
}

.video-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 16px;
  color: white;
  background-image: linear-gradient(to top, rgba(0, 0, 0, 0.4), transparent);
  pointer-events: none;
}

.video-header {
  text-align: center;
  font-weight: bold;
}

.video-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.video-info {
  max-width: calc(100% - 60px);
}

.video-info h4 {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 8px;
}

.video-info p {
  font-size: 14px;
}

.video-actions {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 30px;
  margin-left: 332px;
  min-width: 80px;
  z-index: 1000;
}

.action-button {
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  padding: 0px;
  text-align: center;
  pointer-events: auto;
  transition: all 0.2s ease;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  justify-content: center;
}

.action-button:hover {
  color: #ccc;
  background: rgba(255, 255, 255, 0.2);
}

.action-button svg {
  margin-top: 2px;
  width: 60px;
  height: 60px;
}

.action-button span {
  font-size: 14px;
  font-weight: bold;
  margin-top: 2px;
  color: #888;
}

.video-tags, .video-tag {
  pointer-events: auto;
}

/* Mobile Responsive Styles */
@media screen and (max-width: 768px) {
  .video-card {
    flex-direction: column;
    justify-content: center;
  }
  
  .video-player {
    width: 100%;
    height: 100%;
    border-radius: 0;
  }
  
  .video-overlay {
    padding: 12px;
  }
  
  .video-content {
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
  }
  
  .video-info {
    max-width: 100%;
  }
  
  .video-info h4 {
    font-size: 14px;
    margin-bottom: 6px;
  }
  
  .video-info p {
    font-size: 12px;
  }
  
  .video-actions {
    position: absolute;
    right: 12px;
    bottom: 80px;
    margin-left: 0;
    gap: 20px;
    min-width: auto;
  }
  
  .action-button {
    width: 50px;
    height: 50px;
  }
  
  .action-button svg {
    width: 50px;
    height: 50px;
  }
  
  .action-button span {
    font-size: 12px;
  }
}

/* Small mobile devices */
@media screen and (max-width: 480px) {
  .video-overlay {
    padding: 8px;
  }
  
  .video-info h4 {
    font-size: 12px;
  }
  
  .video-info p {
    font-size: 10px;
  }
  
  .video-actions {
    right: 8px;
    bottom: 60px;
    gap: 15px;
  }
  
  .action-button {
    width: 45px;
    height: 45px;
  }
  
  .action-button svg {
    width: 45px;
    height: 45px;
  }
  
  .action-button span {
    font-size: 10px;
  }
}

/* Landscape mobile */
@media screen and (max-width: 768px) and (orientation: landscape) {
  .video-card {
    flex-direction: row;
  }
  
  .video-player {
    width: 60%;
    height: 100%;
  }
  
  .video-overlay {
    width: 40%;
    position: relative;
    padding: 16px;
  }
  
  .video-content {
    flex-direction: column;
    height: 100%;
    justify-content: flex-end;
  }
  
  .video-actions {
    position: relative;
    right: auto;
    bottom: auto;
    margin-top: 20px;
  }
}
`;


interface VideoCardProps {
  videoUrl?: string;
  playbackId?: string;
  imageUrl?: string;
  username: string;
  description: string;
  likes: number;
  isActive?: boolean;
  tags?: { label: string; url: string }[];
}

const VideoCard: React.FC<VideoCardProps> = ({
  videoUrl,
  playbackId,
  imageUrl,
  username,
  description,
  likes,
  isActive = false,
  tags = [],
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);

  const clickTimeout = useRef<number | null>(null);

  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.innerText = videoCardStyles;
    document.head.appendChild(styleSheet);
    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current
          .play()
          .catch((error) => console.error("Video play failed:", error));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleLike = () => {
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
    setIsLiked(!isLiked);
  };

  const handleVideoClick = () => {
    if (clickTimeout.current) {
      clearTimeout(clickTimeout.current);
      clickTimeout.current = null;
      handleLike();
    } else {
      clickTimeout.current = window.setTimeout(() => {
        togglePlay();
        clickTimeout.current = null;
      }, 250);
    }
  };

  useEffect(() => {
    return () => {
      if (clickTimeout.current) {
        clearTimeout(clickTimeout.current);
      }
    };
  }, []);

 

  const isGif = videoUrl && videoUrl.toLowerCase().endsWith(".gif");

  // Handle active/inactive video play/pause
  useEffect(() => {
    if (!isActive && videoRef.current && isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, [isActive, isPlaying]);

  return (
    <div className="video-card">
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={description}
          className="video-player"
          onClick={handleLike}
        />
      ) : playbackId ? (
        <MuxPlayer
          playbackId={playbackId}
          autoPlay
          muted
          loop
          metadata={{
            video_title: description,
            viewer_user_id: "Placeholder (optional)",
          }}
          style={{ width: "100%", aspectRatio: "16/9" }}
        />
      ) : isGif ? (
        <img
          src={videoUrl}
          alt={description}
          className="video-player"
          onClick={handleVideoClick}
        />
      ) : (
        <video
          ref={videoRef}
          onClick={handleVideoClick}
          loop
          src={videoUrl}
          className="video-player"
        />
      )}
      <div className="video-overlay">
        <div className="video-header">Mindfulness Tip</div>
        <div className="video-content">
          <div className="video-info">
            <h4>@{username}</h4>
            <p>{description}</p>
            {tags && tags.length > 0 && (
              <div className="video-tags" style={{ marginTop: 12, display: 'flex', gap: 8 }}>
                {tags.map((tag) => (
                  <a
                    key={tag.label}
                    href={tag.url}
                    className="video-tag"
                    style={{
                      background: '#333',
                      color: '#fff',
                      borderRadius: 16,
                      padding: '4px 12px',
                      fontSize: 14,
                      textDecoration: 'none',
                      transition: 'background 0.2s',
                    }}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {tag.label}
                  </a>
                ))}
              </div>
            )}
          </div>
          <div className="video-actions">
            <button className="action-button" onClick={handleLike}>

              <svg viewBox="0 0 24 24" fill={isLiked ? '#ff4d4d' : '#fff'} style={{ transition: 'fill 0.2s' }}>
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              <span>{likeCount.toLocaleString()}</span>
            </button>
            
          </div>
        </div>
      </div>
     
    </div>
  );
};

export default VideoCard;
