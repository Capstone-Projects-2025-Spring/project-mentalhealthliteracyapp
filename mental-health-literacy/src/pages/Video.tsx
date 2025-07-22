import VideoComponent from "src/components/VideoComponent";
import "./Video.css";

const videos = [
  {
    id: 1,
    playbackId: "yqxGVhVrrkaM6UvIKNEkTbcR8AIdWJ5Dfsvh43TS7sg",
    username: "cbt_therapist",
    title: "CBT Therapist",
    description:
      "Experience a one-on-one CBT therapy session. #CBT #TherapySession",
    likes: 1200,
    tags: [
      { label: "CBT", url: "/resources/cbt" },
      { label: "Group Therapy", url: "/resources/group-therapy" },
    ],
  },
  {
    id: 3,
    playbackId: "XySCCoSeiLPRkasKAMi1GQtmZH78vOu9GKnSDEDUpQY",
    username: "peer_supporter",
    title: "Peer support",
    description:
      "Discover the Togetherall app: a safe, anonymous space for mental health peer support. #Togetherall #PeerSupport",
    likes: 800,
    tags: [
      { label: "Peer Support", url: "/resources/peer-support" },
      { label: "Apps", url: "/resources/apps" },
    ],
  },
];

function Video() {
  return (
    <div className="video-container">
      <ul className="video-list">
        {videos
          .filter((vid) => vid.playbackId)
          .map((vid) => {
            return (
              <VideoComponent
                key={vid.id}
                playbackId={vid.playbackId}
                title={vid.title}
                username={vid.username}
                description={vid.description}
                likes={vid.likes}
                tags={vid.tags}
              />
            );
          })}
      </ul>
    </div>
  );
}

export default Video;
