import { LoginForm } from "@/components/auth/LoginForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="container mx-auto flex items-center justify-center py-12 sm:py-24">
      <div className="mx-auto w-[400px]">
        <Tabs defaultValue="customer">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="customer">Customer</TabsTrigger>
            <TabsTrigger value="seller">Seller</TabsTrigger>
          </TabsList>
          <TabsContent value="customer">
             <div className="mx-auto grid w-full gap-6 pt-6">
                <div className="grid gap-2 text-center">
                <h1 className="font-headline text-4xl">Customer Login</h1>
                <p className="text-muted-foreground">
                    Enter your email to login to your account.
                </p>
                </div>
                <LoginForm />
                <div className="mt-4 text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link href="/signup" className="underline">
                    Sign up
                </Link>
                </div>
            </div>
          </TabsContent>
          <TabsContent value="seller">
            <div className="mx-auto grid w-full gap-6 pt-6">
                <div className="grid gap-2 text-center">
                <h1 className="font-headline text-4xl">Seller Login</h1>
                <p className="text-muted-foreground">
                    Enter your seller email to login to your dashboard.
                </p>
                </div>
                <LoginForm />
                <div className="mt-4 text-center text-sm">
                    Want to sell on Jalal Bazaar?{" "}
                    <Link href="/seller/join" className="underline">
                        Become a Seller
                    </Link>
                </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
