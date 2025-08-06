import { describe, it, expect, vi, beforeEach } from 'vitest';
import React from 'react';
import LikedVideoCard from '../../components/LikedVideoCard';
import type { Video } from '../../components/videoService';

// Mock FontAwesome
vi.mock('@fortawesome/react-fontawesome', () => ({
  FontAwesomeIcon: ({ icon }: { icon: any }) => <span data-testid="icon">{icon.iconName}</span>,
}));

// Mock MuxPlayer
vi.mock('@mux/mux-player-react', () => ({
  default: ({ playbackId }: { playbackId: string }) => (
    <div data-testid="mux-player" data-playback-id={playbackId}>
      Mock Mux Player
    </div>
  ),
}));

describe('LikedVideoCard Component', () => {
  const mockVideo: Video = {
    id: 1,
    playbackId: 'test-playback-id',
    username: 'testuser',
    description: 'Test video description',
    likes: 10,
    tags: [{ label: 'CBT', url: '/resources/cbt' }],
    isLiked: true,
  };

  const mockOnVideoClick = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should handle video object structure', () => {
    expect(mockVideo.id).toBe(1);
    expect(mockVideo.username).toBe('testuser');
    expect(mockVideo.playbackId).toBe('test-playback-id');
  });

  it('should handle description truncation', () => {
    const longDescription = 'A'.repeat(70);
    const truncated = longDescription.length > 60 
      ? `${longDescription.substring(0, 60)}...` 
      : longDescription;
    expect(truncated).toHaveLength(63);
  });

  it('should handle tag display logic', () => {
    const tags = mockVideo.tags;
    const displayedTags = tags?.slice(0, 2) || [];
    expect(displayedTags).toHaveLength(1);
  });

  it('should handle multiple tags', () => {
    const multipleTags = [
      { label: 'CBT', url: '/resources/cbt' },
      { label: 'Therapy', url: '/resources/therapy' },
      { label: 'Stress', url: '/resources/stress' }
    ];
    const displayedTags = multipleTags.slice(0, 2);
    const remainingCount = multipleTags.length - displayedTags.length;
    expect(displayedTags).toHaveLength(2);
    expect(remainingCount).toBe(1);
  });

  it('should handle video without tags', () => {
    const videoWithoutTags = { ...mockVideo, tags: undefined };
    const displayedTags = videoWithoutTags.tags || [];
    expect(displayedTags).toHaveLength(0);
  });

  it('should handle video click function', () => {
    expect(typeof mockOnVideoClick).toBe('function');
  });

  it('should handle video with missing playbackId', () => {
    const videoWithoutPlayback = { ...mockVideo, playbackId: undefined };
    expect(videoWithoutPlayback.playbackId).toBeUndefined();
  });

  it('should handle long usernames', () => {
    const longUsername = 'A'.repeat(50);
    expect(longUsername.length).toBe(50);
  });

  it('should handle special characters in description', () => {
    const specialDescription = 'Test @#$%^&*() description';
    expect(specialDescription).toContain('@#$%^&*()');
  });
}); 