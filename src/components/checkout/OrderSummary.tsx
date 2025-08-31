
"use client";

import Image from "next/image";
import { useCart } from "@/hooks/use-cart";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useLanguage } from "@/hooks/use-language";

export function OrderSummary() {
  const { cartItems, cartTotal } = useCart();
  const { t } = useLanguage();

  return (
    <Card className="sticky top-24">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">{t('cart_summary_title')}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4 max-h-64 overflow-y-auto pr-2">
            {cartItems.map((item) => (
                <div key={item.product.id} className="flex items-center gap-4">
                    <div className="relative h-16 w-16 flex-shrink-0">
                        <Image
                        src={item.product.imageUrls[0]}
                        alt={item.product.name}
                        fill
                        className="object-cover rounded-md"
                        />
                        <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs">
                            {item.quantity}
                        </span>
                    </div>
                    <div className="flex-grow">
                        <p className="font-body font-semibold">{item.product.name}</p>
                    </div>
                    <p className="font-body font-semibold">
                        ₹{(item.product.price * item.quantity).toFixed(2)}
                    </p>
                </div>
            ))}
        </div>
        <Separator />
        <div className="flex justify-between font-body">
            <span>{t('cart_summary_subtotal')}</span>
            <span>₹{cartTotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-body">
            <span>{t('cart_summary_shipping')}</span>
            <span className="text-primary font-semibold">{t('cart_summary_shipping_free')}</span>
        </div>
        <Separator />
      </CardContent>
      <CardFooter>
        <div className="flex justify-between font-bold text-lg w-full">
            <span>{t('cart_summary_total')}</span>
            <span>₹{cartTotal.toFixed(2)}</span>
        </div>
      </CardFooter>
    </Card>
  );
}
