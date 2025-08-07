---
sidebar_position: 5
title: TypeScript Interfaces
description: Type definitions and data models
---

# TypeScript Interfaces & Types

## Core Data Models

### User
```typescript
interface User {
  id: string;           // UUID from Supabase Auth
  email: string;
  displayName?: string;
}
```

### Video
```typescript
interface Video {
  id: number;
  playbackId?: string;   // Mux video ID
  videoUrl?: string;     // Direct video URL
  imageUrl?: string;     // Static image URL
  username: string;      // Creator username
  description: string;
  likes: number;
  tags?: Tag[];
  isLiked?: boolean;     // Current user's like status
}
```

### Comment
```typescript
interface Comment {
  username: string;
  text: string;
  timestamp?: string;    // ISO 8601 format
}
```

### Tag
```typescript
interface Tag {
  label: string;         // Display text
  url: string;           // Resource link
}
```

### Preference
```typescript
interface Preference {
  id: number;
  name: string;
  type: 'interest' | 'trait';
}
```

---

## API Request/Response Types

### Authentication
```typescript
interface LoginRequest {
  email: string;
  password: string;
}

interface RegisterRequest {
  email: string;
  password: string;
  displayName?: string;
}

interface ResetPasswordRequest {
  email: string;
}
```

### Preferences
```typescript
interface SavePreferencesRequest {
  preferences: string[];
}

interface PreferencesResponse {
  interests: string[];
  traits: string[];
}

interface AllPreferencesResponse {
  interests: { id: number; name: string }[];
  traits: { id: number; name: string }[];
}
```

### Videos
```typescript
interface LikeVideoRequest {
  videoId: number;
}

interface LikeVideoResponse {
  success: boolean;
  newLikeCount: number;
  isLiked: boolean;
}
```

---

## Component Props

### VideoCardProps
```typescript
interface VideoCardProps {
  videoUrl?: string;
  playbackId?: string;
  imageUrl?: string;
  username: string;
  description: string;
  likes: number;
  initialComments: Comment[];
  isActive?: boolean;
}
```

### VideoComponentProps
```typescript
interface VideoComponentProps {
  video: Video;
  isActive: boolean;
  onLike: (videoId: number) => void;
  likeCount: number;
  isLiked: boolean;
}
```

### LikedVideoCardProps
```typescript
interface LikedVideoCardProps {
  video: Video;
  onClick: () => void;
}
```

### OnboardingProps
```typescript
interface OnboardingProps {
  onComplete: () => void;
}
```

### ProfileSidebarProps
```typescript
interface ProfileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}
```

---

## Redux State Types

### UserState
```typescript
interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}
```

### VideoState
```typescript
interface VideoState {
  videos: Video[];
  currentVideoIndex: number;
  loading: boolean;
  error: string | null;
}
```

---

## Database Schema Types

### UserInteraction
```typescript
interface UserInteraction {
  user_id: string;      // UUID
  videoId: number;
  like: boolean;
}
```

### UserPreference
```typescript
interface UserPreference {
  user_id: string;      // UUID
  preference_id: number;
}
```

### VideoCategory
```typescript
interface VideoCategory {
  videoId: number;
  categoryId: number;
}
```

### CategoryPreference
```typescript
interface CategoryPreference {
  categoryId: number;
  preferenceId: number;
}
```

---

## Utility Types

### ApiResponse
```typescript
interface ApiResponse<T = any> {
  status: number;
  message?: string;
  data?: T;
  error?: string;
}
```

### PaginatedResponse
```typescript
interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  hasNext: boolean;
  hasPrevious: boolean;
}
```

### RouteDef
```typescript
interface RouteDef {
  path: string;
  element: JSX.Element;
}
```

---

## Type Guards

### User Authentication
```typescript
function isAuthenticated(user: any): user is User {
  return user && user.id && user.email;
}
```

### Video Validation
```typescript
function hasMediaSource(video: Video): boolean {
  return !!(video.playbackId || video.videoUrl || video.imageUrl);
}
```

### Comment Validation
```typescript
function isValidComment(obj: any): obj is Comment {
  return (
    typeof obj === 'object' &&
    typeof obj.username === 'string' &&
    typeof obj.text === 'string' &&
    obj.text.trim().length > 0
  );
}
```

---

## Enums

### AuthState
```typescript
enum AuthState {
  AUTHENTICATED = 'authenticated',
  UNAUTHENTICATED = 'unauthenticated',
  LOADING = 'loading',
  ERROR = 'error'
}
```

### MediaType
```typescript
enum MediaType {
  VIDEO = 'video',
  IMAGE = 'image',
  MUX_VIDEO = 'mux-video'
}
```

### PreferenceType
```typescript
enum PreferenceType {
  INTEREST = 'interest',
  TRAIT = 'trait'
}
```