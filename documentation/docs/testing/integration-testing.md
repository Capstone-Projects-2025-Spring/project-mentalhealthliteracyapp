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


## Use Case 6 – Liking Videos

**Goal:** Verify that a signed-in user can like a video and have it persist to their account.

### Integration Test Steps

1. **Access & Sign In**
   - Simulate app launch and navigation to the Welcome screen (mock navigation).
   - Simulate user clicking "Sign In" (mock user event).
   - **Assert:** Log in form is displayed (UI state check).

2. **Enter Credentials and Authenticate**
   - Provide mock input: valid email and password.
   - Simulate user submitting the log in form (mock backend validation).
   - **Assert:** System checks credentials and authenticates user (authentication state check)

3. **Navigate to Videos**
   - Simulate user clicking videos tab
   - **Assert:** Video player and "Like" button is displayed (UI state check)

4. **Like a Video**
   - Simulate user clicking like button (mock user event).
   - **Assert:** Like button visually chaknges (UI state check)
   - **Assert:** Request to backend to save liked video (database state check)
  
5. **Access Liked Videos**
   - Simulate user navigating to profile (mock user event).
   - **Assert:** Liked video appears in user's liked video list (UI state check)
   - **Assert:** Video is associated with correct user (database state check)
  
#### Notes
- All external services are mocked.
- No manual data entry or result interpretation required; all assertions are automated.

