import { describe, it, expect, vi, beforeEach } from 'vitest';
import { VideoService, type Video } from '../../components/videoService';

// Mock the supabase module
const mockSupabase = vi.hoisted(() => ({
  auth: {
    getUser: vi.fn(),
    getSession: vi.fn(),
  },
  from: vi.fn(),
}));

vi.mock('../../lib/supabase', () => ({
  default: () => mockSupabase,
}));

describe('VideoService - Unit Tests', () => {
  let videoService: VideoService;

  beforeEach(() => {
    vi.clearAllMocks();
    videoService = new VideoService();
  });

  describe('getTagsForVideo', () => {
    it('should return CBT tag when description contains "cbt"', () => {
      const description = 'This is a CBT therapy session';
      const tags = videoService.getTagsForVideo(description);
      
      expect(tags).toContainEqual({ label: 'CBT', url: '/resources/cbt' });
    });

    it('should return anxiety tag when description contains "anxiety"', () => {
      const description = 'Managing anxiety through mindfulness';
      const tags = videoService.getTagsForVideo(description);
      
      expect(tags).toContainEqual({ label: 'Anxiety', url: '/resources/anxiety' });
    });

    it('should return multiple tags when description contains multiple keywords', () => {
      const description = 'CBT therapy for depression and stress management';
      const tags = videoService.getTagsForVideo(description);
      
      expect(tags).toContainEqual({ label: 'CBT', url: '/resources/cbt' });
      expect(tags).toContainEqual({ label: 'Therapy', url: '/resources/therapy' });
      expect(tags).toContainEqual({ label: 'Depression', url: '/resources/depression' });
      expect(tags).toContainEqual({ label: 'Stress', url: '/resources/stress' });
    });

    it('should return empty array when no keywords found', () => {
      const description = 'Just a regular video about cooking';
      const tags = videoService.getTagsForVideo(description);
      
      expect(tags).toEqual([]);
    });

    it('should be case insensitive', () => {
      const description = 'CBT THERAPY for ANXIETY';
      const tags = videoService.getTagsForVideo(description);
      
      expect(tags).toContainEqual({ label: 'CBT', url: '/resources/cbt' });
      expect(tags).toContainEqual({ label: 'Therapy', url: '/resources/therapy' });
      expect(tags).toContainEqual({ label: 'Anxiety', url: '/resources/anxiety' });
    });
  });

  describe('processVideosWithLike', () => {
    const mockVideos = [
      {
        id: 1,
        playbackId: 'test-playback-1',
        username: 'user1',
        description: 'CBT therapy session',
        likes: 10,
      },
      {
        id: 2,
        playbackId: 'test-playback-2',
        username: 'user2',
        description: 'Yoga for stress relief',
        likes: 5,
      },
    ];

    it('should process videos and add tags when user is not authenticated', async () => {
      mockSupabase.auth.getUser.mockResolvedValue({ data: { user: null } });

      // Mock the from().select().eq() chain for getting all likes
      const mockSelect = vi.fn().mockReturnValue({
        eq: vi.fn().mockResolvedValue({ data: [], error: null }),
      });
      
      mockSupabase.from.mockReturnValue({
        select: mockSelect,
      });

      const result = await videoService.processVideosWithLike(mockVideos);

      expect(result).toHaveLength(2);
      expect(result[0]).toEqual({
        id: 1,
        playbackId: 'test-playback-1',
        username: 'user1',
        description: 'CBT therapy session',
        likes: 0, // Likes are calculated from userInteractions, so 0 when no likes
        tags: [{ label: 'CBT', url: '/resources/cbt' }, { label: 'Therapy', url: '/resources/therapy' }],
        isLiked: false,
      });
      expect(result[1]).toEqual({
        id: 2,
        playbackId: 'test-playback-2',
        username: 'user2',
        description: 'Yoga for stress relief',
        likes: 0, // Likes are calculated from userInteractions, so 0 when no likes
        tags: [{ label: 'Stress', url: '/resources/stress' }, { label: 'Yoga', url: '/resources/yoga' }],
        isLiked: false,
      });
    });

    it('should process videos and mark liked videos when user is authenticated', async () => {
      const mockUser = { id: 'user123', email: 'test@example.com' };
      const mockUserLikes = [{ videoId: 1 }];

      mockSupabase.auth.getUser.mockResolvedValue({ data: { user: mockUser } });
      
      const mockSelect = vi.fn().mockReturnValue({
        eq: vi.fn().mockReturnValue({
          eq: vi.fn().mockResolvedValue({ data: mockUserLikes, error: null }),
        }),
      });
      
      mockSupabase.from.mockReturnValue({
        select: mockSelect,
      });

      const result = await videoService.processVideosWithLike(mockVideos);

      expect(result).toHaveLength(2);
      expect(result[0].isLiked).toBe(true);
      expect(result[1].isLiked).toBe(false);
    });

    it('should handle errors when fetching user likes', async () => {
      const mockUser = { id: 'user123', email: 'test@example.com' };

      mockSupabase.auth.getUser.mockResolvedValue({ data: { user: mockUser } });
      
      const mockSelect = vi.fn().mockReturnValue({
        eq: vi.fn().mockReturnValue({
          eq: vi.fn().mockResolvedValue({ data: null, error: 'Database error' }),
        }),
      });
      
      mockSupabase.from.mockReturnValue({
        select: mockSelect,
      });

      const result = await videoService.processVideosWithLike(mockVideos);

      expect(result).toHaveLength(2);
      expect(result[0].isLiked).toBe(false);
      expect(result[1].isLiked).toBe(false);
    });

    it('should throw error when supabase client is not available', async () => {
      // Create a new instance without supabase
      const videoServiceWithoutSupabase = new VideoService();
      (videoServiceWithoutSupabase as any).supabase = null;

      await expect(videoServiceWithoutSupabase.processVideosWithLike(mockVideos))
        .rejects.toThrow('Supabase client not available');
    });
  });

  describe('updateLike', () => {
    const mockUser = { id: 'user123', email: 'test@example.com' };

    beforeEach(() => {
      mockSupabase.auth.getUser.mockResolvedValue({ data: { user: mockUser } });
      mockSupabase.auth.getSession.mockResolvedValue({ 
        data: { session: { user: mockUser } }, 
        error: null 
      });
    });

    it('should like a video when user has not liked it before', async () => {
      // Mock existing interactions (none)
      const mockSelect1 = vi.fn().mockReturnValue({
        eq: vi.fn().mockReturnValue({
          eq: vi.fn().mockResolvedValue({ data: [], error: null }),
        }),
      });
      
      // Mock insert interaction
      const mockInsert = vi.fn().mockResolvedValue({ error: null });
      
      // Mock count likes for this video (should return 1 after like)
      const mockSelect2 = vi.fn().mockReturnValue({
        eq: vi.fn().mockReturnValue({
          eq: vi.fn().mockResolvedValue({ data: [{ videoId: 1, like: true }], error: null }),
        }),
      });

      mockSupabase.from
        .mockReturnValueOnce({ select: mockSelect1 })
        .mockReturnValueOnce({ insert: mockInsert })
        .mockReturnValueOnce({ select: mockSelect2 });

      const result = await videoService.updateLike(1);

      expect(result).toEqual({
        success: true,
        newLikeCount: 1,
        isLiked: true,
      });
    });

    it('should unlike a video when user has already liked it', async () => {
      // Mock existing interactions (user has already liked)
      const mockSelect1 = vi.fn().mockReturnValue({
        eq: vi.fn().mockReturnValue({
          eq: vi.fn().mockResolvedValue({ data: [{ id: 1, videoId: 1, like: true }], error: null }),
        }),
      });
      
      // Mock update interaction
      const mockUpdate = vi.fn().mockReturnValue({
        eq: vi.fn().mockReturnValue({
          eq: vi.fn().mockResolvedValue({ error: null }),
        }),
      });
      
      // Mock count likes for this video (should return 0 after unlike)
      const mockSelect2 = vi.fn().mockReturnValue({
        eq: vi.fn().mockReturnValue({
          eq: vi.fn().mockResolvedValue({ data: [], error: null }),
        }),
      });

      mockSupabase.from
        .mockReturnValueOnce({ select: mockSelect1 })
        .mockReturnValueOnce({ update: mockUpdate })
        .mockReturnValueOnce({ select: mockSelect2 });

      const result = await videoService.updateLike(1);

      expect(result).toEqual({
        success: true,
        newLikeCount: 0,
        isLiked: false,
      });
    });

    it('should throw error when user is not authenticated', async () => {
      mockSupabase.auth.getSession.mockResolvedValue({ 
        data: { session: null }, 
        error: null 
      });

      await expect(videoService.updateLike(1))
        .rejects.toThrow('User must be authenticated to like videos');
    });

    it('should handle database errors gracefully', async () => {
      // Mock database error
      const mockSelect = vi.fn().mockReturnValue({
        eq: vi.fn().mockReturnValue({
          eq: vi.fn().mockResolvedValue({ data: null, error: 'Database error' }),
        }),
      });

      mockSupabase.from.mockReturnValue({
        select: mockSelect,
      });

      await expect(videoService.updateLike(1))
        .rejects.toThrow('Database error');
    });
  });

  describe('getLikedVideos', () => {
    const mockUser = { id: 'user123', email: 'test@example.com' };

    beforeEach(() => {
      mockSupabase.auth.getUser.mockResolvedValue({ data: { user: mockUser } });
    });

    it('should return liked videos for authenticated user', async () => {
      const mockLikedVideoIds = [{ videoId: 1 }, { videoId: 2 }];
      const mockVideos = [
        { id: 1, playbackId: 'test-1', title: 'Video 1', description: 'Test video 1', username: 'user1', likes: 10 },
        { id: 2, playbackId: 'test-2', title: 'Video 2', description: 'Test video 2', username: 'user2', likes: 5 },
      ];

      // Mock getting liked video IDs
      const mockSelect1 = vi.fn().mockReturnValue({
        eq: vi.fn().mockReturnValue({
          eq: vi.fn().mockResolvedValue({ data: mockLikedVideoIds, error: null }),
        }),
      });

      // Mock getting video details
      const mockSelect2 = vi.fn().mockReturnValue({
        in: vi.fn().mockReturnValue({
          order: vi.fn().mockResolvedValue({ data: mockVideos, error: null }),
        }),
      });

      // Mock getting all likes for like count calculation
      const mockSelect3 = vi.fn().mockReturnValue({
        eq: vi.fn().mockResolvedValue({ data: [{ videoId: 1, like: true }, { videoId: 2, like: true }], error: null }),
      });

      mockSupabase.from
        .mockReturnValueOnce({ select: mockSelect1 })
        .mockReturnValueOnce({ select: mockSelect2 })
        .mockReturnValueOnce({ select: mockSelect3 });

      const result = await videoService.getLikedVideos();

      expect(result).toHaveLength(2);
      expect(result[0]).toEqual({
        id: 1,
        playbackId: 'test-1',
        username: 'user1',
        description: 'Test video 1',
        likes: 1, // Calculated from userInteractions
        tags: [], // Generated from description
        isLiked: true,
      });
      expect(result[1]).toEqual({
        id: 2,
        playbackId: 'test-2',
        username: 'user2',
        description: 'Test video 2',
        likes: 1, // Calculated from userInteractions
        tags: [], // Generated from description
        isLiked: true,
      });
    });

    it('should return empty array when user has no liked videos', async () => {
      // Mock no liked videos
      const mockSelect = vi.fn().mockReturnValue({
        eq: vi.fn().mockReturnValue({
          eq: vi.fn().mockResolvedValue({ data: [], error: null }),
        }),
      });

      mockSupabase.from.mockReturnValue({
        select: mockSelect,
      });

      const result = await videoService.getLikedVideos();

      expect(result).toEqual([]);
    });

    it('should return empty array when user is not authenticated', async () => {
      mockSupabase.auth.getUser.mockResolvedValue({ data: { user: null } });

      const result = await videoService.getLikedVideos();

      expect(result).toEqual([]);
    });

    it('should handle database errors gracefully', async () => {
      // Mock database error
      const mockSelect = vi.fn().mockReturnValue({
        eq: vi.fn().mockReturnValue({
          eq: vi.fn().mockResolvedValue({ data: null, error: 'Database error' }),
        }),
      });

      mockSupabase.from.mockReturnValue({
        select: mockSelect,
      });

      const result = await videoService.getLikedVideos();

      expect(result).toEqual([]);
    });
  });
}); 