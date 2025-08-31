

"use client"

import { useEffect, useState } from 'react';
import { getAllProducts, deleteProduct as deleteProductAction, type Product } from '@/lib/data';
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
import { MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import Link from 'next/link';

export function ProductManagement() {
  const [products, setProducts] = useState<Product[]>([]);
  const { toast } = useToast();

  const fetchAllProducts = async () => {
    const allProducts = await getAllProducts();
    setProducts(allProducts);
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const handleDelete = (productId: string, productName: string) => {
    // In a real app, you'd want a confirmation dialog here
    deleteProductAction(productId);
    toast({
      title: "Product Deleted",
      description: `"${productName}" has been removed from the platform.`,
      variant: "destructive"
    });
    fetchAllProducts(); // Refresh the list
  };

  const handleEdit = (productId: string) => {
      // In a real app, this would open a modal or navigate to an edit page
      toast({
          title: "Edit Action",
          description: `Navigating to edit page for product ${productId}. (Not implemented)`
      })
  }

  if (products.length === 0) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Product Management</CardTitle>
                <CardDescription>
                View, edit, or delete any product on the platform.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground text-center py-8">There are no products on the platform yet.</p>
            </CardContent>
        </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Product Management</CardTitle>
        <CardDescription>
          View, edit, or delete any product on the platform.
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
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <Image src={product.imageUrls[0]} alt={product.name} width={48} height={48} className="rounded-md object-cover" />
                </TableCell>
                <TableCell className="font-medium">
                  <Link href={`/products/${product.id}`} className="hover:underline text-primary">
                    {product.name}
                  </Link>
                </TableCell>
                <TableCell>{product.sellerId}</TableCell>
                <TableCell>₹{product.price.toFixed(2)}</TableCell>
                <TableCell>
                    <Badge
                        variant={
                        product.status === "approved"
                            ? "default"
                            : product.status === "rejected"
                            ? "destructive"
                            : "secondary"
                        }
                        className="capitalize"
                    >
                        {product.status}
                    </Badge>
                </TableCell>
                <TableCell className="text-right space-x-2">
                   <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem onClick={() => handleEdit(product.id)}>
                                <Pencil className="mr-2 h-4 w-4" />
                                Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDelete(product.id, product.name)} className="text-destructive focus:bg-destructive/10 focus:text-destructive">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                   </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
