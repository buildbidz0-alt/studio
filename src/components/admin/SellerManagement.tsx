"use client";

import { useAuth } from "@/hooks/use-auth";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function SellerManagement() {
  const { users, updateUserStatus } = useAuth();
  const { toast } = useToast();
  const sellers = users.filter((u) => u.role === "seller");

  const handleStatusChange = (userId: string, status: 'approved' | 'rejected' | 'pending') => {
    updateUserStatus(userId, status);
    toast({
        title: "Seller Status Updated",
        description: `Seller has been ${status}.`
    })
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Seller Management</CardTitle>
        <CardDescription>
          Review and manage seller accounts on the platform.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Store Name</TableHead>
              <TableHead>Contact Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sellers.map((seller) => (
              <TableRow key={seller.id}>
                <TableCell className="font-medium">{seller.storeName}</TableCell>
                <TableCell>{seller.email}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      seller.status === "approved"
                        ? "default"
                        : seller.status === "rejected"
                        ? "destructive"
                        : "secondary"
                    }
                    className="capitalize"
                  >
                    {seller.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleStatusChange(seller.id, 'approved')}>
                        Approve
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleStatusChange(seller.id, 'rejected')}>
                        Reject
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleStatusChange(seller.id, 'pending')}>
                        Set as Pending
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
