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
  user_register: vi.fn(() => ({ type: 'user/register/pending' })),
}));

describe('Register API - Unit Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('extract form data and call Redux with registration credentials', async () => {
    const {clientAction} = await import('../register');
    const {user_register} = await import('src/context/features/user/userSlice');

    const formData = new FormData();
    formData.append('email', 'newuser@example.com');
    formData.append('password', 'newpassword123');

    const mockRequest = {
      formData: vi.fn().mockResolvedValue(formData),
    };

    const result = await clientAction({
      params: {},
      request: mockRequest as any,
      context: {} as any
    });

    expect(mockRequest.formData).toHaveBeenCalled();
    expect(user_register).toHaveBeenCalledWith({
      email: 'newuser@example.com',
      password: 'newpassword123'
    });
    expect(mockDispatch).toHaveBeenCalled();
    expect(result).toEqual({
      status: 200,
      message: "Registration successful",
    });
  });

  it('handle various registration form data', async () => {
    const {clientAction} = await import('../register');

    const testCases = [
      {
        name: 'valid registration credentials',
        email: 'user1@example.com',
        password: 'password123'
      },
      {
        name: 'empty form data',
        email: null,
        password: null
      },
      {
        name: 'special characters in email',
        email: 'user+test@example.com',
        password: 'password123'
      },
    ];

    for (const testCase of testCases) {

      const formData = new FormData();
      if (testCase.email) formData.append('email', testCase.email);
      if (testCase.password) formData.append('password', testCase.password);

      const mockRequest = {
        formData: vi.fn().mockResolvedValue(formData),
      };

      const result = await clientAction({
        params: {},
        request: mockRequest as any,
        context: {} as any
      });

      expect(mockRequest.formData).toHaveBeenCalled();
      expect(mockDispatch).toHaveBeenCalled();
      expect(result).toEqual({
        status: 200,
        message: "Registration successful",
      });
    }
  });

  it('handle empty form data', async () => {
    const {clientAction} = await import('../register');

    const formData = new FormData();

    const mockRequest = {
      formData: vi.fn().mockResolvedValue(formData),
    };

    const result = await clientAction({
      params: {},
      request: mockRequest as any,
      context: {} as any
    });

    expect(mockRequest.formData).toHaveBeenCalled();
    expect(mockDispatch).toHaveBeenCalled();
    expect(result).toEqual({
      status: 200,
      message: "Registration successful",
    });
  });

  it('handle missing email field', async () => {
    const {clientAction} = await import('../register');

    const formData = new FormData();
    formData.append('password', 'password123');

    const mockRequest = {
      formData: vi.fn().mockResolvedValue(formData),
    };

    const result = await clientAction({
      params: {},
      request: mockRequest as any,
      context: {} as any
    });

    expect(mockRequest.formData).toHaveBeenCalled();
    expect(mockDispatch).toHaveBeenCalled();
    expect(result).toEqual({
      status: 200,
      message: "Registration successful",
    });
  });

  it('handle missing password field', async () => {
    const {clientAction} = await import('../register');

    const formData = new FormData();
    formData.append('email', 'user@example.com');

    const mockRequest = {
      formData: vi.fn().mockResolvedValue(formData),
    };

    const result = await clientAction({
      params: {},
      request: mockRequest as any,
      context: {} as any
    });

    expect(mockRequest.formData).toHaveBeenCalled();
    expect(mockDispatch).toHaveBeenCalled();
    expect(result).toEqual({
      status: 200,
      message: "Registration successful",
    });
  });

  it('verify API function signature and return type', async () => {
    const {clientAction} = await import('../register');

    expect(typeof clientAction).toBe('function');

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

    expect(result).toHaveProperty('status');
    expect(result).toHaveProperty('message');
    expect(typeof result.status).toBe('number');
    expect(typeof result.message).toBe('string');
  });
}); 