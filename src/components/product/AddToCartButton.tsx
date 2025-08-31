
"use client";

import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import type { Product } from "@/lib/data";
import { ShoppingCart } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";

interface AddToCartButtonProps {
  product: Product;
  quantity?: number;
  showIcon?: boolean
}

export function AddToCartButton({ product, quantity = 1, showIcon = false }: AddToCartButtonProps) {
  const { addToCart } = useCart();
  const { t } = useLanguage();

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };
  
  if (showIcon) {
      return (
          <Button size="icon" onClick={handleAddToCart}>
            <ShoppingCart className="h-4 w-4" />
            <span className="sr-only">{t('product_add_to_cart')}</span>
          </Button>
      )
  }

  return (
    <Button onClick={handleAddToCart} className="gap-2">
      <ShoppingCart className="h-4 w-4" />
      <span>{t('product_add_to_cart')}</span>
    </Button>
  );
}
