# Blog App - Full-Stack Next.js Blog Platform

A modern, feature-rich blog application built with **Next.js 16**, **React 19**, **Supabase**, and **TypeScript**. This application provides a complete blogging platform with authentication, content management, and a public-facing blog interface.

## 🚀 Features

### Authentication & Authorization

- User registration and login with email/password
- Session management with Supabase Auth
- Protected routes for authenticated users
- Profile creation with full name and avatar support
- Automatic profile creation via database triggers

### Content Management (Dashboard)

- Create, edit, and delete blog posts
- Rich post editor with title, content, excerpt, and featured images
- Post status management (draft, published, archived)
- Real-time search and filtering by title/content
- Status-based filtering (published, draft, archived)
- View count tracking for each post
- Author information display with profile data
- Responsive data tables with sorting

### Public Blog Interface

- Browse all published posts
- Search articles by title or content
- Individual post pages with full content
- Post metadata (author, date, reading time, views)
- Responsive grid layout for post cards
- SEO-optimized with metadata
- Featured images with lazy loading

### Technical Features

- Server-side rendering (SSR) for optimal performance
- URL-based filtering and search (shareable links)
- Debounced search for better UX
- Dark/Light theme support
- Responsive design for all devices
- Loading skeletons and error states
- Type-safe API calls with TypeScript

---

## 🛠️ Technology Stack

### Core Framework

- **Next.js 16.1.1** - React framework with App Router
- **React 19.2.3** - UI library
- **TypeScript 5** - Type safety

### Backend & Database

- **Supabase** - Backend-as-a-Service
  - `@supabase/supabase-js` (2.90.1) - Supabase client
  - `@supabase/ssr` (0.8.0) - Server-side rendering support
  - PostgreSQL database with Row Level Security (RLS)
  - Real-time subscriptions
  - Authentication and user management

### State Management & Data Fetching

- **@tanstack/react-query** (5.90.17) - Server state management
- **@reduxjs/toolkit** (2.11.2) - Client state management
- **react-redux** (9.2.0) - Redux bindings for React

### UI & Styling

- **Tailwind CSS 4** - Utility-first CSS framework
- **shadcn/ui** - Reusable component library
- **Radix UI** - Accessible component primitives
  - `@radix-ui/react-slot`
  - `@base-ui/react`
- **lucide-react** (0.562.0) - Icon library
- **next-themes** (0.4.6) - Theme management
- **class-variance-authority** - Variant management
- **clsx** & **tailwind-merge** - Class name utilities

### Form Management & Validation

- **react-hook-form** (7.71.1) - Form state management
- **@hookform/resolvers** (5.2.2) - Form validation resolvers
- **zod** (4.3.5) - Schema validation

### Utilities

- **use-debounce** (10.1.0) - Debounced values and callbacks
- **sonner** (2.0.7) - Toast notifications
- **tw-animate-css** (1.4.0) - Animation utilities

### Development Tools

- **ESLint** - Code linting
- **eslint-config-next** - Next.js ESLint configuration
- **@tailwindcss/postcss** - PostCSS support for Tailwind

---

## 📁 Project Structure

