"use client";

import { useToast } from "@/hooks/use-toast";
import { createContext, useContext, useState, ReactNode, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

// This is a mock user type. In a real app, you'd fetch this from your backend.
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'customer' | 'seller' | 'admin';
  storeName?: string;
  status?: 'pending' | 'approved' | 'rejected';
  gstNumber?: string;
  bankAccountNumber?: string;
  ifscCode?: string;
  businessDetails?: string;
  documentUrl?: string; // for storing uploaded document path
}

interface AuthContextType {
  user: User | null;
  users: User[];
  login: (email: string, password: string) => Promise<void>;
  signup: (values: Omit<User, 'id'>) => Promise<void>;
  logout: () => void;
  updateUserStatus: (userId: string, status: 'pending' | 'approved' | 'rejected') => void;
  updateUser: (userData: User) => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data for demonstration purposes
const MOCK_USERS_INITIAL_STATE: User[] = [
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
        storeName: "Fatima's Finest Fabrics",
        status: 'approved',
        gstNumber: '22AAAAA0000A1Z5',
        bankAccountNumber: '123456789012',
        ifscCode: 'FDRL0001234',
        businessDetails: 'Selling high-quality fabrics since 2015.'
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
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    try {
      const storedUser = window.localStorage.getItem('jalal-bazaar-user');
      const storedUsers = window.localStorage.getItem('jalal-bazaar-users');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      if (storedUsers) {
        setUsers(JSON.parse(storedUsers));
      } else {
        setUsers(MOCK_USERS_INITIAL_STATE);
        window.localStorage.setItem('jalal-bazaar-users', JSON.stringify(MOCK_USERS_INITIAL_STATE));
      }
    } catch (error) {
      console.error("Failed to parse from localStorage", error);
      setUsers(MOCK_USERS_INITIAL_STATE);
    } finally {
        setIsLoading(false);
    }
  }, []);

  const persistUsers = (newUsers: User[]) => {
      setUsers(newUsers);
      window.localStorage.setItem('jalal-bazaar-users', JSON.stringify(newUsers));
  }

   const persistUser = (newUser: User | null) => {
      setUser(newUser);
      if (newUser) {
        window.localStorage.setItem('jalal-bazaar-user', JSON.stringify(newUser));
      } else {
        window.localStorage.removeItem('jalal-bazaar-user');
      }
  }

  const login = async (email: string, password: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const lowerCaseEmail = email.toLowerCase();
        // In a real app, you would also verify the password hash
        const foundUser = users.find(u => u.email === lowerCaseEmail);

        if (foundUser && ((lowerCaseEmail === 'admin@jalalbazaar.com' && password === '596847464j') || password === 'password123')) {
          
          if (foundUser.role === 'seller' && foundUser.status !== 'approved') {
            persistUser(foundUser);
            router.push('/seller/dashboard'); // Redirect to dashboard to see status
            resolve();
            return;
          }
          
          persistUser(foundUser);
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
          if(users.some(u => u.email === values.email.toLowerCase())) {
              reject(new Error("An account with this email already exists."));
              return;
          }
          const newUser: User = { 
              id: `user-${Date.now()}`, 
              status: 'pending',
              ...values,
          };
          
          const newUsers = [...users, newUser];
          persistUsers(newUsers);
          
          persistUser(newUser);
          toast({
              title: "Account Submitted!",
              description: "Thank you for registering. Your application is under review.",
          });
          
          if (newUser.role === 'seller') {
            router.push('/seller/dashboard');
          } else {
            router.push('/profile');
          }

          resolve();
        }, 1000);
      });
  };

  const logout = () => {
    persistUser(null);
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    router.push('/');
  };

  const updateUserStatus = useCallback((userId: string, status: 'pending' | 'approved' | 'rejected') => {
      const newUsers = users.map(u => {
          if (u.id === userId && u.role === 'seller') {
              return { ...u, status };
          }
          return u;
      });
      persistUsers(newUsers);
  }, [users]);

  const updateUser = async (userData: User): Promise<void> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const newUsers = users.map(u => (u.id === userData.id ? userData : u));
            persistUsers(newUsers);
            if(user && user.id === userData.id) {
                persistUser(userData);
            }
            resolve();
        }, 500)
    })
  }


  const value = {
    user,
    users,
    login,
    signup,
    logout,
    updateUserStatus,
    updateUser,
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
