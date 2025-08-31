"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { getProducts } from '@/lib/data';
import { ProductCard } from '@/components/product/ProductCard';
import { PersonalizedRecommendations } from '@/components/product/PersonalizedRecommendations';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/hooks/use-language';
import { useEffect, useState } from 'react';
import type { Product } from '@/lib/data';

export default function Home() {
  const { t } = useLanguage();
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchAndSetProducts = async () => {
        const products = await getProducts();
        setAllProducts(products);
        setFeaturedProducts(products.slice(0, 8));
    }
    fetchAndSetProducts();
  }, [])


  return (
    <div className="flex flex-col">
      <section className="relative h-[60vh] w-full">
        <Image
          src="https://picsum.photos/1800/1200"
          alt="Elegant halal lifestyle products"
          fill
          className="object-cover"
          priority
          data-ai-hint="elegant fabric"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white">
          <h1 className="font-headline text-5xl md:text-7xl lg:text-8xl">
            {t('hero_headline')}
          </h1>
          <p className="mt-4 max-w-2xl font-body text-lg md:text-xl">
            {t('hero_subtext')}
          </p>
          <Button asChild size="lg" className="mt-8 bg-primary text-primary-foreground hover:bg-primary/90">
            <Link href="/products">{t('hero_cta')}</Link>
          </Button>
        </div>
      </section>

      <PersonalizedRecommendations />

      <section className="w-full bg-background py-16 sm:py-24">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-headline text-4xl md:text-5xl">
              Featured Products
            </h2>
            <Button asChild variant="link" className="text-primary hover:text-primary/80">
                <Link href="/products">View All <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
