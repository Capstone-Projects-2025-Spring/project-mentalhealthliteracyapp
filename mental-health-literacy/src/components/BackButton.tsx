import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import "./BackButton.css";
function BackButton() {
  const navigate = useNavigate();
  return (
    <button
      type="button"
      className="back-button"
      onClick={() => {
        if (window.history?.length > 1) {
          navigate(-1);
        } else {
          navigate("/", { replace: true });
        }
      }}
    >
      <FontAwesomeIcon icon={faArrowLeft} />
    </button>
  );
}

export default BackButton;
