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
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { User } from "@/hooks/use-auth";

export function UserManagement() {
  const { users, updateUserStatus } = useAuth();
  const { toast } = useToast();

  const handleStatusChange = (user: User, status: 'approved' | 'rejected' | 'pending') => {
    if (user.role !== 'seller') {
      toast({
        title: "Action Not Applicable",
        description: `Status changes can only be applied to sellers.`,
        variant: "destructive"
      });
      return;
    }
    updateUserStatus(user.id, status);
    toast({
        title: "Seller Status Updated",
        description: `${user.storeName || user.email} has been ${status}.`
    })
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Management</CardTitle>
        <CardDescription>
          View and manage all user accounts on the platform.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.role === 'seller' ? user.storeName : `${user.firstName} ${user.lastName}`}</TableCell>
                <TableCell>{user.email}</TableCell>
                 <TableCell>
                  <Badge variant="outline" className="capitalize">{user.role}</Badge>
                </TableCell>
                <TableCell>
                  {user.role === 'seller' ? (
                    <Badge
                        variant={
                        user.status === "approved"
                            ? "default"
                            : user.status === "rejected"
                            ? "destructive"
                            : "secondary"
                        }
                        className="capitalize"
                    >
                        {user.status}
                    </Badge>
                  ) : (
                    <span className="text-muted-foreground">-</span>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                       <DropdownMenuLabel>User Details</DropdownMenuLabel>
                       <DropdownMenuSeparator />
                       <div className="px-2 py-1.5 text-xs text-muted-foreground">
                        <p><span className="font-semibold">Name:</span> {user.firstName} {user.lastName}</p>
                        {user.role === 'seller' && user.gstNumber && <p><span className="font-semibold">GST:</span> {user.gstNumber}</p>}
                        {user.role === 'seller' && user.bankAccountNumber && <p><span className="font-semibold">Bank Acc:</span> {user.bankAccountNumber}</p>}
                        {user.role === 'seller' && user.ifscCode && <p><span className="font-semibold">IFSC:</span> {user.ifscCode}</p>}
                       </div>
                       {user.role === 'seller' && (
                        <>
                        <DropdownMenuSeparator />
                        <DropdownMenuLabel>Seller Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => handleStatusChange(user, 'approved')}>
                            Approve
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleStatusChange(user, 'rejected')}>
                            Reject
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleStatusChange(user, 'pending')}>
                            Set as Pending
                          </DropdownMenuItem>
                        </>
                       )}
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
