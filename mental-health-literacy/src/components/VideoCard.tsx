import React, { useRef, useState, useEffect } from 'react';
import './VideoCard.css';
import Comments from './Comments';

interface Comment {
  username: string;
  text: string;
}

interface VideoCardProps {
  videoUrl: string;
  username: string;
  description: string;
  likes: number;
  initialComments: Comment[];
}

const VideoCard: React.FC<VideoCardProps> = ({ videoUrl, username, description, likes, initialComments }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);

  const clickTimeout = useRef<number | null>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(error => console.error("Video play failed:", error));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleLike = () => {
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
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

  const handleAddComment = (comment: Comment) => {
    setComments(prev => [...prev, comment]);
  };

  const isGif = videoUrl.toLowerCase().endsWith('.gif');

  return (
    <div className="video-card">
      {isGif ? (
        <img src={videoUrl} alt={description} className="video-player" onClick={handleVideoClick} />
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
          </div>
          <div className="video-actions">
            <button className="action-button" onClick={handleLike}>
              <svg viewBox="0 0 24 24" fill={isLiked ? '#ff4d4d' : 'white'} style={{ transition: 'fill 0.2s' }}>
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              <span>{likeCount.toLocaleString()}</span>
            </button>
            <button className="action-button" onClick={() => setIsCommentsOpen(true)}>
              <svg viewBox="0 0 24 24" fill="white">
                <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
              </svg>
              <span>{comments.length.toLocaleString()}</span>
            </button>
          </div>
        </div>
      </div>
      {isCommentsOpen && (
        <Comments
          comments={comments}
          onAddComment={handleAddComment}
          onClose={() => setIsCommentsOpen(false)}
        />
      )}
    </div>
  );
};

export default VideoCard;
