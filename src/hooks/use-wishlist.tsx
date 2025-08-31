
"use client";

import type { Product } from "@/lib/data";
import { useToast } from "@/hooks/use-toast";
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useLanguage } from "./use-language";

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
  const { t, language } = useLanguage();

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
        title: t('product_add_to_wishlist'),
        description: `${product.name[language]} ${t('toast_added_to_wishlist')}`,
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
        title: t('product_remove_from_wishlist'),
        description: `${itemToRemove.name[language]} ${t('toast_removed_from_wishlist')}`,
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
