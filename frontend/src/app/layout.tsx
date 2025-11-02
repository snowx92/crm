/**
 * Root Layout Component
 *
 * This is the main layout wrapper for the entire application.
 * It includes global styles, font configuration, and context providers.
 */

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/lib/AuthContext';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Omena Agency CRM',
  description: 'Customer Relationship Management System for Omena Agency',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: '#272860',
                color: '#fff',
                borderRadius: '10px',
                padding: '16px',
              },
              success: {
                iconTheme: {
                  primary: '#f8c800',
                  secondary: '#fff',
                },
              },
            }}
          />
        </AuthProvider>
      </body>
    </html>
  );
}
