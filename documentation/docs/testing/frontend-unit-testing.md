---
sidebar_position: 1
---
# Frontend Unit Tests

## Unit Testing Library Explanation

For frontend unit testing, we use **Vitest** and **React Testing Library**.

- **Vitest** was chosen because it is fast, integrates seamlessly with Vite , and supports Jest-compatible syntax, making it easy to write and maintain tests. It also generates detailed coverage reports and is well-suited for modern React projects.
- **React Testing Library** encourages testing components from the user's perspective, focusing on real user interactions rather than implementation details. It works well with Vitest and helps ensure our UI behaves as expected.

These libraries are suitable for our project because they enable fast, reliable, and maintainable tests for React components, hooks, and utilities, and support mocking of external dependencies.

---

**Focus:** Test React components, custom hooks, and utility functions in isolation to ensure small UI logic parts work as expected.

**Tools:**
- **Vitest:** Fast test runner for Vite projects
- **React Testing Library:** Renders components, simulates user behavior, encourages user-focused tests
- **Mocking:** Use `vi.mock()` to stub external modules, and mock context providers.

---

For each method, one or more test cases.

A test case consists of input parameter values and expected results.

All external classes should be stubbed using mock objects.

---

## Example Unit Tests

### Video Feed Player Component
- **Test:** Renders video player with given video URL
  - **Input:** videoUrl = 'https://example.com/video.mp4'
  - **Expected Result:** Video element is rendered and source matches input URL
- **Test:** Handles video playback error
  - **Input:** videoUrl = 'invalid-url'
  - **Expected Result:** Error message or fallback UI is displayed

### Login Form Component
- **Test:** Submits valid credentials
  - **Input:** username = 'user1', password = 'correctpassword'
  - **Expected Result:** onLogin callback is called with input values
- **Test:** Shows error on empty fields
  - **Input:** username = '', password = ''
  - **Expected Result:** Validation error message is displayed

### Resource Page Rendering
- **Test:** Displays list of resources
  - **Input:** resources = `[{title: 'Helpline', url: 'https://help.com'}]`
  - **Expected Result:** Resource title and link are rendered
- **Test:** Handles empty resource list
  - **Input:** resources = []
  - **Expected Result:** Message indicating no resources available is shown

---

### Test Coverage Report

Vitest can generate an HTML coverage report. To make this available in Docusaurus, export the report and place it in the `static` folder. For automation, set up a CI pipeline to run tests, generate the report, and move it to `static` on each update.