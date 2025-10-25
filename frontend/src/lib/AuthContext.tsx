'use client';

/**
 * Authentication Context Provider
 *
 * This context manages the authentication state across the application.
 * It provides user information and authentication methods to all child components.
 */

import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  User,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  UserCredential,
} from 'firebase/auth';
import { auth } from './firebase';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<UserCredential>;
  signup: (email: string, password: string) => Promise<UserCredential>;
  logout: () => Promise<void>;
}

// Dev bypass flag and mock user (module-level to avoid hook dependency warnings)
const SKIP_AUTH = process.env.NEXT_PUBLIC_SKIP_AUTH === 'true';
const mockUser = {
  uid: 'dev',
  email: 'dev@local',
  displayName: 'Developer',
} as unknown as User;

// Create the authentication context
const AuthContext = createContext<AuthContextType>({} as AuthContextType);

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Auth Provider Component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Dev bypass: when NEXT_PUBLIC_SKIP_AUTH is set to 'true' the app will use a
  // mocked user so you can view the dashboard UI without connecting to Firebase.
  const SKIP_AUTH = process.env.NEXT_PUBLIC_SKIP_AUTH === 'true';
  const mockUser = {
    uid: 'dev',
    email: 'dev@local',
    displayName: 'Developer',
  } as unknown as User;

  // Monitor authentication state changes
  // We intentionally omit `mockUser` from the deps because it's a constant used only
  // for the development bypass. Disable the exhaustive-deps rule for this effect.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (SKIP_AUTH) {
      // Immediately set a mocked authenticated user for local development
      setUser(mockUser);
      setLoading(false);
      // eslint-disable-next-line no-console
      console.warn('[Auth] NEXT_PUBLIC_SKIP_AUTH=true — using mocked dev user');
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, [SKIP_AUTH]);

  // Login function
  const login = async (email: string, password: string): Promise<UserCredential> => {
    try {
      if (SKIP_AUTH) {
        // Short-circuit for dev: pretend login succeeded
        setUser(mockUser);
        toast.success('Welcome (dev)!');
        router.push('/dashboard');
        // Return a minimal UserCredential-like object
        return Promise.resolve({ user: mockUser } as unknown as UserCredential);
      }

      const result = await signInWithEmailAndPassword(auth, email, password);
      toast.success('Welcome back!');
      router.push('/dashboard');
      return result;
    } catch (error: any) {
      toast.error(error.message || 'Failed to login');
      throw error;
    }
  };

  // Signup function
  const signup = async (email: string, password: string): Promise<UserCredential> => {
    try {
      if (SKIP_AUTH) {
        // Short-circuit for dev: pretend signup succeeded
        setUser(mockUser);
        toast.success('Account created (dev)!');
        router.push('/dashboard');
        return Promise.resolve({ user: mockUser } as unknown as UserCredential);
      }

      const result = await createUserWithEmailAndPassword(auth, email, password);
      toast.success('Account created successfully!');
      router.push('/dashboard');
      return result;
    } catch (error: any) {
      toast.error(error.message || 'Failed to create account');
      throw error;
    }
  };

  // Logout function
  const logout = async (): Promise<void> => {
    try {
      if (SKIP_AUTH) {
        setUser(null);
        toast.success('Logged out (dev)');
        router.push('/login');
        return Promise.resolve();
      }

      await signOut(auth);
      toast.success('Logged out successfully');
      router.push('/login');
    } catch (error: any) {
      toast.error(error.message || 'Failed to logout');
      throw error;
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    login,
    signup,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
