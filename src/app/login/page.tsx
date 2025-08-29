import { LoginForm } from "@/components/auth/LoginForm";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="container mx-auto flex items-center justify-center py-12 sm:py-24">
      <div className="mx-auto grid w-[400px] gap-6">
        <div className="grid gap-2 text-center">
          <h1 className="font-headline text-4xl">Login</h1>
          <p className="text-muted-foreground">
            Enter your email below to login to your account
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
    </div>
  );
}
