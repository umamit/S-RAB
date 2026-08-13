import type { StateCreator } from "zustand";
import type { RABState, User } from "./types";
import { supabase } from "../supabaseClient";

const simpleHash = (str: string): string => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(36);
};

export { simpleHash };

export const createAuthActions = (
  set: Parameters<StateCreator<RABState>>[0],
  get: Parameters<StateCreator<RABState>>[1]
): Pick<RABState, "registerUser" | "loginUser" | "logoutUser"> => ({

  registerUser: async (email, name, passwordPlain) => {
    const emailLower = email.trim().toLowerCase();
    if (!emailLower || !name.trim() || !passwordPlain) {
      return { success: false, error: "Semua kolom wajib diisi." };
    }
    if (!/^[^@]+@[^@]+\.[^@]+$/.test(emailLower)) {
      return { success: false, error: "Format email tidak valid." };
    }
    if (passwordPlain.length < 6) {
      return { success: false, error: "Password minimal 6 karakter." };
    }

    const { data, error } = await supabase.auth.signUp({
      email: emailLower,
      password: passwordPlain,
      options: {
        data: {
          display_name: name.trim(),
        },
      },
    });

    if (error) {
      return { success: false, error: error.message };
    }

    if (data.user) {
      const newUser: User = {
        id: data.user.id,
        email: emailLower,
        name: name.trim(),
        passwordHash: "",
      };
      set({ currentUser: newUser });
    }

    return { success: true };
  },

  loginUser: async (email, passwordPlain) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim().toLowerCase(),
      password: passwordPlain,
    });

    if (error) {
      return { success: false, error: error.message };
    }

    if (data.user) {
      const name = data.user.user_metadata?.display_name || data.user.email?.split("@")[0] || "User";
      const loggedUser: User = {
        id: data.user.id,
        email: data.user.email || "",
        name,
        passwordHash: "",
      };

      set({ currentUser: loggedUser });
      // The onAuthStateChange listener in page.tsx will fetch, seed, and populate projects
    }

    return { success: true };
  },

  logoutUser: async () => {
    await supabase.auth.signOut();
    set({ currentUser: null, activeProjectId: null, projects: [] });
  },
});
