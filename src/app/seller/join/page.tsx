import { SellerSignupForm } from "@/components/auth/SellerSignupForm";
import { Badge } from "@/components/ui/badge";
import { Briefcase, DollarSign, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function SellerJoinPage() {
  return (
    <>
    <div className="relative bg-secondary">
        <div className="container mx-auto py-20 lg:py-24 text-center">
            <Badge>Start Your Journey</Badge>
            <h1 className="font-headline text-5xl md:text-6xl mt-4">Become a Seller on Jalal Bazaar</h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                Join a community of trusted vendors providing authentic halal products to a global audience. We provide the tools you need to grow your business.
            </p>
        </div>
    </div>
    <div className="container mx-auto py-16">
      <div className="grid lg:grid-cols-5 gap-12">
        <div className="lg:col-span-2">
            <h2 className="font-headline text-3xl mb-2">Start Selling in 3 Easy Steps</h2>
            <p className="text-muted-foreground mb-8">It's easy to get started. Just follow the steps below.</p>
            <div className="space-y-6">
                <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg flex-shrink-0">1</div>
                    <div>
                        <h3 className="font-bold text-lg">Create Your Account</h3>
                        <p className="text-muted-foreground text-sm">Fill out the registration form with your personal and store details. It only takes a few minutes.</p>
                    </div>
                </div>
                 <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg flex-shrink-0">2</div>
                    <div>
                        <h3 className="font-bold text-lg">Upload Your Products</h3>
                        <p className="text-muted-foreground text-sm">Once registered, you can access your seller dashboard to list your halal-certified products and set up your store profile.</p>
                    </div>
                </div>
                 <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg flex-shrink-0">3</div>
                    <div>
                        <h3 className="font-bold text-lg">Submit for Review & Go Live</h3>
                        <p className="text-muted-foreground text-sm">After you've set up your store, submit it for a final review. Our team will verify your certifications and products before you go live.</p>
                    </div>
                </div>
            </div>
             <div className="mt-8 text-sm text-center bg-muted p-4 rounded-lg">
                <p>Already have an account? <Link href="/login" className="font-bold underline">Log In</Link></p>
            </div>
        </div>
        <div className="lg:col-span-3">
          <div className="mx-auto w-full max-w-lg rounded-xl border bg-card p-8 shadow-sm">
            <div className="grid gap-2 text-left mb-6">
              <h1 className="font-headline text-3xl">Seller Registration</h1>
              <p className="text-muted-foreground">
                Enter your details to create your seller account.
              </p>
            </div>
            <SellerSignupForm />
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
