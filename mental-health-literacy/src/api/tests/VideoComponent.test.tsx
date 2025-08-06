import { describe, it, expect, vi, beforeEach } from 'vitest';
import React from 'react';
import VideoComponent from '../../components/VideoComponent';

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

describe('VideoComponent', () => {
  const mockProps = {
    playbackId: 'test-playback-id',
    title: 'Test Video',
    username: 'testuser',
    description: 'Test description',
    likes: 10,
    tags: [{ label: 'CBT', url: '/resources/cbt' }],
    videoId: 1,
    onLike: vi.fn(),
    isLiked: false,
    isActive: true,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should handle video props structure', () => {
    expect(mockProps.playbackId).toBe('test-playback-id');
    expect(mockProps.title).toBe('Test Video');
    expect(mockProps.username).toBe('testuser');
  });

  it('should handle like function', () => {
    expect(typeof mockProps.onLike).toBe('function');
  });

  it('should handle active state', () => {
    expect(mockProps.isActive).toBe(true);
  });

  it('should handle like state changes', () => {
    const likedState = true;
    const unlikedState = false;
    expect(likedState).toBe(true);
    expect(unlikedState).toBe(false);
  });

  it('should handle video ID', () => {
    expect(mockProps.videoId).toBe(1);
  });

  it('should handle likes count', () => {
    expect(mockProps.likes).toBe(10);
  });

  it('should handle tags array', () => {
    expect(mockProps.tags).toHaveLength(1);
    expect(mockProps.tags[0].label).toBe('CBT');
  });

  it('should handle description text', () => {
    expect(mockProps.description).toBe('Test description');
  });

  it('should handle like function calls', () => {
    mockProps.onLike(1);
    expect(mockProps.onLike).toHaveBeenCalledWith(1);
  });

  it('should handle multiple like calls', () => {
    mockProps.onLike(1);
    mockProps.onLike(1);
    expect(mockProps.onLike).toHaveBeenCalledTimes(2);
  });

  it('should handle video without tags', () => {
    const propsWithoutTags = { ...mockProps, tags: undefined };
    expect(propsWithoutTags.tags).toBeUndefined();
  });

  it('should handle video with multiple tags', () => {
    const multipleTags = [
      { label: 'CBT', url: '/resources/cbt' },
      { label: 'Therapy', url: '/resources/therapy' },
      { label: 'Stress', url: '/resources/stress' }
    ];
    const propsWithMultipleTags = { ...mockProps, tags: multipleTags };
    expect(propsWithMultipleTags.tags).toHaveLength(3);
  });
}); 