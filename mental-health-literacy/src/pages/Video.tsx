import React, { useState, useEffect } from 'react';
import VideoCard from '../components/VideoCard';
import sharkGif from '../assets/sharky.gif';
//import { getSupabaseClient } from '../lib/supabase';
import './Video.css';

// Styles for Video page - normally in Video.css
const videoPageStyles = `
.video-feed {
  width: 100%;
  max-width: 450px; /* Max-width similar to mobile phone screens */
  height: 100vh;
  margin: 0 auto;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
  /* For browsers that support it, this hides the scrollbar */
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
  border-left: 1px solid #333;
  border-right: 1px solid #333;
}

.video-feed::-webkit-scrollbar {
  display: none; /* Chrome, Safari, and Opera */
}
`;

interface Comment {
  username: string;
  text: string;
}

interface Video {
  id: number;
  videoUrl: string;
  username: string;
  description: string;
  likes: number;
  comments: Comment[];
  isLiked?: boolean;
}

function Video() {
  const [videos] = useState<Video[]>([
    {
      id: 1,
      videoUrl: sharkGif,
      username: "sharky1",
      description: "Find your center. Swipe up for more & double-tap to like. #meditation",
      likes: 1200,
      comments: [
        { username: 'user1', text: 'So relaxing!' },
        { username: 'user2', text: 'Great tip, thanks!' }
      ],
    },
    {
      id: 2,
      videoUrl: sharkGif,
      username: "sharky2",
      description: "Another cool video! #awesome",
      likes: 800,
      comments: [],
    },
    {
      id: 3,
      videoUrl: sharkGif,
      username: "sharky3",
      description: "Just chilling. #vibes",
      likes: 3000,
      comments: [
        { username: 'user3', text: 'Love this vibe!' }
      ],
    }
  ]);

  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.innerText = videoPageStyles;
    document.head.appendChild(styleSheet);
    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  return (
    <div className="video-feed">
      {videos.map((video) => (
        <VideoCard
          key={video.id}
          videoUrl={video.videoUrl}
          username={video.username}
          description={video.description}
          likes={video.likes}
          initialComments={video.comments}
        />
      ))}
    </div>
  );
}

export default Video;
