import { useState, useEffect, useRef } from "react";
import VideoCard from "../components/VideoCard";
import anxietyImg from "../assets/anxiety.png";
import depressionImg from "../assets/depression.png";
import stressImg from "../assets/stress.png";
//import sharkGif from '../assets/sharky.gif'; //for testing purposes
//import { getSupabaseClient } from '../lib/supabase';
import style from "./Video.css?url";



interface Video {
  id: number;
  playbackId?: string;
  videoUrl?: string;
  imageUrl?: string;
  username: string;
  description: string;
  likes: number;
  isLiked?: boolean;
  tags?: { label: string; url: string }[];
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
      playbackId: "yqxGVhVrrkaM6UvIKNEkTbcR8AIdWJ5Dfsvh43TS7sg",
      username: "cbt_therapist",
      description: "Experience a one-on-one CBT therapy session. #CBT #TherapySession",
      likes: 1200,
      tags: [
        { label: "CBT", url: "/cbt" },
        { label: "Therapy", url: "/resources/therapy" },
      ],
    },
    {
      id: 2,
      imageUrl: anxietyImg,
      username: "mental_health_edu",
      description:
        "Understanding anxiety and how it affects daily life. #anxiety #mentalhealth",
      likes: 950,
      tags: [
        { label: "Anxiety", url: "/resources/anxiety" },
        { label: "CBT", url: "/resources/cbt" },
      ],
    },
    {
      id: 3,
      playbackId: "XySCCoSeiLPRkasKAMi1GQtmZH78vOu9GKnSDEDUpQY",
      username: "peer_supporter",
      description:
        "Discover the Togetherall app: a safe, anonymous space for mental health peer support. #Togetherall #PeerSupport",
      likes: 800,
      tags: [
        { label: "Peer Support", url: "/resources/peer-support" },
        { label: "Apps", url: "/resources/apps" },
      ],
    },
    {
      id: 4,
      imageUrl: depressionImg,
      username: "wellness_guide",
      description:
        "Depression is a common mental health condition. Let's break the stigma. #depression #support",
      likes: 1150,
      tags: [
        { label: "Depression", url: "/resources/depression" },
        { label: "Support", url: "/resources/support" },
      ],
    },
    {
      id: 5,
      playbackId: "6bF6fj3MLNyOPJtZH500uRnzw6p7gIRqzjq3NI4uIxD8",
      username: "group_therapy_cbt",
      description: "Join a group CBT therapy session and learn together. #GroupTherapy #CBT",
      likes: 3000,
      tags: [
        { label: "CBT", url: "/group-therapy" },
        { label: "Group Therapy", url: "/resources/group-therapy" },
      ],
    },
    {
      id: 6,
      imageUrl: stressImg,
      username: "calm_mind",
      description:
        "Stress is natural, but learning to manage it makes all the difference. #stress #wellness",
      likes: 890,
      tags: [
        { label: "Stress", url: "/resources/stress" },
        { label: "Wellness", url: "/resources/wellness" },
      ],
    },
    {
      id: 7,
      playbackId: "risqYxa7s01lnTKZ7KpVRYS001TErCyandsWNC3xv7jY8",
      username: "open_ears",
      description: "Let's talk about mental health",
      likes: 3000,
      tags: [
        { label: "Mental Health", url: "/resources/mental-health" },
      ],
    },
    {
      id: 8,
      playbackId: "QiDNSKw1QkXMWz32AVmMYjiKYE3f8eVd6AX02F9Bgm2w",
      username: "yoga_influencer",
      description: "Join me for a therapeutic yoga session to boost your mental well-being. #YogaTherapy #Mindfulness",
      likes: 2100,
      tags: [
        { label: "Yoga", url: "yoga" },
        { label: "Mindfulness", url: "/resources/mindfulness" },
      ],
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
              isActive={true}
              tags={video.tags}
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
