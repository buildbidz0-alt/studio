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
      } 
      // We no longer check for status here to allow access to the dashboard
      // else if (user.status !== "approved") {
      //   router.replace("/seller/join"); 
      // }
    }
  }, [user, isLoading, router]);

  if (isLoading || user?.role !== "seller") {
    return (
        <div className="container mx-auto py-24 flex items-center justify-center">
            <Card className="w-[450px]">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <AlertTriangle className="text-destructive" />
                        Access Denied
                    </Title>
                </CardHeader>
                <CardContent>
                    <p>You must be logged in as a seller to view this page.</p>
                </CardContent>
            </Card>
        </div>
    );
  }

  return <>{children}</>;
}
