"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart, type CartItem } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, ShoppingBag } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export function CartView() {
  const { cartItems, updateQuantity, removeFromCart, cartTotal } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-24">
        <ShoppingBag className="mx-auto h-24 w-24 text-muted-foreground" />
        <h2 className="mt-6 font-headline text-3xl">Your cart is empty</h2>
        <p className="mt-2 text-muted-foreground">
          Looks like you haven't added anything to your cart yet.
        </p>
        <Button asChild className="mt-6">
          <Link href="/products">Start Shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-3 gap-12 items-start">
      <div className="lg:col-span-2">
        <Card>
            <CardContent className="p-0">
                <div className="divide-y divide-border">
                    {cartItems.map((item) => (
                    <CartItemRow
                        key={item.product.id}
                        item={item}
                        onQuantityChange={updateQuantity}
                        onRemove={removeFromCart}
                    />
                    ))}
                </div>
            </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-1 sticky top-24">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between font-body">
              <span>Subtotal</span>
              <span>₹{cartTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-body">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <Separator />
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>₹{cartTotal.toFixed(2)}</span>
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full" size="lg">
              <Link href="/checkout">Proceed to Checkout</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

interface CartItemRowProps {
  item: CartItem;
  onQuantityChange: (productId: string, quantity: number) => void;
  onRemove: (productId: string) => void;
}

function CartItemRow({ item, onQuantityChange, onRemove }: CartItemRowProps) {
  return (
    <div className="flex items-center p-4 gap-4">
      <div className="relative h-24 w-24 flex-shrink-0">
        <Image
          src={item.product.imageUrl}
          alt={item.product.name}
          fill
          className="object-cover rounded-md"
        />
      </div>
      <div className="flex-grow">
        <Link href={`/products/${item.product.id}`} className="hover:underline">
          <h3 className="font-headline text-lg">{item.product.name}</h3>
        </Link>
        <p className="text-muted-foreground text-sm">
          ₹{item.product.price.toFixed(2)}
        </p>
      </div>
      <div className="flex items-center gap-4">
        <Input
          type="number"
          min="1"
          value={item.quantity}
          onChange={(e) =>
            onQuantityChange(item.product.id, parseInt(e.target.value, 10))
          }
          className="w-20 h-10 text-center"
        />
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onRemove(item.product.id)}
          className="text-muted-foreground hover:text-destructive"
        >
          <Trash2 className="h-5 w-5" />
          <span className="sr-only">Remove item</span>
        </Button>
      </div>
    </div>
  );
}
