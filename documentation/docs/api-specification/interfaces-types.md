---
sidebar_position: 7
title: TypeScript Interfaces and Types
description: Complete documentation of all TypeScript interfaces, types, and data structures in the Mental Health Literacy App
---

# TypeScript Interfaces and Types Documentation

This document provides comprehensive documentation for all TypeScript interfaces, types, and data structures used throughout the Mental Health Literacy application.

## Overview

The Mental Health Literacy App leverages TypeScript for type safety and better developer experience. This document catalogs all custom types, interfaces, and data structures used across the application.

---

## Core Interfaces

### Comment Interface

**Location**: Used in `VideoCard.tsx`, `Comments.tsx`, `Video.tsx`

```typescript
interface Comment {
  username: string;    // Display name of the comment author
  text: string;        // The comment content
  timestamp?: string;  // Optional timestamp (used in VideoCard)
}
```

**Purpose**: Represents a user comment on content items.

**Usage**:
- Store and display user comments
- Pass comment data between components
- Maintain comment history

**Validation Rules**:
- `username` must not be empty
- `text` must not be empty after trimming whitespace
- `timestamp` should be in ISO 8601 format if provided

---

### Video Interface

**Location**: `Video.tsx`

```typescript
interface Video {
  id: number;                  // Unique identifier for the video
  playbackId?: string;         // Mux playback ID for streaming
  videoUrl?: string;           // Direct URL to video file
  imageUrl?: string;           // URL to static image content
  username: string;            // Content creator's username
  description: string;         // Video description/caption
  likes: number;               // Number of likes
  comments: Comment[];         // Array of associated comments
  isLiked?: boolean;          // Current user's like status
}
```

**Purpose**: Represents a content item in the video feed.

**Business Rules**:
- Must have at least one media source (`playbackId`, `videoUrl`, or `imageUrl`)
- `id` must be unique across all videos
- `likes` cannot be negative
- `comments` array can be empty but not null

---

### RouteDef Interface

**Location**: `Pages.tsx`

```typescript
export interface RouteDef {
  path: string;        // URL path for the route (e.g., "/", "/video")
  element: JSX.Element; // React component to render at this route
}
```

**Purpose**: Defines the structure for route configuration objects.

**Constraints**:
- `path` must be a valid URL path
- `path` should start with "/"
- `element` must be a valid React component

---

## Component Props Interfaces

### VideoCardProps Interface

**Location**: `VideoCard.tsx`

```typescript
interface VideoCardProps {
  videoUrl?: string;              // Direct video file URL
  playbackId?: string;            // Mux video playback ID
  imageUrl?: string;              // Static image URL
  username: string;               // Creator's username (required)
  description: string;            // Content description (required)
  likes: number;                  // Initial like count
  initialComments: Comment[];     // Pre-existing comments
  isActive?: boolean;             // Whether card is currently visible
}
```

**Purpose**: Props for the VideoCard component.

**Validation**:
- At least one media prop must be provided
- `likes` must be a non-negative integer
- `isActive` defaults to `false` if not provided

---

### CommentsProps Interface

**Location**: `Comments.tsx` (standalone version)

```typescript
interface CommentsProps {
  comments: Comment[];                      // Array of existing comments
  onAddComment: (comment: Comment) => void; // Callback for new comments
  onClose: () => void;                     // Callback to close panel
}
```

**Purpose**: Props for the standalone Comments component.

---

### CommentsProps Interface (Extended)

**Location**: `VideoCard.tsx` (embedded version)

```typescript
interface CommentsProps {
  comments: Comment[];                      // Array of existing comments
  onAddComment: (comment: Comment) => void; // Callback for new comments
  onClose: () => void;                     // Callback to close panel
  isOpen: boolean;                          // Panel visibility state
}
```

**Purpose**: Props for the embedded Comments component with visibility control.

---

## Library Types

### Supabase Types

```typescript
import { SupabaseClient } from '@supabase/supabase-js';
```

**Purpose**: Type definitions for Supabase client operations.

---

### React Router Types

```typescript
import type { FormEvent } from "react";
```

**Purpose**: Standard React event types for form handling.

---

### Joyride Types

```typescript
import type { Step, CallBackProps } from "react-joyride";
```

**Purpose**: Types for the tutorial walkthrough functionality.

---

## Type Aliases and Enums

### Authentication States (Planned)

```typescript
type AuthState = 'authenticated' | 'unauthenticated' | 'loading' | 'error';

enum UserRole {
  GUEST = 'guest',
  USER = 'user',
  MODERATOR = 'moderator',
  ADMIN = 'admin'
}
```

### Content Types (Planned)

```typescript
type MediaType = 'video' | 'image' | 'mux-video';

type ContentCategory = 'anxiety' | 'depression' | 'stress' | 'general' | 'wellness';
```

---

## Utility Types

### API Response Types (Planned)

```typescript
interface ApiResponse<T> {
  data?: T;
  error?: string;
  status: number;
  timestamp: string;
}

interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  hasNext: boolean;
  hasPrevious: boolean;
}
```

### Form Types (Planned)

```typescript
interface LoginFormData {
  email: string;
  password: string;
}

interface SignUpFormData extends LoginFormData {
  displayName: string;
  agreeToTerms?: boolean;
}
```

---

## Data Validation Schemas (Future)

### Using a validation library like Zod:

```typescript
import { z } from 'zod';

const CommentSchema = z.object({
  username: z.string().min(1).max(50),
  text: z.string().min(1).max(500),
  timestamp: z.string().datetime().optional()
});

const VideoSchema = z.object({
  id: z.number().positive(),
  playbackId: z.string().optional(),
  videoUrl: z.string().url().optional(),
  imageUrl: z.string().url().optional(),
  username: z.string().min(1),
  description: z.string().max(200),
  likes: z.number().nonnegative(),
  comments: z.array(CommentSchema)
}).refine(
  (data) => data.playbackId || data.videoUrl || data.imageUrl,
  { message: "At least one media source must be provided" }
);
```

---

## Type Guards

### Example Type Guards

```typescript
// Check if a media source is available
function hasMediaSource(video: Video): boolean {
  return !!(video.playbackId || video.videoUrl || video.imageUrl);
}

// Type guard for Comment
function isValidComment(obj: any): obj is Comment {
  return (
    typeof obj === 'object' &&
    typeof obj.username === 'string' &&
    typeof obj.text === 'string' &&
    (obj.timestamp === undefined || typeof obj.timestamp === 'string')
  );
}

// Type guard for authenticated user
function isAuthenticated(user: any): user is AuthenticatedUser {
  return user && user.id && user.email;
}
```

---

## Best Practices

1. **Interface Naming**: Use PascalCase and descriptive names
2. **Optional Properties**: Mark with `?` only when truly optional
3. **Documentation**: Add JSDoc comments for complex types
4. **Immutability**: Consider using `readonly` for props
5. **Type Exports**: Export interfaces that are used across files
6. **Avoid `any`**: Use `unknown` or specific types instead

---

## Migration Guide

When adding new types:

1. Define the interface in the appropriate location
2. Add validation if dealing with external data
3. Create type guards for runtime checks
4. Update this documentation
5. Consider backward compatibility

---

## Type Dependencies Graph

```
Comment
  └── Used by: Video, VideoCardProps, CommentsProps

Video
  └── Uses: Comment
  └── Used by: Video.tsx page

RouteDef
  └── Used by: Pages.tsx, routing system

VideoCardProps
  └── Uses: Comment
  └── Used by: VideoCard component

CommentsProps
  └── Uses: Comment
  └── Used by: Comments component
```