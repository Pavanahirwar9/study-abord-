// src/app/page.tsx
import { redirect } from "next/navigation";

/**
 * Root page — redirects visitors to the dashboard.
 * Middleware will further redirect to /login if not authenticated.
 */
export default function Home() {
  redirect("/dashboard");
}