```
blog-app/
├── app/                          # Next.js App Router pages
│   ├── (auth)/                   # Authentication routes (grouped)
│   │   ├── login/               # Login page
│   │   ├── register/            # Registration page
│   │   └── layout.tsx           # Auth layout
│   ├── (panel)/                 # Dashboard routes (grouped)
│   │   ├── dashboard/           # Dashboard home
│   │   ├── posts/               # Posts management
│   │   │   ├── [id]/edit/      # Edit post page
│   │   │   ├── create/         # Create post page
│   │   │   └── page.tsx        # Posts list
│   │   └── layout.tsx           # Panel layout with sidebar
│   ├── auth/                    # Auth callbacks
│   │   └── callback/           # OAuth callback handler
│   ├── blog/                    # Public blog
│   │   ├── [slug]/             # Individual blog post
│   │   ├── layout.tsx          # Blog layout
│   │   └── page.tsx            # Blog listing page
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Home page
│   └── globals.css              # Global styles
│
├── src/
│   ├── config/                  # Configuration files
│   │   ├── menu.ts             # Navigation menu config
│   │   ├── routes.ts           # Route definitions
│   │   └── site.ts             # Site metadata
│   │
│   ├── constants/               # App constants
│   │   └── supabase.ts         # Supabase constants
│   │
│   ├── features/                # Feature-based modules
│   │   ├── auth/               # Authentication feature
│   │   │   ├── api/            # Auth API layer
│   │   │   │   ├── auth.actions.ts   # Server actions
│   │   │   │   ├── auth.client.ts    # Client utilities
│   │   │   │   └── auth.server.ts    # Server utilities
│   │   │   ├── components/     # Auth components
│   │   │   │   ├── LoginForm.tsx
│   │   │   │   ├── RegisterForm.tsx
│   │   │   │   └── LogoutButton.tsx
│   │   │   ├── hooks/          # Auth hooks
│   │   │   │   ├── useAuth.ts
│   │   │   │   ├── useLogin.ts
│   │   │   │   ├── useRegister.ts
│   │   │   │   └── useLogout.ts
│   │   │   ├── utils/          # Auth utilities
│   │   │   │   └── validation.ts
│   │   │   └── index.ts        # Public exports
│   │   │
│   │   ├── panel/              # Dashboard features
│   │   │   └── post/           # Post management feature
│   │   │       ├── api/        # Post API layer
│   │   │       │   ├── post.actions.ts   # CRUD actions
│   │   │       │   └── post.server.ts    # Server queries
│   │   │       ├── components/ # Post components
│   │   │       │   ├── PostForm.tsx
│   │   │       │   ├── PostCard.tsx
│   │   │       │   ├── PostList.tsx
│   │   │       │   ├── CreatePostButton.tsx
│   │   │       │   ├── EditPostButton.tsx
│   │   │       │   ├── DeletePostButton.tsx
│   │   │       │   └── PostsFilterToolbar.tsx
│   │   │       ├── hooks/      # Post hooks
│   │   │       ├── types/      # Post types
│   │   │       │   └── post.types.ts
│   │   │       ├── utils/      # Post utilities
│   │   │       │   └── validation.ts
│   │   │       └── index.ts    # Public exports
│   │   │
│   │   ├── public/             # Public-facing features
│   │   │   └── blog/           # Public blog feature
│   │   │       └── components/ # Blog components
│   │   │           ├── BlogPostCard.tsx
│   │   │           ├── BlogPostList.tsx
│   │   │           └── BlogFilterToolbar.tsx
│   │   │
│   │   └── shared/             # Shared features
│   │       └── components/     # Reusable components
│   │           ├── auth/       # Auth components
│   │           │   └── ProtectedRoute.tsx
│   │           ├── layout/     # Layout components
│   │           │   ├── AppBar.tsx
│   │           │   ├── PublicHeader.tsx
│   │           │   ├── PublicFooter.tsx
│   │           │   ├── UnifiedSidebar.tsx
│   │           │   └── index.ts
│   │           ├── providers/  # Context providers
│   │           │   └── theme-provider.tsx
│   │           ├── ui/         # UI components
│   │           │   ├── empty-state.tsx
│   │           │   ├── error-state.tsx
│   │           │   ├── loading-skeleton.tsx
│   │           │   └── theme-toggle.tsx
│   │           ├── DataTable.tsx
│   │           ├── FilterToolbar.tsx
│   │           └── TableSkeleton.tsx
│   │
│   ├── lib/                     # Shared libraries
│   │   └── supabase/           # Supabase utilities
│   │       ├── client.ts       # Browser client
│   │       ├── server.ts       # Server client
│   │       ├── middleware.ts   # Auth middleware
│   │       └── README.md       # Supabase docs
│   │
│   ├── store/                   # Redux store
│   │   ├── index.ts            # Store configuration
│   │   ├── hooks.ts            # Typed hooks
│   │   ├── slices/             # Redux slices
│   │   │   └── authSlice.ts
│   │   └── README.md
│   │
│   └── providers.tsx            # App providers wrapper
│
├── components/                  # shadcn/ui components
│   └── ui/                      # UI primitives
│       ├── button.tsx
│       ├── card.tsx
│       ├── form.tsx
│       ├── input.tsx
│       ├── select.tsx
│       ├── separator.tsx
│       ├── tabs.tsx
│       ├── badge.tsx
│       └── ... (other UI components)
│
├── hooks/                       # Custom hooks
│   └── use-mobile.ts           # Mobile detection hook
│
├── lib/                         # Utilities
│   └── utils.ts                # Utility functions
│
├── public/                      # Static assets
│
├── .env.local                   # Environment variables (create this)
├── components.json              # shadcn/ui config
├── eslint.config.mjs           # ESLint config
├── next.config.ts              # Next.js config
├── package.json                # Dependencies
├── pnpm-lock.yaml              # Lock file
├── postcss.config.mjs          # PostCSS config
├── tsconfig.json               # TypeScript config
└── README.md                    # This file
```

---

## 🗄️ Database Schema

### Tables

#### `profiles`

