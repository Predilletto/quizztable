import React from "react";
import { User, getAuth, onAuthStateChanged } from "firebase/auth";

import { createContext, useEffect, useState } from "react";

interface AuthContextProps {
  user: User | null;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthContext = createContext<AuthContextProps>({
  user: null,
});
export function AuthProvider({ children }: AuthProviderProps) {
  const auth = getAuth();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, [auth]);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
}
