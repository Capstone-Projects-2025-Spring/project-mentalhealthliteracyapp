import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock Supabase client with chaining
const createMockSupabase = () => {
  const mockGetUser = vi.fn();
  const mockSelect = vi.fn();
  const mockIn = vi.fn();
  const mockEq = vi.fn();
  const mockDelete = vi.fn();
  const mockInsert = vi.fn();
  const mockFrom = vi.fn();

  // Set up chain
  mockSelect.mockReturnValue({ in: mockIn, eq: mockEq });
  mockIn.mockReturnValue({ eq: mockEq });
  mockDelete.mockReturnValue({ eq: mockEq });
  mockFrom.mockReturnValue({
    select: mockSelect,
    delete: mockDelete,
    insert: mockInsert,
  });

  return {
    auth: { getUser: mockGetUser },
    from: mockFrom,
    mockGetUser,
    mockSelect,
    mockIn,
    mockEq,
    mockDelete,
    mockInsert,
  };
};

const mockSupabaseInstance = createMockSupabase();
const mockSupabase = vi.fn(() => mockSupabaseInstance);

vi.mock('src/lib/supabase', () => ({
  default: mockSupabase,
}));

describe('Preferences API - Unit Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Reset mocks
    Object.assign(mockSupabaseInstance, createMockSupabase());
  });

  describe('saveUserPreferences', () => {
    it('save user preferences successfully', async () => {
      const {saveUserPreferences} = await import('../preferences');

      // Mock authenticated user
      const mockUser = {id: '1', email: 'test@example.com'};
      mockSupabaseInstance.mockGetUser.mockResolvedValue({
        data: {user: mockUser},
        error: null,
      });

      // Mock preferences table query
      const mockPrefRows = [
        {id: 1, name: 'Art', type: 'interest'},
        {id: 12, name: 'Introverted', type: 'trait'},
      ];
      mockSupabaseInstance.mockIn.mockResolvedValue({
        data: mockPrefRows,
        error: null,
      });

      // Mock delete existing preferences
      mockSupabaseInstance.mockEq.mockResolvedValue({
        error: null,
      });

      // Mock insert new preferences
      mockSupabaseInstance.mockInsert.mockResolvedValue({
        error: null,
      });

      const result = await saveUserPreferences(['Art', 'Introverted']);

      expect(result).toEqual({
        message: "Preferences saved",
        status: 200,
      });
    });

    it('return error when user is not authenticated', async () => {
      const {saveUserPreferences} = await import('../preferences');

      // Mock unauthenticated user
      mockSupabaseInstance.mockGetUser.mockResolvedValue({
        data: {user: null},
        error: null,
      });

      const result = await saveUserPreferences(['Art', 'Introverted']);

      expect(result).toEqual({
        error: "User not authenticated",
        status: 401,
      });
    });

    it('return error when fetching preferences fails', async () => {
      const {saveUserPreferences} = await import('../preferences');

      const mockUser = {id: '1', email: 'test@example.com'};
      mockSupabaseInstance.mockGetUser.mockResolvedValue({
        data: {user: mockUser},
        error: null,
      });

      // Mock preferences table query error
      mockSupabaseInstance.mockIn.mockResolvedValue({
        data: null,
        error: {message: 'Database error'},
      });

      const result = await saveUserPreferences(['Art', 'Introverted']);

      expect(result).toEqual({
        error: "Error fetching preferences",
        status: 400,
      });
    });

    it('return error when no matching preferences found', async () => {
      const {saveUserPreferences} = await import('../preferences');

      const mockUser = {id: '1', email: 'test@example.com'};
      mockSupabaseInstance.mockGetUser.mockResolvedValue({
        data: {user: mockUser},
        error: null,
      });

      // Mock empty preferences result
      mockSupabaseInstance.mockIn.mockResolvedValue({
        data: [],
        error: null,
      });

      const result = await saveUserPreferences(['NonExistentPreference']);

      expect(result).toEqual({
        error: "No matching preferences found",
        status: 400,
      });
    });

    it('return error when deleting existing preferences fails', async () => {
      const {saveUserPreferences} = await import('../preferences');

      const mockUser = {id: '1', email: 'test@example.com'};
      mockSupabaseInstance.mockGetUser.mockResolvedValue({
        data: {user: mockUser},
        error: null,
      });

      const mockPrefRows = [{id: 1, name: 'Art', type: 'interest'}];
      mockSupabaseInstance.mockIn.mockResolvedValue({
        data: mockPrefRows,
        error: null,
      });

      // Mock delete error
      mockSupabaseInstance.mockEq.mockResolvedValue({
        error: {message: 'Delete failed'},
      });

      const result = await saveUserPreferences(['Art']);

      expect(result).toEqual({
        error: "Error updating preferences",
        status: 500,
      });
    });

    it('return error when inserting new preferences fails', async () => {
      const {saveUserPreferences} = await import('../preferences');

      const mockUser = {id: '1', email: 'test@example.com'};
      mockSupabaseInstance.mockGetUser.mockResolvedValue({
        data: {user: mockUser},
        error: null,
      });

      const mockPrefRows = [{id: 1, name: 'Art', type: 'interest'}];
      mockSupabaseInstance.mockIn.mockResolvedValue({
        data: mockPrefRows,
        error: null,
      });

      // Mock successful delete
      mockSupabaseInstance.mockEq.mockResolvedValue({
        error: null,
      });

      // Mock insert error
      mockSupabaseInstance.mockInsert.mockResolvedValue({
        error: {message: 'Insert failed'},
      });

      const result = await saveUserPreferences(['Art']);

      expect(result).toEqual({
        error: "Error saving preferences",
        status: 500,
      });
    });
  });

  describe('fetchUserPreferences', () => {
    it('fetch user preferences successfully', async () => {
      const {fetchUserPreferences} = await import('../preferences');

      const mockUser = {id: '1', email: 'test@example.com'};
      mockSupabaseInstance.mockGetUser.mockResolvedValue({
        data: {user: mockUser},
        error: null,
      });

      // Mock user preferences query
      const mockUserPrefs = [
        {
          preference_id: 1,
          preferences: {id: 1, name: 'Art', type: 'interest'},
        },
        {
          preference_id: 12,
          preferences: {id: 12, name: 'Introverted', type: 'trait'},
        },
      ];
      mockSupabaseInstance.mockEq.mockResolvedValue({
        data: mockUserPrefs,
        error: null,
      });

      const result = await fetchUserPreferences();

      expect(result).toEqual({
        data: {
          interests: ['Art'],
          traits: ['Introverted'],
        },
        status: 200,
      });
    });

    it('return error when user is not authenticated', async () => {
      const {fetchUserPreferences} = await import('../preferences');

      mockSupabaseInstance.mockGetUser.mockResolvedValue({
        data: {user: null},
        error: null,
      });

      const result = await fetchUserPreferences();

      expect(result).toEqual({
        error: "User not authenticated",
        status: 401,
      });
    });

    it('return error when fetching user preferences fails', async () => {
      const {fetchUserPreferences} = await import('../preferences');

      const mockUser = {id: '1', email: 'test@example.com'};
      mockSupabaseInstance.mockGetUser.mockResolvedValue({
        data: {user: mockUser},
        error: null,
      });

      // Mock query error
      mockSupabaseInstance.mockEq.mockResolvedValue({
        data: null,
        error: {message: 'Query failed'},
      });

      const result = await fetchUserPreferences();

      expect(result).toEqual({
        error: "Error fetching preferences",
        status: 400,
      });
    });

    it('return empty arrays when no preferences found', async () => {
      const {fetchUserPreferences} = await import('../preferences');

      const mockUser = {id: '1', email: 'test@example.com'};
      mockSupabaseInstance.mockGetUser.mockResolvedValue({
        data: {user: mockUser},
        error: null,
      });

      // Mock empty preferences
      mockSupabaseInstance.mockEq.mockResolvedValue({
        data: [],
        error: null,
      });

      const result = await fetchUserPreferences();

      expect(result).toEqual({
        data: {
          interests: [],
          traits: [],
        },
        status: 200,
      });
    });

    it('separate interests and traits', async () => {
      const {fetchUserPreferences} = await import('../preferences');

      const mockUser = {id: '1', email: 'test@example.com'};
      mockSupabaseInstance.mockGetUser.mockResolvedValue({
        data: {user: mockUser},
        error: null,
      });

      // Mock mixed preferences
      const mockUserPrefs = [
        {
          preference_id: 1,
          preferences: {id: 1, name: 'Art', type: 'interest'},
        },
        {
          preference_id: 2,
          preferences: {id: 2, name: 'Music', type: 'interest'},
        },
        {
          preference_id: 3,
          preferences: {id: 3, name: 'Introverted', type: 'trait'},
        },
        {
          preference_id: 4,
          preferences: {id: 4, name: 'Analytical', type: 'trait'},
        },
      ];
      mockSupabaseInstance.mockEq.mockResolvedValue({
        data: mockUserPrefs,
        error: null,
      });

      const result = await fetchUserPreferences();

      expect(result).toEqual({
        data: {
          interests: ['Art', 'Music'],
          traits: ['Introverted', 'Analytical'],
        },
        status: 200,
      });
    });

    it('handle preferences with missing or invalid type', async () => {
      const {fetchUserPreferences} = await import('../preferences');

      const mockUser = {id: '1', email: 'test@example.com'};
      mockSupabaseInstance.mockGetUser.mockResolvedValue({
        data: {user: mockUser},
        error: null,
      });

      // Mock preferences with invalid types
      const mockUserPrefs = [
        {
          preference_id: 1,
          preferences: {id: 1, name: 'Art', type: 'interest'},
        },
        {
          preference_id: 2,
          preferences: {id: 2, name: 'InvalidType', type: 'invalid'},
        },
        {
          preference_id: 3,
          preferences: null, // Missing preference
        },
      ];
      mockSupabaseInstance.mockEq.mockResolvedValue({
        data: mockUserPrefs,
        error: null,
      });

      const result = await fetchUserPreferences();

      expect(result).toEqual({
        data: {
          interests: ['Art'],
          traits: [],
        },
        status: 200,
      });
    });
  });
}); 