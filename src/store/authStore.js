import { create } from "zustand";
import { persist } from "zustand/middleware";

const BASE_URL = import.meta.env.VITE_API_URL || "/api";

async function authRequest(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  const text = await res.text();
  const data = text ? JSON.parse(text) : {};
  if (!res.ok) throw new Error(data.error || `Request failed (${res.status})`);
  return data;
}

export const useAuthStore = create(
  persist(
    (set) => ({
      token: null,
      user: null,

      login: async (email, password) => {
        const data = await authRequest("/auth/login", {
          method: "POST",
          body: JSON.stringify({ email, password }),
        });
        set({ token: data.token, user: data.user });
        return data;
      },

      register: async (name, email, password) => {
        const data = await authRequest("/auth/register", {
          method: "POST",
          body: JSON.stringify({ name, email, password }),
        });
        set({ token: data.token, user: data.user });
        return data;
      },

      logout: () => {
        set({ token: null, user: null });
      },
    }),
    { name: "furniro-auth" }
  )
);
