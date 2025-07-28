import React, { useEffect, useState } from "react";
import "./Onboarding.css";
import CloseButton from "./CloseButton";
import { useDispatch, useSelector } from "react-redux";
import { savePreferences } from "src/context/features/user/userSlice";
import { fetchUserPreferences } from "src/api/preferences";

const INTERESTS = [
  "Art",
  "Music",
  "Writing",
  "Nature",
  "Fitness",
  "Animals",
  "Reading",
  "Cooking",
  "Travel",
  "Fashion",
  "Gardening",
  "Meditation",
];
const TRAITS = [
  "Introverted",
  "Extroverted",
  "Calm",
  "Spontaneous",
  "Talkative",
  "Quiet",
  "Goal-Driven",
  "Sensitive",
  "Independent",
  "Reserved",
  "Analytical",
  "Empathetic",
  "Curious",
  "Adventurous",
  "Supportive",
];

const MAX_SELECTIONS = 5;

type Step = 0 | 1 | 2;

interface OnboardingProps {
  onComplete?: () => void;
}

const toggleSelection = (
    item: string,
    current: string[],
    max: number,
    set: (val: string[]) => void
) => {
  if (current.includes(item)) {
    set(current.filter((i) => i !== item));
  } else if (current.length < max) {
    set([...current, item]);
  }
};

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [visible, setVisible] = useState(false);
  const [step, setStep] = useState<Step>(0);
  const [interests, setInterests] = useState<string[]>([]);
  const [traits, setTraits] = useState<string[]>([]);
  const [transitioning, setTransitioning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch<any>();
  const user = useSelector((state: any) => state.user.user);


  useEffect(() => {
    const complete = localStorage.getItem("onboardingComplete");
    if (!complete) {
      setVisible(true);
      
      // If user is authenticated, get existing preferences
      if (user && user !== "Guest") {
        loadExistingPreferences();
      }
    }
  }, [user]);

  const loadExistingPreferences = async () => {
    try {
      console.log("[Onboarding] Loading existing preferences from database");
      const result = await fetchUserPreferences();
      
      if (result.status === 200 && result.data) {
        console.log("[Onboarding] Found existing preferences:", result.data);
        setInterests(result.data.interests);
        setTraits(result.data.traits);
      } else {
        console.log("[Onboarding] No existing preferences found in database");
      }
    } catch (error) {
      console.log("[Onboarding] Error loading existing preferences:", error);
    }
  };

  const persistPreferences = () => {
    console.log("[Onboarding] Saving preferences to localStorage", { interests, traits });
    localStorage.setItem("onboardingComplete", "true");
    localStorage.setItem("userInterests", JSON.stringify(interests));
    localStorage.setItem("userTraits", JSON.stringify(traits));
  };

  const closeOnboarding = async () => {
    persistPreferences();
    console.log("[Onboarding] User state on close:", user);
    // If signed in user, dispatch savePreferences thunk
    if (user && user !== "Guest") {
      console.log("[Onboarding] Dispatching savePreferences thunk on close");
      await dispatch(savePreferences([...interests, ...traits]));
    } else {
      console.log("[Onboarding] User not signed in, only saving to local storage.");
    }
    setVisible(false);
    onComplete?.();
  };

  const handleFinish = async () => {
    persistPreferences();
    console.log("[Onboarding] User state on finish:", user);
    // If signed in user, dispatch savePreferences thunk
    if (user && user !== "Guest") {
      console.log("[Onboarding] Dispatching savePreferences thunk on finish");
      await dispatch(savePreferences([...interests, ...traits]));
    } else {
      console.log("[Onboarding] User not signed in, skipping backend save.");
    }
    setVisible(false);
    onComplete?.();
  };

  const handleNext = () => {
    setTransitioning(true);
    setTimeout(() => {
      setTransitioning(false);
      setStep((prev) => (prev < 2 ? ((prev + 1) as Step) : prev));
    }, 250);
  };

  const handleBack = () => {
    setTransitioning(true);
    setTimeout(() => {
      setTransitioning(false);
      setStep((prev) => (prev > 0 ? ((prev - 1) as Step) : prev));
    }, 250);
  };

  if (!visible) return null;

  return (
      <div className="overlay">
        <div className={"modal" + (transitioning ? " transitioning" : "")}>
          <CloseButton close={closeOnboarding} />
          {error && (
            <div className="stepContent">
              <h2 className="heading2" style={{ color: 'red' }}>Error: {error}</h2>
            </div>
          )}
          {step === 0 && (
              <div className="stepContent">
                <h1 className="heading">
                  Welcome to <span className="brand">Safe Scroll</span>
                </h1>
                <p className="subtext">
                  Let's personalize your experience to make it more helpful and
                  enjoyable.
                </p>
                <button className="ctaButton" onClick={handleNext}>
                  Get Started
                </button>
              </div>
          )}
          {step === 1 && (
              <div className="stepContent">
                <h2 className="heading2">Choose your interests</h2>
                <p className="subtext">Let's personalize the videos you see.</p>
                <div className="pillGrid">
                  {INTERESTS.map((interest) => (
                      <button
                          key={interest}
                          className={
                              "pill" +
                              (interests.includes(interest) ? " pillSelected" : "")
                          }
                          onClick={() =>
                              toggleSelection(interest, interests, MAX_SELECTIONS, setInterests)
                          }
                          type="button"
                          disabled={
                              interests.length >= MAX_SELECTIONS &&
                              !interests.includes(interest)
                          }
                          style={
                            interests.length >= MAX_SELECTIONS &&
                            !interests.includes(interest)
                                ? { cursor: "not-allowed", opacity: 0.6 }
                                : {}
                          }
                      >
                        {interest}
                      </button>
                  ))}
                </div>
                <div className="buttonRow">
                  <button className="secondaryButton" onClick={handleBack}>
                    Back
                  </button>
                  <button
                      className="ctaButton"
                      onClick={handleNext}
                      disabled={interests.length === 0}
                  >
                    Next
                  </button>
                </div>
              </div>
          )}
          {step === 2 && (
              <div className="stepContent">
                <h2 className="heading2">What describes you?</h2>
                <p className="subtext">Help us understand your vibe.</p>
                <div className="pillGrid">
                  {TRAITS.map((trait) => (
                      <button
                          key={trait}
                          className={
                              "pill" + (traits.includes(trait) ? " pillSelected" : "")
                          }
                          onClick={() =>
                              toggleSelection(trait, traits, MAX_SELECTIONS, setTraits)
                          }
                          type="button"
                          disabled={
                              traits.length >= MAX_SELECTIONS && !traits.includes(trait)
                          }
                          style={
                            traits.length >= MAX_SELECTIONS && !traits.includes(trait)
                                ? { cursor: "not-allowed", opacity: 0.6 }
                                : {}
                          }
                      >
                        {trait}
                      </button>
                  ))}
                </div>
                <div className="buttonRow">
                  <button className="secondaryButton" onClick={handleBack}>
                    Back
                  </button>
                  <button
                      className="ctaButton"
                      onClick={handleFinish}
                      disabled={traits.length === 0}
                  >
                    Finish
                  </button>
                </div>
              </div>
          )}
        </div>
      </div>
  );
};

export default Onboarding;
