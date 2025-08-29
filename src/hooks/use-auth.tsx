"use client";

import { useToast } from "@/hooks/use-toast";
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";

// This is a mock user type. In a real app, you'd fetch this from your backend.
interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, firstName: string, lastName: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data for demonstration purposes
const MOCK_USER_ID = "user-123-abc";
const MOCK_USER: User = {
    id: MOCK_USER_ID,
    firstName: "Aisha",
    lastName: "Khan",
    email: "aisha.khan@example.com"
};

const ADMIN_USER: User = {
    id: "admin-user-id",
    firstName: "Admin",
    lastName: "User",
    email: "admin@jalalbazaar.com",
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const router = useRouter();

  // Check for a logged-in user in localStorage on initial load
  useEffect(() => {
    try {
      const storedUser = window.localStorage.getItem('jalal-bazaar-user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
    } finally {
        setIsLoading(false);
    }
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    // In a real app, you would make an API call to your backend here
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const lowerCaseEmail = email.toLowerCase();
        let foundUser: User | null = null;

        if (lowerCaseEmail === MOCK_USER.email && password === 'password123') {
          foundUser = { ...MOCK_USER, email: lowerCaseEmail };
        } else if (lowerCaseEmail === ADMIN_USER.email && password === '596847464j') {
          foundUser = { ...ADMIN_USER, email: lowerCaseEmail };
        }

        if (foundUser) {
          setUser(foundUser);
          window.localStorage.setItem('jalal-bazaar-user', JSON.stringify(foundUser));
          toast({
            title: "Login Successful",
            description: `Welcome back, ${foundUser.firstName}!`,
          });
          resolve();
        } else {
          reject(new Error("Invalid email or password."));
        }
      }, 1000);
    });
  };

  const signup = async (email: string, password: string, firstName: string, lastName: string): Promise<void> => {
     // In a real app, this would create a new user in your database
     return new Promise((resolve, reject) => {
        setTimeout(() => {
          // Check if user already exists (mock)
          if(email.toLowerCase() === MOCK_USER.email || email.toLowerCase() === ADMIN_USER.email) {
              reject(new Error("An account with this email already exists."));
              return;
          }
          const newUser: User = { id: `user-${Date.now()}`, email, firstName, lastName };
          setUser(newUser);
          window.localStorage.setItem('jalal-bazaar-user', JSON.stringify(newUser));
          toast({
            title: "Account Created!",
            description: `Welcome to Jalal Bazaar, ${newUser.firstName}!`,
          });
          resolve();
        }, 1000);
      });
  };

  const logout = () => {
    setUser(null);
    window.localStorage.removeItem('jalal-bazaar-user');
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    router.push('/');
  };


  const value = {
    user,
    login,
    signup,
    logout,
    isLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
