import React from 'react';
import VideoCard from '../components/VideoCard';

function Video() {
  // Example video data
  const videos = [
    {
      id: 1,
      videoUrl: "https://example.com/video1.mp4",
      username: "user1",
      description: "Mental health tip #1: Deep breathing exercises",
      likes: 1234
    },
    {
      id: 2,
      videoUrl: "https://example.com/video2.mp4",
      username: "mindfulness_expert",
      description: "Quick meditation guide for anxiety",
      likes: 856
    },
    {
      id: 3,
      videoUrl: "https://example.com/video3.mp4",
      username: "wellness_coach",
      description: "5 tips for better sleep habits",
      likes: 2045
    },
   
  ];

  return (
    <div className="video-feed">
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
  );
}

export default Video;
