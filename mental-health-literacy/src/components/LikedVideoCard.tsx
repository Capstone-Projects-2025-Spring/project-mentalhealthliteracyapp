import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import MuxPlayer from "@mux/mux-player-react";
import type { Video } from './videoService';
import './LikedVideoCard.css';

interface LikedVideoCardProps {
  video: Video;
  onVideoClick: () => void;
}

const LikedVideoCard: React.FC<LikedVideoCardProps> = ({ 
  video, 
  onVideoClick
}) => {
  // Generate Mux thumbnail URL
  const getThumbnailUrl = (playbackId: string) => {
    return `https://image.mux.com/${playbackId}/thumbnail.jpg?time=0&width=320&height=180&fit_mode=smartcrop`;
  };

  return (
    <div className="liked-video-card" onClick={onVideoClick}>
      <div className="video-thumbnail">
        {video.playbackId ? (
          <>
            {/* Thumbnail */}
            <img 
              src={getThumbnailUrl(video.playbackId)} 
              alt={`Video by ${video.username}`}
              className="thumbnail-image"
              onError={(e) => {
                // Fallback to mini video player
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const miniPlayer = target.nextElementSibling as HTMLElement;
                if (miniPlayer) {
                  miniPlayer.style.display = 'block';
                }
              }}
            />
            {/* Mini video player */}
            <div className="mini-video-player" style={{ display: 'none' }}>
              <MuxPlayer
                playbackId={video.playbackId}
                metadata={{
                  video_title: `Video by ${video.username}`,
                  player_name: "Liked Video Preview"
                }}
                muted={true}
                autoPlay={false}
                loop={false}
                style={{ width: '100%', height: '100%' }}
              />
            </div>
          </>
        ) : (
          <div className="thumbnail-placeholder">
            <FontAwesomeIcon icon={faPlay} className="play-icon" />
            <span className="username">@{video.username}</span>
          </div>
        )}
        <div className="play-overlay">
          <FontAwesomeIcon icon={faPlay} />
        </div>
      </div>
      
      <div className="video-info">
        <h3 className="video-username">
          @{video.username}
        </h3>
        <p className="video-description">
          {video.description.length > 60 
            ? `${video.description.substring(0, 60)}...` 
            : video.description
          }
        </p>
        
        <div className="video-tags">
          {video.tags?.slice(0, 2).map((tag, index) => (
            <span key={index} className="video-tag">
              {tag.label}
            </span>
          ))}
          {video.tags && video.tags.length > 2 && (
            <span className="video-tag-more">+{video.tags.length - 2}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default LikedVideoCard; 