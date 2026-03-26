"use client";

import { createSupabaseBrowserClient } from "@/db/supabase/supabase-client";
import { User } from "@/domain/profiles";
import { getProfileById } from "@/repository/repository-profiles";
import { createContext, useContext, useEffect, useState } from "react";

type UserContextType = {
  user: User | null;
  error: string | null;
};

const UserContext = createContext<UserContextType | null>(null);

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const supabase = createSupabaseBrowserClient();

  useEffect(() => {
    const getUserData = async () => {
      const { data, error } = await supabase.auth.getUser();

      if (error) {
        console.error("Error fetching user data:", error);
        setError(`${error.message}`);
        return;
      }
      // If no error, then we have the user data in the  `data` variable.
      // Now we can get the profile and store it in the context as well.
      try {
        const result = await getProfileById(data.user.id);
        const userData: User = {
          id: result.id,
          name: result.user_name,
          email: data.user.email || "",
          img_url: "",
        };
        setUser(userData);
      } catch (error) {
        setError(`${error}`);
        return null;
      }
    };
    getUserData();

    //  We need an auth state change listener to update the user data in the context whenever the user logs in or out.
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "SIGNED_IN" && session?.user) {
          getUserData();
        }
        if (event === "SIGNED_OUT") {
          setUser(null);
        }
      },
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, [supabase.auth]);

  return (
    <UserContext.Provider value={{ user, error }}>
      {children}
    </UserContext.Provider>
  );
}
