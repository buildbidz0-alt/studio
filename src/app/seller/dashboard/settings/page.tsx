import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SellerSettingsForm } from "@/components/seller/SellerSettingsForm";

export default function SellerSettingsPage() {
    return (
        <div className="container mx-auto py-12">
            <Breadcrumb className="mb-8">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/seller/dashboard">Dashboard</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Store Settings</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <Card className="max-w-2xl mx-auto">
                <CardHeader>
                    <CardTitle className="font-headline text-3xl">Store Settings</CardTitle>
                    <CardDescription>Manage your business details and bank information.</CardDescription>
                </CardHeader>
                <CardContent>
                    <SellerSettingsForm />
                </CardContent>
            </Card>
        </div>
    )
}
