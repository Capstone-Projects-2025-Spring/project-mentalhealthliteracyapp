import { getUser } from "utils/GetUserHook";
import ProtectedRoute from "src/components/ProtectedRoute";
import "./Profile.css";

function Profile() {
  const user = getUser();
  // If user not signed in, redirect to main page
  return (
    <div className="profile-page">
      <ProtectedRoute>
        <>
          <h1>Profile</h1>
          <p>Liked videos:</p>
          <div className="thumbnail-list">
            {/* TODO: Add a fetcher to get all liked videos associated with the user*/}
          </div>
        </>
      </ProtectedRoute>
    </div>
  );
}

export default Profile;
