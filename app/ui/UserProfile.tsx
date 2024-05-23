"use client";
import { logout, isLoggedIn } from "../lib/data";
import Link from "next/link";
import { useEffect, useState } from "react";
import UserData from "../components/UserData";

const UserProfile = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    function checkLoginStatus() {
      isLoggedIn()
        .then((result) => {
          setLoggedIn(result);
        })
        .catch((error) => {
          console.error("Error checking login status:", error);
        });
    }
    checkLoginStatus();
  }, []);

  const handleLogout = () => {
    logout();
    location.reload();
  };

  return (
    <div>
      {loggedIn ? (
        <div className="p-4">
          <UserData />
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
