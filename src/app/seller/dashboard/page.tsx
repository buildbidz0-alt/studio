import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DollarSign, Package, ShoppingCart, Users, PlusCircle } from "lucide-react";
import Link from "next/link";
import { SellerProductList } from "@/components/seller/SellerProductList";

export default function SellerDashboardPage() {
  return (
    <div className="container mx-auto py-12">
      <div className="mb-8">
        <h1 className="font-headline text-5xl">Seller Dashboard</h1>
        <p className="text-muted-foreground text-lg mt-2">
          Manage your store and products here.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Revenue
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹1,24,534.00</div>
            <p className="text-xs text-muted-foreground">
              +15.2% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Orders
            </CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+12</div>
            <p className="text-xs text-muted-foreground">
              3 ready for dispatch
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <p className="text-xs text-muted-foreground">
              Total products listed
            </p>
          </CardContent>
        </Card>
         <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Store Rating
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.8/5</div>
            <p className="text-xs text-muted-foreground">
              Based on 245 reviews
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="mt-8 grid gap-8 md:grid-cols-2">
        <Card>
            <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>A list of your most recent orders.</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">Order management will be available here soon.</p>
            </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Manage Your Products</CardTitle>
              <CardDescription>Add, edit, or remove your product listings.</CardDescription>
            </div>
            <Button asChild>
                <Link href="/seller/dashboard/products">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Product
                </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <SellerProductList limit={3} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
