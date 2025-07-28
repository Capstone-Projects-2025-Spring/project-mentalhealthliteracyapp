import { useState, useEffect, useRef } from "react";
import VideoComponent from "../components/VideoComponent";
import { videoService } from "../components/videoService";
import { getRecommendedVideos } from "../api/recommendations";
import type { Video } from "../components/videoService";

import style from "./Video.css?url";

export function links() {
  return [
    {
      rel: "stylesheet",
      href: style,
    },
  ];
}

function Video() {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const videoRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    loadVideos();
  }, []);

  const loadVideos = async () => {
    try {
      setLoading(true);
      const fetchedVideos = await getRecommendedVideos();
      setVideos(fetchedVideos);
    } catch (err) {
      console.error('Error loading videos:', err);
      // Fallback to hardcoded videos if database fails
      setVideos(getFallbackVideos());
    } finally {
      setLoading(false);
    }
  };


  const handleLike = async (videoId: number) => {
    try {
      // Update local state optimistically
      setVideos(prevVideos => 
        prevVideos.map(video => 
          video.id === videoId 
            ? { ...video, likes: video.likes + 1 }
            : video
        )
      );

      // Update database
      const video = videos.find(v => v.id === videoId);
      if (video) {
        await videoService.updateLikes(videoId, video.likes + 1);
      }
    } catch (err) {
      console.error('Error updating like:', err);
      // Revert optimistic update on error
      await loadVideos();
    }
  };

  // Fallback videos if database is not available
  const getFallbackVideos = (): Video[] => [
    {
      id: 1,
      playbackId: "yqxGVhVrrkaM6UvIKNEkTbcR8AIdWJ5Dfsvh43TS7sg",
      username: "cbt_therapist",
      description: "Experience a one-on-one CBT therapy session. #CBT #TherapySession",
      likes: 1200,
      tags: [
        { label: "CBT", url: "/resources/cbt" },
        { label: "Therapy", url: "/resources/therapy" },
      ],
    },
    // ... add all your other videos here as fallback
  ];

  useEffect(() => {
    // Intersection Observer to detect when a video is in view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = videoRefs.current.findIndex(
              (ref) => ref === entry.target
            );
            if (index !== -1) {
              setCurrentVideoIndex(index);
            }
          }
        });
      },
      {
        threshold: 0.5,
        rootMargin: "0px",
      }
    );
    // Observe each video ref
    videoRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });
    return () => observer.disconnect();
  }, [videos]);

  if (loading) {
    return <div className="loading">Loading videos...</div>;
  }

  return (
    <div className="video-feed">
      {videos.map((video, index) => (
        <div
          key={video.id}
          ref={(el) => {
            videoRefs.current[index] = el;
          }}
          style={{ width: "100%", height: "100vh", scrollSnapAlign: "start" }}
        >
          {index === currentVideoIndex ? (
            video.playbackId ? (
              <VideoComponent
                playbackId={video.playbackId}
                title={video.username}
                username={video.username}
                description={video.description}
                likes={video.likes}
                tags={video.tags}
                isActive={true}
              />
            ) : (
              <div className="video-placeholder">
                <div style={{ textAlign: "center" }}>
                  <div>No video available for @{video.username}</div>
                </div>
              </div>
            )
          ) : (
            <div className="video-placeholder">
              <div style={{ textAlign: "center" }}>
                <div>@{video.username}</div>
                <div style={{ fontSize: "14px", marginTop: "8px" }}>
                  {video.description}
                </div>
                <div
                  style={{ fontSize: "12px", marginTop: "16px", opacity: 0.7 }}
                >
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
