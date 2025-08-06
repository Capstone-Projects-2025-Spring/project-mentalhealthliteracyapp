import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Welcome.css";

// Function to trigger onboarding
const triggerOnboarding = () => {
  localStorage.removeItem("onboardingComplete");
  localStorage.removeItem("userInterests");
  localStorage.removeItem("userTraits");
  // Force a re-render by dispatching a custom event
  window.dispatchEvent(new CustomEvent('triggerOnboarding'));
};

function Welcome() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentFeature, setCurrentFeature] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % 3);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      title: "Curated Mental Health Content",
      description: "Access carefully selected videos and resources focused on mental wellness, therapy techniques, and stress management."
    },
    {
      title: "Safe Scrolling Experience",
      description: "Enjoy a mindful browsing experience designed to promote positive mental health habits and reduce digital overwhelm."
    },
    {
      title: "Personalized Recommendations",
      description: "Discover content tailored to your interests and mental health needs through our intelligent recommendation system."
    }
  ];

  return (
    <div className="welcome-container">
      {/* Hero Section */}
      <section className={`hero-section ${isVisible ? 'fade-in' : ''}`}>
        <div className="hero-content">
          <h1 className="hero-title">
            Welcome to <span className="brand-highlight">SafeScroll</span>
          </h1>
          <p className="hero-subtitle">
            Your mindful gateway to mental health literacy and wellness
          </p>
          <div className="hero-buttons">
            <button 
              className="cta-button primary"
              onClick={triggerOnboarding}
            >
              Get Started
            </button>
            <Link to="/resources" className="explore-resources-button">
              Explore Resources
            </Link>
          </div>
        </div>
        
        {/* Animated Background */}
        <div className="hero-background">
          <div className="floating-shapes">
            <div className="shape shape-1"></div>
            <div className="shape shape-2"></div>
            <div className="shape shape-3"></div>
            <div className="shape shape-4"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <h2 className="section-title">Why Choose SafeScroll?</h2>
          <div className="features-grid">
            <div className={`feature-card ${isVisible ? 'slide-up' : ''}`}>
              <div className="feature-icon">
                <div className="icon-circle">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                  </svg>
                </div>
              </div>
              <h3>Curated Content</h3>
              <p>Carefully selected mental health videos and resources from trusted professionals and organizations.</p>
            </div>

            <div className={`feature-card ${isVisible ? 'slide-up' : ''}`} style={{animationDelay: '0.2s'}}>
              <div className="feature-icon">
                <div className="icon-circle">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
              </div>
              <h3>Mindful Experience</h3>
              <p>Designed to promote healthy digital habits and reduce information overload.</p>
            </div>

            <div className={`feature-card ${isVisible ? 'slide-up' : ''}`} style={{animationDelay: '0.4s'}}>
              <div className="feature-icon">
                <div className="icon-circle">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                  </svg>
                </div>
              </div>
              <h3>Personalized Journey</h3>
              <p>Content recommendations tailored to your mental health interests and wellness goals.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works-section">
        <div className="container">
          <h2 className="section-title">How SafeScroll Works</h2>
          <div className="steps-container">
            <div className={`step ${isVisible ? 'fade-in-left' : ''}`}>
              <div className="step-number">1</div>
              <div className="step-content">
                <h3>Complete Onboarding</h3>
                <p>Tell us about your mental health interests and preferences to personalize your experience.</p>
              </div>
            </div>

            <div className={`step ${isVisible ? 'fade-in-left' : ''}`} style={{animationDelay: '0.3s'}}>
              <div className="step-number">2</div>
              <div className="step-content">
                <h3>Discover Content</h3>
                <p>Browse through curated videos and resources that match your interests and needs.</p>
              </div>
            </div>

            <div className={`step ${isVisible ? 'fade-in-left' : ''}`} style={{animationDelay: '0.6s'}}>
              <div className="step-number">3</div>
              <div className="step-content">
                <h3>Build Healthy Habits</h3>
                <p>Engage with content mindfully and develop positive mental health practices.</p>
              </div>
            </div>
          </div>
        </div>
      </section>




    </div>
  );
}

export default Welcome;
