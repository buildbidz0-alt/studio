import { getProductById, getSellerById, getProductsBySellerId } from "@/lib/data";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { AddToCartButton } from "@/components/product/AddToCartButton";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { ProductCard } from "@/components/product/ProductCard";
import { Card, CardContent } from "@/components/ui/card";
import { AddToWishlistButton } from "@/components/product/AddToWishlistButton";

type ProductPageProps = {
  params: {
    id: string;
  };
};

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProductById(params.id);
  if (!product) {
    notFound();
  }

  const seller = await getSellerById(product.sellerId);
  const otherProductsFromSeller = (await getProductsBySellerId(product.sellerId)).filter(p => p.id !== product.id).slice(0, 3);

  return (
    <div className="container mx-auto max-w-6xl py-12">
      <div className="grid md:grid-cols-2 gap-12">
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div className="relative aspect-square w-full">
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                className="object-cover"
                data-ai-hint={product.imageHint}
              />
            </div>
          </CardContent>
        </Card>
        
        <div className="flex flex-col">
          <Badge variant="outline" className="w-fit">{product.category}</Badge>
          <h1 className="font-headline text-4xl md:text-5xl my-3">{product.name}</h1>
          <p className="text-3xl font-bold text-primary mb-4">₹{product.price.toFixed(2)}</p>
          
          <p className="font-body text-muted-foreground leading-relaxed">{product.description}</p>
          
          {product.isHalalCertified && (
            <div className="mt-4 flex items-center rounded-md border border-green-200 bg-green-50 p-3 text-green-800">
              <ShieldCheck className="mr-3 h-6 w-6" />
              <span className="font-semibold">Verified Halal Product</span>
            </div>
          )}
          
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <AddToCartButton product={product} />
            <AddToWishlistButton product={product} />
          </div>

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

       {otherProductsFromSeller.length > 0 && (
        <div className="mt-24">
            <h2 className="font-headline text-3xl md:text-4xl mb-8">More from {seller?.name}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {otherProductsFromSeller.map(p => <ProductCard key={p.id} product={p}/>)}
            </div>
        </div>
      )}
    </div>
  );
}
