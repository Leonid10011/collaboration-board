"use client";

import { createSupabaseBrowserClient } from "@/db/supabase/supabase-client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState<string | null>(null);

  const supabase = createSupabaseBrowserClient();
  const router = useRouter();

  const handleSignup = async () => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (!error) {
      router.push("/login");
    }
    setError(`${error instanceof Error ? error.message : String(error)}`);
  };

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data.user) {
        router.push("/login");
      }
    };
    checkUser();
  });

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <div className="flex flex-col gap-4">
        <h1>Sign Up</h1>
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
          onClick={handleSignup}
        >
          SignUp
        </button>
        {error && <div className="text-red-500">{error}</div>}
      </div>
    </div>
  );
}
