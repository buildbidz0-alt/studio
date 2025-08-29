"use client";

import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && user?.email !== "admin@jalalbazaar.com") {
      router.replace("/");
    }
  }, [user, isLoading, router]);

  if (isLoading || user?.email !== "admin@jalalbazaar.com") {
    return (
        <div className="container mx-auto py-24 flex items-center justify-center">
            <Card className="w-[400px]">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <AlertTriangle className="text-destructive" />
                        Access Denied
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p>You do not have permission to view this page. Redirecting...</p>
                </CardContent>
            </Card>
        </div>
    );
  }

  return <>{children}</>;
}
