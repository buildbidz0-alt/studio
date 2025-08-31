import { SignupForm } from "@/components/auth/SignupForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Briefcase } from "lucide-react";
import Link from "next/link";

export default function SignupPage() {
  return (
    <div className="container mx-auto flex items-center justify-center py-12 sm:py-24">
      <div className="mx-auto w-[450px]">
         <Tabs defaultValue="customer">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="customer">Create Customer Account</TabsTrigger>
            <TabsTrigger value="seller">Become a Seller</TabsTrigger>
          </TabsList>
          <TabsContent value="customer">
            <div className="mx-auto grid w-full gap-6 pt-6">
                <div className="grid gap-2 text-center">
                <h1 className="font-headline text-4xl">Sign Up</h1>
                <p className="text-muted-foreground">
                    Create an account to start shopping.
                </p>
                </div>
                <SignupForm />
                <div className="mt-4 text-center text-sm">
                Already have an account?{" "}
                <Link href="/login" className="underline">
                    Login
                </Link>
                </div>
            </div>
           </TabsContent>
           <TabsContent value="seller">
            <Card className="mt-6 border-0 shadow-none">
                <CardHeader className="text-center">
                    <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-2">
                        <Briefcase className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="font-headline text-4xl">Sell on Jalal Bazaar</CardTitle>
                    <CardDescription>
                        Join our community of trusted vendors. Create a seller account to reach a global audience.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Button asChild className="w-full" size="lg">
                        <Link href="/seller/join">Get Started</Link>
                    </Button>
                     <div className="mt-6 text-center text-sm">
                        Already have a seller account?{" "}
                        <Link href="/login" className="underline">
                            Login here
                        </Link>
                    </div>
                </CardContent>
            </Card>
           </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
