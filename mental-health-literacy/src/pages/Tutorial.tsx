import React, { useState } from "react";
import Joyride, { STATUS } from "react-joyride";
import type { Step, CallBackProps } from "react-joyride";
import style from "./Tutorial.css?url";

export function links() {
  return [
    {
      rel: "stylesheet",
      href: style,
    },
  ];
}

const Tutorial: React.FC = () => {
  const [run, setRun] = useState(true);

  const steps: Step[] = [
    {
      target: "#nav-welcome",
      content: "Welcome to the app! Click here to learn more.",
    },
    {
      target: "#nav-signup",
      content: "New here? Click here to create an account!",
    },
    {
      target: "#nav-login",
      content: "Already have an account? Click here to log in.",
    },
    {
      target: "#nav-tutorial",
      content:
        "This is the tutorial section you are currently viewing. Return here anytime for help.",
    },
    {
      target: "#nav-video",
      content: "Click here to watch videos about mental health and wellness.",
    },
    {
      target: "#nav-resources",
      content:
        "Access articles, guides, and links to learn more about mental health.",
    },
  ];

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status } = data;
    if (status === STATUS.FINISHED || status === STATUS.SKIPPED) {
      setRun(false);
    }
  };

  return (
    <div className="tutorial-container">
      <h1 className="tutorial-title">App Tutorial</h1>
      <p className="tutorial-description">
        Welcome! This tutorial will guide you through the main features of the
        Mental Health Literacy App. Use the navigation bar to explore each
        section, or follow the guided tour below.
      </p>
      <div className="tutorial-directions">
        <p>
          <strong>How to use this tutorial:</strong>
          <br />
          Follow the highlighted dots and popups in the navigation bar to learn
          about each part of the application. You can click "Next" to proceed,
          or "Skip tutorial" or the "X" to exit at any time.
        </p>
      </div>
      <div className="tutorial-faq">
        <h2>Tips &amp; FAQ</h2>
        <ul>
          <li>Need help? Navigate back to the "Tutorial" tab anytime.</li>
          <li>
            Forgot your password? Use the "Forgot Password" link on the login
            page.
          </li>
          <li>Looking for more resources? Check the "Resources" section.</li>
        </ul>
      </div>

      <div className="tutorial-joyride-wrapper">
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
            last: "Finish tutorial",
            next: "Next",
            skip: "Skip tutorial",
          }}
        />
      </div>
    </div>
  );
};

export default Tutorial;
