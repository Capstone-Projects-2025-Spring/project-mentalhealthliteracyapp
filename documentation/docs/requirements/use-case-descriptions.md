---
sidebar_position: 5
---

# Use-case descriptions

## Use Case 1 – Account Creation

**As a user, I want to create an account so that my journal entries and settings are saved securely and available across devices.**

1. **Access Registration:** Upon launching our app for the first time, the app displays a Welcome screen with Sign Up and Log In buttons. The user taps Sign Up.
2. **Enter Details:** The app presents the Create Account form, asking for:
   - Email address
   - Password (with strength indicator)
   - Optional display name
   The user fills in the fields and taps Register.
3. **Validate & Confirm:** The system verifies the email isn’t already in use and that the password meets complexity rules. If validation passes, the app sends a verification link to the user’s email and shows:
   > Check your inbox to verify your account.
4. **Email Verification:** The user clicks the link in their email. The app confirms verification and automatically logs them in.

## Use Case 2 - Journal Saving

**As a user with an active account, I want to save and access my journals on different devices.**

1. The user goes on the Mental Health Literacy website on their personal computer, presses the Sign In button, and enters their credentials.
2. The user accesses their journal and begins a new entry.
3. After the user has finished writing, they click "Save" button and the journal entry is saved onto the server.
4. The user goes onto the Mental Health Literacy website on their phone, presses the Sign In button, and enters their credentials.
5. The user is able to access their previous journal and edit it.

## Use Case 3 - Preferences

**As a user with journal entries written, I want to modify the frequency of reminders.**

1. The user goes on the Mental Health Literacy website on their personal computer, presses the Sign In button, and enters their credentials.
2. The user clicks the "Settings" tab and the settings page is displayed.
3. The user changes the frequency of notifications being sent to the email or mobile device. 
4. The user clicks the "Save" button, and the preferences are saved to their account.

## Use Case 4 - Educational Resources

**As a user with an active account, I want to learn more about mental health and therapy.** 

1. The user goes on the Mental Health Literacy website on their personal computer, presses the Sign In button, and enters their credentials.
2. The user clicks on the "Resources" tab.
3. The user clicks on "Educational Resources" button.
4. The user has access to friendly modules and videos explaining therapy.

## Use Case 5 - Videos

**As a user with an active account, I want to watch short-form videos that educate me on mental health and therapy options.** 

1. The user goes on the the Mental Health Literacy website on their personal computer, presses the Sign in button, and enters their credentials.
2. The user clicks on "Videos" and is brought to an infinite-scroll video feed.
3. The user is able to like and share videos.

## Use Case 6 - Liking Videos

**As a user watching a video, I want to like a video so I can save content that resonates with me** 

1. The user goes on the the Mental Health Literacy website on their personal computer, presses the Sign in button, and enters their credentials.
2. The user clicks on "Videos", scrolls finds one that they find helpful.
3. The video displays a “Like” button beneath or overlaid on the video, and the user clicks it. 
4. The app visually confirms this with a heart and saves the liked video to the user's account in the database.
5. The user is able to access their liked videos. 
