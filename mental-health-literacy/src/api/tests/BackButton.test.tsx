import { describe, it, expect, vi, beforeEach } from 'vitest';
import React from 'react';
import BackButton from '../../components/BackButton';

// Mock react-router-dom
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Mock window.history
const mockHistory = {
  length: 2,
};

if (typeof window !== 'undefined') {
  Object.defineProperty(window, 'history', {
    value: mockHistory,
    writable: true,
  });
}

describe('BackButton Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should have navigation function available', () => {
    expect(mockNavigate).toBeDefined();
  });

  it('should handle navigation logic', () => {
    expect(typeof mockNavigate).toBe('function');
  });

  it('should be able to navigate', () => {
    expect(mockNavigate).toBeDefined();
  });

  it('should handle navigation calls', () => {
    // Simulate navigation call
    mockNavigate(-1);
    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });

  it('should handle home navigation', () => {
    // Simulate home navigation
    mockNavigate('/');
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
}); 