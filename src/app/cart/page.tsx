import { CartView } from "@/components/cart/CartView";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export default function CartPage() {
  return (
    <div className="container mx-auto py-12">
        <Breadcrumb className="mb-8">
            <BreadcrumbList>
                <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                <BreadcrumbPage>Shopping Cart</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
        <div className="text-left mb-8">
            <h1 className="font-headline text-5xl md:text-6xl">Your Cart</h1>
            <p className="text-muted-foreground mt-2 text-lg">
                Review your items and proceed to checkout.
            </p>
        </div>
        <CartView />
    </div>
  );
}
