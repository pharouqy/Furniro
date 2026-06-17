import { create } from "zustand";
import { persist } from "zustand/middleware";
import { api } from "@/common/utils/api";

export const useAuthStore = create(
  persist(
    (set, get) => ({
      token: null,
      user: null,

      login: async (email, password) => {
        const res = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Login failed");
        set({ token: data.token, user: data.user });
        return data;
      },

      register: async (name, email, password) => {
        const res = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Registration failed");
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
