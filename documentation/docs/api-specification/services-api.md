---
sidebar_position: 2
title: Services API
description: API endpoints for authentication, preferences, and video services
---

# Services API Documentation

## Authentication

### POST /api/login
Authenticate user with email and password.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "status": 200,
  "message": "Login successful"
}
```

**Error Response:**
```json
{
  "status": 401,
  "error": "Invalid credentials"
}
```

---

### POST /api/register
Create new user account.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "status": 200,
  "message": "Registration successful"
}
```

**Error Response:**
```json
{
  "status": 400,
  "error": "Email already registered"
}
```

---

### POST /api/signout
Sign out current user.

**Request:** No body required

**Response:**
```json
{
  "status": 200,
  "message": "Signout successful"
}
```

---

### POST /api/reset-password
Request password reset email.

**Request Body:**
```json
{
  "email": "user@example.com"
}
```

**Response:**
```json
{
  "status": 200,
  "message": "Password reset email sent"
}
```

---

## Preferences

### POST /api/preferences/save
Save user preferences (interests and traits).

**Request Body:**
```json
{
  "preferences": ["Anxiety", "Stress Management", "Mindfulness"]
}
```

**Response:**
```json
{
  "status": 200,
  "message": "Preferences saved"
}
```

**Error Response:**
```json
{
  "status": 401,
  "error": "User not authenticated"
}
```

---

### GET /api/preferences/fetch
Get current user's preferences.

**Response:**
```json
{
  "status": 200,
  "data": {
    "interests": ["Anxiety", "Depression"],
    "traits": ["Student", "Young Adult"]
  }
}
```

---

### GET /api/preferences/all
Get all available preferences.

**Response:**
```json
{
  "status": 200,
  "data": {
    "interests": [
      {"id": 1, "name": "Anxiety"},
      {"id": 2, "name": "Depression"},
      {"id": 3, "name": "Stress Management"}
    ],
    "traits": [
      {"id": 4, "name": "Student"},
      {"id": 5, "name": "Parent"},
      {"id": 6, "name": "Professional"}
    ]
  }
}
```

---

## Videos

### GET /api/recommendations
Get personalized video recommendations based on user preferences.

**Query Parameters:**
- `userId` (optional): Override current user

**Response:**
```json
{
  "status": 200,
  "data": [
    {
      "id": 1,
      "playbackId": "mux_playback_id",
      "username": "creator123",
      "description": "Understanding anxiety and coping strategies",
      "likes": 42,
      "tags": [
        {"label": "Anxiety", "url": "/resources/anxiety"},
        {"label": "CBT", "url": "/resources/cbt"}
      ],
      "isLiked": false
    }
  ]
}
```

**Logic Flow:**
1. Check for authenticated user or localStorage preferences
2. Get user's preference IDs
3. Match preferences to categories
4. Fetch videos from matching categories
5. Append remaining videos for endless scroll
6. Return sorted by relevance and likes

---

### GET /api/videos/all
Get all videos sorted by popularity.

**Response:**
```json
{
  "status": 200,
  "data": [
    {
      "id": 1,
      "playbackId": "mux_playback_id",
      "username": "creator123",
      "description": "Mental health basics",
      "likes": 100
    }
  ]
}
```

---

### POST /api/videos/like
Toggle like status for a video.

**Request Body:**
```json
{
  "videoId": 1
}
```

**Response:**
```json
{
  "success": true,
  "newLikeCount": 43,
  "isLiked": true
}
```

**Error Response:**
```json
{
  "status": 401,
  "error": "User must be authenticated to like videos"
}
```

---

### GET /api/videos/liked
Get all videos liked by current user.

**Response:**
```json
{
  "status": 200,
  "data": [
    {
      "id": 1,
      "playbackId": "mux_playback_id",
      "username": "creator123",
      "description": "My favorite mental health video",
      "likes": 42,
      "isLiked": true
    }
  ]
}
```

---

## Database Tables

### users
- Managed by Supabase Auth

### videos
| Column | Type | Description |
|--------|------|-------------|
| id | integer | Primary key |
| playbackId | string | Mux video ID |
| username | string | Creator name |
| description | string | Video caption |

### preferences
| Column | Type | Description |
|--------|------|-------------|
| id | integer | Primary key |
| name | string | Preference name |
| type | string | 'interest' or 'trait' |

### userPreferences
| Column | Type | Description |
|--------|------|-------------|
| user_id | uuid | Foreign key to users |
| preference_id | integer | Foreign key to preferences |

### categories
| Column | Type | Description |
|--------|------|-------------|
| id | integer | Primary key |
| name | string | Category name |

### categoryPreferences
| Column | Type | Description |
|--------|------|-------------|
| categoryId | integer | Foreign key to categories |
| preferenceId | integer | Foreign key to preferences |

### videoCategories
| Column | Type | Description |
|--------|------|-------------|
| videoId | integer | Foreign key to videos |
| categoryId | integer | Foreign key to categories |

### userInteractions
| Column | Type | Description |
|--------|------|-------------|
| user_id | uuid | Foreign key to users |
| videoId | integer | Foreign key to videos |
| like | boolean | Like status |

---

## Error Codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 400 | Bad Request - Invalid parameters |
| 401 | Unauthorized - Authentication required |
| 404 | Not Found - Resource doesn't exist |
| 500 | Server Error - Internal error |

---

## Implementation Notes

### Authentication
- Uses Supabase Auth for user management
- Sessions stored in Redux state
- JWT tokens handled by Supabase

### Preferences Storage
- Authenticated users: Stored in database
- Non-authenticated users: Stored in localStorage
- Preference matching uses junction tables for many-to-many relationships

### Video Service
- Like counts calculated from userInteractions table
- Tags generated dynamically from video descriptions
- Recommendations prioritize preference matches, then sort by likes