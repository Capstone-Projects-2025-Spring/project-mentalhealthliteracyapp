---
sidebar_position: 7
title: Development Environment
description: Setup guide for local development
---

# Development Environment

## Prerequisites

### Required Software
- **Node.js** v18+ (LTS recommended)
- **npm** v9+ or **yarn**
- **Git** v2.30+
- **VS Code** (recommended IDE)

### Accounts
- GitHub account with repo access
- Supabase account (for database)
- Mux account (for video streaming)

## Quick Start

### 1. Clone Repository
```bash
git clone https://github.com/Capstone-Projects-2025-Spring/project-mentalhealthliteracyapp.git
cd project-mentalhealthliteracyapp
```

### 2. Install Dependencies
```bash
cd mental-health-literacy
npm install
```

### 3. Environment Setup
Create `.env` file:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Start Development Server
```bash
npm run dev
```
Visit: http://localhost:5173

## Project Structure

```
mental-health-literacy/
├── src/
│   ├── api/           # API endpoints
│   ├── components/    # React components
│   ├── pages/         # Page components
│   ├── context/       # Redux store
│   ├── lib/           # External services
│   └── main.css       # Global styles
├── public/            # Static assets
├── .env               # Environment variables
└── package.json       # Dependencies
```

## Available Scripts

```bash
npm run dev          # Start dev server
npm run build        # Production build
npm run preview      # Preview production build
npm run test         # Run tests
npm run lint         # Run linter
npm run typecheck    # TypeScript check
```

## VS Code Extensions

Recommended extensions:
- ESLint
- Prettier
- TypeScript + JavaScript
- Tailwind CSS IntelliSense
- React snippets

## Database Setup

### Supabase Tables
1. Login to Supabase dashboard
2. Required tables:
   - videos
   - preferences
   - userPreferences
   - categories
   - categoryPreferences
   - videoCategories
   - userInteractions

### Sample Data
Run migrations in Supabase SQL editor for initial data.

## Debugging

### Chrome DevTools
1. Open Chrome DevTools (F12)
2. Install React Developer Tools extension
3. Use Network tab for API debugging
4. Console for error tracking

### VS Code Debugging
`.vscode/launch.json`:
```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "chrome",
      "request": "launch",
      "name": "Launch Chrome",
      "url": "http://localhost:5173",
      "webRoot": "${workspaceFolder}/mental-health-literacy"
    }
  ]
}
```

## Common Issues

### Port Already in Use
```bash
# Kill process on port 5173
lsof -ti:5173 | xargs kill -9
```

### Node Modules Issues
```bash
rm -rf node_modules package-lock.json
npm install
```

### Environment Variables Not Loading
- Ensure `.env` file is in project root
- Restart dev server after changes
- Variables must start with `VITE_`

## Testing

### Unit Tests
```bash
npm run test
```

### Component Tests
```bash
npm run test:components
```

### E2E Tests
```bash
npm run test:e2e
```

## Deployment

### Local Build
```bash
npm run build
npm run preview
```

### Cloudflare Workers
```bash
npm run deploy
```

## Resources

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Supabase Documentation](https://supabase.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)