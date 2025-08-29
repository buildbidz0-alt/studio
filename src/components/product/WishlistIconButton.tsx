"use client";

import { useWishlist } from "@/hooks/use-wishlist";
import { Button } from "@/components/ui/button";
import type { Product } from "@/lib/data";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";

interface WishlistIconButtonProps {
  product: Product;
  className?: string;
}

export function WishlistIconButton({ product, className }: WishlistIconButtonProps) {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const isWishlisted = isInWishlist(product.id);

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };
  
  return (
    <Button
      size="icon"
      variant="ghost"
      onClick={handleToggleWishlist}
      className={cn("rounded-full h-9 w-9 bg-background/60 hover:bg-background/90 backdrop-blur-sm", className)}
    >
      <Heart className={cn("h-5 w-5 transition-colors", isWishlisted ? "fill-destructive text-destructive" : "text-foreground/70")} />
      <span className="sr-only">Toggle Wishlist</span>
    </Button>
  );
}
