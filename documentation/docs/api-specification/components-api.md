---
sidebar_position: 4
title: React Components API
description: Complete API documentation for all React components in the Mental Health Literacy App
---

# React Components API Documentation

This document provides comprehensive API documentation for all React components in the Mental Health Literacy application, following the Design Document - Part II API requirements.

## Component Architecture Overview

The Mental Health Literacy App uses a React-based component architecture with TypeScript for type safety. Components are organized into:
- **UI Components**: Reusable interface elements (BackButton, CloseButton, VideoCard, etc.)
- **Form Components**: User input and authentication (Login, SignUp)
- **Layout Components**: Application structure (Sidebar, Topbar)
- **Feature Components**: Specialized functionality (Comments)

---

## BackButton Component

### Purpose
Provides navigation functionality to return to the previous page or home page. Used throughout the application for consistent back navigation behavior.

### Import
```typescript
import BackButton from "../components/BackButton";
```

### Component Definition
```typescript
function BackButton(): JSX.Element
```

### Data Fields
This component has no props or internal state fields.

### Methods

#### Component Function
- **Purpose**: Renders a back navigation button with an arrow icon
- **Pre-conditions**: Component must be rendered within a React Router context
- **Post-conditions**: Button is rendered and clickable
- **Parameters**: None
- **Return value**: JSX.Element containing the button
- **Exceptions**: None

#### onClick Handler
- **Purpose**: Handles navigation when button is clicked
- **Pre-conditions**: React Router navigation context must be available
- **Post-conditions**: User is navigated to previous page or home page
- **Logic**:
  - If browser history has more than 1 entry, navigates back one step
  - Otherwise, navigates to home page ("/") with history replacement
- **Exceptions**: Navigation may fail if router context is unavailable

### Dependencies
- `@fortawesome/react-fontawesome`: Icon rendering
- `@fortawesome/free-solid-svg-icons`: Arrow icon
- `react-router-dom`: Navigation functionality
- `./BackButton.css`: Component styling

---

## CloseButton Component

### Purpose
Provides a reusable close button component for modals, dialogs, and dismissible elements. Displays an "X" icon that triggers a close action.

### Import
```typescript
import CloseButton from "../components/CloseButton";
```

### Component Definition
```typescript
function CloseButton({ close }: any): JSX.Element
```

### Props
| Prop | Type | Required | Purpose |
|------|------|----------|---------|
| close | Function | Yes | Callback function executed when button is clicked |

### Methods

#### Component Function
- **Purpose**: Renders a close button with an X icon
- **Pre-conditions**: `close` prop must be a valid function
- **Post-conditions**: Button is rendered and clickable
- **Parameters**: 
  - `close`: Function to execute on click
- **Return value**: JSX.Element containing the button
- **Exceptions**: Will throw if close prop is not provided

### Error Handling
If the `close` prop is not provided or is not a function, clicking the button may cause a runtime error. Ensure parent components always provide a valid close handler.

### Dependencies
- `@fortawesome/react-fontawesome`: Icon rendering
- `@fortawesome/free-solid-svg-icons`: X icon
- `./CloseButton.css`: Component styling

---

## Comments Component

### Purpose
Manages and displays user comments for content items. Provides functionality to view existing comments and add new ones through a form interface.

### Import
```typescript
import Comments from "../components/Comments";
```

### Component Definition
```typescript
const Comments: React.FC<CommentsProps>
```

### Interfaces

#### Comment Interface
```typescript
interface Comment {
  username: string;    // Display name of comment author
  text: string;        // Comment content
}
```

#### CommentsProps Interface
```typescript
interface CommentsProps {
  comments: Comment[];                    // Array of existing comments
  onAddComment: (comment: Comment) => void; // Callback for new comments
  onClose: () => void;                    // Callback to close component
}
```

### Data Fields

#### State
| Field | Type | Purpose |
|-------|------|---------|
| newComment | string | Stores the text input for new comments |

### Methods

#### handleSubmit
- **Purpose**: Processes form submission for new comments
- **Pre-conditions**: 
  - Form must be submitted
  - `onAddComment` prop must be valid function
- **Post-conditions**: 
  - If comment is not empty, new comment is added
  - Input field is cleared
