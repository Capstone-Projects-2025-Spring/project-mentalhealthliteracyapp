---
sidebar_position: 3
---
# Acceptance Tests

Demonstration of all of the functional and non-functional requirements. This can be a combination of automated tests derived from the use-cases (user stories) and manual tests with recorded observation of the results.


| Test ID | Action/Steps | Notes/Expected Result |
|---------|--------------|----------------------|
| MHL-1   | **Account Creation**<br>1. Launch the app.<br>2. Click "Sign Up".<br>3. Enter email, password, and display name.<br>4. Click "Register". | User receives a verification email and can log in after verifying. |
| MHL-2   | **User Login**<br>1. Launch the app.<br>2. Click "Log In".<br>3. Enter valid credentials.<br>4. Click "Log In". | User is authenticated and redirected to "Welcome" page. |
| MHL-3   | **Watch Video**<br>1. Log in.<br>2. Click "Videos".<br>3. Watch video.<br>4. Scroll vertically to see another video. | Videos play smoothly with controls available. |
| MHL-4   | **Like Video**<br>1. While watching a video, click the "Like" button. | Heart icon fills and video is saved to user's liked videos. |
| MHL-5   | **Comment on Video**<br>1. While watching a video, click "Comments" button.<br>2. In the Comments overlay, type a comment in the input box.<br>3. Click "Post". | The new comment appears immediately in the comments list with the username, and the input box is cleared. |
| MHL-6   | **Access Liked Videos**<br>1. Log in.<br>2. Navigate to "Profile".<br/>3. Navigate to "Liked Videos" | User sees a list of all videos they have liked. |
| MHL-7   | **Access Resources**<br>1. Log in.<br>2. Click "Resources". | User sees resources modules. |
