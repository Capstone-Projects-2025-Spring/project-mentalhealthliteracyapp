import React from "react";
import { Link } from "react-router-dom";
import "./Resources.css";

const AnimalTherapy = () => {
    return (
        <div className="resources-container">
            <div className="section">
                <h2 className="section-title">Helpful Information</h2>
                <div className="card-grid">
                    <a
                        className="resource-card"
                        href="https://www.psychologytoday.com/us/therapy-types/animal-assisted-therapy"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <div className="resource-title">Animal Assisted Therapy</div>
                        <div className="resource-meta">
                            Read about animal assisted therapy, its uses, and benefits on Psychology Today.
                        </div>
                    </a>
                    <a
                        className="resource-card"
                        href="https://www.templehealth.org/locations/temple-university-hospital/patients-visitors/plan-your-visit/temple-tails"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <div className="resource-title">Temple Tails</div>
                        <div className="resource-meta">
                            Temple University Hospital’s animal assisted interaction program, featuring certified dogs and their handlers
                        </div>
                    </a>
                </div>
            </div>

            <div className="section">
                <h2 className="section-title">Contact Information</h2>
                <div className="card-grid">
                    <div className="resource-card">
                        <div className="resource-title">Temple Tails Guest Relations</div>
                        <div className="resource-meta">
                            To become a member of Temple Tails, call Guest Relations at <strong>215-707-5479</strong>.
                        </div>
                    </div>
                </div>
            </div>
            <Link to="/resources" className="back-button">
                &larr; Back to Resources
            </Link>
        </div>
    );
};

export default AnimalTherapy;