---
sidebar_position: 5
title: Page Components API
description: Complete API documentation for all page components in the Mental Health Literacy App
---

# Page Components API Documentation

This document provides comprehensive API documentation for all page components in the Mental Health Literacy application, following the Design Document - Part II API requirements.

## Page Architecture Overview

The Mental Health Literacy App uses a page-based routing system with React Router. Pages represent distinct views within the application and are mapped to specific routes.

---

## Pages.tsx - Route Configuration

### Purpose
Central configuration file that defines all routes and their corresponding page components. Manages the routing structure of the entire application.

### Import
```typescript
import { routeList, noSidebarList } from "./pages/Pages";
```

### Interfaces

#### RouteDef Interface
```typescript
export interface RouteDef {
  path: string;        // URL path for the route
  element: JSX.Element; // React component to render
}
```

### Exported Constants

#### routeList
- **Type**: `Array<RouteDef>`
- **Purpose**: Defines all available routes in the application
- **Content**:
  ```typescript
  [
    { path: "/", element: <Welcome /> },
    { path: "/tutorial", element: <Tutorial /> },
    { path: "/video", element: <Video /> },
    { path: "/resources", element: <Resources /> }
  ]
  ```

#### noSidebarList
- **Type**: `Array<string>`
- **Purpose**: Lists routes that should render without the sidebar
- **Current Value**: Empty array `[]`
- **Usage**: Can be used to create full-screen experiences

### Dependencies
- All page components (Welcome, Tutorial, Video, Resources)
- React for JSX elements

---

## Welcome Component

### Purpose
Landing page of the application that serves as the entry point for users. Provides an introduction to the Mental Health Literacy App.

### Import
```typescript
import Welcome from "./pages/Welcome";
```

### Component Definition
```typescript
function Welcome(): JSX.Element
```

### Data Fields
This component currently has no props or state.

### Methods

#### Component Function
- **Purpose**: Renders the welcome/landing page
- **Pre-conditions**: Component is mounted at root route "/"
- **Post-conditions**: Welcome message is displayed
- **Parameters**: None
- **Return value**: JSX.Element with welcome content
- **Current Implementation**: Displays "Welcome" heading

### Future Enhancements
- Hero section with app introduction
- Quick links to main features
- Brief explanation of app purpose
- Call-to-action buttons

### Styling
Uses global `.main-screen` CSS class for consistent page layout.

---

## Tutorial Component

### Purpose
Interactive tutorial page that guides new users through the application's features using a step-by-step walkthrough powered by React Joyride.

### Import
```typescript
import Tutorial from "./pages/Tutorial";
```

### Component Definition
```typescript
const Tutorial: React.FC
```

### Data Fields

#### State
| Field | Type | Purpose |
|-------|------|---------|
| run | boolean | Controls whether the tutorial is actively running |

#### Steps Configuration
```typescript
const steps: Step[] = [
  {
    target: string,    // CSS selector for target element
    content: string    // Instruction text
  }
]
```

### Tutorial Steps
1. **Welcome Navigation** - Target: `#nav-welcome`
2. **Sign Up** - Target: `#nav-signup`
3. **Login** - Target: `#nav-login`
4. **Tutorial Section** - Target: `#nav-tutorial`
5. **Video Section** - Target: `#nav-video`
6. **Resources Section** - Target: `#nav-resources`

### Methods

#### links
- **Purpose**: Provides stylesheet links for React Router
- **Return value**: Array with stylesheet configuration
- **Usage**: Enables CSS loading for the tutorial page

#### handleJoyrideCallback
- **Purpose**: Handles tutorial completion or skip events
- **Pre-conditions**: Tutorial must be running
- **Post-conditions**: Tutorial stops when finished/skipped
- **Parameters**: 
  - `data`: CallBackProps from Joyride
- **Logic**: Checks for FINISHED or SKIPPED status

### Content Sections
1. **Title**: "App Tutorial"
2. **Description**: Overview of the tutorial purpose
3. **Directions**: Instructions on how to use the tutorial
4. **Tips & FAQ**: Common questions and helpful tips

### Error Handling
- Tutorial gracefully handles missing target elements
- Skip functionality always available
- Falls back to static content if Joyride fails

