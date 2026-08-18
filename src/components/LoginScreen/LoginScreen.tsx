"use client";
import { useState } from "react";
import { useRABStore } from "@/lib/store";
import { LogIn } from "lucide-react";
import LoginForm from "./LoginForm";

export default function LoginScreen() {
  const { loginUser } = useRABStore();
  const [error, setError] = useState("");

  const handleSubmit = async (data: { name: string; email: string; password: string }) => {
    setError("");
    await new Promise((r) => setTimeout(r, 350));
    const result = await loginUser(data.email, data.password);
    if (!result.success) setError(result.error || "Login gagal.");
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col items-center justify-center px-4">
      <div
        className="fixed inset-0 pointer-events-none opacity-30 dark:opacity-10"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 30%, #a1a1aa44 0%, transparent 60%), radial-gradient(circle at 80% 80%, #a1a1aa22 0%, transparent 60%)",
        }}
      />

      <div className="relative w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-zinc-900 dark:bg-zinc-50 rounded-2xl shadow-lg mb-4">
            <span className="text-zinc-50 dark:text-zinc-900 font-black text-2xl tracking-tighter">S</span>
          </div>
          <h1 className="text-2xl font-black tracking-tight text-zinc-900 dark:text-zinc-50">S-RAB</h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">Platform Estimator Konstruksi Modern</p>
        </div>

        <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-xl overflow-hidden">
          <div className="flex border-b border-zinc-100 dark:border-zinc-800">
            <div className="flex-1 py-4 text-sm font-bold flex items-center justify-center gap-2 text-zinc-900 dark:text-zinc-50 border-b-2 border-zinc-900 dark:border-zinc-50">
              <LogIn className="w-4 h-4" /> Masuk
            </div>
          </div>
          <LoginForm mode="login" onSubmit={handleSubmit} error={error} />
        </div>

      </div>
    </div>
  );
}
