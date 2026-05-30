study abord
### Installation & Run Commands


Open [http://localhost:3000](http://localhost:3000) in your browser.
setup

npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint validation
```
## Screenshots

<img width="1519" height="768" alt="image" src="https://github.com/user-attachments/assets/54c859a0-e827-44a3-967d-d075ec76413b" />
<img width="1885" height="757" alt="image" src="https://github.com/user-attachments/assets/09d9f421-db53-421c-9854-f767d62fafdf" />

<img width="1913" height="813" alt="image" src="https://github.com/user-attachments/assets/45f31c4d-44a6-4bb3-b738-ce5c1318effc" />
<img width="1896" height="794" alt="image" src="https://github.com/user-attachments/assets/966f833d-bb06-4fda-bb92-cbccf8e74307" />
<img width="1915" height="726" alt="image" src="https://github.com/user-attachments/assets/52032b63-d00d-4c02-a1d6-8840a8b5bed2" />


> Run the app locally (`npm run dev`) to see the UI in action.
>
> Key screens:
> - **Login Page** — `/login` — centered card with username/password and demo credentials
> - **Dashboard** — `/dashboard` — welcome greeting with stats cards
> - **Users Page** — `/users` — searchable table/card list with pagination
> - **User Detail** — `/users/[id]` — full profile with contact, company, education
> - **Products Page** — `/products` — searchable grid with category filter
> - **Product Detail** — `/products/[id]` — image gallery, pricing, stock, reviews

---

## Features

- ✅ **Authentication** — NextAuth Credentials Provider → DummyJSON API
- ✅ **Route Protection** — Middleware guards all private routes
- ✅ **Users Module** — Search, paginate, view details
- ✅ **Products Module** — Search, category filter, paginate, view details
- ✅ **Responsive Design** — Mobile drawer, tablet grid, desktop sidebar
- ✅ **Skeleton Loaders** — Smooth loading states throughout
- ✅ **Toast Notifications** — Success/error feedback with react-hot-toast
- ✅ **Zustand Caching** — Avoid redundant API calls
- ✅ **React Optimizations** — memo, useCallback, useMemo
- ✅ **TypeScript** — Strict types across all files

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14+ (App Router) |
| Language | TypeScript |
| UI Library | Material UI (MUI) v5 |
| State Management | Zustand (with persist middleware) |
| Authentication | NextAuth.js v4 |
| HTTP Client | Axios |
| Notifications | react-hot-toast |
| API Source | DummyJSON (https://dummyjson.com) |

---

## Setup Instructions

### Prerequisites

- Node.js 18+
- npm 9+



## Demo Credentials

```
Username: emilys
Password: emilyspass
```

---

## Folder Structure

```
src/
 ├── app/                        # Next.js App Router
 │   ├── (auth)/login/           # Login page
 │   ├── (dashboard)/            # Protected dashboard route group
 │   │   ├── dashboard/          # Overview page
 │   │   ├── users/              # Users list + [id] detail
 │   │   └── products/           # Products list + [id] detail
 │   ├── api/auth/[...nextauth]/ # NextAuth route handler
 │   ├── layout.tsx              # Root layout (ThemeProvider, SessionProvider, Toaster)
 │   └── page.tsx                # Redirect to /dashboard
 │
 ├── components/
 │   ├── common/                 # SkeletonLoader, ErrorAlert, EmptyState
 │   ├── dashboard/              # StatCard
 │   ├── layout/                 # DashboardLayout, Sidebar
 │   ├── users/                  # UserTable, UserCard
 │   └── products/               # ProductCard, ProductGrid
 │
 ├── store/
 │   ├── authStore.ts            # Auth state (persisted)
 │   ├── userStore.ts            # Users state + cache
 │   └── productStore.ts         # Products state + cache
 │
 ├── services/
 │   ├── api.ts                  # Axios instance with interceptors
 │   ├── authService.ts          # Login API call
 │   ├── userService.ts          # Users API calls
 │   └── productService.ts       # Products API calls
 │
 ├── lib/
 │   ├── theme.ts                # MUI custom theme
 │   ├── useDebounce.ts          # Debounce hook for search
 │   └── formatters.ts           # Currency, date, rating formatters
 │
 ├── types/
 │   ├── auth.ts                 # NextAuth type extensions
 │   ├── user.ts                 # DummyUser interface
 │   └── product.ts              # DummyProduct interface
 │
 └── middleware.ts               # Route protection
```

---

## Why Zustand?

Zustand was chosen over Redux for this project because:

1. **No boilerplate** — No actions, action types, reducers, or dispatch. Just a `create()` call with state + functions.
2. **Small bundle size** — ~1KB gzipped vs Redux Toolkit at ~8KB+.
3. **Simple async** — Async functions live directly in the store alongside state.
4. **No Provider needed** — Zustand stores are accessible anywhere without wrapping the tree (unlike Context/Redux).
5. **Built-in persistence** — The `persist` middleware handles localStorage sync automatically.

```ts
// Redux would require: slice, actions, reducers, dispatch, useSelector, useDispatch
// Zustand:
const useStore = create(persist((set) => ({
  token: null,
  setAuth: (token, user) => set({ token, user }),
}), { name: "auth-storage" }));
```

---

## Caching Explanation

Both `userStore` and `productStore` maintain a `cache` object keyed by query string:

```ts
const cacheKey = `list-${limit}-${skip}`;

// Cache HIT → return instantly, no API call needed
if (cache[cacheKey]) {
  set({ users: cache[cacheKey].users });
  return;
}

// Cache MISS → fetch, then store in cache for next time
const data = await getUsers(limit, skip);
set({ users: data.users, cache: { ...cache, [cacheKey]: data } });
```

**Benefits:**
- Revisiting page 1 after going to page 2 is instant — no loading spinner.
- Search results for the same query are cached — no duplicate API calls.
- Reduces server load and improves perceived performance.

---

## Authentication Flow

```
1. User visits /dashboard (or any protected route)
   ↓
2. middleware.ts checks for NextAuth JWT session
   ↓
3. No session → redirect to /login
   ↓
4. User fills login form → signIn("credentials", { username, password })
   ↓
5. NextAuth calls DummyJSON POST /auth/login
   ↓
6. Success → JWT created, Zustand authStore updated, persisted to localStorage
   ↓
7. User redirected to /dashboard
   ↓
8. Logout → clearAuth() + signOut() → redirect to /login
```

---

## Testing Checklist

Before submission, verify:

- ✅ Login works (`emilys` / `emilyspass`)
- ✅ Logout works (clears store + session)
- ✅ Pagination works (Users and Products)
- ✅ Search works (debounced, both modules)
- ✅ Product category filter works
- ✅ User detail page works (`/users/[id]`)
- ✅ Product detail page works (`/products/[id]`)
- ✅ Protected routes redirect to login when unauthenticated
- ✅ Mobile responsive (hamburger menu, card layout)
- ✅ Skeleton loaders appear during loading
- ✅ Toast notifications on login success/failure
- ✅ Empty state shown when no results
