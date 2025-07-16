# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Development
pnpm dev                # Start development server with Turbopack
pnpm build             # Build for production
pnpm start             # Start production server
pnpm lint              # Run ESLint

# Database operations
pnpm db:push           # Push schema changes to database
pnpm db:generate       # Generate database client
```

Always use `pnpm` instead of `npm` - this project uses pnpm as the package manager.

## Architecture Overview

This is a **Next.js 15 blog application** using the App Router with the following stack:

- **Framework**: Next.js 15 with App Router, React 19, TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Styling**: Tailwind CSS v4 with shadcn/ui components
- **Themes**: next-themes for light/dark mode support

### Key Directories

- `src/app/` - App Router pages (home, write, about, contact)
- `src/components/` - Reusable UI components (sidebar, theme toggle, shadcn/ui)
- `src/db/` - Database configuration and schema
- `src/hooks/` - Custom React hooks

### Database Schema

The blog uses a single `blogPosts` table with:

- Content fields: `title`, `content`, `excerpt`, `slug`
- Metadata: `authorId`, `tags`, `metaTitle`, `metaDescription`
- Status management: `status` ("draft", "published", "archived")
- Timestamps: `createdAt`, `updatedAt`, `publishedAt`

### Component Architecture

- **App Layout**: Sidebar navigation with responsive design using shadcn/ui sidebar components
- **Theme System**: Global ThemeProvider with fixed bottom-right toggle button
- **Blog Posts**: Server-side rendered with status filtering and pagination support
- **Write Interface**: Client-side form with fixed bottom buttons for post creation

## Current Implementation Status

### ✅ Completed Features

- Home page with published post listing
- Post creation UI (`/write` route)
- Responsive sidebar navigation
- Light/dark theme switching
- Database schema and connection

### 🚧 Partial/Missing Features

- **Post creation API**: Frontend form exists but needs `/api/posts` endpoint
- **Individual post pages**: Route exists (`/posts/[slug]`) but needs implementation
- **Post editing**: No edit functionality yet
- **Authentication**: No user auth system (Stack Auth keys exist in env but not implemented)

## Styling Patterns

Uses **Tailwind CSS v4** with shadcn/ui design system:

- CSS custom properties for theming (`--foreground`, `--background`, etc.)
- Consistent spacing with Tailwind scale
- shadcn/ui components for complex UI (buttons, inputs, sidebar)
- Fixed positioning for persistent UI elements (theme toggle, write page buttons)

## Development Notes

- **Environment**: Requires `DATABASE_URL` for PostgreSQL connection
- **Deployment**: Configured for Vercel with environment variables
- **Fonts**: Uses Roboto and Geist Mono with proper font optimization
- **Mobile**: Sidebar collapses on mobile devices (expected behavior)

## Common Tasks

When implementing new features:

1. Use existing shadcn/ui components where possible
2. Follow the established Tailwind + CSS custom properties pattern
3. Server Components for data fetching, Client Components for interactivity
4. Use Drizzle ORM for database operations with proper TypeScript types
5. Maintain consistent spacing and theming throughout the app
