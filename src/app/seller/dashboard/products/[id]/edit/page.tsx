
// This file enables the edit functionality for products.
"use client";

import { ProductForm } from "@/components/seller/ProductForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { getProductById, type Product } from "@/lib/data";
import { useEffect, useState, use } from "react";
import { useAuth } from "@/hooks/use-auth";

export default function EditProductPage({ params: paramsPromise }: { params: Promise<{ id: string }> }) {
    const params = use(paramsPromise);
    const [product, setProduct] = useState<Product | undefined>(undefined);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();
    
    useEffect(() => {
        const fetchProduct = async () => {
            const p = await getProductById(params.id);
            setProduct(p);
            setLoading(false);
        }
        fetchProduct();
    }, [params.id]);

    const breadcrumbBase = user?.role === 'admin' ? '/admin' : '/seller/dashboard';
    const breadcrumbBaseLabel = user?.role === 'admin' ? 'Admin' : 'Dashboard';

    if (loading) {
        return <div className="container mx-auto py-12"><p>Loading product...</p></div>
    }

    if (!product) {
        return <div className="container mx-auto py-12"><p>Product not found.</p></div>
    }

    return (
        <div className="container mx-auto py-12">
            <Breadcrumb className="mb-8">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href={breadcrumbBase}>{breadcrumbBaseLabel}</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href={`${breadcrumbBase}/products`}>My Products</BreadcrumbLink>
                    </BreadcrumbItem>
                     <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Edit Product</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <Card className="max-w-2xl mx-auto">
                <CardHeader>
                    <CardTitle className="font-headline text-3xl">Edit Product</CardTitle>
                    <CardDescription>Update the details for your product below.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ProductForm product={product} />
                </CardContent>
            </Card>
        </div>
    )
}
