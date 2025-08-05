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
  user_login: vi.fn(() => ({ type: 'user/login/pending' })),
}));


describe('Login API - Unit Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('extract form data and call Redux with credentials', async () => {
    const { clientAction } = await import('../login');
    const { user_login } = await import('src/context/features/user/userSlice');
    
    // Create mock form data
    const formData = new FormData();
    formData.append('email', 'test@example.com');
    formData.append('password', 'password123');

    // Mock request
    const mockRequest = {
      formData: vi.fn().mockResolvedValue(formData),
    };

    // Call action
    const result = await clientAction({ 
      params: {}, 
      request: mockRequest as any,
      context: {} as any
    });

    expect(mockRequest.formData).toHaveBeenCalled(); // Form data extracted
    expect(user_login).toHaveBeenCalledWith({
      email: 'test@example.com', 
      password: 'password123' 
    }); // Redux action called credentials
    expect(mockDispatch).toHaveBeenCalled(); // Store dispatch called
    expect(result).toEqual({
      status: 200,
      message: "Login successful",
    }); // API returns success
  });

  it('handle various form data', async () => {
    const { clientAction } = await import('../login');
    
    const testCases = [
      {
        name: 'valid credentials',
        email: 'test@example.com',
        password: 'password123'
      },
      {
        name: 'empty form data',
        email: null,
        password: null
      },
      {
        name: 'malformed email',
        email: 'not-an-email',
        password: 'password123'
      },
    ];

    for (const testCase of testCases) {
      // Create mock form data
      const formData = new FormData();
      if (testCase.email) formData.append('email', testCase.email);
      if (testCase.password) formData.append('password', testCase.password);

      // Mock request
      const mockRequest = {
        formData: vi.fn().mockResolvedValue(formData),
      };

      // Call action
      const result = await clientAction({ 
        params: {}, 
        request: mockRequest as any,
        context: {} as any
      });
      expect(mockRequest.formData).toHaveBeenCalled(); // Form data extracted
      expect(mockDispatch).toHaveBeenCalled(); // Redux dispatch called
      expect(result).toEqual({
        status: 200,
        message: "Login successful",
      }); // API success
    }
  });

  it('handle empty form data', async () => {
    const { clientAction } = await import('../login');

    const formData = new FormData();
    // No data appended

    const mockRequest = {
      formData: vi.fn().mockResolvedValue(formData),
    };

    const result = await clientAction({ 
      params: {}, 
      request: mockRequest as any,
      context: {} as any
    });

    expect(mockRequest.formData).toHaveBeenCalled(); // Form data extraction works
    expect(mockDispatch).toHaveBeenCalled(); // Redux still called (with empty strings)
    expect(result).toEqual({
      status: 200,
      message: "Login successful",
    }); // API returns success
  });

  it('verify API function signature and return type', async () => {
    const { clientAction } = await import('../login');
    
    // Test that clientAction is a function
    expect(typeof clientAction).toBe('function');

    // Test with data
    const formData = new FormData();
    formData.append('email', 'test@example.com');
    formData.append('password', 'testpass');

    const mockRequest = {
      formData: vi.fn().mockResolvedValue(formData),
    };

    const result = await clientAction({ 
      params: {}, 
      request: mockRequest as any,
      context: {} as any
    });

    // Verify return type structure
    expect(result).toHaveProperty('status');
    expect(result).toHaveProperty('message');
    expect(typeof result.status).toBe('number');
    expect(typeof result.message).toBe('string');
  });
}); 