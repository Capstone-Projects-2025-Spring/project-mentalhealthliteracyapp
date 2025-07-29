import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Joyride, { STATUS } from "react-joyride";
import type { Step, CallBackProps } from "react-joyride";
import "./Resources.css";

const CBT = () => {
  const location = useLocation();
  const [run, setRun] = useState(false);

  useEffect(() => {
    if (location.search.includes("tour=true")) {
      setRun(true);
    }
  }, [location.search]);

  const steps: Step[] = [
    {
      target: "#cbt-learn-more",
      content:
        "Here we provide information about said mental health resource. This link provides more details about Cognitive Behavioral Therapy.",
    },
    {
      target: "#cbt-phone-number",
      content:
        "Here we can provide helpful contact information such as phone numbers, emails, or social medias. This is the phone number for Temple Health.",
    },
    {
      target: "#cbt-schedule-appointment",
      content:
        "Here we can provide links to schedule appointments or find more information to do so. This link allows you to schedule an appointment with Temple Health.",
    },
    {
      target: "#cbt-back-to-resources",
      content: "This button will take you back to our Resources page.",
    },
  ];

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status, action } = data;
    if (
      status === STATUS.FINISHED ||
      status === STATUS.SKIPPED ||
      action === "close"
    ) {
      setRun(false);
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
          last: "Finish tutorial",
          next: "Next",
        }}
      />
      <div className="section">
        <h2 className="section-title">Helpful Information</h2>
        <div className="card-grid">
          <a
            className="resource-card"
            id="cbt-learn-more"
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
          <div className="resource-card" id="cbt-phone-number">
            <div className="resource-title">Phone Number</div>
            <div className="resource-meta">
              Call Temple Health at <strong>800-836-7536</strong>.
            </div>
          </div>
          <a
            className="resource-card"
            id="cbt-schedule-appointment"
            href="https://www.templehealth.org/schedule-appointment"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="resource-title">Ready for an appointment?</div>
            <div className="resource-meta">Schedule an appointment online.</div>
          </a>
        </div>
      </div>
      <Link to="/resources" className="back-button" id="cbt-back-to-resources">
        &larr; Back to Resources
      </Link>
    </div>
  );
};
export default CBT;
