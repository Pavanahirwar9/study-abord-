// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ThemeRegistry from "./ThemeRegistry";
import AuthSessionProvider from "./AuthSessionProvider";
import { Toaster } from "react-hot-toast";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Help Study Abroad — Admin Dashboard",
  description:
    "A modern admin dashboard for managing users and products, built with Next.js, MUI, and Zustand.",
  keywords: ["study abroad", "admin", "dashboard", "management"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
      </head>
      <body>
        <AuthSessionProvider>
          <ThemeRegistry>
            {children}
            {/* Toast notifications — position top-right per Step 6 */}
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  borderRadius: "12px",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
                  fontFamily: "Inter, sans-serif",
                  fontSize: "0.875rem",
                },
                success: {
                  iconTheme: { primary: "#10B981", secondary: "#fff" },
                },
                error: {
                  iconTheme: { primary: "#EF4444", secondary: "#fff" },
                },
              }}
            />
          </ThemeRegistry>
        </AuthSessionProvider>
      </body>
    </html>
  );
}
