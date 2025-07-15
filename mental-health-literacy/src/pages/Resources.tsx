import { Link } from "react-router-dom";
import "./Resources.css";
import groupTherapy from "../assets/group-therapy.png";
import cbt from "../assets/cbt.png";
import therapeuticYoga from "../assets/therapeutic-yoga.png";
import animalTherapy from "../assets/animal-therapy.png";
import artTherapy from "../assets/art.png";
import familyTherapy from "../assets/family-therapy.png";

const Resources = () => {
    return (
        <div className="resources-container">
            <div className="section">
                <h2 className="section-title">Mental Health Conditions</h2>
                <div className="card-grid">
                    <Link to="/cbt" className="resource-card">
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
                            Improves relationships and communication among family members. Learn about family therapy and services at Temple.
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};
export default Resources;