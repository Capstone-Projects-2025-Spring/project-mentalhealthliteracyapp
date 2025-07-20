import store from "src/context/global_store";
import "./ProfileSidebar.css";
import { signout } from "src/context/features/user/userSlice";
import { getUser } from "utils/GetUserHook";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router";

function ProfileSidebar() {
  const userEmail = getUser();
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
      <p>
        Signed in as: <br></br>
        {userEmail}
      </p>
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          store.dispatch(signout());
        }}
      >
        <FontAwesomeIcon icon={faRightFromBracket} />
      </button>
    </div>
  );
}

export default ProfileSidebar;
