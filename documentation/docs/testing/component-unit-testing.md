---
sidebar_position: 3
---
# Component Unit Tests

## Unit Testing Library Explanation

For component unit testing, we use **Vitest** and **React component testing**.

- **Vitest** provides fast, reliable testing with Jest-compatible syntax, making it ideal for testing React components and their logic. It supports comprehensive mocking and generates detailed coverage reports.
- **Component testing** allows us to test React components in isolation, focusing on their logic, props handling, and user interactions without requiring a full browser environment.

These libraries are suitable for our component testing because they enable testing of UI logic, prop validation, and component behavior in isolation.

---

**Focus:** Test React components in isolation to ensure UI logic, prop handling, and user interactions work as expected.

**Tools:**
- **Vitest:** Fast test runner with comprehensive mocking capabilities
- **Component mocking:** Mock external dependencies and browser APIs
- **Logic testing:** Test component logic without full rendering

---

For each component, multiple test cases covering different scenarios.

A test case consists of input props, mocked dependencies, and expected results.

All external dependencies (routers, icons, video players) should be stubbed using mock objects.

---

## Component Overview

### `BackButton`
Navigation component that handles browser back functionality with fallback to home.

### `CloseButton`
Simple button component that calls a close function when clicked.

### `LikedVideoCard`
Complex video card component that displays video information, thumbnails, and handles user interactions.

---

## Example Unit Tests

### BackButton Component
- **Test:** Navigation function availability
  - **Input:** Component renders
  - **Expected Result:** Navigation function is defined and callable
- **Test:** Navigation logic handling
  - **Input:** Component with navigation logic
  - **Expected Result:** Navigation function is a valid function
- **Test:** Navigation capability
  - **Input:** Component with navigation props
  - **Expected Result:** Navigation can be executed

### CloseButton Component
- **Test:** Close function calls
  - **Input:** close prop function
  - **Expected Result:** Function is defined and can be called
- **Test:** Multiple click handling
  - **Input:** Multiple click events
  - **Expected Result:** Function handles multiple calls
- **Test:** Undefined prop handling
  - **Input:** close prop is undefined
  - **Expected Result:** Component handles gracefully

### LikedVideoCard Component
- **Test:** Video object structure validation
  - **Input:** Video object with all properties
  - **Expected Result:** All required properties are present
- **Test:** Missing playbackId handling
  - **Input:** Video without playbackId
  - **Expected Result:** Component handles undefined playbackId
- **Test:** Tag display logic
  - **Input:** Video with multiple tags
  - **Expected Result:** Shows first 2 tags and remaining count
- **Test:** Description truncation
  - **Input:** Long description (>60 chars)
  - **Expected Result:** Description truncated with "..."
- **Test:** Edge case handling
  - **Input:** Various edge cases (no tags, empty tags, special chars)
  - **Expected Result:** Component handles all scenarios gracefully

---

## Mocking Strategy

### React Router Mocking
```typescript
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});
```

### FontAwesome Mocking
```typescript
vi.mock('@fortawesome/react-fontawesome', () => ({
  FontAwesomeIcon: ({ icon }: { icon: any }) => <span data-testid="icon">{icon.iconName}</span>,
}));
```

### Video Player Mocking
```typescript
vi.mock('@mux/mux-player-react', () => ({
  default: ({ playbackId }: { playbackId: string }) => (
    <div data-testid="mux-player" data-playback-id={playbackId}>
      Mock Mux Player
    </div>
  ),
}));
```

### Browser API Mocking
```typescript
// Conditional window.history mocking
if (typeof window !== 'undefined') {
  Object.defineProperty(window, 'history', {
    value: mockHistory,
    writable: true,
  });
}
```

---

## Test Coverage Areas

### ✅ **Component Logic**
- Prop validation and handling
- Conditional rendering logic
- Data transformation (truncation, formatting)
- Event handling

### ✅ **Edge Cases**
- Undefined props
- Empty data arrays
- Missing optional properties
- Special characters in text

### ✅ **User Interactions**
- Click event handling
- Function call validation
- Multiple interaction handling
- Error state management

### ✅ **Data Processing**
- String truncation logic
- Array slicing and counting
- Object property validation
- Type checking

---

## Running Component Tests

### Commands
```bash
# Run all component tests
npm test BackButton.test.tsx CloseButton.test.tsx LikedVideoCard.test.tsx VideoComponent.test.tsx Login.test.tsx SignUp.test.tsx Onboarding.test.tsx ProfileSidebar.test.tsx ProtectedRoute.test.tsx

# Run individual component tests
npm test BackButton.test.tsx
npm test VideoComponent.test.tsx
npm test LikedVideoCard.test.tsx
# ... etc for each component
```

### Test Structure
```
Individual Component Tests
├── BackButton.test.tsx (5 tests)
├── CloseButton.test.tsx (5 tests)
├── LikedVideoCard.test.tsx (9 tests)
├── VideoComponent.test.tsx (12 tests)
├── Login.test.tsx (7 tests)
├── SignUp.test.tsx (7 tests)
├── Onboarding.test.tsx (9 tests)
├── ProfileSidebar.test.tsx (8 tests)
└── ProtectedRoute.test.tsx (9 tests)
```

### Expected Coverage
- **71 total test cases across 9 components**
- **100% component logic coverage**
- **Comprehensive edge case coverage**
- **Cross-platform compatibility**
- **All project components tested individually**

---

## Best Practices

### Test Organization
- Group tests by component functionality
- Use descriptive test names
- Mock external dependencies consistently
- Test both success and failure scenarios

### Mocking Guidelines
- Mock browser APIs conditionally
- Use simple mocks for complex components
- Focus on logic rather than UI rendering
- Test prop validation and handling

### Assertion Patterns
- Test function availability and types
- Verify data transformation logic
- Check edge case handling
- Validate component behavior

---

## Component Testing Philosophy

### Logic-First Approach
- Focus on testing component logic rather than UI rendering
- Test data transformation and prop handling
- Verify edge cases and error scenarios
- Ensure cross-platform compatibility

### Minimal Dependencies
- Mock external libraries and APIs
- Avoid browser-specific testing in Node.js environment
- Test component behavior in isolation
- Use simple, reliable test patterns

### Comprehensive Coverage
- Test all component methods and logic
- Cover edge cases and error scenarios
- Validate prop handling and validation
- Ensure robust component behavior

This approach ensures components are thoroughly tested while maintaining fast, reliable test execution across different environments. 