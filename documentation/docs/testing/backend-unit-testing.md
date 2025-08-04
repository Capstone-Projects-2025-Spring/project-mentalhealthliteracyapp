---
sidebar_position: 1
---
# Backend Unit Tests

## Unit Testing Library Explanation

For backend unit testing, we use **Vitest**

- **Vitest** is chosen for its speed, modern tooling, and seamless integration with Vite based projects. It supports Jest compatible syntax, making it easy to adopt and maintain. It also provides built-in coverage reporting and works well for our server logic.
- **Jest** is a mature, widely-used alternative with robust mocking and coverage features, suitable for projects not using Vite.

These libraries are suitable for our project because they allow us to test backend logic efficiently, with strong support for mocking external dependencies

---

**Focus:** Test standalone backend logic functions (API handlers, data transformers, Supabase queries) to ensure correct outputs for given inputs.

**Tools:**
- **Vitest**: For testing server logic, API routes, and edge functions
- **Mocking:** Use `vi.mock()` or `jest.mock()` to stub Supabase client and mock database results 

---

For each method, one or more test cases.

A test case consists of input parameter values and expected results.

All external classes should be stubbed using mock objects.

---

## API Unit Tests

### api/login
- **Test:** Extract form data and call Redux with credentials
  - **Input:** email = 'test@example.com', password = 'password123'
  - **Expected Result:** Form data extracted, Redux action dispatched, success response returned
- **Test:** Handle various form data scenarios
  - **Input:** Test cases including valid credentials, empty data, malformed email
  - **Expected Result:** All scenarios processed, Redux dispatch called, success response returned
- **Test:** Handle empty form data
  - **Input:** FormData with no fields appended
  - **Expected Result:** Form data extraction works, Redux still called, success response returned
- **Test:** Verify API function signature and return type
  - **Input:**  Valid form data
  - **Expected Result:** Function exists, returns object with status (number) and message (string) properties

_Note: Tests return success response as validation and authentication logic are handled by FE and Redux layer. API focuses on form data extraction and Redux action dispatching_

<img width="1146" height="367" alt="Screenshot 2025-08-01 000354" src="https://github.com/user-attachments/assets/a9f5bd4e-6186-4314-ada2-182fc0da40ac" />


### api/preferences
- **Test:** _saveUserPreferences_ : Save user preferences successfully
  - **Input:** Authenticated user, preferences = ['Art', 'Introverted']
  - **Expected Result:** Preferences saved to database, success response returned
- **Test:** _saveUserPreferences_ : Return error when user is not authenticated
  - **Input:** Unauthenticated user, preferences = ['Art', 'Introverted']
  - **Expected Result:** Authentication error returned
- **Test:** _saveUserPreferences_ : Return error when fetching preferences fails
  - **Input:** Authenticated user, database error on preferences lookup
  - **Expected Result:** Database error returned
- **Test:** _saveUserPreferences_ : Return error when no matching preferences found
  - **Input:** Authenticated user, non-existent preference names
  - **Expected Result:** "No matching preferences found" error returned
- **Test:** _saveUserPreferences_ : Return error when deleting existing preferences fails
  - **Input:** Authenticated user, database error on delete operation
  - **Expected Result:** "Error updating preferences" error returned
- **Test:** _saveUserPreferences_ : Return error when inserting new preferences fails
  - **Input:** Authenticated user, database error on insert operation
  - **Expected Result:** "Error saving preferences" error returned
- **Test:** _fetchUserPreferences_ : Fetch user preferences successfully
  - **Input:** Authenticated user with existing preferences
  - **Expected Result:** Preferences separated into interests and traits, success response returned
- **Test:** _fetchUserPreferences_ : Return error when user is not authenticated
  - **Input:** Unauthenticated user
  - **Expected Result:** Authentication error returned
- **Test:** _fetchUserPreferences_ : Return error when fetching user preferences fails
  - **Input:** Authenticated user, database error on preferences query
  - **Expected Result:** "Error fetching preferences" error returned
- **Test:** _fetchUserPreferences_ : Return empty arrays when no preferences found
  - **Input:** Authenticated user with no saved preferences
  - **Expected Result:** Empty interests and traits arrays, success response returned
- **Test:** _fetchUserPreferences_ : Separate interests and traits correctly
  - **Input:** Authenticated user with mixed preference types
  - **Expected Result:** Preferences correctly categorized by type, success response returned
- **Test:** _fetchUserPreferences_ : Handle preferences with missing or invalid type
  - **Input:** Authenticated user with invalid preference types
  - **Expected Result:** Valid preferences processed, invalid ones ignored, success response returned

<img width="1572" height="557" alt="Screenshot 2025-08-01 004534" src="https://github.com/user-attachments/assets/359d9414-9893-4239-bd97-a27bcb9075ea" />

### api/recommendations
- **Test:** _getUserPreferences_ : Get user preferences successfully for authenticated user
  - **Input:** User ID = '1'
  - **Expected Result:** Array of preference IDs returned
