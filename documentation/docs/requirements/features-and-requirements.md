---
sidebar_position: 4
---

# Features and Requirements

## Functional Requirements

#### Video Feed
- Users should be able to view a vertically scrolling feed of short-form videos focused on mental health topics.
- The system shall display one video at a time, occupying the full screen for an immersive experience.
- Video playback should start automatically when a video comes into view and pause when it is scrolled out of view.
- The feed will feature a variety of content, including educational clips, guided exercises, and personal stories.

#### Resource Hub
- Users should have access to a dedicated section for mental health resources.
- The hub should provide articles, guides, and information on different therapy modalities (e.g., CBT, DBT, Mindfulness).
- Resources should be organized into categories for easy navigation (e.g., Anxiety, Depression, Stress).
- Users should be able to view resource content within the application.

#### User Interaction
- Users should be able to "like" videos to show appreciation and influence future content recommendations.
- Users should be able to leave comments on videos to engage in discussion with the community.
- Users should be able to view comments left by other users.

#### Authentication
- Users should be able to create an account using an email and password.
- The system will authenticate users when they log in to access personalized features.
- Logged-in users will have their interactions (likes, comments) associated with their account.

## Non-functional Requirements
#### User Experience
- Users should be able to navigate the UI with minimal button presses.
- Users should recieve clear feedback for all actions such as loading indicatiors and confirmation messages.
- Users should experience a consistent and intuituve interface across all devices.
- Users should be able to access help, and should be provided with guidance.
  
#### Data Storage
- Data backups will be run periodically to prevent loss of users' data.
- Users should have their data stored securely and encrypted.
- Users should have their data isolated from other users to ensure privacy and security.
- Users should be able to request deletion of their data.

#### Performance
- Users should experience navigations and page loads within seconds.
- Users should experience smooth video playback with minimal buffering.
- API requests should return responses within seconds.
- Application should have efficient handling of data synchronization.
- System should be able to process content in real time without data loss.

#### Maintainability
- Application should use Git for version control using clear commit messages and branching.
- Codebase should be modular, allowing developers to update components with minimal impact on other parts of the application.
- Codebase should follow consistent style guidelines.
- Application should have tests covering all critical features.
- Application should have comprehensive documentation for setup, deployment, and feature usage.

#### Scalability
- Backend should be designed to accomodate increased user load.
- Application should support future integration with additional services

#### Security
- User data in transit should be encrypted.
- Passwords should be stored using hashing.

