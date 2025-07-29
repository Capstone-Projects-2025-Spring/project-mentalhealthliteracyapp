import { Link } from "react-router-dom";
import "./Resources.css";

const ArtTherapy = () => {
  return (
    <div className="resources-container">
      <div className="section">
        <h2 className="section-title">Helpful Information</h2>
        <div className="card-grid">
          <a
            className="resource-card"
            href="https://tyler.temple.edu/programs/art-therapy"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="resource-title">Art Therapy</div>
            <div className="resource-meta">
              Learn about Art Therapy at Temple University, integrating mental
              health, human services, and the creative process.
            </div>
          </a>
          <a
            className="resource-card"
            href="https://temple.campuslabs.com/engage/organization/arttherapytu"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="resource-title">Therapeutic Art Club</div>
            <div className="resource-meta">
              Explore the student-run Therapeutic Art Club at Temple University.
            </div>
          </a>
        </div>
      </div>

      <div className="section">
        <h2 className="section-title">Contact Information</h2>
        <div className="card-grid">
          <a
            className="resource-card"
            href="https://www.instagram.com/arttherapytu/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="resource-title">Art Therapy Club Instagram</div>
            <div className="resource-meta">
              Connect with the Art Therapy Club on Instagram: @arttherapytu
            </div>
          </a>
        </div>
      </div>
      <Link to="/resources" className="back-button">
        &larr; Back to Resources
      </Link>
    </div>
  );
};

export default ArtTherapy;
