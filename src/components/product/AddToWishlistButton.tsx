"use client";

import { useWishlist } from "@/hooks/use-wishlist";
import { Button } from "@/components/ui/button";
import type { Product } from "@/lib/data";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";

interface AddToWishlistButtonProps {
  product: Product;
}

export function AddToWishlistButton({ product }: AddToWishlistButtonProps) {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const isWishlisted = isInWishlist(product.id);

  const handleToggleWishlist = () => {
    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };
  
  return (
    <Button variant="outline" onClick={handleToggleWishlist} className="gap-2 w-full sm:w-auto">
      <Heart className={cn("h-4 w-4", isWishlisted && "fill-destructive text-destructive")} />
      <span>{isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}</span>
    </Button>
  );
}
