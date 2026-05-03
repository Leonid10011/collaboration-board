"use client";

import { showError } from "@/lib/toast";

import { createContext, useContext, useEffect, useState } from "react";
import { getUserById } from "./queries/get-user-id";
import { User } from "./types";
import { getUsers } from "./queries/get-users";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

type AuthContextType = {
  user: User | null;
  error: string | null;
  users: User[] | null;
  signout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within a UserProvider");
  }
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
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
        const result = await getUserById(data.user.id);
        const userData: User = {
          id: result.id,
          username: result.user_name,
          imageUrl: result.img_url,
          email: result.email,
          lastActive: new Date(),
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

  /**
   * We need data of all user to allow project admins to add new members to their projects.
   * Later we will narrow down the list of users with pagination and search functionality, but for now we will fetch all users and store them in the context.
   */
  const [allUsers, setAllUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setError(null);
        const data = await getUsers();

        setAllUsers(data);
      } catch (error) {
        setError(`Profiles could not be loaded: ${error}`);
        return;
      }
    };

    fetchUsers();
  }, []);

  const signout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      showError(`Logout failed: ${error.message}`);
    }
  };

  return (
    <AuthContext.Provider value={{ user, error, users: allUsers, signout }}>
      {children}
    </AuthContext.Provider>
  );
}
