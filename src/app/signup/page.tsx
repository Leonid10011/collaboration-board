"use client";

import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { showError, showSuccess } from "@/lib/toast";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const supabase = createSupabaseBrowserClient();
  const router = useRouter();

  const handleSignup = async () => {
    if (!username.trim()) {
      showError("Username is required");
      setError("Username is required");
      return;
    }

    setIsLoading(true);
    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
          data: {
            user_name: username,
          },
        },
      });

      if (authError) {
        const errorMessage =
          authError instanceof Error ? authError.message : String(authError);
        showError(errorMessage);
        setError(errorMessage);
        setIsLoading(false);
        return;
      }

      if (!authData.user) {
        showError("Failed to create user account");
        setError("Failed to create user account");
        setIsLoading(false);
        return;
      }

      // Create profile in the profiles table
      const { error: profileError } = await supabase.from("profiles").insert({
        id: authData.user.id,
        email,
        user_name: username,
      });

      if (profileError) {
        const errorMessage =
          profileError instanceof Error ? profileError.message : String(profileError);
        showError(errorMessage);
        setError(errorMessage);
        setIsLoading(false);
        return;
      }

      showSuccess("Registration successful");
      router.push("/login");
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unexpected error occurred";
      showError(errorMessage);
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <div className="flex flex-col gap-4">
        <h1>Sign Up</h1>
        <input
          className="border-1 p-1 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email"
          disabled={isLoading}
        />
        <input
          className="border-1 p-1 rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="username"
          disabled={isLoading}
        />
        <input
          className="border-1 p-1 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
          type="password"
          disabled={isLoading}
        />

        <button
          className="border-2 p-2 hover:cursor-default rounded disabled:opacity-50"
          onClick={handleSignup}
          disabled={isLoading}
        >
          {isLoading ? "Signing up..." : "SignUp"}
        </button>
        {error && <div className="text-red-500">{error}</div>}
      </div>
    </div>
  );
}
