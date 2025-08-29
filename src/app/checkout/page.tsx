import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";
import { OrderSummary } from "@/components/checkout/OrderSummary";

export default function CheckoutPage() {
  return (
    <div className="container mx-auto py-12">
      <Breadcrumb className="mb-8">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/cart">Cart</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Checkout</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="text-left mb-8">
        <h1 className="font-headline text-5xl md:text-6xl">Checkout</h1>
        <p className="text-muted-foreground mt-2 text-lg">
          Complete your purchase by providing the details below.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-12 items-start">
        <div className="lg:col-span-2">
            <CheckoutForm />
        </div>
        <div className="lg:col-span-1">
            <OrderSummary />
        </div>
      </div>
    </div>
  );
}
