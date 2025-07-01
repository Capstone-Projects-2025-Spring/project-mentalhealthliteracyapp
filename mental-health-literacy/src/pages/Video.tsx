import { useState, useEffect, useRef } from 'react';
import VideoCard from '../components/VideoCard';
//import sharkGif from '../assets/sharky.gif'; //for testing purposes
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

.video-placeholder {
  width: 100%;
  height: 100vh;
  scroll-snap-align: start;
  background-color: #000;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 18px;
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
  // State for current video index and video refs
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const videoRefs = useRef<(HTMLDivElement | null)[]>([]);
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

  useEffect(() => {
    // Intersection Observer to detect when a video is in view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = videoRefs.current.findIndex(ref => ref === entry.target);
            if (index !== -1) {
              setCurrentVideoIndex(index);
            }
          }
        });
      },
      {
        threshold: 0.5,
        rootMargin: '0px'
      }
    );

    // Observe each video ref
    videoRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    // Cleanup function to disconnect observer
    return () => observer.disconnect();
  }, []);

  return (
    <div className="video-feed">
      {videos.map((video, index) => (
        <div
          key={video.id}
          ref={(el) => { videoRefs.current[index] = el; }}
          style={{ width: '100%', height: '100vh', scrollSnapAlign: 'start' }}
        >
          {index === currentVideoIndex ? (
            <VideoCard
              videoUrl={video.videoUrl}
              playbackId={video.playbackId}
              username={video.username}
              description={video.description}
              likes={video.likes}
              initialComments={video.comments}
              isActive={true}
            />
          ) : (
            <div className="video-placeholder">
              <div style={{ textAlign: 'center' }}>
                <div>@{video.username}</div>
                <div style={{ fontSize: '14px', marginTop: '8px' }}>{video.description}</div>
                <div style={{ fontSize: '12px', marginTop: '16px', opacity: 0.7 }}>
                  Scroll to view video
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Video;
