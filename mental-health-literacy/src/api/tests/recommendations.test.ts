import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock Supabase client with chaining
const createMockSupabase = () => {
  const mockGetUser = vi.fn();
  const mockSelect = vi.fn();
  const mockIn = vi.fn();
  const mockEq = vi.fn();
  const mockOrder = vi.fn();
  const mockFrom = vi.fn();

  // Method chaining - each method returns an object with the next method
  mockOrder.mockReturnValue({});
  mockEq.mockReturnValue({ order: mockOrder });
  mockIn.mockReturnValue({ eq: mockEq, order: mockOrder });
  mockSelect.mockReturnValue({ in: mockIn, eq: mockEq, order: mockOrder });
  mockFrom.mockReturnValue({
    select: mockSelect,
  });

  return {
    auth: { getUser: mockGetUser },
    from: mockFrom,
    mockGetUser,
    mockSelect,
    mockIn,
    mockEq,
    mockOrder,
  };
};

const mockSupabaseInstance = createMockSupabase();
const mockSupabase = vi.fn(() => mockSupabaseInstance);

vi.mock('src/lib/supabase', () => ({
  default: mockSupabase,
}));

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};

// Mock global localStorage for Node.js env
Object.defineProperty(global, 'localStorage', {
  value: localStorageMock,
  writable: true,
});

