"use client"

import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { getProductsBySellerId, type Product } from "@/lib/data";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SellerProductListProps {
    limit?: number;
}

export function SellerProductList({ limit }: SellerProductListProps) {
    const { user } = useAuth();
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            if (user?.role === 'seller') {
                setLoading(true);
                const sellerProducts = await getProductsBySellerId(user.id);
                setProducts(limit ? sellerProducts.slice(0, limit) : sellerProducts);
                setLoading(false);
            }
        };
        fetchProducts();
    }, [user, limit]);

    if (loading) {
        return <p>Loading products...</p>
    }

    if (products.length === 0) {
        return <p className="text-muted-foreground text-center py-8">You haven't added any products yet.</p>
    }

    return (
        <div className="border rounded-lg">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[80px]">Image</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {products.map(product => (
                        <TableRow key={product.id}>
                            <TableCell>
                                <Image 
                                    src={product.imageUrls[0]} 
                                    alt={product.name} 
                                    width={48} 
                                    height={48} 
                                    className="rounded-md object-cover"
                                />
                            </TableCell>
                            <TableCell className="font-medium">{product.name}</TableCell>
                            <TableCell><Badge variant="outline">{product.category}</Badge></TableCell>
                            <TableCell>₹{product.price.toFixed(2)}</TableCell>
                            <TableCell className="text-right">
                                <Button variant="ghost" size="icon">
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
