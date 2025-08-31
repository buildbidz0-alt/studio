
"use client";

import { useState, useEffect } from "react";
import { type Product, type Seller } from "@/lib/data";
import Image from "next/image";
import { ShieldCheck, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { AddToCartButton } from "@/components/product/AddToCartButton";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { ProductCard } from "@/components/product/ProductCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AddToWishlistButton } from "@/components/product/AddToWishlistButton";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/use-auth";
import { useLanguage } from "@/hooks/use-language";


type ProductPageClientProps = {
  product: Product,
  seller?: Seller,
  otherProducts: Product[]
};

export function ProductPageClient({ product, seller, otherProducts }: ProductPageClientProps) {
  const [activeImage, setActiveImage] = useState(0);
  const { user } = useAuth();
  const { language } = useLanguage();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
     return (
        <div className="container mx-auto max-w-6xl py-12">
            <div className="grid md:grid-cols-2 gap-12">
                <div>
                    <Card className="overflow-hidden">
                        <CardContent className="p-0">
                            <div className="relative aspect-square w-full bg-muted animate-pulse" />
                        </CardContent>
                    </Card>
                     <div className="mt-4 grid grid-cols-5 gap-4">
                        {[...Array(4)].map((_, i) => <div key={i} className="aspect-square w-full rounded-md bg-muted animate-pulse" />)}
                    </div>
                </div>
                
                <div className="flex flex-col space-y-4">
                    <div className="h-6 w-24 rounded-md bg-muted animate-pulse" />
                    <div className="h-12 w-3/4 rounded-md bg-muted animate-pulse" />
                    <div className="h-10 w-1/3 rounded-md bg-muted animate-pulse" />
                    <div className="h-24 w-full rounded-md bg-muted animate-pulse" />
                    <div className="h-8 w-1/2 rounded-md bg-muted animate-pulse" />
                    <div className="flex gap-4">
                         <div className="h-12 w-40 rounded-md bg-muted animate-pulse" />
                        <div className="h-12 w-40 rounded-md bg-muted animate-pulse" />
                    </div>
                </div>
            </div>
        </div>
    )
  }

  // Customer/guest can only see approved products. Seller can see their own pending products. Admin can see all.
  if (product.status !== 'approved' && user?.role !== 'admin' && !(user?.role === 'seller' && user.id === product.sellerId)) {
      return (
        <div className="container mx-auto py-24 flex items-center justify-center">
            <Card className="w-[400px]">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <AlertTriangle className="text-destructive" />
                        Product Not Available
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p>This product is currently not available for viewing.</p>
                </CardContent>
            </Card>
        </div>
      )
  }

  return (
    <div className="container mx-auto max-w-6xl py-12">
       {product.status !== 'approved' && (
        <Card className="mb-8 border-yellow-400 bg-yellow-50 text-yellow-900">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
                <AlertTriangle />
                Product Under Review
            </CardTitle>
            <CardContent className="pt-4 p-0">
                <p>This product is currently pending approval from the admin and is not visible to customers.</p>
            </CardContent>
          </CardHeader>
        </Card>
      )}

      <div className="grid md:grid-cols-2 gap-12">
        <div>
            <Card className="overflow-hidden">
                <CardContent className="p-0">
                    <div className="relative aspect-square w-full">
                    <Image
                        src={product.imageUrls[activeImage]}
                        alt={product.name[language]}
                        fill
                        className="object-cover"
                        data-ai-hint={product.imageHint}
                        priority
                    />
                    </div>
                </CardContent>
            </Card>
             {product.imageUrls.length > 1 && (
                <div className="mt-4 grid grid-cols-5 gap-4">
                    {product.imageUrls.map((url, index) => (
                        <button 
                            key={index}
                            onClick={() => setActiveImage(index)}
                            className={cn(
                                "aspect-square w-full relative rounded-md overflow-hidden border-2 transition-all",
                                activeImage === index ? "border-primary" : "border-transparent hover:border-muted-foreground/50"
                            )}
                        >
                            <Image
                                src={url}
                                alt={`${product.name[language]} thumbnail ${index + 1}`}
                                fill
                                className="object-cover"
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
        
        <div className="flex flex-col">
          <Badge variant="outline" className="w-fit">{product.category}</Badge>
          <h1 className="font-headline text-4xl md:text-5xl my-3">{product.name[language]}</h1>
          <p className="text-3xl font-bold text-secondary mb-4">₹{product.price.toFixed(2)}</p>
          
          <p className="font-body text-muted-foreground leading-relaxed">{product.description}</p>
          
          {product.isHalalCertified && (
            <div className="mt-4 flex items-center rounded-md border border-green-200 bg-green-50 p-3 text-green-800">
              <ShieldCheck className="mr-3 h-6 w-6" />
              <span className="font-semibold">Verified Halal Product</span>
            </div>
          )}
          
          {user?.role !== 'admin' && (
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <AddToCartButton product={product} />
                <AddToWishlistButton product={product} />
            </div>
           )}

          {seller && (
            <>
            <Separator className="my-8" />
            <div className="flex items-start gap-4">
                <div className="relative h-16 w-16 flex-shrink-0">
                    <Image src={seller.logoUrl} alt={seller.name} fill className="rounded-full object-cover" data-ai-hint={seller.imageHint} />
                </div>
                <div>
                    <p className="text-sm text-muted-foreground">Sold by</p>
                    <Link href={`/sellers/${seller.id}`} className="font-headline text-xl text-primary hover:underline">
                        {seller.name}
                    </Link>
                    {seller.halalCertificationBody !== 'N/A' && 
                        <p className="text-xs text-muted-foreground mt-1">Certified by: {seller.halalCertificationBody}</p>
                    }
                </div>
            </div>
            </>
          )}

        </div>
      </div>

       {otherProducts.length > 0 && (
        <div className="mt-24">
            <h2 className="font-headline text-3xl md:text-4xl mb-8">More from {seller?.name}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {otherProducts.map(p => <ProductCard key={p.id} product={p}/>)}
            </div>
        </div>
      )}
    </div>
  );
}
