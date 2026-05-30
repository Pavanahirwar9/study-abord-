# 🚀 Help Study Abroad — Admin Dashboard

# Modern Full-Featured Admin Dashboard built for Frontend Technical Assessment

A responsive and production-ready admin dashboard developed using **Next.js 14 App Router**, **TypeScript**, **Material UI**, **Zustand**, and **NextAuth** with real API integration using **DummyJSON**.

---

# ✨ Live Features

✅ Secure Authentication with NextAuth
✅ Protected Dashboard Routes
✅ Zustand Global State Management
✅ Users Management Module
✅ Products Management Module
✅ Search + Pagination + Category Filtering
✅ Responsive Dashboard Layout
✅ Skeleton Loading States
✅ Toast Notifications
✅ Client-side Caching
✅ React Performance Optimizations
✅ Clean & Scalable Folder Structure

---

# 📸 Application Screens

| Page               | Description                              |
| ------------------ | ---------------------------------------- |
| 🔐 Login Page      | Secure admin login with validation       |
| 📊 Dashboard       | Admin overview and statistics            |
| 👥 Users Module    | Searchable and paginated users list      |
| 👤 User Details    | Full user profile information            |
| 🛍 Products Module | Product grid with filters and pagination |
| 📦 Product Details | Detailed product information page        |

---

# 🛠 Tech Stack

| Category         | Technology              |
| ---------------- | ----------------------- |
| Framework        | Next.js 14 (App Router) |
| Language         | TypeScript              |
| UI Library       | Material UI (MUI)       |
| State Management | Zustand                 |
| Authentication   | NextAuth.js             |
| API Client       | Axios                   |
| Notifications    | react-hot-toast         |
| Backend API      | DummyJSON               |

---

# ⚡ Key Technical Highlights

### 🔐 Authentication System

* NextAuth Credentials Provider
* JWT-based session handling
* Protected routes using middleware
* Zustand persisted auth store

### 👥 Users Management

* API-side pagination
* Debounced search
* Responsive MUI Table
* Dynamic user detail pages

### 🛍 Products Management

* Product search functionality
* Category filtering
* Responsive grid layout
* Dynamic product detail pages

### 🚀 Performance Optimization

* React.memo
* useCallback
* useMemo
* Zustand caching
* Debounced API requests

### 📱 Responsive UI/UX

* Mobile responsive sidebar drawer
* Tablet and desktop optimized layouts
* Skeleton loading states
* Toast notifications
* Modern MUI design system

---

# 📂 Project Structure

```bash
src/
 ├── app/
 ├── components/
 ├── store/
 ├── services/
 ├── lib/
 ├── types/
 └── middleware.ts
```

---

# 🔑 Demo Credentials

```bash
Username: emilys
Password: emilyspass
```

---

# ⚙️ Setup Instructions

## 1️⃣ Install Dependencies

```bash
npm install
```

## 2️⃣ Configure Environment Variables

Create `.env.local`

```env
NEXTAUTH_SECRET=your_secret_key
NEXTAUTH_URL=http://localhost:3000
```

## 3️⃣ Run Development Server

```bash
npm run dev
```

Open:

```bash
http://localhost:3000
```

---

# 🧠 Why Zustand?

Zustand was chosen because:

* Minimal boilerplate
* Lightweight and fast
* Easy async state management
* Built-in persist middleware
* Simpler than Redux for medium-scale apps

---

# ⚡ Caching Strategy

Implemented client-side caching using Zustand stores.

Benefits:

* Faster page revisits
* Reduced API calls
* Better user experience
* Improved application performance

---

# 🔒 Authentication Flow

```bash
Login → NextAuth → JWT Session → Zustand Persist → Protected Dashboard
```

---

# ✅ Assignment Requirements Covered

| Requirement              | Status |
| ------------------------ | ------ |
| Authentication           | ✅      |
| Protected Routes         | ✅      |
| Zustand State Management | ✅      |
| Users Module             | ✅      |
| Products Module          | ✅      |
| Search & Pagination      | ✅      |
| Category Filter          | ✅      |
| Responsive UI            | ✅      |
| Performance Optimization | ✅      |
| Client-side Caching      | ✅      |
| Documentation            | ✅      |

---

# 🧪 Validation Checklist

✅ `npm run lint` passes
✅ `npm run build` passes
✅ No TypeScript errors
✅ Responsive on mobile/tablet/desktop
✅ No console errors

---

# 👨‍💻 Developer

Built as part of the **Help Study Abroad Frontend Technical Assessment** using modern frontend development practices.

If you like this project, feel free to ⭐ the repository.
