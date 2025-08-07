---
sidebar_position: 3
title: Components API
description: React component interfaces and props documentation
---

# Components API

## BackButton

Navigation component for returning to previous page.

**Import:**
```typescript
import BackButton from "../components/BackButton";
```

**Props:** None

**Usage:**
```jsx
<BackButton />
```

**Behavior:**
- If history > 1 entry: Navigate back
- Otherwise: Navigate to home ("/")

---

## CloseButton

Dismissible element control with X icon.

**Import:**
```typescript
import CloseButton from "../components/CloseButton";
```

**Props:**
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| close | Function | Yes | Callback on click |

**Usage:**
```jsx
<CloseButton close={() => setModalOpen(false)} />
```

---

## Login

User authentication form component.

**Import:**
```typescript
import Login from "../components/Login";
```

**Props:**
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| close | Function | Yes | Close dialog callback |
| switch | Function | Yes | Switch to signup callback |

**Form Fields:**
- `email` (required, email validation)
- `password` (required)

**Usage:**
```jsx
<Login 
  close={() => setLoginOpen(false)}
  switch={() => switchToSignup()}
/>
```

---

## SignUp

User registration form component.

**Import:**
```typescript
import SignUp from "../components/SignUp";
```

**Props:**
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| close | Function | Yes | Close dialog callback |
| switch | Function | Yes | Switch to login callback |

**Form Fields:**
- `email` (required, email validation)
- `password` (required)
- `displayName` (required)

---

## VideoCard

Video/image display with interactions.

**Import:**
```typescript
import VideoCard from "../components/VideoCard";
```

**Props:**
```typescript
interface VideoCardProps {
  videoUrl?: string;           // Direct video URL
  playbackId?: string;         // Mux playback ID
  imageUrl?: string;           // Static image URL
  username: string;            // Creator username
  description: string;         // Content description
  likes: number;               // Like count
  initialComments: Comment[];  // Existing comments
  isActive?: boolean;          // Visibility state
}
```

**Features:**
- Play/pause video control
- Double-click to like
- Comments panel
- Like counter with animation

**Usage:**
```jsx
<VideoCard
  playbackId="mux_id_123"
  username="creator"
  description="Mental health tips"
  likes={42}
  initialComments={[]}
  isActive={true}
/>
```

---

## Sidebar

Main navigation layout component.

**Import:**
```typescript
import Sidebar from "../layouts/Sidebar";
```

**Props:** None

**Navigation Items:**
- Welcome (`/`)
- Tutorial (`/tutorial`)
- Video (`/video`)
- Resources (`/resources`)

**Features:**
- Responsive hamburger menu
- Login/Signup dialogs
- Active route highlighting

**Usage:**
```jsx
<Sidebar />
```

---

## Onboarding

User preference selection component.

**Import:**
```typescript
import Onboarding from "../components/Onboarding";
```

**Props:**
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| onComplete | Function | Yes | Callback when preferences saved |

**Features:**
- Multi-select interests
- Multi-select personal traits
- Save to database or localStorage

**Usage:**
```jsx
<Onboarding onComplete={() => navigate('/video')} />
```

---

## ProfileSidebar

User profile management sidebar.

**Import:**
```typescript
import ProfileSidebar from "../components/ProfileSidebar";
```

**Props:**
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| isOpen | boolean | Yes | Sidebar visibility |
| onClose | Function | Yes | Close callback |

**Features:**
- User avatar display
- Email display
- Sign out functionality
- Liked videos section

---

## LikedVideoCard

Compact video card for liked videos display.

**Import:**
```typescript
import LikedVideoCard from "../components/LikedVideoCard";
```

**Props:**
```typescript
interface LikedVideoCardProps {
  video: {
    id: number;
    playbackId?: string;
    username: string;
    description: string;
    likes: number;
  };
  onClick: () => void;
}
```

**Usage:**
```jsx
<LikedVideoCard 
  video={videoData}
  onClick={() => navigateToVideo(videoData.id)}
/>
```

---

## VideoComponent

Full-featured video player with controls.

**Import:**
```typescript
import VideoComponent from "../components/VideoComponent";
```

**Props:**
```typescript
interface VideoComponentProps {
  video: Video;
  isActive: boolean;
  onLike: (videoId: number) => void;
  likeCount: number;
  isLiked: boolean;
}
```

**Features:**
- Mux video streaming
- Play/pause controls
- Like functionality
- Tag display
- Description overlay

---

## Common Interfaces

### Comment
```typescript
interface Comment {
  username: string;
  text: string;
  timestamp?: string;
}
```

### Video
```typescript
interface Video {
  id: number;
  playbackId?: string;
  videoUrl?: string;
  imageUrl?: string;
  username: string;
  description: string;
  likes: number;
  tags?: Tag[];
  isLiked?: boolean;
}
```

### Tag
```typescript
interface Tag {
  label: string;
  url: string;
}
```