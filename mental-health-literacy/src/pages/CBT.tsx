import React from "react";
import { Link } from "react-router-dom";
import "./resources.css";

const CBT = () => {
    return (
        <div className="resources-container">
            <div className="section">
                <h2 className="section-title">Helpful Information</h2>
                <div className="card-grid">
                    <a
                        className="resource-card"
                        href="https://www.templehealth.org/services/treatments/psychotherapy"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <div className="resource-title">CBT</div>
                        <div className="resource-meta">
                            Learn more about Cognitive Behavioral Therapy.
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
                            Call Temple Health at <strong>800-836-7536</strong>.
                        </div>
                    </div>
                    <a
                        className="resource-card"
                        href="https://www.templehealth.org/schedule-appointment"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <div className="resource-title">Ready for an appointment?</div>
                        <div className="resource-meta">
                            Schedule an appointment online.
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
export default CBT;