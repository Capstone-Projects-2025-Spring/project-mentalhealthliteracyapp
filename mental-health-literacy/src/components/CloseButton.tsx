import { faX } from "@fortawesome/free-solid-svg-icons";
import "./CloseButton.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function CloseButton({ close }) {
  return (
    <button onClick={close} className="close-button">
      <FontAwesomeIcon icon={faX} />
    </button>
  );
}

export default CloseButton;
