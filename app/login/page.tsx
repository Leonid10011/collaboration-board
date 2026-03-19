"use client";

import { createSupabaseBrowserClient } from "@/db/supabase/supabase-client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const supabase = createSupabaseBrowserClient();
  const router = useRouter();

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    console.log({ error });

    if (!error) {
      router.push("/debug");
    }
  };

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data.user) {
        router.push("/debug");
      }
    };
    checkUser();
  });

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <div className="flex flex-col gap-4">
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
          className="border-2 p-2 hover:cursor-pointer rounded"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </div>
  );
}
