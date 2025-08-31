"use client";

import { useEffect, useState } from "react";
import { useAuth, User } from "@/hooks/use-auth";
import { notFound } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { OrderHistory } from "../profile/OrderHistory";
import { Wishlist } from "../profile/Wishlist";

export function UserDetailView({ userId }: { userId: string }) {
  const { getUserById } = useAuth();
  const [user, setUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    const foundUser = getUserById(userId);
    setUser(foundUser);
  }, [userId, getUserById]);

  if (!user) {
    // This could also be a loading state
    return <p>Loading user...</p>;
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="font-headline text-3xl">
                {user.role === 'seller' ? user.storeName : `${user.firstName} ${user.lastName}`}
              </CardTitle>
              <CardDescription>{user.email}</CardDescription>
            </div>
            <div className="text-right">
              <Badge variant="outline" className="text-lg capitalize">{user.role}</Badge>
               {user.role === 'seller' && (
                    <Badge
                        variant={
                        user.status === "approved"
                            ? "default"
                            : user.status === "rejected"
                            ? "destructive"
                            : "secondary"
                        }
                        className="capitalize ml-2"
                    >
                        {user.status}
                    </Badge>
                  )}
            </div>
          </div>
        </CardHeader>
        {user.role === 'seller' && (
            <CardContent>
                <h3 className="font-semibold mb-2">Business Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                        <p className="text-muted-foreground">Contact Person</p>
                        <p>{user.firstName} {user.lastName}</p>
                    </div>
                     <div>
                        <p className="text-muted-foreground">GST Number</p>
                        <p>{user.gstNumber || 'N/A'}</p>
                    </div>
                    <div>
                        <p className="text-muted-foreground">Bank Account</p>
                        <p>{user.bankAccountNumber || 'N/A'}</p>
                    </div>
                     <div>
                        <p className="text-muted-foreground">IFSC Code</p>
                        <p>{user.ifscCode || 'N/A'}</p>
                    </div>
                    <div className="md:col-span-2">
                        <p className="text-muted-foreground">Business Description</p>
                        <p>{user.businessDetails || 'N/A'}</p>
                    </div>
                </div>
            </CardContent>
        )}
      </Card>
      
      {/* 
        NOTE: In a real application, the OrderHistory and Wishlist components would need to be passed
        the specific user's ID to fetch their data. For this prototype, they use mock data that is not
        user-specific, so they will show the same mock data for every user.
      */}
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
            <h2 className="font-headline text-2xl mb-4">Order History</h2>
            <OrderHistory />
        </div>
         <div>
            <h2 className="font-headline text-2xl mb-4">Wishlist</h2>
            <Wishlist />
        </div>
      </div>
    </div>
  );
}
