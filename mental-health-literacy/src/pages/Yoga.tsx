import React from "react";
import "./resources.css";

const Yoga = () => {
    return (
        <div className="resources-container">
            <div className="section">
                <h2 className="section-title">Helpful Information</h2>
                <div className="card-grid">
                    <a
                        className="resource-card"
                        href="https://counseling.temple.edu/therapeutic-yoga-0"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <div className="resource-title">Therapeutic Yoga</div>
                        <div className="resource-meta">
                            Learn more about Therapeutic Yoga and Meditation at Temple University.
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
                            Call Tuttleman Counseling Services at <strong>215-204-7276</strong>.
                        </div>
                    </div>
                    <a
                        className="resource-card"
                        href="https://temple-counseling.titaniumhwc.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <div className="resource-title">Registration</div>
                        <div className="resource-meta">
                            Register for services and complete section #5.
                        </div>
                    </a>
                </div>
            </div>
        </div>
    );
};
export default Yoga;