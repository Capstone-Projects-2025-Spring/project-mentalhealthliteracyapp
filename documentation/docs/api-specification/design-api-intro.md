---
sidebar_position: 1
title: API Overview
description: Mental Health Literacy App API Documentation
---

# API Overview

## Architecture

The Mental Health Literacy App uses a modern React-based architecture with the following stack:

### Frontend
- **React 18** with TypeScript
- **React Router v6** for routing
- **Vite** for build tooling
- **Redux Toolkit** for state management

### Backend Services
- **Supabase** (PostgreSQL) for database and authentication
- **Mux** for video streaming
- **Cloudflare Workers** for edge deployment

## API Categories

### 1. [Authentication APIs](./services-api.md#authentication)
- User login, registration, password reset
- Session management

### 2. [User Preferences APIs](./services-api.md#preferences)
- Save and retrieve user interests/traits
- Preference-based content filtering

### 3. [Video APIs](./services-api.md#videos)
- Video recommendations
- Like/interaction tracking
- Content retrieval

### 4. [Component APIs](./components-api.md)
- React component interfaces
- Props and methods documentation

### 5. [TypeScript Interfaces](./interfaces-types.md)
- Data models and type definitions
- Request/response types

## Base Configuration

### Environment Variables
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### API Response Format
All API responses follow this structure:
```typescript
{
  status: number,
  message?: string,
  data?: any,
  error?: string
}
```

## Error Handling
- **401**: Authentication required
- **400**: Bad request/Invalid parameters
- **500**: Server error
- **200**: Success