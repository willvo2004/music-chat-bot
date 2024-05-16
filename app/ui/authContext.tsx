"use client";

import {
  createContext,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";

interface spotifyAuthContext {
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
}

const AuthContext = createContext<spotifyAuthContext>({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuthStatus = async () => {
      const response = await fetch("/api/checkAuth");
      if (response.ok) {
        setIsLoggedIn(true);
      }
    };

    checkAuthStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
