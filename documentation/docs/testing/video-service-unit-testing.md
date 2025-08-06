---
sidebar_position: 2
---
# VideoService Unit Tests

## Unit Testing Library Explanation

For VideoService unit testing, we use **Vitest** and **Supabase mocking**.

- **Vitest** provides fast, reliable testing with Jest-compatible syntax, making it ideal for testing service classes and utility functions. It supports comprehensive mocking and generates detailed coverage reports.
- **Supabase mocking** allows us to test database interactions without requiring a real database connection, ensuring tests are fast, reliable, and isolated from external dependencies.

These libraries are suitable for our VideoService because they enable testing of complex business logic, database interactions, and error handling scenarios in isolation.

---

**Focus:** Test VideoService methods in isolation to ensure video processing, like functionality, and tag generation work as expected.

**Tools:**
- **Vitest:** Fast test runner with comprehensive mocking capabilities
- **Supabase mocking:** Mock database interactions using `vi.mock()` and `vi.hoisted()`
- **Error simulation:** Test various error scenarios and edge cases

---

For each method, multiple test cases covering different scenarios.

A test case consists of input parameter values, mocked dependencies, and expected results.

All external dependencies (Supabase, authentication) should be stubbed using mock objects.

---

## VideoService Methods Overview

### `getTagsForVideo(description: string)`
Generates tags based on video description content using keyword matching.

### `processVideosWithLike(videos: any[])`
Processes video arrays, adds tags, and determines like status for authenticated users.

### `updateLike(videoId: number)`
Handles like/unlike functionality with database updates and user authentication.

### `getLikedVideos()`
Retrieves videos that the current authenticated user has liked.

---

## Example Unit Tests

### Tag Generation (`getTagsForVideo`)
- **Test:** Returns CBT tag when description contains "cbt"
  - **Input:** description = 'This is a CBT therapy session'
  - **Expected Result:** Array containing `{ label: 'CBT', url: '/resources/cbt' }`
- **Test:** Returns multiple tags for multiple keywords
  - **Input:** description = 'CBT therapy for depression and stress management'
  - **Expected Result:** Array containing CBT, Therapy, Depression, and Stress tags
- **Test:** Case insensitive matching
  - **Input:** description = 'CBT THERAPY for ANXIETY'
  - **Expected Result:** Tags found regardless of case
- **Test:** Returns empty array when no keywords found
  - **Input:** description = 'Just a regular video about cooking'
  - **Expected Result:** Empty array `[]`

### Video Processing (`processVideosWithLike`)
- **Test:** Processes videos for unauthenticated users
  - **Input:** videos array, user = null
  - **Expected Result:** Videos with tags but `isLiked: false` for all
- **Test:** Processes videos for authenticated users with likes
  - **Input:** videos array, user = authenticated, userLikes = [videoId: 1]
  - **Expected Result:** Videos with correct like status based on user's likes
- **Test:** Handles database errors gracefully
  - **Input:** videos array, database error when fetching likes
  - **Expected Result:** Videos processed without like status, no error thrown
- **Test:** Throws error when Supabase client unavailable
  - **Input:** videos array, supabase = null
  - **Expected Result:** Error thrown with message 'Supabase client not available'

### Like Functionality (`updateLike`)
- **Test:** Likes a video when user hasn't liked before
  - **Input:** videoId = 1, user = authenticated, no existing interaction
  - **Expected Result:** `{ success: true, newLikeCount: 6, isLiked: true }`
- **Test:** Unlikes a video when user has already liked
  - **Input:** videoId = 1, user = authenticated, existing like = true
  - **Expected Result:** `{ success: true, newLikeCount: 5, isLiked: false }`
- **Test:** Throws error for unauthenticated users
  - **Input:** videoId = 1, user = null
  - **Expected Result:** Error thrown with message 'User must be authenticated to like videos'
- **Test:** Handles database errors gracefully
  - **Input:** videoId = 1, database error during operation
  - **Expected Result:** Error thrown with database error message

### Liked Videos Retrieval (`getLikedVideos`)
- **Test:** Returns liked videos for authenticated user
  - **Input:** user = authenticated, likedVideoIds = [1, 2], videos data available
  - **Expected Result:** Array of liked videos with `isLiked: true`
- **Test:** Returns empty array when user has no liked videos
  - **Input:** user = authenticated, likedVideoIds = []
  - **Expected Result:** Empty array `[]`
- **Test:** Returns empty array for unauthenticated users
  - **Input:** user = null
  - **Expected Result:** Empty array `[]`
- **Test:** Handles database errors gracefully
  - **Input:** user = authenticated, database error when fetching data
  - **Expected Result:** Empty array `[]`

---

## Mocking Strategy

### Supabase Client Mocking
```typescript
const mockSupabase = vi.hoisted(() => ({
  auth: {
    getUser: vi.fn(),
  },
  from: vi.fn(),
}));

vi.mock('../../lib/supabase', () => ({
  default: () => mockSupabase,
}));
```

### Database Query Mocking
```typescript
// Mock complex chained queries
const mockSelect = vi.fn().mockReturnValue({
  eq: vi.fn().mockReturnValue({
    eq: vi.fn().mockResolvedValue({ data: mockData, error: null }),
  }),
});

mockSupabase.from.mockReturnValue({
  select: mockSelect,
});
```

### Error Scenario Mocking
```typescript
// Mock database errors
mockSupabase.from.mockReturnValue({
  select: vi.fn().mockReturnValue({
    eq: vi.fn().mockReturnValue({
      eq: vi.fn().mockResolvedValue({ data: null, error: 'Database error' }),
    }),
  }),
});
```

---

## Test Coverage Areas

### ✅ **Core Functionality**
- Tag generation from video descriptions
- Video processing with like status
- Like/unlike operations
- Liked videos retrieval

### ✅ **Authentication Scenarios**
- Authenticated users
- Unauthenticated users
- Missing user data

### ✅ **Error Handling**
- Database connection errors
- Authentication failures
- Missing Supabase client
- Invalid data scenarios

### ✅ **Edge Cases**
- Empty video arrays
- No liked videos
- Multiple keywords in descriptions
- Case sensitivity in tag matching

---

## Running VideoService Tests

### Command
```bash
npm test videoService.test.ts
```

### Test Structure
```
VideoService - Unit Tests
├── getTagsForVideo (5 tests)
├── processVideosWithLike (4 tests)
├── updateLike (4 tests)
└── getLikedVideos (4 tests)
```

### Expected Coverage
- **17 total test cases**
- **100% method coverage**
- **Comprehensive error scenario coverage**
- **Authentication flow coverage**

---

## Best Practices

### Test Organization
- Group tests by method functionality
- Use descriptive test names
- Mock external dependencies consistently
- Test both success and failure scenarios

### Mocking Guidelines
- Use `vi.hoisted()` for module-level mocks
- Mock complex chained method calls
- Simulate realistic error scenarios
- Clear mock setup and teardown

### Assertion Patterns
- Test return values and side effects
- Verify error messages and types
- Check database interaction patterns
- Validate data transformation logic

---
