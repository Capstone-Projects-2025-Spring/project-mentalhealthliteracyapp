import VideoCard from '../components/VideoCard';
import sharkGif from '../assets/sharky.gif';

function Video() {
  const videos = [
    {
      id: 1,
      videoUrl: sharkGif,
      username: "sharky1",
      description: "blank",
      likes: 1234
    },
    {
      id: 2,
      videoUrl: sharkGif,
      username: "sharky2",
      description: "",
      likes: 856
    },
    {
      id: 3,
      videoUrl: sharkGif,
      username: "sharky3",
      description: "blank",
      likes: 2045
    }
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