- **Test:** _getUserPreferences_ : Get localStorage preferences for non-authenticated user
  - **Input:** User ID = 'localStorage_user', localStorage contains interests and traits
  - **Expected Result:** Preference names converted to IDs, array returned
- **Test:** _getUserPreferences_ : Return empty array when database error occurs
  - **Input:** User ID = '1', database error
  - **Expected Result:** Empty array returned
- **Test:** _getCategoryPreferences_ : Get category preferences successfully
  - **Input:** Preference IDs = [1, 2, 3]
  - **Expected Result:** Array of category IDs returned
- **Test:** _getCategoryPreferences_ : Return empty array when no preference IDs provided
  - **Input:** Empty preference IDs array
  - **Expected Result:** Empty array returned
- **Test:** _getVideosFromCategories_ : Get videos from categories successfully
  - **Input:** Category IDs = [1, 2]
  - **Expected Result:** Array of video objects ordered by likes returned
- **Test:** _getVideosFromCategories_ : Return empty array when no video categories found
  - **Input:** Category IDs with no matching videos
  - **Expected Result:** Empty array returned
- **Test:** _getCurrentUserId_ : Return authenticated user ID when user is logged in
  - **Input:** Authenticated user session
  - **Expected Result:** User ID returned
- **Test:** _getCurrentUserId_ : Return localStorage_user when no authenticated user but has localStorage preferences
  - **Input:** No authenticated user, localStorage contains preferences
  - **Expected Result:** 'localStorage_user' returned
- **Test:** _getAllVideos_ : Get all videos successfully
  - **Input:** No specific parameters
  - **Expected Result:** Array of all videos ordered by likes returned
- **Test:** _getAllVideos_ : Return empty array when database error occurs
  - **Input:** Database error on videos query
  - **Expected Result:** Empty array returned
- **Test:** _getRecommendedVideos_ : Get recommended videos successfully for authenticated user
  - **Input:** Authenticated user with preferences
  - **Expected Result:** Combined array of recommended videos and remaining videos returned
- **Test:** _getRecommendedVideos_ : Fallback to all videos when no user preferences found
  - **Input:** Authenticated user with no preferences
  - **Expected Result:** Array of all videos returned

 <img width="1814" height="611" alt="Screenshot 2025-08-01 012904" src="https://github.com/user-attachments/assets/f03d8975-830d-49b5-ab7a-20acf7de1d82" />

### api/register
- **Test:** Extract form data and call Redux with registration credentials
  - **Input:** email = 'newuser@example.com', password = 'newpassword123'
  - **Expected Result:** Form data extracted, user_register action dispatched, success response returned
- **Test:** Handle various registration form data scenarios
  - **Input:** Test cases including valid credentials, empty data, special email characters
  - **Expected Result:** All scenarios processed, Redux dispatch called, success response returned
- **Test:** Handle empty form data gracefully
  - **Input:** FormData with no fields appended
  - **Expected Result:** Form data extraction completed, Redux action dispatched with empty strings, success response returned
- **Test:** Handle missing email field gracefully
  - **Input:** FormData with only password field
  - **Expected Result:** Form data extracted, Redux dispatch called with undefined email, success response returned
- **Test:** Handle missing password field gracefully
  - **Input:** FormData with only email field
  - **Expected Result:** Form data extracted successfully, Redux dispatch called with undefined password, success response returned
- **Test:** Verify API function signature and return type consistency
  - **Input:** Valid form data
  - **Expected Result:** Function exists and returns properly structured response object with status and message properties

_Note: Tests return success response as validation and authentication logic are handled by FE and Redux layer. API focuses on form data extraction and Redux action dispatching_

<img width="1351" height="405" alt="Screenshot 2025-08-01 015239" src="https://github.com/user-attachments/assets/fbf6d3bc-91bc-4616-9f93-9cb6bef9e6bf" />

### api/signout
- **Test:** Successful signout with no errors
  - **Input:** useUserError returns null
  - **Expected Result:** reset_error and user_signout actions dispatched, success response returned
- **Test:** Signout with error returns error response
  - **Input:** useUserError returns "Signout failed"
  - **Expected Result:** Both actions dispatched, error response with error message returned
- **Test:** Verify order of actions
  - **Input:** No error scenario
  - **Expected Result:** reset_error called first, then user_signout called second
- **Test:** Handle various error message types
  - **Input:** Multiple error scenarios (strings, null, undefined, empty string)
  - **Expected Result:** Proper status codes and appropriate messages
- **Test:** Verify API function signature and return type
  - **Input:** No error scenario
  - **Expected Result:** Function exists, returns object with status and message properties

 <img width="1095" height="378" alt="Screenshot 2025-08-01 022039" src="https://github.com/user-attachments/assets/2cfc531e-748b-4001-98a8-f614652f6b1d" />



---

### Test Coverage Report

Vitest (or Jest) can generate an HTML coverage report. To make this available in Docusaurus, export the report and place it in the `static` folder. For automation, set up a CI pipeline to run tests, generate the report, and move it to `static` on each update. 
