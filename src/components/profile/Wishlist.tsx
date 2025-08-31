"use client";

import { useWishlist } from "@/hooks/use-wishlist";
import { ProductCard } from "@/components/product/ProductCard";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Heart } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

export function Wishlist() {
  const { wishlistItems } = useWishlist();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-2xl">My Majlis</CardTitle>
        <CardDescription>Your favorite items, all in one place.</CardDescription>
      </CardHeader>
      <CardContent>
        {wishlistItems.length === 0 ? (
          <div className="text-center py-16 border-2 border-dashed rounded-lg">
            <Heart className="mx-auto h-16 w-16 text-muted-foreground" />
            <h3 className="mt-6 font-headline text-2xl">Your wishlist is empty</h3>
            <p className="mt-2 text-muted-foreground">
              Explore products and add your favorites here.
            </p>
            <Button asChild className="mt-6">
              <Link href="/products">Discover Products</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {wishlistItems.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
