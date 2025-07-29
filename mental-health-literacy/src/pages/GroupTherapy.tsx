import { Link } from "react-router-dom";
import "./Resources.css";

const GroupTherapy = () => {
  return (
    <div className="resources-container">
      <div className="section">
        <h2 className="section-title">Helpful Information</h2>
        <div className="card-grid">
          <a
            className="resource-card"
            href="https://counseling.temple.edu/group-therapy-skills-classes"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="resource-title">Group Therapy</div>
            <div className="resource-meta">
              Learn more about Group Therapy at Temple University.
            </div>
          </a>

          <a
            className="resource-card"
            href="https://www.canva.com/design/DAGjT1oz_0g/POnxBpUdCekGdvWFN3lh3A/view?utm_content=DAGjT1oz_0g&utm_campaign=designshare&utm_medium=embeds&utm_source=link"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="resource-title">Group Therapy Brochure</div>
            <div className="resource-meta">
              Temple University's Group Therapy brochure.
            </div>
          </a>
        </div>
      </div>

      <div className="section">
        <h2 className="section-title">Contact Information</h2>
        <div className="card-grid">
          <div className="resource-card">
            <div className="resource-title">Phone Number</div>
            <div className="resource-meta">
              Call Tuttleman Counseling Services at{" "}
              <strong>215-204-7276</strong>.
            </div>
          </div>

          <a
            className="resource-card"
            href="https://temple-counseling.titaniumhwc.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="resource-title">Registration</div>
            <div className="resource-meta">Register for services.</div>
          </a>
        </div>
      </div>
      <Link to="/resources" className="back-button">
        &larr; Back to Resources
      </Link>
    </div>
  );
};

export default GroupTherapy;
