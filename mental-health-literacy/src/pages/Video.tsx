
import { useEffect, useState, useRef } from 'react';
import VideoCard from '../components/VideoCard';
import sharkGif from '../assets/sharky.gif';
import { supabase } from '../lib/supabase';

interface Video {
  id: number;
  videoUrl: string;
  username: string;
  description: string;
  likes: number;
  isLiked?: boolean;
}

function Video() {
  const [videos] = useState<Video[]>([
    {
      id: 1,
      videoUrl: sharkGif,
      username: "sharky1",
      description: "blank",

      likes: 0

    },
    {
      id: 2,
      videoUrl: sharkGif,
      username: "sharky2",
      description: "",

      likes: 0

    },
    {
      id: 3,
      videoUrl: sharkGif,
      username: "sharky3",
      description: "blank",
      likes: 0
    }
  ]);

  const [connectionStatus, setConnectionStatus] = useState<string>('Testing connection...');
  const videoFeedRef = useRef<HTMLDivElement>(null);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  // Test connection
  useEffect(() => {
    async function testConnection() {
      try {
        const { data, error } = await supabase
          .from('videos')
          .select('*')
          .limit(1);

        if (error) {
          console.error('Supabase connection error:', error);
          setConnectionStatus('Connection failed: ' + error.message);
        } else {
          console.log('Supabase connection successful!', data);
          setConnectionStatus('Connected to Supabase successfully!');
        }
      } catch (err) {
        console.error('Unexpected error:', err);
        setConnectionStatus('Connection failed: Unexpected error');
      }
    }

    testConnection();
  }, []);

  // keyboard navigation (chatgpt lol)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!videoFeedRef.current) return;

      const videoCards = videoFeedRef.current.children;
      if (videoCards.length === 0) return;

      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault();
        const nextIndex = Math.min(currentVideoIndex + 1, videos.length - 1);
        setCurrentVideoIndex(nextIndex);
        videoCards[nextIndex]?.scrollIntoView({ behavior: 'smooth' });
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault();
        const prevIndex = Math.max(currentVideoIndex - 1, 0);
        setCurrentVideoIndex(prevIndex);
        videoCards[prevIndex]?.scrollIntoView({ behavior: 'smooth' });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentVideoIndex, videos.length]);

  /*const handleLike = () => {
    alert('Please log in to like videos');
  };*/

  return (
    <div>
      <div className={`connection-status-message${connectionStatus.includes('successful') ? ' success' : ''}`}>
        {connectionStatus}
        <div className="navigation-hint">
          Use ↑↓ arrow keys to navigate videos
        </div>
      </div>
      <div className="video-feed" ref={videoFeedRef}>
        {videos.map((video) => (
          <VideoCard
            key={video.id}
            videoUrl={video.videoUrl}
            username={video.username}
            description={video.description}
            likes={video.likes}
          />
        ))}
      </div>
    </div>
  );
}

export default Video;
