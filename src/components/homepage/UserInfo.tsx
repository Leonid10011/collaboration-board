"use client";

import { useUser } from "@/context/UserContext";

export default function UserInfo() {
  const { user, error } = useUser();

  if (error) {
    return (
      <div className="mt-6 p-4 bg-red-100 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-2">Error</h2>
        <p className="text-red-700">{error}</p>
      </div>
    );
  }

  return (
    <div className="mt-6 p-4 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-2">User Information</h2>
      <p className="text-gray-700">ID: {user?.id}</p>
      <p className="text-gray-700">Email: {user?.email}</p>
      <p className="text-gray-700">Name: {user?.name}</p>
    </div>
  );
}