- **Parameters**: 
  - `e`: React.FormEvent - Form submission event
- **Return value**: void
- **Validation**: Trims whitespace and ignores empty comments

### Error Handling
- Empty comments are ignored (no error shown)
- Comment submission is handled gracefully with form validation

### Dependencies
- `react`: State management
- `./Comments.css`: Component styling

---

## Login Component

### Purpose
Provides user authentication interface with email and password fields. Integrates with the application's authentication system for user sign-in.

### Import
```typescript
import Login from "../components/Login";
```

### Component Definition
```typescript
function Login(props: any): JSX.Element
```

### Props
| Prop | Type | Required | Purpose |
|------|------|----------|---------|
| close | Function | Yes | Callback to close the login dialog |
| switch | Function | Yes | Callback to switch to signup form |

### Form Fields
| Field | Type | Required | Validation |
|-------|------|----------|------------|
| email | email input | Yes | HTML5 email validation |
| password | password input | Yes | Required field |

### Methods

#### Component Function
- **Purpose**: Renders login form with email/password fields
- **Pre-conditions**: Props must include close and switch functions
- **Post-conditions**: Form is rendered with validation
- **Parameters**: props object with close and switch functions
- **Return value**: JSX.Element containing the form

### Error Handling
- Form uses HTML5 validation for email format
- Required fields prevent submission if empty
- Authentication errors should be handled by parent component

### Dependencies
- `CloseButton`: For dialog dismissal
- `./Login.css`: Component styling

---

## SignUp Component

### Purpose
Provides user registration interface with email, password, and display name fields. Creates new user accounts in the system.

### Import
```typescript
import SignUp from "../components/SignUp";
```

### Component Definition
```typescript
function SignUp(props: any): JSX.Element
```

### Props
| Prop | Type | Required | Purpose |
|------|------|----------|---------|
| close | Function | Yes | Callback to close the signup dialog |
| switch | Function | Yes | Callback to switch to login form |

### Form Fields
| Field | Type | Required | Validation |
|-------|------|----------|------------|
| email | email input | Yes | HTML5 email validation |
| password | password input | Yes | Required field |
| displayName | text input | Yes | Required field |

### Methods

#### Component Function
- **Purpose**: Renders registration form with user details
- **Pre-conditions**: Props must include close and switch functions
- **Post-conditions**: Form is rendered with validation
- **Parameters**: props object with close and switch functions
- **Return value**: JSX.Element containing the form

### Error Handling
- Form validation ensures all fields are filled
- Email format is validated client-side
- Registration errors should be handled by parent component

### Dependencies
- `CloseButton`: For dialog dismissal
- Shares styling with Login component

---

## VideoCard Component

### Purpose
Complex component for displaying video or image content with interactive features including likes, comments, and media playback controls. Supports multiple media formats and user engagement.

### Import
```typescript
import VideoCard from "../components/VideoCard";
```

### Component Definition
```typescript
const VideoCard: React.FC<VideoCardProps>
```

### Interfaces

#### Comment Interface
```typescript
interface Comment {
  username: string;     // Comment author
  text: string;         // Comment content
  timestamp?: string;   // Optional timestamp
}
```

#### VideoCardProps Interface
```typescript
interface VideoCardProps {
  videoUrl?: string;              // Direct video URL
  playbackId?: string;            // Mux playback ID
  imageUrl?: string;              // Static image URL
  username: string;               // Content creator username
  description: string;            // Content description
  likes: number;                  // Initial like count
  initialComments: Comment[];     // Pre-existing comments
  isActive?: boolean;             // Whether card is currently visible
}
```

### Data Fields

#### State
| Field | Type | Purpose |
|-------|------|---------|
| isPlaying | boolean | Video playback state |
| isLiked | boolean | Like button state |
| likeCount | number | Current number of likes |
| comments | Comment[] | Array of all comments |
| isCommentsOpen | boolean | Comments panel visibility |

#### Refs
| Field | Type | Purpose |
|-------|------|---------|
| videoRef | HTMLVideoElement | Reference to video element |
| clickTimeout | number \| null | Timeout for click handling |

### Methods

#### togglePlay
- **Purpose**: Toggle video playback state
- **Pre-conditions**: Video element must exist
- **Post-conditions**: Video plays or pauses
- **Error Handling**: Catches and logs play failures

