
"use client";

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
import { useLanguage } from "@/hooks/use-language";

export default function CheckoutPage() {
  const { t } = useLanguage();
  return (
    <div className="container mx-auto py-12">
      <Breadcrumb className="mb-8">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">{t('breadcrumb_home')}</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/cart">{t('breadcrumb_cart')}</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{t('breadcrumb_checkout')}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="text-left mb-8">
        <h1 className="font-headline text-5xl md:text-6xl">{t('checkout_title')}</h1>
        <p className="text-muted-foreground mt-2 text-lg">
          {t('checkout_description')}
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
