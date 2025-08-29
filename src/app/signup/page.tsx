import { SignupForm } from "@/components/auth/SignupForm";
import Link from "next/link";

export default function SignupPage() {
  return (
    <div className="container mx-auto flex items-center justify-center py-12 sm:py-24">
      <div className="mx-auto grid w-[400px] gap-6">
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
    </div>
  );
}
