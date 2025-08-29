import Link from 'next/link';
import Image from 'next/image';
import { ShieldCheck } from 'lucide-react';
import type { Product } from '@/lib/data';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AddToCartButton } from './AddToCartButton';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden rounded-lg shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-xl">
      <Link href={`/products/${product.id}`} className="flex-grow">
        <CardHeader className="p-0">
          <div className="relative h-48 w-full">
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-cover"
              data-ai-hint={product.imageHint}
            />
          </div>
        </CardHeader>
        <CardContent className="p-4 flex-grow">
          <Badge variant="outline" className="mb-2">{product.category}</Badge>
          <CardTitle className="font-headline text-lg leading-tight">
            {product.name}
          </CardTitle>
        </CardContent>
      </Link>
      <CardFooter className="flex items-center justify-between p-4 pt-0">
        <div className="flex flex-col">
            <p className="text-xl font-bold text-primary">
            ${product.price.toFixed(2)}
            </p>
            {product.isHalalCertified && (
                <div className="flex items-center text-xs text-green-700 mt-1">
                <ShieldCheck className="mr-1 h-4 w-4" />
                <span>Halal Certified</span>
                </div>
            )}
        </div>
        <AddToCartButton product={product} />
      </CardFooter>
    </Card>
  );
}
