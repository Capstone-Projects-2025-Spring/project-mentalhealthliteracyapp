import store from "src/context/global_store";
import "./ProfileSidebar.css";
import { user_signout } from "src/context/features/user/userSlice";
import useUser from "utils/useUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router";

function ProfileSidebar() {
  const userEmail = useUser();
  const nav = useNavigate();
  return (
    <div
      className="profile-sidebar"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        nav("/profile");
      }}
    >
      <div className="profile-sidebar-info">
        <p>
          Signed in as: <br></br>
          {userEmail}
        </p>
      </div>

      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          store.dispatch(user_signout());
        }}
      >
        <FontAwesomeIcon icon={faRightFromBracket} />
      </button>
    </div>
  );
}

export default ProfileSidebar;
