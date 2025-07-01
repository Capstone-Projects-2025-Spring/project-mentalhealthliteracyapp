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

/* Sliding Comments Panel */
.comments-panel {
  position: fixed;
  top: 0;
  right: -400px;
  width: 400px;
  height: 100vh;
  background: #1a1a1a;
  border-left: 1px solid #333;
  transition: right 0.3s ease-in-out;
  z-index: 1000;
  display: flex;
  flex-direction: column;
}

.comments-panel.open {
  right: 0;
}

.comments-header {
  padding: 20px;
  border-bottom: 1px solid #333;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.comments-header h3 {
  color: white;
  margin: 0;
  font-size: 18px;
}

.close-comments {
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.comments-list {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
}

.comment {
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid #333;
}

.comment:last-child {
  border-bottom: none;
}

.comment-header {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}

.comment-username {
  color: #fff;
  font-weight: bold;
  font-size: 14px;
  margin-right: 10px;
}

.comment-time {
  color: #888;
  font-size: 12px;
}

.comment-text {
  color: #ccc;
  font-size: 14px;
  line-height: 1.4;
}

.comment-form {
  padding: 20px;
  border-top: 1px solid #333;
}

.comment-input {
  width: 100%;
  padding: 12px;
  border: 1px solid #444;
  border-radius: 20px;
  background: #2a2a2a;
  color: white;
  font-size: 14px;
  margin-bottom: 10px;
}

.comment-input::placeholder {
  color: #888;
}

.post-comment-btn {
  width: 100%;
  padding: 12px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 20px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;
}

.post-comment-btn:hover {
  background: #0056b3;
}

.post-comment-btn:disabled {
  background: #555;
  cursor: not-allowed;
}

/* Overlay when comments panel is open */
.comments-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;
}

.comments-overlay.open {
  opacity: 1;
  visibility: visible;
}
`;

interface Comment {
  username: string;
  text: string;
  timestamp?: string;
}

interface CommentsProps {
  comments: Comment[];
  onAddComment: (comment: Comment) => void;
  onClose: () => void;
  isOpen: boolean;
}

const Comments: React.FC<CommentsProps> = ({ comments, onAddComment, onClose, isOpen }) => {
  const [newComment, setNewComment] = useState('');
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {

      onAddComment({ 
        username: 'Guest', 
        text: newComment,
        timestamp: new Date().toLocaleTimeString()
      });
      setNewComment('');
    }
  };

  return (
    <>
      <div className={`comments-overlay ${isOpen ? 'open' : ''}`} onClick={onClose} />
      <div className={`comments-panel ${isOpen ? 'open' : ''}`}>
        <div className="comments-header">
          <h3>Comments ({comments.length})</h3>
          <button className="close-comments" onClick={onClose}>×</button>
        </div>
        <div className="comments-list">
          {comments.length === 0 ? (
            <p style={{ color: '#888', textAlign: 'center', marginTop: '20px' }}>
              No comments yet. Be the first to comment!
            </p>
          ) : (
            comments.map((comment, index) => (
              <div key={index} className="comment">
                <div className="comment-header">
                  <span className="comment-username">{comment.username}</span>
                  {comment.timestamp && (
                    <span className="comment-time">{comment.timestamp}</span>
                  )}
                </div>
                <p className="comment-text">{comment.text}</p>
              </div>
            ))
          )}
        </div>
        <form onSubmit={handleSubmit} className="comment-form">
          <input
            type="text"
            className="comment-input"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
          />
          <button 
            type="submit" 
            className="post-comment-btn"
            disabled={!newComment.trim()}
          >
            Post Comment
          </button>
        </form>
      </div>
    </>
  );
};

interface VideoCardProps {
  videoUrl?: string;
  playbackId?: string;
  username: string;
  description: string;
  likes: number;
  initialComments: Comment[];
  isActive?: boolean;
}

const VideoCard: React.FC<VideoCardProps> = ({
  videoUrl,
  playbackId,
  username,
  description,
  likes,
  initialComments,
  isActive = false,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);

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

  const handleAddComment = (comment: Comment) => {
    setComments((prev) => [...prev, comment]);
  };

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
      {playbackId ? (
        <MuxPlayer
          playbackId={playbackId}
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
          </div>
          <div className="video-actions">
            <button className="action-button" onClick={handleLike}>

              <svg viewBox="0 0 24 24" fill={isLiked ? '#ff4d4d' : '#fff'} style={{ transition: 'fill 0.2s' }}>
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              <span>{likeCount.toLocaleString()}</span>
            </button>
            <button className="action-button" onClick={() => setIsCommentsOpen(true)}>
              <svg viewBox="0 0 24 24" fill="#fff">
                <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
              </svg>
              <span>{comments.length.toLocaleString()}</span>
            </button>
          </div>
        </div>
      </div>
      <Comments
        comments={comments}
        onAddComment={handleAddComment}
        onClose={() => setIsCommentsOpen(false)}
        isOpen={isCommentsOpen}
      />
    </div>
  );
};

export default VideoCard;
