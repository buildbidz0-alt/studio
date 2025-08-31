
"use client"

import { useEffect, useState } from 'react';
import { getPendingProducts, updateProductStatus, type Product } from '@/lib/data';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';
import { useLanguage } from '@/hooks/use-language';

export function ProductApprovals() {
  const [pendingProducts, setPendingProducts] = useState<Product[]>([]);
  const { toast } = useToast();
  const { language } = useLanguage();

  const fetchPendingProducts = async () => {
    const products = await getPendingProducts();
    setPendingProducts(products);
  };

  useEffect(() => {
    fetchPendingProducts();
  }, []);

  const handleStatusChange = (productId: string, status: 'approved' | 'rejected') => {
    updateProductStatus(productId, status);
    toast({
      title: "Product Status Updated",
      description: `Product has been ${status}.`
    });
    fetchPendingProducts(); // Refresh the list
  };

  if (pendingProducts.length === 0) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Product Approvals</CardTitle>
                <CardDescription>
                Review and approve new products submitted by sellers.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground text-center py-8">There are no products pending review.</p>
            </CardContent>
        </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Product Approvals</CardTitle>
        <CardDescription>
          Review and approve new products submitted by sellers.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Product Name</TableHead>
              <TableHead>Seller ID</TableHead>
              <TableHead>Price</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pendingProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <Image src={product.imageUrls[0]} alt={product.name[language]} width={48} height={48} className="rounded-md object-cover" />
                </TableCell>
                <TableCell className="font-medium">{product.name[language]}</TableCell>
                <TableCell>{product.sellerId}</TableCell>
                <TableCell>₹{product.price.toFixed(2)}</TableCell>
                <TableCell className="text-right space-x-2">
                   <Button size="sm" onClick={() => handleStatusChange(product.id, 'approved')}>
                     Approve
                   </Button>
                   <Button size="sm" variant="destructive" onClick={() => handleStatusChange(product.id, 'rejected')}>
                     Reject
                   </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
