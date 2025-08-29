import Image from "next/image";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb"

export default function AboutPage() {
  return (
    <div className="container mx-auto py-12">
        <Breadcrumb className="mb-8">
            <BreadcrumbList>
                <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                <BreadcrumbPage>About Us</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
      <div className="space-y-12">
        <div className="text-center">
          <h1 className="font-headline text-5xl md:text-6xl text-primary">Our Story</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            Jalal Bazaar was born from a simple idea: to create a trusted, elegant, and convenient online space for consumers to find high-quality, authentic halal products.
          </p>
        </div>

        <div className="relative h-[50vh] w-full rounded-lg overflow-hidden shadow-lg">
            <Image
                src="https://picsum.photos/1200/800"
                alt="Diverse team working together"
                fill
                className="object-cover"
                data-ai-hint="diverse community"
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white p-8">
                <h2 className="font-headline text-4xl md:text-5xl">Committed to Authenticity and Faith</h2>
                <p className="mt-4 max-w-2xl font-body text-lg md:text-xl">
                    We bridge the gap between discerning consumers and ethical sellers who are proud of their halal-certified offerings.
                </p>
            </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="font-headline text-4xl mb-4">Our Mission</h3>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Our mission is to empower Muslim consumers and entrepreneurs. We meticulously vet every seller and product to ensure they meet strict halal standards, providing peace of mind with every purchase. We aim to be more than a marketplace; we want to be a cornerstone of the modern Muslim lifestyle, celebrating our heritage while embracing the future.
            </p>
          </div>
          <div>
            <h3 className="font-headline text-4xl mb-4">Our Vision</h3>
            <p className="text-muted-foreground text-lg leading-relaxed">
              We envision a world where every Muslim consumer has easy access to products that align with their values, no matter where they are. We strive to build a global community, fostering economic growth for halal businesses and creating a vibrant ecosystem of trust, quality, and shared faith-based principles.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
