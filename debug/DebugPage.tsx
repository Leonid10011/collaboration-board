"use client";
import { createSupabaseBrowserClient } from "@/db/supabase/supabase-client";
import { useEffect, useState } from "react";

export default function DebugPage() {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const run = async () => {
      const supabase = createSupabaseBrowserClient();
      const { data, error } = await supabase.auth.getUser();

      console.log({ data, error });
      setUserId(data.user?.id ?? null);
    };
    run();
  }, []);
  return <div>Current User: {userId ?? "not logged in"}</div>;
}
