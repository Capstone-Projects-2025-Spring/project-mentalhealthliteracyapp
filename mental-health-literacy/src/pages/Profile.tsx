import useUser from "utils/useUser";
import ProtectedRoute from "src/components/ProtectedRoute";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import "./Profile.css";
import { saveUserPreferences, fetchUserPreferences, fetchAllPreferences } from "src/api/preferences";
import { videoService } from "src/components/videoService";
import type { Video } from "src/components/videoService";
import LikedVideoCard from "src/components/LikedVideoCard";

const MAX_SELECTIONS = 5;

interface Preference {
  id: number;
  name: string;
}

function Profile() {
  const user = useUser();
  const navigate = useNavigate();
  
  // localStorage preferences
  const [interests, setInterests] = useState<string[]>([]);
  const [traits, setTraits] = useState<string[]>([]);
  const [availableInterests, setAvailableInterests] = useState<Preference[]>([]);
  const [availableTraits, setAvailableTraits] = useState<Preference[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editInterests, setEditInterests] = useState<string[]>([]);
  const [editTraits, setEditTraits] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showConfirmClose, setShowConfirmClose] = useState(false);
  const [loadingPreferences, setLoadingPreferences] = useState(true);
  const [loadingAvailablePreferences, setLoadingAvailablePreferences] = useState(true);
  
  // Liked videos state
  const [likedVideos, setLikedVideos] = useState<Video[]>([]);
  const [loadingLikedVideos, setLoadingLikedVideos] = useState(true);
  const [showAllLikedVideos, setShowAllLikedVideos] = useState(false);

  // Load available preferences from database
  useEffect(() => {
    const loadAvailablePreferences = async () => {
      try {
        setLoadingAvailablePreferences(true);
        const result = await fetchAllPreferences();
        
        if (result.status === 200 && result.data) {
          setAvailableInterests(result.data.interests);
          setAvailableTraits(result.data.traits);
        } else {
          console.log("[Profile] Error loading available preferences:", result.error);
        }
      } catch (error) {
        console.log("[Profile] Error loading available preferences:", error);
      } finally {
        setLoadingAvailablePreferences(false);
      }
    };

    loadAvailablePreferences();
  }, []);

  useEffect(() => {
    const loadPreferences = async () => {
      setLoadingPreferences(true);
      
      if (user && user !== "Guest") {
        // If authenticated user, get preferences from Supabase
        const result = await fetchUserPreferences();
        
        if (result.status === 200 && result.data) {
          // Always use Supabase data for authenticated users, even if empty
          setInterests(result.data.interests);
          setTraits(result.data.traits);
        } else {
          // Supabase fetch failed, but user is authenticated
          // Don't fall back to localStorage for authenticated users
          // This prevents showing stale localStorage data
          setInterests([]);
          setTraits([]);
        }
      } else if (user === null) {
        // User is still loading, don't show anything yet
        setInterests([]);
        setTraits([]);
      } else {
        // Only use localStorage for non-authenticated users (Guest)
        const storedInterests = JSON.parse(localStorage.getItem("userInterests") || "[]");
        const storedTraits = JSON.parse(localStorage.getItem("userTraits") || "[]");
        setInterests(storedInterests);
        setTraits(storedTraits);
      }
      
      setLoadingPreferences(false);
    };
    loadPreferences();
  }, [user]);

  // Load liked videos when user changes
  useEffect(() => {
    const loadLikedVideos = async () => {
      if (user && user !== "Guest") {
        try {
          setLoadingLikedVideos(true);
          const videos = await videoService.getLikedVideos();
          setLikedVideos(videos);
        } catch (error) {
          setLikedVideos([]);
        } finally {
          setLoadingLikedVideos(false);
        }
      } else {
        setLikedVideos([]);
        setLoadingLikedVideos(false);
      }
    };
    
    loadLikedVideos();
  }, [user]);


  const handleEdit = () => {
    setEditInterests(interests);
    setEditTraits(traits);
    setModalOpen(true);
    setError(null);
  };

  const toggleEditSelection = (item: string, current: string[], set: (val: string[]) => void) => {
    if (current.includes(item)) {
      set(current.filter((i) => i !== item));
    } else if (current.length < MAX_SELECTIONS) {
      set([...current, item]);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    try {
      if (user && user !== "Guest") {
        // For authenticated users, save to Supabase and clear localStorage
        await saveUserPreferences([...editInterests, ...editTraits]);
        // Clear localStorage to prevent conflicts
        localStorage.removeItem("userInterests");
        localStorage.removeItem("userTraits");
      } else {
        // For non-authenticated users, save to localStorage only
        localStorage.setItem("userInterests", JSON.stringify(editInterests));
        localStorage.setItem("userTraits", JSON.stringify(editTraits));
      }
      
      setInterests(editInterests);
      setTraits(editTraits);
      setModalOpen(false);
    } catch (err: any) {
      setError(err.message || "Failed to save preferences");
    }
    setSaving(false);
  };

  const handleCancel = () => {
    setShowConfirmClose(true);
  };

  // Reset edit state to original values so preferences aren't saved
  const handleConfirmClose = () => {
    setEditInterests(interests);
    setEditTraits(traits);
    setModalOpen(false);
    setError(null);
    setShowConfirmClose(false);
  };

  const handleCancelClose = () => {
    // Just close confirmation modal, keep edit modal open
    setShowConfirmClose(false);
  };

  const handleVideoClick = (videoId: number) => {
    // Navigate to videos tab and scroll to specific video
    navigate('/video', { 
      state: { scrollToVideoId: videoId } 
    });
  };

  const toggleLikedVideos = () => {
    setShowAllLikedVideos(!showAllLikedVideos);
  };

  // Get videos to display
  const displayedVideos = showAllLikedVideos ? likedVideos : likedVideos.slice(0, 3);
  const hasMoreVideos = likedVideos.length > 3;

  return (
    <div className="profile-page">
      <ProtectedRoute>
        <>
          <div className="profile-section">
            <h1>Profile</h1>
          </div>
          
          <div className="profile-liked-videos">
            <h2>Liked Videos</h2>
            <div className="liked-videos-grid">
              {loadingLikedVideos ? (
                <div className="loading-liked-videos">
                  <p>Loading your liked videos...</p>
                </div>
              ) : likedVideos.length === 0 ? (
                <div className="no-liked-videos">
                  <p>No liked videos yet. Start exploring the Videos tab to find content you love!</p>
                </div>
              ) : (
                <>
                  {displayedVideos.map((video) => (
                    <LikedVideoCard 
                      key={video.id}
                      video={video}
                      onVideoClick={() => handleVideoClick(video.id)}
                    />
                  ))}
                  {hasMoreVideos && (
                    <div className="expand-videos-card" onClick={toggleLikedVideos}>
                      <FontAwesomeIcon 
                        icon={showAllLikedVideos ? faChevronUp : faChevronDown} 
                        className="expand-icon"
                      />
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          <div className="profile-preferences-container">
            <h2>Your Preferences</h2>
            {loadingPreferences ? (
              <div className="loading-preferences">
                <p>Loading your preferences...</p>
              </div>
            ) : (
              <>
                <div>
                  <strong>Interests:</strong>
                  <div className="profile-pill-list">
                    {interests.length === 0 ? (
                      <span className="profile-pill-empty">No interests selected.</span>
                    ) : (
                      interests.map((interest) => (
                        <span key={interest} className="profile-pill">
                          {interest}
                        </span>
                      ))
                    )}
                  </div>
                </div>
                <div>
                  <strong>Traits:</strong>
                  <div className="profile-pill-list">
                    {traits.length === 0 ? (
                      <span className="profile-pill-empty">No traits selected.</span>
                    ) : (
                      traits.map((trait) => (
                        <span key={trait} className="profile-pill">
                          {trait}
                        </span>
                      ))
                    )}
                  </div>
                </div>
                <button className="profile-edit-button" onClick={handleEdit}>Edit Preferences</button>
              </>
            )}
          </div>

          {modalOpen && (
            <div className="edit-preferences-modal-overlay">
              <div className="edit-preferences-modal">
                <button
                  onClick={handleCancel}
                  className="modal-close-button"
                  aria-label="Close"
                  title="Close"
                >×</button>
                <h2>Edit Preferences</h2>

                <div className="edit-preferences-section">
                  <strong className="edit-preferences-label">Interests:</strong>
                  {loadingAvailablePreferences ? (
                    <div className="loading-preferences">
                      <p>Loading interests...</p>
                    </div>
                  ) : (
                    <div className="edit-preferences-grid edit-preferences-grid-interests">
                      {availableInterests.map((interest) => (
                        <button
                          key={interest.id}
                          className={
                            "modal-pill" + (editInterests.includes(interest.name) ? " modal-pill-selected" : "")
                          }
                          onClick={() => toggleEditSelection(interest.name, editInterests, setEditInterests)}
                          type="button"
                          disabled={
                            editInterests.length >= MAX_SELECTIONS && !editInterests.includes(interest.name)
                          }
                        >
                          {interest.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="edit-preferences-section edit-preferences-section-traits">
                  <strong className="edit-preferences-label">Traits:</strong>
                  {loadingAvailablePreferences ? (
                    <div className="loading-preferences">
                      <p>Loading traits...</p>
                    </div>
                  ) : (
                    <div className="edit-preferences-grid edit-preferences-grid-traits">
                      {availableTraits.map((trait) => (
                        <button
                          key={trait.id}
                          className={
                            "modal-pill" + (editTraits.includes(trait.name) ? " modal-pill-selected" : "")
                          }
                          onClick={() => toggleEditSelection(trait.name, editTraits, setEditTraits)}
                          type="button"
                          disabled={
                            editTraits.length >= MAX_SELECTIONS && !editTraits.includes(trait.name)
                          }
                        >
                          {trait.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {error && <div className="edit-preferences-error">{error}</div>}

                <div className="edit-preferences-save-container">
                  <button 
                    className="modal-save-button" 
                    onClick={handleSave} 
                    disabled={saving} 
                  >
                    {saving ? "Saving..." : "Save"}
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {showConfirmClose && (
            <div className="profile-confirm-modal">
              <div className="profile-confirm-modal-content">
                <p>Are you sure you want to discard your changes? Changes will not be saved.</p>
                <div className="profile-confirm-modal-buttons">
                  <button className="secondaryButton" onClick={handleCancelClose}>Cancel</button>
                  <button className="ctaButton" onClick={handleConfirmClose}>OK</button>
                </div>
              </div>
            </div>
          )}
        </>
      </ProtectedRoute>
    </div>
  );
}

export default Profile;
