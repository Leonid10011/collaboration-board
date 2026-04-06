"use client";

import { createSupabaseBrowserClient } from "@/db/supabase/supabase-client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState<string | null>(null);

  const supabase = createSupabaseBrowserClient();
  const router = useRouter();

  const handleLogin = async () => {
    setError(null); // Clear previous errors
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (!error) {
      router.push("/");
    }
    setError(`${error instanceof Error ? error.message : String(error)}`);
    console.log("Login response error:", error);
  };

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data.user) {
        router.push("/");
      }
    };
    checkUser();
  });

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <div className="flex flex-col gap-4">
        <h1>Login</h1>
        <input
          className="border-1 p-1 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email"
        />
        <input
          className="border-1 p-1 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
        />

        <button
          className="border-2 p-2 hover:cursor-default rounded"
          onClick={handleLogin}
        >
          Login
        </button>
        <button
          className="border-2 p-2 hover:cursor-default rounded"
          onClick={() => router.push("/signup")}
        >
          Sign Up
        </button>
        {error && <div className="text-red-500">{error}</div>}
      </div>
    </div>
  );
}
