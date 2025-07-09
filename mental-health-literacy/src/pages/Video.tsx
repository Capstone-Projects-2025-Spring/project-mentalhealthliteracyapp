import { useState, useEffect, useRef } from "react";
import VideoCard from "../components/VideoCard";
import anxietyImg from "../assets/anxiety.png";
import depressionImg from "../assets/depression.png";
import stressImg from "../assets/stress.png";
//import sharkGif from '../assets/sharky.gif'; //for testing purposes
//import { getSupabaseClient } from '../lib/supabase';
import style from "./Video.css?url";

interface Comment {
  username: string;
  text: string;
}

interface Video {
  id: number;
  playbackId?: string;
  videoUrl?: string;
  imageUrl?: string;
  username: string;
  description: string;
  likes: number;
  comments: Comment[];
  isLiked?: boolean;
}

export function links() {
  return [
    {
      rel: "stylesheet",
      href: style,
    },
  ];
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
        { username: "user1", text: "So relaxing!" },
        { username: "user2", text: "Great tip, thanks!" },
      ],
    },
    {
      id: 2,
      imageUrl: anxietyImg,
      username: "mental_health_edu",
      description:
        "Understanding anxiety and how it affects daily life. #anxiety #mentalhealth",
      likes: 950,
      comments: [
        {
          username: "user5",
          text: "This really helped me understand anxiety better",
        },
        { username: "user6", text: "Thank you for sharing this information" },
      ],
    },
    {
      id: 3,
      playbackId: "pPH02I7tF7iy00r4GbBLdD4mxaMWSEmmvjwgrETKk6zXw",
      username: "hopeful_voice",
      description:
        "It starts with one conversation. #mentalhealthawareness #letstalk",
      likes: 800,
      comments: [],
    },
    {
      id: 4,
      imageUrl: depressionImg,
      username: "wellness_guide",
      description:
        "Depression is a common mental health condition. Let's break the stigma. #depression #support",
      likes: 1150,
      comments: [{ username: "user7", text: "Important information to share" }],
    },
    {
      id: 5,
      playbackId: "DyNdWvq00sKPP7hywrZ00VWUmjbu53Oth5KeO4BRi602A00",
      username: "growth_journey",
      description: "Growth happens in small steps",
      likes: 3000,
      comments: [{ username: "user3", text: "Love this vibe!" }],
    },
    {
      id: 6,
      imageUrl: stressImg,
      username: "calm_mind",
      description:
        "Stress is natural, but learning to manage it makes all the difference. #stress #wellness",
      likes: 890,
      comments: [
        { username: "user8", text: "Great tips for managing stress!" },
        { username: "user9", text: "I needed to see this today" },
      ],
    },
    {
      id: 7,
      playbackId: "risqYxa7s01lnTKZ7KpVRYS001TErCyandsWNC3xv7jY8",
      username: "open_ears",
      description: "Let's talk about mental health",
      likes: 3000,
      comments: [{ username: "user4", text: "Love this vibe!" }],
    },
  ]);

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

    // Cleanup function to disconnect observer
    return () => observer.disconnect();
  }, []);

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
            <VideoCard
              videoUrl={video.videoUrl}
              playbackId={video.playbackId}
              imageUrl={video.imageUrl}
              username={video.username}
              description={video.description}
              likes={video.likes}
              initialComments={video.comments}
              isActive={true}
            />
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
