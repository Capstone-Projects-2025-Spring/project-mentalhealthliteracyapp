import React, { useState } from "react";
import Joyride, { STATUS } from "react-joyride";
import type { Step, CallBackProps } from "react-joyride";

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
            content: "This is the tutorial section you are currently viewing. Return here anytime for help.",
        },
        {
            target: "#nav-video",
            content: "Click here to watch videos about mental health and wellness.",
        },
        {
            target: "#nav-resources",
            content: "Access articles, guides, and links to learn more about mental health.",
        },
    ];

    const handleJoyrideCallback = (data: CallBackProps) => {
        const { status } = data;

        if (status === STATUS.FINISHED || status === STATUS.SKIPPED) {
            setRun(false);
        }
    };


    return (
        <div>
            <h1>Tutorial</h1>
            <p>Welcome to the app tutorial! Follow the steps below.</p>

            <Joyride
                steps={steps}
                run={run}
                continuous
                scrollToFirstStep
                showProgress
                showSkipButton
                callback={handleJoyrideCallback}
                styles={{
                    options: {
                        primaryColor: "hsl(216, 97%, 73%)",
                        zIndex: 1000,
                    },
                }}
            />
        </div>
    );
};

export default Tutorial;
