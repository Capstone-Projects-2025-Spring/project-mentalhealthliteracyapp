import { getUser } from "utils/GetUserHook";
import ProtectedRoute from "src/components/ProtectedRoute";
import React, { useEffect, useState } from "react";
import "./Profile.css";

function Profile() {
  const user = getUser();
  // If user not signed in, redirect to main page

  // localStorage preferences
  const [interests, setInterests] = useState<string[]>([]);
  const [traits, setTraits] = useState<string[]>([]);

  useEffect(() => {
    const storedInterests = JSON.parse(localStorage.getItem("userInterests") || "[]");
    const storedTraits = JSON.parse(localStorage.getItem("userTraits") || "[]");
    setInterests(storedInterests);
    setTraits(storedTraits);
  }, []);

  return (
    <div className="profile-page">
      <ProtectedRoute>
        <>
          <h1>Profile</h1>
          <p>Liked videos:</p>
          <div className="thumbnail-list">
            {/* TODO: Add a fetcher to get all liked videos associated with the user*/}
          </div>
          {/* Preferences section */}
          <div className="profile-preferences-container">
            <h2>Your Preferences</h2>
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
          </div>
        </>
      </ProtectedRoute>
    </div>
  );
}

export default Profile;