describe('Recommendations API - Unit Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    Object.assign(mockSupabaseInstance, createMockSupabase());
    localStorageMock.getItem.mockClear();
  });

  describe('getUserPreferences', () => {
    it('get user preferences successfully for authenticated user', async () => {
      const { getUserPreferences } = await import('../recommendations');

      // Mock db response for user preferences
      const mockUserPrefs = [
        { preference_id: 1 },
        { preference_id: 2 },
        { preference_id: 3 },
      ];
      mockSupabaseInstance.mockEq.mockResolvedValue({
        data: mockUserPrefs,
        error: null,
      });

      const result = await getUserPreferences('user123');

      expect(result).toEqual([1, 2, 3]);
    });

    it('get localStorage preferences for non-authenticated user', async () => {
      const { getUserPreferences } = await import('../recommendations');

      // Mock localStorage data
      localStorageMock.getItem
        .mockReturnValueOnce('["Art", "Music"]') // userInterests
        .mockReturnValueOnce('["Introverted"]'); // userTraits

      // Mock db lookup to convert preference names to IDs
      const mockPrefRows = [
        { id: 1, name: 'Art' },
        { id: 2, name: 'Music' },
        { id: 13, name: 'Introverted' },
      ];
      mockSupabaseInstance.mockIn.mockResolvedValue({
        data: mockPrefRows,
        error: null,
      });

      const result = await getUserPreferences('localStorage_user');

      expect(result).toEqual([1, 2, 13]);
    });

    it('return empty array when database error occurs', async () => {
      const { getUserPreferences } = await import('../recommendations');

      mockSupabaseInstance.mockEq.mockResolvedValue({
        data: null,
        error: { message: 'Database error' },
      });

      const result = await getUserPreferences('user123');

      expect(result).toEqual([]);
    });
  });

  describe('getCategoryPreferences', () => {
    it('get category preferences successfully', async () => {
      const { getCategoryPreferences } = await import('../recommendations');

      const mockCategories = [
        { categoryId: 1 },
        { categoryId: 2 },
        { categoryId: 3 },
      ];
      mockSupabaseInstance.mockIn.mockResolvedValue({
        data: mockCategories,
        error: null,
      });

      const result = await getCategoryPreferences([1, 2, 3]);

      expect(result).toEqual([1, 2, 3]);
    });

    it('return empty array when no preference IDs provided', async () => {
      const { getCategoryPreferences } = await import('../recommendations');

      const result = await getCategoryPreferences([]);

      expect(result).toEqual([]);
    });
  });

  describe('getVideosFromCategories', () => {
    it('get videos from categories successfully', async () => {
      const { getVideosFromCategories } = await import('../recommendations');

      // Mock get video IDs from categories
      const mockVideoCategories = [
        { videoId: 1 },
        { videoId: 2 },
        { videoId: 3 },
      ];
      mockSupabaseInstance.mockIn.mockResolvedValueOnce({
        data: mockVideoCategories,
        error: null,
      });

      // Mock video data 
      const mockVideos = [
        { id: 1, title: 'Video 1', likes: 100 },
        { id: 2, title: 'Video 2', likes: 50 },
        { id: 3, title: 'Video 3', likes: 75 },
      ];
      mockSupabaseInstance.mockOrder.mockResolvedValue({
        data: mockVideos,
        error: null,
      });

      const result = await getVideosFromCategories([1, 2]);

      expect(result).toEqual(mockVideos);
    });

    it('return empty array when no video categories found', async () => {
      const { getVideosFromCategories } = await import('../recommendations');

      mockSupabaseInstance.mockIn.mockResolvedValue({
        data: [],
        error: null,
      });

      const result = await getVideosFromCategories([1, 2]);

      expect(result).toEqual([]);
    });
  });

  describe('getCurrentUserId', () => {
    it('return authenticated user ID when user is logged in', async () => {
      const { getCurrentUserId } = await import('../recommendations');

      const mockUser = { id: 'authenticated-user-id', email: 'test@example.com' };
      mockSupabaseInstance.mockGetUser.mockResolvedValue({
        data: { user: mockUser },
        error: null,
      });

      const result = await getCurrentUserId();

      expect(result).toBe('authenticated-user-id');
    });

    it('return localStorage_user when no authenticated user but has localStorage preferences', async () => {
      const { getCurrentUserId } = await import('../recommendations');

      mockSupabaseInstance.mockGetUser.mockResolvedValue({
        data: { user: null },
        error: null,
      });

      localStorageMock.getItem
        .mockReturnValueOnce('["Art"]') // userInterests
        .mockReturnValueOnce('[]'); // userTraits

      const result = await getCurrentUserId();

      expect(result).toBe('localStorage_user');
    });
  });

  describe('getAllVideos', () => {
    it('get all videos successfully', async () => {
      const { getAllVideos } = await import('../recommendations');

      const mockVideos = [
        { id: 1, title: 'Video 1', likes: 100 },
        { id: 2, title: 'Video 2', likes: 50 },
        { id: 3, title: 'Video 3', likes: 75 },
      ];
      mockSupabaseInstance.mockOrder.mockResolvedValue({
        data: mockVideos,
        error: null,
      });

      const result = await getAllVideos();

      expect(result).toEqual(mockVideos);
    });

    it('return empty array when database error occurs', async () => {
      const { getAllVideos } = await import('../recommendations');

      mockSupabaseInstance.mockOrder.mockResolvedValue({
        data: null,
        error: { message: 'Database error' },
      });

      const result = await getAllVideos();

      expect(result).toEqual([]);
    });
  });

  describe('getRecommendedVideos', () => {
    it('get recommended videos successfully for authenticated user', async () => {
      const { getRecommendedVideos } = await import('../recommendations');

      // Mock authenticated user
      const mockUser = { id: 'user123', email: 'test@example.com' };
      mockSupabaseInstance.mockGetUser.mockResolvedValue({
        data: { user: mockUser },
        error: null,
      });

      // Mock user preferences lookup
      const mockUserPrefs = [{ preference_id: 1 }];
      mockSupabaseInstance.mockEq.mockResolvedValueOnce({
        data: mockUserPrefs,
        error: null,
      });

      // Mock category preferences lookup
      const mockCategories = [{ categoryId: 1 }];
      mockSupabaseInstance.mockIn.mockResolvedValueOnce({
        data: mockCategories,
        error: null,
      });

      // Mock video categories lookup
      const mockVideoCategories = [{ videoId: 1 }];
      mockSupabaseInstance.mockIn.mockResolvedValueOnce({
        data: mockVideoCategories,
        error: null,
      });

      // Mock recommended videos lookup
      const mockRecommendedVideos = [{ id: 1, title: 'Recommended Video' }];
      mockSupabaseInstance.mockIn.mockResolvedValueOnce({
        data: mockRecommendedVideos,
        error: null,
      });

      // Mock all videos for fallback/combination
      const mockAllVideos = [
        { id: 1, title: 'Recommended Video' },
        { id: 2, title: 'Other Video' },
      ];
      mockSupabaseInstance.mockOrder.mockResolvedValue({
        data: mockAllVideos,
        error: null,
      });

      const result = await getRecommendedVideos();

      // combined videos (recommended + remaining)
      expect(result).toEqual(mockAllVideos);
    });

    it('fallback to all videos when no user preferences found', async () => {
      const { getRecommendedVideos } = await import('../recommendations');

      const mockUser = { id: 'user123', email: 'test@example.com' };
      mockSupabaseInstance.mockGetUser.mockResolvedValue({
        data: { user: mockUser },
        error: null,
      });

      mockSupabaseInstance.mockEq.mockResolvedValue({
        data: [],
        error: null,
      });

      const mockAllVideos = [{ id: 1, title: 'Video 1' }];
      mockSupabaseInstance.mockOrder.mockResolvedValue({
        data: mockAllVideos,
        error: null,
      });

      const result = await getRecommendedVideos();

      expect(result).toEqual(mockAllVideos);
    });
  });
}); 