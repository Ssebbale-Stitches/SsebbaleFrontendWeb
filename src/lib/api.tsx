// src/lib/api.ts
const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api/auth";

interface ApiError {
  detail?: string;
  [field: string]: unknown;
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const err = data as ApiError;
    const message =
      err.detail ||
      (Object.values(err)[0] as string[] | undefined)?.[0] ||
      "Something went wrong. Please try again.";
    throw new Error(message);
  }

  return data as T;
}

export interface AuthTokens {
  access: string;
  refresh: string;
}

export interface AuthUser {
  id: number;
  full_name: string;
  email: string;
  phone: string;
  is_tailor: boolean;
  is_email_verified: boolean;
  date_joined: string;
}

export const authApi = {
  signup: (data: { full_name: string; email: string; phone: string; password: string }) =>
    request<{ message: string; email: string }>("/signup/", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  verifyEmail: (data: { email: string; code: string }) =>
    request<AuthTokens & { message: string; user: AuthUser }>("/verify-email/", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  resendOtp: (data: { email: string; purpose: "signup" | "reset" }) =>
    request<{ message: string }>("/resend-otp/", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  login: (data: { email: string; password: string }) =>
    request<AuthTokens & { user: AuthUser }>("/login/", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  forgotPassword: (data: { email: string }) =>
    request<{ message: string }>("/forgot-password/", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  resetPassword: (data: { email: string; code: string; new_password: string }) =>
    request<{ message: string }>("/reset-password/", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  me: (accessToken: string) =>
    request<AuthUser>("/me/", {
      headers: { Authorization: `Bearer ${accessToken}` },
    }),
};

// --- very small auth-state helper (swap for context/zustand later if you like) ---
const TOKENS_KEY = "ssebbale_tokens";
const USER_KEY = "ssebbale_user";

export function saveSession(tokens: AuthTokens, user: AuthUser) {
  localStorage.setItem(TOKENS_KEY, JSON.stringify(tokens));
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function getTokens(): AuthTokens | null {
  const raw = localStorage.getItem(TOKENS_KEY);
  return raw ? JSON.parse(raw) : null;
}

export function getStoredUser(): AuthUser | null {
  const raw = localStorage.getItem(USER_KEY);
  return raw ? JSON.parse(raw) : null;
}

export function clearSession() {
  localStorage.removeItem(TOKENS_KEY);
  localStorage.removeItem(USER_KEY);
}