
import { getSellerById, getProductsBySellerId } from '@/lib/data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { ProductCard } from '@/components/product/ProductCard';
import { Badge } from '@/components/ui/badge';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import type { Metadata, ResolvingMetadata } from 'next';

type Props = {
  params: {
    id: string;
  };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const seller = await getSellerById(params.id)
 
  if (!seller) {
    return {
        title: "Seller Not Found",
        description: "The seller you are looking for does not exist."
    }
  }
 
  return {
    title: `${seller.name} | Jalal Bazaar`,
    description: seller.description.substring(0, 160),
    openGraph: {
      title: `${seller.name} | Jalal Bazaar`,
      description: seller.description.substring(0, 160),
      images: [
        {
          url: seller.logoUrl,
          width: 800,
          height: 600,
          alt: seller.name,
        },
      ],
      type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: `${seller.name} | Jalal Bazaar`,
        description: seller.description.substring(0, 160),
        images: [seller.logoUrl],
    }
  }
}

export default async function SellerPage({ params }: Props) {
  const seller = await getSellerById(params.id);
  if (!seller) {
    notFound();
  }

  const products = await getProductsBySellerId(seller.id);

  const sellerJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": seller.name,
    "url": `https://jalalbazaar.com/sellers/${seller.id}`, // Replace with your actual domain
    "logo": seller.logoUrl,
    "description": seller.description,
  };

  return (
    <>
      <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(sellerJsonLd) }}
      />
      <div className="container mx-auto py-12">
          <Breadcrumb className="mb-8">
              <BreadcrumbList>
                  <BreadcrumbItem>
                  <BreadcrumbLink href="/">Home</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                  <BreadcrumbLink href="/products">Products</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                  <BreadcrumbPage>{seller.name}</BreadcrumbPage>
                  </BreadcrumbItem>
              </BreadcrumbList>
          </Breadcrumb>
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 mb-16 rounded-lg bg-card p-8 shadow-sm">
          <div className="relative h-32 w-32 flex-shrink-0">
            <Image
              src={seller.logoUrl}
              alt={`${seller.name} logo`}
              fill
              className="rounded-full object-cover border-4 border-background"
              data-ai-hint={seller.imageHint}
            />
          </div>
          <div>
            <h1 className="font-headline text-5xl text-center md:text-left">{seller.name}</h1>
            <p className="mt-2 font-body text-muted-foreground max-w-2xl text-center md:text-left">{seller.description}</p>
            {seller.halalCertificationBody !== 'N/A' && (
              <Badge className="mt-4" variant="secondary">
                  Certified by: {seller.halalCertificationBody}
              </Badge>
            )}
          </div>
        </div>

        <h2 className="font-headline text-4xl mb-8">Products from {seller.name}</h2>
        {products.filter(p => p.status === 'approved').length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.filter(p => p.status === 'approved').map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
              <h3 className="font-headline text-2xl">No products yet</h3>
              <p className="text-muted-foreground mt-2">This seller hasn't listed any approved products.</p>
          </div>
        )}
      </div>
    </>
  );
}
