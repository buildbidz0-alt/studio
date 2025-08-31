"use client";

import type { Product } from "@/lib/data";
import { useToast } from "@/hooks/use-toast";
import { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface WishlistContextType {
  wishlistItems: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  wishlistCount: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlistItems, setWishlistItems] = useState<Product[]>(() => {
      if (typeof window === 'undefined') {
          return [];
      }
      try {
          const item = window.localStorage.getItem('jalal-wishlist');
          return item ? JSON.parse(item) : [];
      } catch (error) {
          console.error(error);
          return [];
      }
  });
  const { toast } = useToast();

  useEffect(() => {
    try {
        window.localStorage.setItem('jalal-wishlist', JSON.stringify(wishlistItems));
    } catch (error) {
        console.error(error);
    }
  }, [wishlistItems]);

  const addToWishlist = (product: Product) => {
    setWishlistItems((prevItems) => {
      if (prevItems.find(item => item.id === product.id)) {
        return prevItems;
      }
      toast({
        title: "Added to Wishlist",
        description: `${product.name} has been added to your wishlist.`,
      });
      return [...prevItems, product];
    });
  };

  const removeFromWishlist = (productId: string) => {
    const itemToRemove = wishlistItems.find(item => item.id === productId);
    setWishlistItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
    if(itemToRemove) {
      toast({
        title: "Removed from Wishlist",
        description: `${itemToRemove.name} has been removed from your wishlist.`,
        variant: 'destructive'
      });
    }
  };

  const isInWishlist = (productId: string) => {
    return wishlistItems.some((item) => item.id === productId);
  };
  
  const wishlistCount = wishlistItems.length;

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        wishlistCount,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
}
