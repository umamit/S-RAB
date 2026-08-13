"use client";
import React, { useState } from "react";
import { Eye, EyeOff, LogIn, UserPlus } from "lucide-react";

interface LoginFormProps {
  mode: "login" | "register";
  onSubmit: (data: { name: string; email: string; password: string }) => Promise<void>;
  error: string;
}

export default function LoginForm({ mode, onSubmit, error }: LoginFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await onSubmit({ name, email, password });
    setLoading(false);
  };

  const mkInp = (id: string, label: string, type: string, val: string, setVal: (v: string) => void, ph: string) => (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={val}
        onChange={(e) => setVal(e.target.value)}
        placeholder={ph}
        required
        className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-50 transition-all"
      />
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="p-8 space-y-5">
      {mode === "register" && mkInp("reg-name", "Nama Lengkap", "text", name, setName, "contoh: Budi Santoso")}
      
      {mkInp("login-email", "Alamat Email", "email", email, setEmail, "nama@email.com")}

      <div className="space-y-1.5">
        <label htmlFor="login-pass" className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
          Password
        </label>
        <div className="relative">
          <input
            id="login-pass"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={mode === "register" ? "Minimal 6 karakter" : "Masukkan password Anda"}
            required
            minLength={6}
            className="w-full px-4 py-3 pr-12 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-50 transition-all"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 transition-colors"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-805 rounded-xl px-4 py-3">
          <p className="text-xs text-red-600 dark:text-red-400 font-medium">{error}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-50 dark:hover:bg-zinc-200 text-white dark:text-zinc-900 font-bold py-3.5 rounded-xl text-sm transition-all flex items-center justify-center gap-2 disabled:opacity-60 shadow-sm"
      >
        {loading ? (
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        ) : mode === "login" ? (
          <>
            <LogIn className="w-4 h-4" />
            Masuk ke S-RAB
          </>
        ) : (
          <>
            <UserPlus className="w-4 h-4" />
            Buat Akun Baru
          </>
        )}
      </button>
    </form>
  );
}
