import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MyDetails } from "@/components/profile/MyDetails"
import { OrderHistory } from "@/components/profile/OrderHistory"
import { Wishlist } from "@/components/profile/Wishlist"
import { Addresses } from "@/components/profile/Addresses"
import { User } from "lucide-react"

export default function ProfilePage() {
  return (
    <div className="container mx-auto py-12">
      <Breadcrumb className="mb-8">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>My Account</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex items-start gap-4 mb-8">
        <div className="p-3 rounded-full bg-primary/10 text-primary">
          <User className="h-8 w-8" />
        </div>
        <div>
          <h1 className="font-headline text-4xl">My Account</h1>
          <p className="text-muted-foreground mt-1">Manage your account settings and track your activity.</p>
        </div>
      </div>
      
      <Tabs defaultValue="orders" className="flex flex-col md:flex-row gap-8 items-start">
        <TabsList className="flex flex-row overflow-x-auto md:overflow-x-visible md:flex-col h-auto md:h-full justify-start items-start bg-transparent p-0 border-b md:border-b-0 md:border-r w-full md:w-48">
          <TabsTrigger value="details" className="w-full justify-start text-base data-[state=active]:bg-muted data-[state=active]:text-primary">My Details</TabsTrigger>
          <TabsTrigger value="orders" className="w-full justify-start text-base data-[state=active]:bg-muted data-[state=active]:text-primary">Order History</TabsTrigger>
          <TabsTrigger value="wishlist" className="w-full justify-start text-base data-[state=active]:bg-muted data-[state=active]:text-primary">Wishlist</TabsTrigger>
          <TabsTrigger value="addresses" className="w-full justify-start text-base data-[state=active]:bg-muted data-[state=active]:text-primary">Addresses</TabsTrigger>
        </TabsList>
        <div className="flex-1 w-full">
          <TabsContent value="details"><MyDetails /></TabsContent>
          <TabsContent value="orders"><OrderHistory /></TabsContent>
          <TabsContent value="wishlist"><Wishlist /></TabsContent>
          <TabsContent value="addresses"><Addresses /></TabsContent>
        </div>
      </Tabs>
    </div>
  )
}
