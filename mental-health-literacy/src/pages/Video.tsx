import { useState, useEffect } from 'react';
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
  playbackId?: string;
  videoUrl?: string;
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
      playbackId: "FsnMNRJwGDWF9C01KsSOrze500A9cFtCatEB02Q02B00TT24",
      username: "mindful_ally",
      description: "You're not alone. #mentalhealth",
      likes: 1200,
      comments: [
        { username: 'user1', text: 'So relaxing!' },
        { username: 'user2', text: 'Great tip, thanks!' }
      ],
    },
    {
      id: 2,
      playbackId: "pPH02I7tF7iy00r4GbBLdD4mxaMWSEmmvjwgrETKk6zXw",
      username: "hopeful_voice",
      description: "It starts with one conversation. #mentalhealthawareness #letstalk",
      likes: 800,
      comments: [],
    },
    {
      id: 3,
      playbackId: "DyNdWvq00sKPP7hywrZ00VWUmjbu53Oth5KeO4BRi602A00",
      username: "growth_journey",
      description: "Growth happens in small steps",
      likes: 3000,
      comments: [
        { username: 'user3', text: 'Love this vibe!' }
      ],
    },
    {
      id: 4,
      playbackId: "risqYxa7s01lnTKZ7KpVRYS001TErCyandsWNC3xv7jY8",
      username: "open_ears",
      description: "Let's talk about mental health",
      likes: 3000,
      comments: [
        { username: 'user4', text: 'Love this vibe!' }
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
          playbackId={video.playbackId}
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
