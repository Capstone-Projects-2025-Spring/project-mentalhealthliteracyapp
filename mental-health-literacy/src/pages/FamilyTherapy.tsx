import React from "react";
import { Link } from "react-router-dom";
import "./Resources.css";

const FamilyTherapy = () => {
    return (
        <div className="resources-container">
            <div className="section">
                <h2 className="section-title">Helpful Information</h2>
                <div className="card-grid">
                    <a
                        className="resource-card"
                        href="https://my.clevelandclinic.org/health/treatments/24454-family-therapy"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <div className="resource-title">Information about Family Therapy</div>
                        <div className="resource-meta">
                            Learn about family therapy, its uses, and benefits from Cleveland Clinic.
                        </div>
                    </a>
                    <a
                        className="resource-card"
                        href="https://sites.temple.edu/psc/therapy/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <div className="resource-title">Temple Family Therapy Services</div>
                        <div className="resource-meta">
                            Explore family therapy services available at Temple University.
                        </div>
                    </a>
                </div>
            </div>

            <div className="section">
                <h2 className="section-title">Contact Information</h2>
                <div className="card-grid">
                    <a
                        className="resource-card"
                        href="https://sites.temple.edu/psc/contact/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <div className="resource-title">Contact for an Appointment</div>
                        <div className="resource-meta">
                            Schedule an appointment for family therapy services at Temple.
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

export default FamilyTherapy; 