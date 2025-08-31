"use client";

import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SellerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!user || user.role !== "seller") {
        router.replace("/login");
      }
    }
  }, [user, isLoading, router]);

  if (isLoading || !user || user.role !== "seller") {
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
              <p>You must be logged in as a seller to view this page.</p>
            </CardContent>
          </Card>
        </div>
    );
  }

  if (user.status !== "approved") {
    return (
        <div className="container mx-auto py-24 flex items-center justify-center">
            <Card className="w-[450px] text-center">
                <CardHeader>
                    <div className="mx-auto bg-yellow-100 p-3 rounded-full w-fit mb-2">
                        <Clock className="h-8 w-8 text-yellow-600" />
                    </div>
                    <CardTitle className="font-headline text-3xl">
                       Account Pending Approval
                    </CardTitle>
                    <CardDescription>
                        Thank you for registering! Your account is currently under review by our team. You will be notified via email once it has been approved.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                   <Button onClick={logout}>Log Out</Button>
                </CardContent>
            </Card>
        </div>
    );
  }


  return <>{children}</>;
}