```sql
create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  avatar_url text,
  username text,
  created_at timestamptz default now()
);
```

#### `posts`

```sql
create table posts (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  slug text unique not null,
  content text not null,
  excerpt text,
  featured_image text,
  status text not null default 'draft',
  published_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  author_id uuid references profiles(id) on delete set null,
  view_count integer default 0
);
```

### Database Triggers

#### Auto-create profile on user signup

```sql
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (
    new.id,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();
```

#### Increment post view count

```sql
create or replace function increment_post_views(post_id uuid)
returns void as $$
begin
  update posts
  set view_count = view_count + 1
  where id = post_id;
end;
$$ language plpgsql security definer;
```

### Foreign Key Relationships

- `posts.author_id` → `profiles.id` (required for profile join in queries)

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or higher
- pnpm (recommended) / npm / yarn
- Supabase account

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd blog-app
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Set up Supabase**

   - Create a new project on [Supabase](https://supabase.com)
   - Run the SQL commands from the Database Schema section above
   - Set up Row Level Security (RLS) policies as needed

4. **Configure environment variables**

   Create a `.env.local` file in the root directory:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

5. **Run the development server**

   ```bash
   pnpm dev
   # or
   npm run dev
   ```

6. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 📝 Available Scripts

```bash
# Development
pnpm dev          # Start development server

# Production
pnpm build        # Build for production
pnpm start        # Start production server

# Linting
pnpm lint         # Run ESLint
```

---

## 🎨 Key Features & Patterns

### Feature-Based Architecture

The project follows a **feature-based architecture** where each feature is self-contained with its own:

- API layer (server actions, client utilities)
- Components (UI elements)
- Hooks (React hooks for state/logic)
- Types (TypeScript definitions)
- Utilities (helper functions)

### Server Components by Default

- Most pages and layouts are **React Server Components** for optimal performance
- Client components are marked with `'use client'` directive
- Data fetching happens on the server using async/await

### URL-Based Filtering

- Search and filter states are stored in URL search params
- Shareable URLs with active filters
- Back/forward browser navigation works seamlessly
- Debounced search for performance

### Type Safety

- Full TypeScript coverage
- Zod schemas for runtime validation
- Type-safe API calls with inferred types
- Strict null checks enabled

### Authentication Flow

1. User registers with email/password and full name
2. Supabase Auth creates user account
3. Database trigger creates profile entry
4. User can log in and access dashboard
5. Protected routes redirect unauthenticated users

### Data Flow

```
User Action → Server Action → Supabase → Database
                  ↓
            Revalidate Cache
                  ↓
            Re-render UI
```

---

## 🔐 Authentication

### Routes

- `/login` - Login page
- `/register` - Registration page
- `/dashboard` - Protected dashboard (requires auth)
- `/posts` - Protected posts management (requires auth)

### Protected Routes

The `ProtectedRoute` component handles authentication checks:

- `mode="auth"` - Redirects authenticated users away (login/register pages)
- `mode="panel"` - Redirects unauthenticated users to login (dashboard pages)

---

## 🎯 Filtering & Search

### Dashboard Posts (`/posts`)

- **Search**: Search by post title or content (debounced, 500ms)
- **Status Filter**: Filter by draft, published, or archived
- URL format: `/posts?search=keyword&status=published`

### Public Blog (`/blog`)

- **Search**: Search published posts by title or content
- URL format: `/blog?search=keyword`

### FilterToolbar Component

Reusable compound component for building filter UIs:

```tsx
<FilterToolbar>
  <FilterToolbar.Search paramName="search" placeholder="Search..." />
  <FilterToolbar.Select paramName="status" options={[...]} />
  <FilterToolbar.DateInput paramName="date" />
  <FilterToolbar.Input paramName="custom" />
</FilterToolbar>
```

---

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables
4. Deploy

### Other Platforms

The app can be deployed to any platform that supports Next.js:

- Netlify
- AWS Amplify
- Railway
- Self-hosted with Docker

---

## 📚 Learn More

### Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [React Query Documentation](https://tanstack.com/query/latest)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

### Key Concepts

- **App Router**: Next.js 13+ routing system
- **Server Components**: React components that run on the server
- **Server Actions**: Functions that run on the server
- **Supabase RLS**: Row Level Security for database access control

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 📄 License

This project is licensed under the MIT License.

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org) - React framework
- [Supabase](https://supabase.com) - Backend platform
- [shadcn/ui](https://ui.shadcn.com) - Component library
- [Vercel](https://vercel.com) - Hosting platform

---

**Built with ❤️ using Next.js 16 and Supabase**
