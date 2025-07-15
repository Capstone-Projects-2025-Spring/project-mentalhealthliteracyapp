import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import Joyride, { STATUS } from "react-joyride";
import type { Step, CallBackProps } from "react-joyride";
import "./Resources.css";
import groupTherapy from "../assets/group-therapy.png";
import cbt from "../assets/cbt.png";
import therapeuticYoga from "../assets/therapeutic-yoga.png";

const Resources = () => {
    const [run, setRun] = useState(false);
    const navigate = useNavigate();
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
                showSkipButton
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
                    close: "Skip tutorial",
                    last: "Next",
                    next: "Next",
                    skip: "Skip tutorial",
                }}
            />
            <div className="section">
                <h2 className="section-title">Mental Health Conditions</h2>
                <button
                    className="guided-tour-btn"
                    onClick={() => setRun(true)}
                >
                    Tutorial
                </button>
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
                </div>
            </div>
        </div>
    );
};
export default Resources;