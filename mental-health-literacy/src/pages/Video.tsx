import {useCallback, useEffect, useRef, useState} from "react";
import { useLocation } from "react-router-dom";
import VideoComponent from "../components/VideoComponent";
import type {Video} from "../components/videoService";
import {videoService} from "../components/videoService";
import {getRecommendedVideos} from "../api/recommendations";

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
  const location = useLocation();
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const videoRefs = useRef<(HTMLDivElement | null)[]>([]);
  const videoFeedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadVideos();
  }, []);

  // Navigate from Profile page to scroll to specific video
  useEffect(() => {
    const { scrollToVideoId } = location.state || {};
    if (scrollToVideoId && videos.length > 0) {
      const videoIndex = videos.findIndex(video => video.id === scrollToVideoId);
      if (videoIndex !== -1) {
        console.log(`[Video] Scrolling to video ${scrollToVideoId} at index ${videoIndex}`);
        setCurrentVideoIndex(videoIndex);
        
        // Scroll to the video
        setTimeout(() => {
          videoRefs.current[videoIndex]?.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }, 100);
      }
    }
  }, [videos, location.state]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (videos.length === 0) return;

      switch (event.key) {
        case 'ArrowUp':
          event.preventDefault();
          if (currentVideoIndex > 0) {
            const newIndex = currentVideoIndex - 1;
            setCurrentVideoIndex(newIndex);
            videoRefs.current[newIndex]?.scrollIntoView({ 
              behavior: 'smooth',
              block: 'start'
            });
          }
          break;
        case 'ArrowDown':
          event.preventDefault();
          if (currentVideoIndex < videos.length - 1) {
            const newIndex = currentVideoIndex + 1;
            setCurrentVideoIndex(newIndex);
            videoRefs.current[newIndex]?.scrollIntoView({ 
              behavior: 'smooth',
              block: 'start'
            });
          }
          break;
        case ' ':
          event.preventDefault();
          // Toggle play/pause for current video
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentVideoIndex, videos.length]);

  const loadVideos = useCallback(async () => {
    try {
      setLoading(true);
      const fetchedVideos = await getRecommendedVideos();
      
      // Process videos with likes and tags using videoService
      const processedVideos = await videoService.processVideosWithLike(fetchedVideos);
      setVideos(processedVideos);
    } catch (err) {
      console.error('Error loading videos:', err);
      // Fallback to hardcoded videos if database fails
      setVideos(getFallbackVideos());
    } finally {
      setLoading(false);
    }
  }, []);

  const handleLike = useCallback(async (videoId: number) => {
    try {
      // Update local state optimistically
      setVideos(prevVideos => {
        return prevVideos.map(video =>
            video.id === videoId
                ? {
                  ...video,
                  likes: video.isLiked ? video.likes - 1 : video.likes + 1,
                  isLiked: !video.isLiked
                }
                : video
        );
      });

      // Update database
      const result = await videoService.updateLike(videoId);

      // Reload videos if supabase update fails
      if (!result.success) {
        console.log('[Video] Like update failed, reloading videos');
        const fetchedVideos = await getRecommendedVideos();
        const processedVideos = await videoService.processVideosWithLike(fetchedVideos);
        setVideos(processedVideos);
      }
    } catch (err) {
      console.log('[handleLike] Error:', err);
      const fetchedVideos = await getRecommendedVideos();
      const processedVideos = await videoService.processVideosWithLike(fetchedVideos);
      setVideos(processedVideos);
    }
  }, []);

  // Fallback videos if database is not available
  const getFallbackVideos = (): Video[] => [
    {
      id: 1,
      playbackId: "yqxGVhVrrkaM6UvIKNEkTbcR8AIdWJ5Dfsvh43TS7sg",
      username: "cbt_therapist",
      description: "Experience a one-on-one CBT therapy session. #CBT #TherapySession",
      likes: 1200,
      isLiked: false,
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
    <div className="video-feed" ref={videoFeedRef}>
      {videos.map((video, index) => (
        <div
          key={video.id}
          ref={(el) => {
            videoRefs.current[index] = el;
          }}
          className="video-item"
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
                videoId={video.id}
                onLike={handleLike}
                isLiked={video.isLiked}
              />
            ) : (
              <div className="video-placeholder">
                <div>
                  <div>No video available for @{video.username}</div>
                </div>
              </div>
            )
          ) : (
            <div className="video-placeholder">
              <div>
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
