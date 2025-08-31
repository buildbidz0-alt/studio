import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import type { Product } from "@/lib/data";

interface OrderItem {
  product: Product;
  quantity: number;
}

interface Order {
  id: string;
  date: string;
  status: 'Delivered' | 'Processing' | 'Cancelled';
  total: number;
  items: OrderItem[];
}

const mockOrders: Order[] = [
  {
    id: 'ORD-12345',
    date: '2023-10-26',
    status: 'Delivered',
    total: 4878,
    items: [
      { product: { id: 'prod-2', name: 'Luxury Silk Hijab', price: 3600, imageUrls: ['https://picsum.photos/100/100'], category: 'Apparel', sellerId: 'seller-2', isHalalCertified: true, imageHint: 'silk scarf' } as Product, quantity: 1 },
      { product: { id: 'prod-4', name: 'Artisanal Honey', price: 1279, imageUrls: ['https://picsum.photos/100/100'], category: 'Food', sellerId: 'seller-1', isHalalCertified: true, imageHint: 'honey jar' } as Product, quantity: 1 },
    ],
  },
  {
    id: 'ORD-67890',
    date: '2023-11-15',
    status: 'Processing',
    total: 8999,
    items: [
       { product: { id: 'prod-8', name: 'Linen Open Abaya', price: 7199, imageUrls: ['https://picsum.photos/100/100'], category: 'Apparel', sellerId: 'seller-2', isHalalCertified: true, imageHint: 'modest fashion' } as Product, quantity: 1 },
       { product: { id: 'prod-10', name: 'Argan Oil Hair Serum', price: 1800, imageUrls: ['https://picsum.photos/100/100'], category: 'Cosmetics', sellerId: 'seller-3', isHalalCertified: true, imageHint: 'hair oil' } as Product, quantity: 1 },
    ],
  },
];


export function OrderHistory() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Order History</CardTitle>
        <CardDescription>View your past orders and their status.</CardDescription>
      </CardHeader>
      <CardContent>
        {mockOrders.length === 0 ? (
          <p className="text-muted-foreground">You have not placed any orders yet.</p>
        ) : (
          <Accordion type="single" collapsible className="w-full">
            {mockOrders.map(order => (
              <AccordionItem key={order.id} value={order.id}>
                <AccordionTrigger>
                  <div className="flex justify-between w-full pr-4 items-center">
                    <div className="text-left">
                      <p className="font-bold">Order #{order.id}</p>
                      <p className="text-sm text-muted-foreground">{new Date(order.date).toLocaleDateString()}</p>
                    </div>
                    <div className="text-right flex flex-col items-end gap-1">
                       <Badge variant={order.status === 'Delivered' ? 'default' : order.status === 'Cancelled' ? 'destructive' : 'secondary'}>{order.status}</Badge>
                       <p className="font-bold text-lg">₹{order.total.toFixed(2)}</p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                    <div className="space-y-4 pt-4">
                        <h4 className="font-semibold">Items in this order</h4>
                        {order.items.map(item => (
                            <div key={item.product.id} className="flex items-center gap-4">
                                <Image src={item.product.imageUrls[0]} alt={item.product.name} width={64} height={64} className="rounded-md object-cover" data-ai-hint={item.product.imageHint} />
                                <div className="flex-grow">
                                    <p className="font-semibold">{item.product.name}</p>
                                    <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                                </div>
                                <p className="ml-auto font-semibold">₹{(item.product.price * item.quantity).toFixed(2)}</p>
                            </div>
                        ))}
                    </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </CardContent>
    </Card>
  );
}
