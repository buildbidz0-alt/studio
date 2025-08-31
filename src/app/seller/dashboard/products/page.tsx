import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SellerProductList } from "@/components/seller/SellerProductList";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb"

export default function SellerProductsPage() {
    return (
        <div className="container mx-auto py-12">
            <Breadcrumb className="mb-8">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/seller/dashboard">Dashboard</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>My Products</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle className="font-headline text-3xl">My Products</CardTitle>
                        <CardDescription>View, add, and manage your product listings.</CardDescription>
                    </div>
                    <Button asChild>
                        <Link href="/seller/dashboard/products/new">
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Add New Product
                        </Link>
                    </Button>
                </CardHeader>
                <CardContent>
                    <SellerProductList />
                </CardContent>
            </Card>
        </div>
    )
}
