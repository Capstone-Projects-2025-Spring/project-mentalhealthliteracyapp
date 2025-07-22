---
sidebar_position: 2
---
# Integration tests

Tests to demonstrate each use-case based on the use-case descriptions and the sequence diagrams. External input should be provided via mock objects and results verified via mock objects. Integration tests should not require manual entry of data nor require manual interpretation of results.

---

## Use Case 1 – Account Creation

**Goal:** Verify that a new user can register, receive a verification email, and complete account activation.

### Integration Test Steps

1. **Access Registration**
   - Simulate app launch and navigation to the Welcome screen (mock navigation).
   - Simulate user clicking "Sign Up" (mock user event).
   - **Assert:** Registration form is displayed (UI state check).

2. **Enter Details**
   - Provide mock input: email, password (meeting complexity), and optional display name.
   - Simulate user submitting the registration form (mock form submission).
   - **Assert:** System checks for email uniqueness and password complexity (mock backend validation).

3. **Validate & Confirm**
   - Mock backend response for unique email and valid password.
   - **Assert:** System sends a verification email (mock email service).
   - **Assert:** UI displays "Check your inbox to verify your account."

4. **Email Verification**
   - Simulate user clicking the verification link (mock email interaction).
   - Mock backend verification endpoint.
   - **Assert:** Account is marked as verified and user is automatically logged in (mock authentication state).

## Use Case 2 – Onboarding to the Application

**Goal:** Verify that a new user completes onboarding and prefereneces are stored for future personalization.

### Integration Test Steps

1. **Launch Application & Welcome Screen**
   - Simulate app launch for a first time user (mock navigation).
   - **Assert:** Welcome screen is displayed with onboarding prompt (UI state check).

2. **Preference Questionnaire**
   - Simulate user answering onboarding questions.
   - Simulate user clicking "Continue" after answering questions (mock form submission).
   - **Assert:** All preferences are captured and ingested in backend (mock request payload).

3. **Store Preferences**
   - Mock backend response for saving user preferences.
   - **Assert:** Preferences are saved to user profile (database state check).

## Use Case 3 – Videos

**Goal:** Verify that a user can view and scroll through short-form videos.

### Integration Test Steps

1. **Access Application**
   - Simulate app launch to "Welcome" screen (mock launch).
   - **Assert:** Welcome screen displayed (UI state check).

2. **Navigate to Videos feed**
   - Simulate user clicking "Videos" tab in the Navigation bar (mock user event).
   - **Assert:** Video feed is displayed in an infinite-scroll format (UI state check).
   - **Assert:** Videos begin to auto-play as user scrolls (UI state check).
  
3. **Scroll to load more videos**
    - Simulate user scrolling down (mock user event).
    - **Assert:** Additional video or photo displayed (UI state check).

## Use Case 4 – Educational Resources 

**Goal:** Verify that a user can access educational resources.

### Integration Test Steps

1. **Access Application**
   - Simulate app launch and navigation to the Welcome screen (mock user event).
   - **Assert:** Welcome screen displayed (UI state check).

2. **Navigation to Resources**
   - Simulate user clicking on "Resources" tab in the navigation bar (mock user event).
   - **Assert:** Resource tab UI is displayed with categorized content (UI state check)

3. **View Educational Content**
   - Simulate user clicking module
   - **Assert:** Educational resources, links, and contact information for the module is displayed (UI state check)
   - **Assert:** Users can interact with content by accessing and opening links (UI state check)

## Use Case 5 – User Profile 

**Goal:** Verify that a signed-in user can view and manage their account information, preferences, and liked videos.

### Integration Test Steps

1. **Access & Sign In**
   - Simulate app launch and navigation to the Welcome screen (mock user event).
   - Simulate user clicking "Sign In" (mock user event).
   - **Assert:** Log in form is displayed (UI state check).

2. **Enter Credentials and Authenticate**
   - Provide mock input: valid email and password.
   - Simulate user submitting the log in form (mock backend validation).
   - **Assert:** System checks credentials and authenticates user (authentication state check)

3. **Navigate to Profile**
   - Simulate user clicking on "Profile" tab (mock user event).
   - **Assert:** Profile page is displayed with tabs for Account Management, Liked Videos, and Preferences (UI state check).

4. **Account Management**
   - Simulate user clicking on "Account Management" (mock user event).
   - **Assert:** Display name, email, and masked password are shown (UI state check).
   - Simulate user clicking "Change Password" (mock user event).
   - **Assert:** Fields for current password, new password, and new password confirmation are displayed (UI state check).
   - Simualte user entering current password, new password, and new password confirmation (mock user event).
   - Simulate user clicking "Save"
   - **Assert:** Backend recieves password update request (mock database state check).
     
5. **Liked Videos**
   - Simulate user clicking "Liked Videos" (mock user event).
   - **Assert:** Liked videos appear as a scrollable list of video thumbnails (UI state check).
  
6. **Preferences**
   - Simulate user clicking "Preferences" (mock user event).
   - **Assert:** Onboarding questions and current slider values are shown
   - Simulate user updating slider values
   - **Assert:** Save preferences button is shown upon change (UI state check)
   - Simulate user clicking "Save" (mock user event).
   - **Assert:** Backend recieves updated preferences (mock database state check).
  
## Use Case 6 – Liking Videos

**Goal:** Verify that a signed-in user can like a video and have it persist to their account.

### Integration Test Steps

1. **Access & Sign In**
   - Simulate app launch and navigation to the Welcome screen (mock navigation).
   - Simulate user clicking "Sign In" (mock user event).
   - **Assert:** Log in form is displayed (UI state check).

2. **Enter Credentials and Authenticate**
   - Simulate user entering valid credentials (mock user event).
   - Simulate user submitting the log in form (mock backend validation).
   - **Assert:** System checks credentials and authenticates user (authentication state check)

3. **Navigate to Videos**
   - Simulate user clicking videos tab (mock user event).
   - **Assert:** Video player and "Like" button is displayed (UI state check)

4. **Like a Video**
   - Simulate user clicking like button (mock user event).
   - **Assert:** Like button visually chaknges (UI state check)
   - **Assert:** Request to backend to save liked video (database state check)
  
5. **Access Liked Videos**
   - Simulate user navigating to "Profile" (mock user event).
   - **Assert:** Liked video appears in user's liked video list (UI state check)
   - **Assert:** Video is associated with correct user (database state check)
  
#### Notes
- All external services are mocked.
- No manual data entry or result interpretation required; all assertions are automated.