#### handleLike
- **Purpose**: Toggle like state and update count
- **Pre-conditions**: Component is mounted
- **Post-conditions**: Like state and count are updated
- **Side Effects**: Updates UI immediately (optimistic update)

#### handleVideoClick
- **Purpose**: Implements double-click for like, single-click for play/pause
- **Pre-conditions**: Component is interactive
- **Post-conditions**: Appropriate action is triggered
- **Logic**: Uses timeout to distinguish single vs double click

#### handleAddComment
- **Purpose**: Add new comment to the list
- **Pre-conditions**: Valid comment object provided
- **Post-conditions**: Comment is added to state
- **Parameters**: comment: Comment object

### Media Support
- **Video Files**: MP4, WebM via HTML5 video element
- **GIF Files**: Detected by .gif extension
- **Images**: PNG, JPG via img element
- **Mux Videos**: Streaming via MuxPlayer component

### Error Handling
- Video playback errors are caught and logged
- Missing media URLs result in appropriate fallback
- Component handles missing optional props gracefully

### Dependencies
- `@mux/mux-player-react`: Video streaming
- `react`: Core functionality
- Embedded Comments component
- Extensive inline styles

---

## Sidebar Component

### Purpose
Main navigation layout component that provides the application's primary navigation menu, user authentication actions, and responsive sidebar functionality.

### Import
```typescript
import Sidebar from "../layouts/Sidebar";
```

### Component Definition
```typescript
function Sidebar(): JSX.Element
```

### Data Fields

#### State
| Field | Type | Purpose |
|-------|------|---------|
| sidebarStatus | boolean | Controls sidebar visibility (true = hidden) |

#### Refs
| Field | Type | Purpose |
|-------|------|---------|
| loginRef | HTMLDialogElement | Reference to login dialog |
| registerRef | HTMLDialogElement | Reference to signup dialog |

### Methods

#### Close
- **Purpose**: Close specific dialog
- **Pre-conditions**: Dialog ref must exist
- **Parameters**: 
  - `type`: string - "Login" or "Signup"
- **Post-conditions**: Specified dialog is closed

#### SwitchTo
- **Purpose**: Switch between login and signup dialogs
- **Pre-conditions**: Both dialog refs must exist
- **Parameters**: 
  - `type`: string - "Login" or "Signup"
- **Post-conditions**: One dialog closes, other opens
- **Logic**: Ensures only one dialog is open at a time

### Navigation Items
| Route | ID | Purpose |
|-------|-----|---------|
| / | nav-welcome | Home/Welcome page |
| /tutorial | nav-tutorial | App tutorial |
| /video | nav-video | Video content feed |
| /resources | nav-resources | Mental health resources |

### Responsive Behavior
- Sidebar can be toggled via hamburger menu
- Active route is highlighted
- Dialogs render as modal overlays

### Error Handling
- Dialog operations fail gracefully if refs are null
- Route matching handles edge cases

### Dependencies
- `react-router-dom`: Navigation and routing
- `@fortawesome/react-fontawesome`: Icons
- `Login` and `SignUp` components
- `./Sidebar.css`: Component styling

---

## Topbar Component

### Purpose
Currently an empty placeholder component intended for future top navigation bar implementation.

### Import
```typescript
import Topbar from "../components/Topbar";
```

### Current Status
- File exists but contains no implementation
- Reserved for future header/topbar functionality

### Planned Features
- Application header
- User profile information
- Quick actions
- Notifications

---

## Error Message Guidelines

Following the assignment requirements, all components should implement user-friendly error messages:

1. **Authentication Errors**:
   - "Invalid email or password. Please try again."
   - "This email is already registered. Please login instead."

2. **Form Validation**:
   - "Please enter a valid email address."
   - "Password must be at least 8 characters."

3. **Network Errors**:
   - "Unable to connect. Please check your internet connection."
   - "Server is temporarily unavailable. Please try again later."

4. **Media Loading**:
   - "Unable to load video. Please try refreshing the page."
   - "This content is temporarily unavailable."

## Component Testing Considerations

Each component should be tested for:
- Proper rendering with various prop combinations
- User interaction handling
- Error states and edge cases
- Accessibility compliance
- Responsive behavior