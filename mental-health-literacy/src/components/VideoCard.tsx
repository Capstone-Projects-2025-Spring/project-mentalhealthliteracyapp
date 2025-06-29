import React, { useRef, useState, useEffect } from 'react';
import MuxPlayer from '@mux/mux-player-react';

// Styles for VideoCard - normally in VideoCard.css
const videoCardStyles = `
.video-card {
  position: relative;
  width: 100%;
  height: 100vh;
  scroll-snap-align: start;
  background-color: #000;
  display: flex;
  justify-content: center;
  align-items: center;
}

.video-player {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
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
  gap: 20px;
  margin-left: 330px;
  margin-bottom: 120px;
  pointer-events: auto;
}

.action-button {
  background: none;
  border: none;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  padding: 0;
  text-align: center;
  pointer-events: auto;
}

.action-button svg {
  width: 32px;
  height: 32px;
  filter: drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.5));
}

.action-button span {
  font-size: 14px;
  font-weight: bold;
  margin-top: 4px;
}
`;

// Styles for Comments - normally in Comments.css
const commentsStyles = `
.comments-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  pointer-events: auto;
}

.comments-container {
  background: #2c2c2c;
  padding: 20px;
  border-radius: 10px;
  width: 90%;
  max-width: 500px;
  max-height: 80vh;
  display: flex;
  flex-direction: column;
  position: relative;
  pointer-events: auto;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
  pointer-events: auto;
}

.comments-list {
  flex-grow: 1;
  overflow-y: auto;
  margin-bottom: 15px;
}

.comment {
  border-bottom: 1px solid #444;
  padding: 10px 0;
}

.comment:last-child {
  border-bottom: none;
}

.comment strong {
  color: #fafafa;
}

.comment p {
  color: #ccc;
  margin: 5px 0 0;
}

.comment-form {
  display: flex;
}

.comment-form input {
  flex-grow: 1;
  padding: 10px;
  border-radius: 20px;
  border: 1px solid #555;
  background: #333;
  color: white;
  pointer-events: auto;
}

.comment-form button {
  padding: 10px 20px;
  border-radius: 20px;
  border: none;
  background: #007bff;
  color: white;
  margin-left: 10px;
  cursor: pointer;
  pointer-events: auto;
}
`;

interface Comment {
  username: string;
  text: string;
}

interface CommentsProps {
  comments: Comment[];
  onAddComment: (comment: Comment) => void;
  onClose: () => void;
}

const Comments: React.FC<CommentsProps> = ({ comments, onAddComment, onClose }) => {
  const [newComment, setNewComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      onAddComment({ username: 'Guest', text: newComment });
      setNewComment('');
    }
  };

  return (
    <div className="comments-overlay">
      <div className="comments-container">
        <button className="close-button" onClick={onClose}>×</button>
        <h3>Comments</h3>
        <div className="comments-list">
          {comments.map((comment, index) => (
            <div key={index} className="comment">
              <strong>{comment.username}</strong>
              <p>{comment.text}</p>
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit} className="comment-form">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
          />
          <button type="submit">Post</button>
        </form>
      </div>
    </div>
  );
};

interface VideoCardProps {
  videoUrl?: string;
  playbackId?: string;
  username: string;
  description: string;
  likes: number;
  initialComments: Comment[];
}

const VideoCard: React.FC<VideoCardProps> = ({ videoUrl, playbackId, username, description, likes, initialComments }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);

  const clickTimeout = useRef<number | null>(null);

  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.innerText = videoCardStyles + commentsStyles;
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

  const isGif = videoUrl && videoUrl.toLowerCase().endsWith('.gif');

  return (
    <div className="video-card">
      {playbackId ? (
        <MuxPlayer
          playbackId={playbackId}
          metadata={{
            video_title: description,
            viewer_user_id: 'Placeholder (optional)',
          }}
          style={{ width: '100%', aspectRatio: '16/9' }}
        />
      ) : isGif ? (
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
