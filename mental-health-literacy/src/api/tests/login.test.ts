import { describe, it, expect, vi, beforeEach } from 'vitest';

// Login API always returns success, authentication handled in FE via Redux state
describe('Login API', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('handle form data scenarios and always return success', async () => {
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

      // Check form data was extracted
      expect(mockRequest.formData).toHaveBeenCalled();

      // Check API always returns success
      expect(result).toEqual({
        status: 200,
        message: "Login successful",
      });
    }
  });
}); 