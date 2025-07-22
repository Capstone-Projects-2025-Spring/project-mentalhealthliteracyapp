import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import Joyride, { STATUS } from "react-joyride";
import type { Step, CallBackProps } from "react-joyride";
import "./Resources.css";
import groupTherapy from "../assets/group-therapy.png";
import cbt from "../assets/cbt.png";
import therapeuticYoga from "../assets/therapeutic-yoga.png";
import animalTherapy from "../assets/animal-therapy.png";
import artTherapy from "../assets/art.png";
import familyTherapy from "../assets/family-therapy.png";
import helpIcon from "../assets/help.png";

const Resources = () => {
    const [run, setRun] = useState(false);
    const navigate = useNavigate();
    const [showDialog, setShowDialog] = useState(false);
    const steps: Step[] = [
        {
            target: "#resource-cbt",
            content: "These cards provide information on various mental health resources. Click on a card to learn more about the resource.",
        },
    ];
    const handleJoyrideCallback = (data: CallBackProps) => {
        const { status, index, action } = data;
        if ((status === STATUS.FINISHED || status === STATUS.SKIPPED) && index === 0) {
            setRun(false);
        }
        if (action === "next" && index === 0) {
            navigate("/cbt?tour=true");
        }
    };
    return (
        <div className="resources-container">
            <Joyride
                steps={steps}
                run={run}
                continuous
                showProgress={false}
                showSkipButton={false}
                callback={handleJoyrideCallback}
                styles={{
                    options: {
                        primaryColor: "var(--clr-bg-300)",
                        zIndex: 1000,
                        textColor: "var(--clr-fc-primary)",
                    },
                }}
                locale={{
                    back: "Back",
                    close: "Close",
                    last: "Next",
                    next: "Next"
                }}
            />
            {showDialog && (
                <div className="help-dialog-overlay">
                    <div className="help-dialog">
                        <div className="help-dialog-message">
                            {/* Removed: Follow the highlighted dots for a guided tutorial of the resources page! */}
                            Need help? Explore the resources below or contact support.
                        </div>
                        <button
                            className="help-dialog-close"
                            onClick={() => { setShowDialog(false); setRun(true); }}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
            <h2 className="section-title">Mental Health Conditions</h2>
            <button
                className="guided-tour-btn"
                onClick={() => setRun(true)}
                style={{ display: "none" }}
            >
                Tutorial
            </button>
            <img
                src={helpIcon}
                alt="Help"
                className="help-icon"
                style={{ width: 36, height: 36, cursor: "pointer", marginBottom: "2rem" }}
                onClick={() => setShowDialog(true)}
                title="Help"
            />
            <div className="card-grid">
                <Link to="/cbt" className="resource-card" id="resource-cbt">
                    <img src={cbt} alt="CBT" className="card-image" />
                    <div className="resource-title">Cognitive Behavioral Therapy</div>
                    <div className="resource-meta">
                        Effective for depression and anxiety disorders.
                    </div>
                </Link>
                <Link to="/group-therapy" className="resource-card">
                    <img src={groupTherapy} alt="Group Therapy" className="card-image" />
                    <div className="resource-title">Group Therapy</div>
                    <div className="resource-meta">
                        Support for anxiety, depression, and PTSD.
                    </div>
                </Link>
                <Link to="/yoga" className="resource-card">
                    <img src={therapeuticYoga} alt="Therapeutic Yoga" className="card-image" />
                    <div className="resource-title">Therapeutic Yoga</div>
                    <div className="resource-meta">
                        Reduces stress and improves mood.
                    </div>
                </Link>
                <Link to="/animal-therapy" className="resource-card">
                    <img src={animalTherapy} alt="Animal Assisted Therapy" className="card-image" />
                    <div className="resource-title">Animal Assisted Therapy</div>
                    <div className="resource-meta">
                        Comfort and support from therapy animals such as dogs and cats.
                    </div>
                </Link>
                <Link to="/art-therapy" className="resource-card">
                    <img src={artTherapy} alt="Art Therapy" className="card-image" />
                    <div className="resource-title">Art Therapy</div>
                    <div className="resource-meta">
                        Integrates mental health, human services, and the creative process.
                    </div>
                </Link>
                <Link to="/family-therapy" className="resource-card">
                    <img src={familyTherapy} alt="Family Therapy" className="card-image" />
                    <div className="resource-title">Family Therapy</div>
                    <div className="resource-meta">
                        Improves relationships and communication among family members.
                    </div>
                </Link>
            </div>
        </div>
    );
};
export default Resources;