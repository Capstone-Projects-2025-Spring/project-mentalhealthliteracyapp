---
sidebar_position: 5
---

# Use-case descriptions

## Use Case 1 – Account Creation

**As a user, I want to create an account so that my settings are saved securely and available across devices.**

1. **Access Registration:** Upon launching our app for the first time, the app displays a Welcome screen with Sign Up and Log In buttons. The user taps Sign Up.
2. **Enter Details:** The app presents the Create Account form, asking for:
   - Email address
   - Password (with strength indicator)
   - Optional display name
   The user fills in the fields and taps Register.
3. **Validate & Confirm:** The system verifies the email isn’t already in use and that the password meets complexity rules. If validation passes, the app sends a verification link to the user’s email and shows:
   > Check your inbox to verify your account.
4. **Email Verification:** The user clicks the link in their email. The app confirms verification and automatically logs them in.

## Use Case 2 - Onboarding to the Application 

**As a new user, I want to be introduced to the app and personalize my experience.**

1. The user visits the Mental Health Literacy website for the first time.
2. The user is presented with a welcome screen that introduces the application's puprpose and features.
3. The user is presented with a short series of onboarding questions. 
4. The user answers each question on a 1-5 scale and presses "Continue."
5. These preferences are stored to personalize the user's video feed.

## Use Case 3 - Videos

**As a user with an active account, I want to watch short-form videos that educate me on mental health and therapy options.** 

1. The user goes on the the Mental Health Literacy website on their personal computer, presses the Sign in button, and enters their credentials.
2. The user clicks on "Videos" and is brought to an infinite-scroll video feed.
3. The user is able to like and share videos.

## Use Case 4 - Educational Resources

**As a user with an active account, I want to learn more about mental health and therapy.** 

1. The user goes on the Mental Health Literacy website on their personal computer, presses the Sign In button, and enters their credentials.
2. The user clicks on the "Resources" tab.
3. The user is met with cards displaying different mental health modules. 
4. The user clicks on a module.
5. The user has access to helpful information and contact information regarding the topic.

## Use Case 5 - Liking Videos

**As a user watching a video, I want to like a video so I can save content that resonates with me** 

1. The user goes on the the Mental Health Literacy website on their personal computer, presses the Sign in button, and enters their credentials.
2. The user clicks on "Videos", scrolls finds one that they find helpful.
3. The video displays a “Like” button beneath or overlaid on the video, and the user clicks it. 
4. The app visually confirms this with a heart and saves the liked video to the user's account in the database.
5. The user is able to access their liked videos via the "Profile" tab

## Use Case 6 - User Profile

**As a user with an active account, I want to view and manage my personal information, liked videos, and preferences**

1. The user visits the Mental Health Literacy website, presses "Sign In", and enters their credentials. 
2. The user clicks the "Profile" tab in the navigation bar.
3. The user sees sections for "Account Management", "Liked Videos", and "User Preferences".
4. The user can view previously liked videos and update any previously stored preferences or account details.
