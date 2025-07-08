---
sidebar_position: 4
---

# Features and Requirements

## Functional Requirements
#### Journal
- Users should be able to create, delete, and edit journal entries.
- Users' journals should be saved to local storage.
- Users should be able to log in to save their journal onto the server.
- Users should be able to access their journal across different devices by signing in.
#### Customization Options
- Users will be able to configure when they want to be notified to journal.
#### Authentication
- Users will be authenticated when logging in to the system.

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

