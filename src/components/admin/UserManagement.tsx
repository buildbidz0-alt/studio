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
import Link from "next/link";

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
          View and manage all user accounts on the platform. Click on a user's name to see full details.
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
                <TableCell className="font-medium">
                  <Link href={`/admin/users/${user.id}`} className="hover:underline text-primary">
                    {user.role === 'seller' ? user.storeName : `${user.firstName} ${user.lastName}`}
                  </Link>
                </TableCell>
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
                       <DropdownMenuLabel>Quick Actions</DropdownMenuLabel>
                       <DropdownMenuSeparator />
                       {user.role === 'seller' && (
                        <>
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
                       <DropdownMenuItem>
                          <Link href={`/admin/users/${user.id}`} className="w-full">View Full Details</Link>
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
