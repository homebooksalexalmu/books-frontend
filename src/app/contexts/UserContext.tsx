"use client";
import { createContext, useContext, ReactNode } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";

interface UserContextType {
  user: any;
  isLoading: boolean;
  error?: Error;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const { user, isLoading, error } = useUser();

  return (
    <UserContext.Provider value={{ user, isLoading, error }}>
      {children}
    </UserContext.Provider>
  );
};

export const useAppUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useAppUser debe ser usado dentro de UserProvider");
  }
  return context;
};
