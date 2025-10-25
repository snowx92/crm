/**
 * Backend API Client
 * Handles all communication with the Express backend
 */

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000/api/v1';

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}

/**
 * Make a request to the backend API
 */
async function backendRequest<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const url = `${BACKEND_URL}${endpoint}`;

    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.error || 'Request failed',
        message: data.message || 'An error occurred',
      };
    }

    return data;
  } catch (error: any) {
    console.error('Backend API error:', error);
    return {
      success: false,
      error: 'Network error',
      message: error.message || 'Failed to connect to backend',
    };
  }
}

/**
 * Backend API methods
 */
export const backendApi = {
  /**
   * Signup - Create new user account
   */
  signup: async (data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phoneNumber?: string;
    company?: string;
  }) => {
    return backendRequest('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  /**
   * Login - Authenticate user with ID token
   */
  login: async (data: { email: string; idToken: string }) => {
    return backendRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  /**
   * Refresh Token - Get new custom token
   */
  refreshToken: async (idToken: string) => {
    return backendRequest('/auth/refresh-token', {
      method: 'POST',
      body: JSON.stringify({ idToken }),
    });
  },

  /**
   * Get Profile - Retrieve user profile
   */
  getProfile: async (idToken: string) => {
    return backendRequest('/auth/profile', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    });
  },

  /**
   * Update Profile - Update user profile
   */
  updateProfile: async (idToken: string, data: any) => {
    return backendRequest('/auth/profile', {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
      body: JSON.stringify(data),
    });
  },

  /**
   * Reset Password - Send password reset email
   */
  resetPassword: async (email: string) => {
    return backendRequest('/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  },

  /**
   * Verify Email - Send email verification
   */
  verifyEmail: async (idToken: string) => {
    return backendRequest('/auth/verify-email', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    });
  },

  /**
   * Logout - Revoke refresh tokens
   */
  logout: async (idToken: string) => {
    return backendRequest('/auth/logout', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    });
  },

  /**
   * Delete Account - Permanently delete user account
   */
  deleteAccount: async (idToken: string) => {
    return backendRequest('/auth/account', {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    });
  },
};
