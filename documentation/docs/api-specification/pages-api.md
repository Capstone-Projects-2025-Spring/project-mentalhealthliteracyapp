---
sidebar_position: 4
title: Pages API
description: Route-based page components documentation
---

# Pages API

## Route Configuration

**File:** `pages/Pages.tsx`

```typescript
interface RouteDef {
  path: string;
  element: JSX.Element;
}

export const routeList: RouteDef[] = [
  { path: "/", element: <Welcome /> },
  { path: "/tutorial", element: <Tutorial /> },
  { path: "/video", element: <Video /> },
  { path: "/resources", element: <Resources /> }
];
```

---

## Welcome Page

Landing page with app introduction.

**Route:** `/`

**Import:**
```typescript
import Welcome from "./pages/Welcome";
```

**Features:**
- App introduction
- Navigation to main features
- User onboarding flow

**State:** None

---

## Tutorial Page

Interactive walkthrough using React Joyride.

**Route:** `/tutorial`

**Import:**
```typescript
import Tutorial from "./pages/Tutorial";
```

**State:**
| Field | Type | Description |
|-------|------|-------------|
| run | boolean | Tutorial active state |

**Tutorial Steps:**
1. Welcome navigation
2. Sign up button
3. Login button
4. Tutorial section
5. Video section
6. Resources section

**Usage:**
```jsx
<Tutorial />
```

---

## Video Page

Main content feed with TikTok-style scrolling.

**Route:** `/video`

**Import:**
```typescript
import Video from "./pages/Video";
```

**State:**
| Field | Type | Description |
|-------|------|-------------|
| currentVideoIndex | number | Active video index |
| videos | Video[] | Video content array |

**Features:**
- Vertical scroll feed
- Intersection Observer for active video
- Lazy rendering
- Full viewport per video

**Video Interface:**
```typescript
interface Video {
  id: number;
  playbackId?: string;
  videoUrl?: string;
  imageUrl?: string;
  username: string;
  description: string;
  likes: number;
  comments: Comment[];
  isLiked?: boolean;
}
```

**Performance:**
- Only renders active VideoCard
- Placeholders for inactive videos
- Snap scrolling

---

## Resources Page

Mental health resources and information.

**Route:** `/resources`

**Import:**
```typescript
import Resources from "./pages/Resources";
```

**Current Status:** Placeholder

**Planned Features:**
- Crisis hotlines
- Educational articles
- Professional directories
- Self-help guides

---

## Profile Page

User profile management and settings.

**Route:** `/profile`

**Import:**
```typescript
import Profile from "./pages/Profile";
```

**Features:**
- User information display
- Liked videos gallery
- Preference management
- Account settings

**State Management:**
- Uses Redux for user data
- Fetches liked videos on mount

---

## Admin Page

Admin dashboard for content management.

**Route:** `/admin`

**Import:**
```typescript
import Admin from "./pages/Admin";
```

**Features:**
- React Admin interface
- Resource management:
  - Users
  - Videos
  - Categories
  - Preferences

**Data Provider:** Supabase integration

---

## Therapy Pages

Specialized therapy resource pages:

### AnimalTherapy
**Route:** `/therapy/animal`
- Animal-assisted therapy information

### ArtTherapy
**Route:** `/therapy/art`
- Creative expression therapy resources

### CBT (Cognitive Behavioral Therapy)
**Route:** `/therapy/cbt`
- CBT techniques and exercises

### FamilyTherapy
**Route:** `/therapy/family`
- Family counseling resources

### GroupTherapy
**Route:** `/therapy/group`
- Group support information

### Yoga
**Route:** `/therapy/yoga`
- Mindfulness and yoga practices

---

## Navigation Flow

```
Welcome (/)
    ├── Tutorial (/tutorial)
    ├── Video (/video)
    ├── Resources (/resources)
    └── Profile (/profile)
```

---

## Page Lifecycle

### Common Patterns
1. **Data Fetching:** On component mount
2. **State Management:** Redux for global, useState for local
3. **Navigation:** React Router hooks
4. **Error Handling:** Try-catch with user feedback

### Performance Tips
- Lazy load heavy pages
- Prefetch adjacent videos
- Cache user preferences
- Minimize re-renders