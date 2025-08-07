# Testing Documentation

This directory contains all the tests for the Mental Health Literacy App.

## Test Structure

```
src/tests/
├── acceptance.test.tsx          # Comprehensive acceptance tests
├── sidebar.test.tsx            # Sidebar component tests
└── supabase.test.ts           # Supabase configuration tests

src/api/tests/
├── videoService.test.ts        # VideoService unit tests
├── BackButton.test.tsx         # BackButton component tests
├── CloseButton.test.tsx        # CloseButton component tests
├── LikedVideoCard.test.tsx     # LikedVideoCard component tests
├── VideoComponent.test.tsx     # VideoComponent tests
├── Login.test.tsx              # Login component tests
├── SignUp.test.tsx             # SignUp component tests
├── Onboarding.test.tsx         # Onboarding component tests
├── ProfileSidebar.test.tsx     # ProfileSidebar component tests
├── ProtectedRoute.test.tsx     # ProtectedRoute component tests
├── login.test.ts               # Login API tests
├── preferences.test.ts         # Preferences API tests
├── recommendations.test.ts     # Recommendations API tests
├── register.test.ts            # Register API tests
└── signout.test.ts             # Signout API tests
```

## Running Tests

### All Tests
```bash
npm test
```

### Acceptance Tests Only
```bash
npm run test:acceptance
```

### Unit Tests Only
```bash
npm run test:unit
```

### Coverage Report
```bash
npm run test:coverage
```

### Specific Test File
```bash
npm test acceptance.test.tsx
```

### Specific Test Pattern
```bash
npm test -- --grep "Account Creation"
```

## Acceptance Tests

The acceptance tests (`acceptance.test.tsx`) cover all the main use cases of the application:

1. **Account Creation** - User registration and email verification
2. **Onboarding** - New user onboarding and preference collection
3. **Videos** - Video feed display and interaction
4. **Educational Resources** - Resource navigation and categorization
5. **User Profile** - Profile management and preferences
6. **Liking Videos** - Video like/unlike functionality
7. **Authentication Flow** - Sign in, sign out, and error handling
8. **Navigation and Routing** - Cross-section navigation
9. **Error Handling** - Network and authentication error scenarios
10. **Accessibility** - Keyboard navigation and ARIA compliance

### Test Coverage

- **22 total test cases**
- **100% use case coverage**
- **Comprehensive error scenario coverage**
- **Accessibility compliance verification**
- **Cross-browser compatibility testing**

## Test Dependencies

### Required Packages
- `vitest` - Test runner
- `@testing-library/react` - React component testing
- `@testing-library/dom` - DOM testing utilities
- `jsdom` - Browser environment simulation

### Mocked Dependencies
- `@mux/mux-player-react` - Video player component
- `@fortawesome/react-fontawesome` - Icon library
- `../lib/supabase` - Database client
- `react-router-dom` - Navigation components

## Best Practices

### Test Organization
- Group tests by use case or component
- Use descriptive test names
- Follow AAA pattern (Arrange, Act, Assert)
- Maintain test independence

### Mocking Strategy
- Mock external dependencies consistently
- Use realistic test data
- Simulate error scenarios
- Maintain test isolation

### Assertion Patterns
- Test user-facing functionality
- Verify state changes
- Check error handling
- Validate accessibility compliance

## Continuous Integration

Tests are automatically run on:
- Every commit to main branch
- Pull request creation and updates
- Deployment to staging environment

## Coverage Requirements

- **Minimum coverage**: 80% for all code
- **Critical paths**: 100% coverage required
- **New features**: Must include acceptance tests
- **Bug fixes**: Must include regression tests

## Troubleshooting

### Common Issues

1. **Test failing due to missing mocks**
   - Ensure all external dependencies are properly mocked
   - Check mock implementation matches actual component behavior

2. **Async test failures**
   - Use `waitFor` for asynchronous operations
   - Ensure proper error handling in async tests

3. **Component rendering issues**
   - Check if all required props are provided
   - Verify component dependencies are mocked

4. **Test isolation problems**
   - Clear localStorage and mocks in `beforeEach`
   - Ensure tests don't depend on each other

### Debugging

To debug tests, you can:

1. **Run tests in watch mode**
   ```bash
   npm test -- --watch
   ```

2. **Run specific test with verbose output**
   ```bash
   npm test -- --grep "specific test name" --verbose
   ```

3. **Debug with console.log**
   - Add `console.log` statements in tests
   - Check test output for debugging information

## Contributing

When adding new tests:

1. **Follow existing patterns** - Use similar structure and naming conventions
2. **Add comprehensive coverage** - Test both success and failure scenarios
3. **Update documentation** - Document new test cases and scenarios
4. **Maintain test quality** - Ensure tests are reliable and maintainable

## Resources

- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
- [Accessibility Testing](https://www.npmjs.com/package/@testing-library/jest-dom) 