### Dependencies
- `react-joyride`: Interactive tour functionality
- `react`: State management
- `./Tutorial.css`: Page styling

---

## Video Component

### Purpose
Main content feed page displaying mental health educational videos and images in a scrollable, TikTok-style interface with user interactions.

### Import
```typescript
import Video from "./pages/Video";
```

### Component Definition
```typescript
function Video(): JSX.Element
```

### Interfaces

#### Comment Interface
```typescript
interface Comment {
  username: string;    // Comment author
  text: string;        // Comment content
}
```

#### Video Interface
```typescript
interface Video {
  id: number;                  // Unique identifier
  playbackId?: string;         // Mux video ID
  videoUrl?: string;           // Direct video URL
  imageUrl?: string;           // Static image URL
  username: string;            // Content creator
  description: string;         // Video description
  likes: number;               // Like count
  comments: Comment[];         // Associated comments
  isLiked?: boolean;          // User like status
}
```

### Data Fields

#### State
| Field | Type | Purpose |
|-------|------|---------|
| currentVideoIndex | number | Currently visible video index |
| videos | Video[] | Array of all video content |

#### Refs
| Field | Type | Purpose |
|-------|------|---------|
| videoRefs | (HTMLDivElement \| null)[] | References to video containers |

### Methods

#### links
- **Purpose**: Provides stylesheet configuration
- **Return value**: Array with Video.css reference

#### Intersection Observer Setup
- **Purpose**: Detects which video is currently in view
- **Pre-conditions**: Video elements must be rendered
- **Post-conditions**: currentVideoIndex updates on scroll
- **Configuration**:
  - Threshold: 0.5 (50% visibility)
  - Root margin: 0px
- **Cleanup**: Observer disconnects on unmount

### Content Structure
Currently includes 7 pre-configured videos featuring:
- Mental health awareness content
- Educational images (anxiety, depression, stress)
- Mux-hosted video content
- Variety of engagement levels (likes/comments)

### Scroll Behavior
- Snap scrolling for smooth navigation
- Full viewport height per video
- Lazy rendering based on visibility

### Performance Optimizations
- Only active video renders VideoCard component
- Inactive videos show lightweight placeholder
- Intersection Observer for efficient scroll detection

### Error Handling
- Handles missing video URLs gracefully
- Fallback UI for loading states
- Robust ref management

### Dependencies
- `VideoCard`: Main video display component
- `react`: Core functionality
- Asset imports for static images
- `./Video.css`: Page styling

---

## Resources Component

### Purpose
Information page intended to provide mental health resources, articles, guides, and external links for users seeking additional support and education.

### Import
```typescript
import Resources from "./pages/Resources";
```

### Component Definition
```typescript
function Resources(): JSX.Element
```

### Current Implementation
- Displays "Resources" heading
- Placeholder for future content

### Planned Features
1. **Resource Categories**:
   - Crisis hotlines
   - Educational articles
   - Professional help directories
   - Self-help guides

2. **Content Types**:
   - External links
   - Downloadable PDFs
   - Video resources
   - Interactive tools

3. **Search and Filter**:
   - Category filtering
   - Keyword search
   - Bookmarking functionality

### Data Requirements
Future implementation will need:
- Resource database/API
- Content management system
- User preferences storage

### Styling
Uses global `.main-screen` CSS class for consistent layout.

---

## Page Navigation Flow

```
Welcome (/)
    ├── Tutorial (/tutorial) - New users
    ├── Video (/video) - Main content
    └── Resources (/resources) - Additional help
```

## Error Handling Guidelines for Pages

### Navigation Errors
- "Page not found. Returning to home page."
- "Unable to load content. Please refresh the page."

### Content Loading Errors
- "Videos are temporarily unavailable. Please try again later."
- "Resources are being updated. Check back soon."

### User State Errors
- "Please log in to access this feature."
- "Your session has expired. Please log in again."

## Performance Considerations

1. **Route Splitting**: Consider lazy loading for optimal performance
2. **Prefetching**: Preload adjacent videos in the feed
3. **Caching**: Cache static resources and user preferences
4. **Analytics**: Track page views and user interactions

## Accessibility Requirements

All pages should implement:
- Proper heading hierarchy
- ARIA labels for interactive elements
- Keyboard navigation support
- Screen reader compatibility
- High contrast mode support