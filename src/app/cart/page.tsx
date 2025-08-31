
"use client";

import { CartView } from "@/components/cart/CartView";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { useLanguage } from "@/hooks/use-language";

export default function CartPage() {
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
                <BreadcrumbPage>{t('cart_breadcrumb')}</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
        <div className="text-left mb-8">
            <h1 className="font-headline text-5xl md:text-6xl">{t('cart_title')}</h1>
            <p className="text-muted-foreground mt-2 text-lg">
                {t('cart_description')}
            </p>
        </div>
        <CartView />
    </div>
  );
}
