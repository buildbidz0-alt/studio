"use client";

import { useToast } from "@/hooks/use-toast";
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";

// This is a mock user type. In a real app, you'd fetch this from your backend.
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'customer' | 'seller' | 'admin';
  storeName?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (values: Omit<User, 'id'>) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data for demonstration purposes
const MOCK_USERS: User[] = [
    {
        id: "user-123-abc",
        firstName: "Aisha",
        lastName: "Khan",
        email: "aisha.khan@example.com",
        role: 'customer'
    },
    {
        id: "seller-456-def",
        firstName: "Fatima",
        lastName: "Ahmed",
        email: "seller@example.com",
        role: 'seller',
        storeName: "Fatima's Finest Fabrics"
    },
    {
        id: "admin-user-id",
        firstName: "Admin",
        lastName: "User",
        email: "admin@jalalbazaar.com",
        role: 'admin'
    }
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const router = useRouter();

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
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const lowerCaseEmail = email.toLowerCase();
        // In a real app, you would also verify the password hash
        const foundUser = MOCK_USERS.find(u => u.email === lowerCaseEmail);

        if (foundUser && ((lowerCaseEmail === 'admin@jalalbazaar.com' && password === '596847464j') || password === 'password123')) {
          setUser(foundUser);
          window.localStorage.setItem('jalal-bazaar-user', JSON.stringify(foundUser));
          toast({
            title: "Login Successful",
            description: `Welcome back, ${foundUser.firstName}!`,
          });
          if (foundUser.role === 'seller') router.push('/seller/dashboard');
          else if (foundUser.role === 'admin') router.push('/admin');
          else router.push('/profile');
          resolve();
        } else {
          reject(new Error("Invalid email or password. Hint: use 'password123' for mock users."));
        }
      }, 1000);
    });
  };

  const signup = async (values: Omit<User, 'id'>): Promise<void> => {
     return new Promise((resolve, reject) => {
        setTimeout(() => {
          if(MOCK_USERS.some(u => u.email === values.email.toLowerCase())) {
              reject(new Error("An account with this email already exists."));
              return;
          }
          const newUser: User = { 
              id: `user-${Date.now()}`, 
              ...values
          };
          MOCK_USERS.push(newUser); // Add to our mock user list
          setUser(newUser);
          window.localStorage.setItem('jalal-bazaar-user', JSON.stringify(newUser));
          toast({
            title: "Account Created!",
            description: `Welcome to Jalal Bazaar, ${newUser.firstName}!`,
          });
           if (newUser.role === 'seller') router.push('/seller/dashboard');
           else router.push('/profile');
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
