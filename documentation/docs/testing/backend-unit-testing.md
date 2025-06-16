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

## Example Unit Tests

### User Authentication
- **Test:** Valid login credentials
  - **Input:** username = 'user1', password = 'correctpassword'
  - **Expected Result:** Authentication succeeds, user token returned
- **Test:** Invalid login credentials
  - **Input:** username = 'user1', password = 'wrongpassword'
  - **Expected Result:** Authentication fails, error message returned

### Video Metadata Retrieval
- **Test:** Fetch metadata for existing video
  - **Input:** video_id = 'abc123'
  - **Expected Result:** Metadata object with title, description, and URL is returned
- **Test:** Fetch metadata for non-existent video
  - **Input:** video_id = 'notfound'
  - **Expected Result:** Error or null result

### Resource Lookup
- **Test:** Lookup resource by valid topic
  - **Input:** topic = 'anxiety'
  - **Expected Result:** List of resource objects related to 'anxiety'
- **Test:** Lookup resource by invalid topic
  - **Input:** topic = 'unknown-topic'
  - **Expected Result:** Empty list or not found response

---

#### Test Case Examples
- `getUserVideos(userId)` should return a list of video metadata
- `validateUploadFile(file)` should return false if type is unsupported

---

### Test Coverage Report

Vitest (or Jest) can generate an HTML coverage report. To make this available in Docusaurus, export the report and place it in the `static` folder. For automation, set up a CI pipeline to run tests, generate the report, and move it to `static` on each update. 