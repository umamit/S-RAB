import type { StateCreator } from "zustand";
import type { RABState, User } from "./types";

// ============================================================
// Auth Actions — register, login, logout
// ============================================================
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

  registerUser: (email, name, passwordPlain) => {
    const { users } = get();
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
    if (users.find((u) => u.email.toLowerCase() === emailLower)) {
      return { success: false, error: "Email sudah terdaftar. Silakan masuk." };
    }
    const newUser: User = {
      id: `user-${Date.now()}`,
      email: emailLower,
      name: name.trim(),
      passwordHash: simpleHash(passwordPlain),
    };
    set((state) => ({ users: [...state.users, newUser], currentUser: newUser }));
    return { success: true };
  },

  loginUser: (email, passwordPlain) => {
    const { users } = get();
    const emailLower = email.trim().toLowerCase();
    const found = users.find((u) => u.email.toLowerCase() === emailLower);
    if (!found) {
      return { success: false, error: "Email tidak ditemukan. Daftar akun baru terlebih dahulu." };
    }
    if (found.passwordHash !== simpleHash(passwordPlain)) {
      return { success: false, error: "Password salah. Periksa kembali." };
    }
    set({ currentUser: found, activeProjectId: null });
    return { success: true };
  },

  logoutUser: () => {
    set({ currentUser: null, activeProjectId: null });
  },
});
