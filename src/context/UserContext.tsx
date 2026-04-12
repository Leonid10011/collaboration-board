"use client";

import { createSupabaseBrowserClient } from "@/db/supabase/supabase-client";
import { User } from "@/domain/users";
import { showError } from "@/lib/toast";
import { getUserById, getUsers } from "@/repository/repository-users";

import { createContext, useContext, useEffect, useState } from "react";

type UserContextType = {
  user: User | null;
  error: string | null;
  users: User[] | null;
  signout: () => Promise<void>;
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
        const result = await getUserById(data.user.id);
        const userData: User = {
          id: result.id,
          userName: result.user_name,
          imgUrl: result.image_url,
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
    <UserContext.Provider value={{ user, error, users: allUsers, signout }}>
      {children}
    </UserContext.Provider>
  );
}
