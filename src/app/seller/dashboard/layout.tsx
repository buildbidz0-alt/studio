"use client";

import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";

export default function SellerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (user?.role !== "seller") {
        router.replace("/login");
      } else if (user.status !== "approved") {
        router.replace("/seller/join"); // Or a dedicated "pending approval" page
      }
    }
  }, [user, isLoading, router]);

  if (isLoading || user?.role !== "seller" || user.status !== 'approved') {
    return (
        <div className="container mx-auto py-24 flex items-center justify-center">
            <Card className="w-[450px]">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <AlertTriangle className="text-destructive" />
                        Access Denied
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p>Your seller account is not active. It might be pending approval or has been rejected.</p>
                    <p className="mt-2 text-sm text-muted-foreground">If you believe this is an error, please contact support.</p>
                </CardContent>
            </Card>
        </div>
    );
  }

  return <>{children}</>;
}
