"use client";

import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { showError, showSuccess } from "@/lib/toast";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const supabase = useMemo(() => createSupabaseBrowserClient(), []);
  const router = useRouter();

  const handleSignup = async () => {
    setError(null);

    const trimmedUsername = username.trim();
    const trimmedEmail = email.trim().toLowerCase();

    if (!trimmedUsername) {
      const message = "Username is required";
      showError(message);
      setError(message);
      return;
    }

    if (!trimmedEmail) {
      const message = "Email is required";
      showError(message);
      setError(message);
      return;
    }

    if (!password) {
      const message = "Password is required";
      showError(message);
      setError(message);
      return;
    }

    if (password.length < 6) {
      const message = "Password must be at least 6 characters";
      showError(message);
      setError(message);
      return;
    }

    setIsSubmitting(true);

    try {
      const emailRedirectTo = process.env.NEXT_PUBLIC_AUTH_CALLBACK_URL;

      const { error } = await supabase.auth.signUp({
        email: trimmedEmail,
        password,
        options: {
          ...(emailRedirectTo ? { emailRedirectTo } : {}),
          data: {
            user_name: trimmedUsername,
          },
        },
      });

      if (error) {
        const errorMessage =
          error instanceof Error ? error.message : String(error);
        showError(errorMessage);
        setError(errorMessage);
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
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <div className="flex flex-col gap-4">
        <h1>Sign Up</h1>
        <input
          className="border-1 p-1 rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="username"
          autoComplete="username"
        />
        <input
          className="border-1 p-1 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email"
          type="email"
          autoComplete="email"
        />
        <input
          className="border-1 p-1 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
          type="password"
          autoComplete="new-password"
        />

        <button
          className="border-2 p-2 hover:cursor-default rounded"
          onClick={handleSignup}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Signing up..." : "SignUp"}
        </button>
        {error && <div className="text-red-500">{error}</div>}
      </div>
    </div>
  );
}
