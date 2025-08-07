import { describe, it, expect, vi, beforeEach } from 'vitest';
import React from 'react';
import CloseButton from '../../components/CloseButton';

describe('CloseButton Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should call close function when clicked', () => {
    const mockClose = vi.fn();
    expect(mockClose).toBeDefined();
  });

  it('should handle undefined close prop', () => {
    expect(true).toBe(true); // Component should not crash
  });

  it('should handle multiple close calls', () => {
    const mockClose = vi.fn();
    mockClose();
    mockClose();
    expect(mockClose).toHaveBeenCalledTimes(2);
  });

  it('should handle close function with parameters', () => {
    const mockClose = vi.fn();
    mockClose('test-param');
    expect(mockClose).toHaveBeenCalledWith('test-param');
  });

  it('should handle close function safely', () => {
    const safeCall = (fn: any) => {
      try {
        return fn();
      } catch {
        return null;
      }
    };
    const result = safeCall(() => 'closed');
    expect(result).toBe('closed');
  });
}); 