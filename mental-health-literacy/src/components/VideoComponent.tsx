import { useRef, useState, useEffect, memo, useCallback } from "react";
import "./VideoComponent.css";
import MuxPlayer from "@mux/mux-player-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

interface VideoInterface {
  playbackId: string;
  title: string;
  username: string;
  description: string;
  likes: number;
  tags?: { label: string; url: string }[];
  videoId: number;
  onLike: (videoId: number) => Promise<void>;
  isLiked?: boolean; // Add this to track if current user has liked
  isActive?: boolean;
}

const VideoComponent = memo(function VideoComponent({
  playbackId,
  title,
  username,
  description,
  likes,
  tags,
  videoId,
  onLike,
  isLiked = false,
  isActive = false,
}: VideoInterface) {
  console.log(`[VideoComponent] Rendering video ${videoId}, isLiked: ${isLiked}, likes: ${likes}`);
  
  const [paused, setPaused] = useState(true);
  const [isLiking, setIsLiking] = useState(false);
  const ref = useRef(null);
  const containerRef = useRef(null);

  // When video becomes active, autoplay
  useEffect(() => {
    if (isActive && ref.current) {
      const player = ref.current as any;
      const playPromise = player.play();

      if (playPromise !== undefined) {
        playPromise.catch((error: any) => {
          console.log("[VideoComponent] Autoplay failed:", error);
        });
      }
    }
  }, [isActive]);

  const handleLike = useCallback(async () => {
    if (isLiking) return;
    
    try {
      setIsLiking(true);
      await onLike(videoId);
    } catch (error) {
      console.error('Error handling like:', error);
    } finally {
      setIsLiking(false);
    }
  }, [isLiking, videoId]);

  function showCommentModal() {
    // TODO: Add a modal component to show comments
  }

  return (
    <li className="video-component" ref={containerRef}>
      <h1>{title}</h1>
      <MuxPlayer
        className="mux-video"
        paused={!isActive}
        playbackId={playbackId}
        ref={ref}
        autoPlay={isActive}
        muted={true}
        loop={true}
        playsInline={true}
      />
      <div className="video-actions">
        <span className="video-info">
          <h2>{username}</h2>
          <p>{description}</p>
          <span className="video-tag-container">
            {tags?.map((tag) => {
              return (
                <Link to={tag.url} className="video-tag">
                  {tag.label}
                </Link>
              );
            })}
          </span>
        </span>
        <span className="video-buttons">
          <span
            className={`video-like ${isLiked ? 'liked' : ''} ${isLiking ? 'liking' : ''}`}
            onClick={handleLike}
          >
            <FontAwesomeIcon icon={faThumbsUp} />
            {isLiking ? '...' : likes}
          </span>
          <span
            onClick={() => {
              showCommentModal();
            }}
          >
            <FontAwesomeIcon icon={faComment} />
          </span>
        </span>
      </div>
    </li>
  );
}, (prevProps, nextProps) => {
  // Check props that should trigger re-renders
  return (
    prevProps.videoId === nextProps.videoId &&
    prevProps.likes === nextProps.likes &&
    prevProps.isLiked === nextProps.isLiked &&
    prevProps.isActive === nextProps.isActive
  );
});

export default VideoComponent;
