
"use client";

import { useState, useEffect } from "react";
import { getProductsByIds, type Product } from "@/lib/data";
import { ProductCard } from "@/components/product/ProductCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchRecommendationsAction } from "@/app/actions";
import { useLanguage } from "@/hooks/use-language";


export function PersonalizedRecommendations() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { t } = useLanguage();

  useEffect(() => {
    const getRecs = async () => {
      setLoading(true);
      // In a real app, you'd get the logged-in user's ID
      const userId = "user-123";
      const recommendedProducts = await fetchRecommendationsAction(userId);
      setProducts(recommendedProducts);
      setLoading(false);
    };
    getRecs();
  }, []);

  if (loading) {
    return (
      <section className="w-full bg-background py-16 sm:py-24">
        <div className="container mx-auto">
          <h2 className="font-headline text-4xl md:text-5xl mb-8">
            {t('recommendations_title')}
          </h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex flex-col space-y-3">
                <Skeleton className="h-[200px] w-full rounded-xl" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-4/5" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  
  if (products.length === 0) {
      return null;
  }

  return (
    <section className="w-full bg-secondary py-16 sm:py-24">
      <div className="container mx-auto">
        <h2 className="font-headline text-4xl md:text-5xl text-center mb-12">
          {t('recommendations_title')}
        </h2>
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {products.map((product) => (
              <CarouselItem key={product.id} className="md:basis-1/2 lg:basis-1/4">
                <div className="p-1">
                  <ProductCard product={product} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="ml-12" />
          <CarouselNext className="mr-12" />
        </Carousel>
      </div>
    </section>
  );
}
