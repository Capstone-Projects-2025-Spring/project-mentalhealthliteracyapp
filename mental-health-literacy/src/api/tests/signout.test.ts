import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock Redux store and userSlice
const mockDispatch = vi.fn();
const mockStore = {
  dispatch: mockDispatch,
};

vi.mock('src/context/global_store', () => ({
  default: mockStore,
}));

vi.mock('src/context/features/user/userSlice', () => ({
  reset_error: vi.fn(() => ({ type: 'user/reset_error' })),
  user_signout: vi.fn(() => ({ type: 'user/signout/pending' })),
}));

// Mock useUserError hook
const mockUseUserError = vi.fn();
vi.mock('utils/useUserError', () => ({
  default: mockUseUserError,
}));

describe('Signout API - Unit Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('successful signout', async () => {
    const { clientAction } = await import('../signout');
    const { reset_error, user_signout } = await import('src/context/features/user/userSlice');
    
    // Mock no error from useUserError
    mockUseUserError.mockReturnValue(null);

    const result = await clientAction();

    expect(reset_error).toHaveBeenCalled(); // Error reset
    expect(user_signout).toHaveBeenCalled(); // Signout
    expect(mockDispatch).toHaveBeenCalledTimes(2); // Both actions dispatched
    expect(mockUseUserError).toHaveBeenCalled(); // Error hook called
    expect(result).toEqual({
      status: 200,
      message: "Signout successful",
    }); // Success response
  });

  it('signout with error returns error', async () => {
    const { clientAction } = await import('../signout');
    const { reset_error, user_signout } = await import('src/context/features/user/userSlice');
    
    // Mock error from useUserError
    const mockError = "Signout failed";
    mockUseUserError.mockReturnValue(mockError);

    const result = await clientAction();

    expect(reset_error).toHaveBeenCalled();
    expect(user_signout).toHaveBeenCalled();
    expect(mockDispatch).toHaveBeenCalledTimes(2);
    expect(mockUseUserError).toHaveBeenCalled();
    expect(result).toEqual({
      status: 400,
      message: mockError,
    });
  });

  it('verify order of actions', async () => {
    const { clientAction } = await import('../signout');
    const { reset_error, user_signout } = await import('src/context/features/user/userSlice');

    mockUseUserError.mockReturnValue(null);

    await clientAction();

    // reset_error first, then user_signout
    expect(mockDispatch).toHaveBeenNthCalledWith(1, reset_error());
    expect(mockDispatch).toHaveBeenNthCalledWith(2, user_signout());
  });

  it('handle error message types', async () => {
    const { clientAction } = await import('../signout');

    const testCases = [
      { error: "Network error", expectedStatus: 400 },
      { error: "Authentication failed", expectedStatus: 400 },
      { error: "Server timeout", expectedStatus: 400 },
      { error: null, expectedStatus: 200 },
      { error: undefined, expectedStatus: 200 },
      { error: "", expectedStatus: 200 },
    ];

    for (const testCase of testCases) {
      mockUseUserError.mockReturnValue(testCase.error);

      const result = await clientAction();

      expect(result.status).toBe(testCase.expectedStatus);

      if (testCase.expectedStatus === 200) {
        expect(result.message).toBe("Signout successful");
      } else {
        expect(result.message).toBe(testCase.error);
      }
    }
  });

  it('verify API function signature and return type', async () => {
    const { clientAction } = await import('../signout');

    expect(typeof clientAction).toBe('function');

    mockUseUserError.mockReturnValue(null);
    const result = await clientAction();

    expect(result).toHaveProperty('status');
    expect(result).toHaveProperty('message');
    expect(typeof result.status).toBe('number');
    expect(typeof result.message).toBe('string');
  });

}); 