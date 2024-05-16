"use client";

import { useContext } from "react";
import { AuthContext } from "../ui/authContext";
import { getUser, logout } from "../lib/data";
import Link from "next/link";

const UserProfile = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const handleLogout = () => {
    logout();
    location.reload();
  };

  return (
    <div>
      {isLoggedIn ? (
        <div className="p-4">
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <Link href="/api/login" className="group flex gap-2 p-4">
          Login with Spotify
        </Link>
      )}
    </div>
  );
};

export default UserProfile;
