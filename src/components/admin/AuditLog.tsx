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

const mockAuditLogs = [
  {
    id: "log-1",
    actor: "admin@jalalbazaar.com",
    action: "SELLER_APPROVED",
    target: "seller-456-def",
    timestamp: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
  },
  {
    id: "log-2",
    actor: "new.seller@example.com",
    action: "SELLER_REGISTERED",
    target: "user-168...",
    timestamp: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
  },
  {
    id: "log-3",
    actor: "aisha.khan@example.com",
    action: "ORDER_PLACED",
    target: "ORD-12345",
    timestamp: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
  },
  {
    id: "log-4",
    actor: "admin@jalalbazaar.com",
    action: "PRODUCT_UPDATED",
    target: "prod-2",
    timestamp: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
  },
  {
    id: "log-5",
    actor: "seller@example.com",
    action: "PRODUCT_CREATED",
    target: "prod-12",
    timestamp: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
  },
];

export function AuditLog() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Audit Log</CardTitle>
        <CardDescription>
          A log of all significant actions taken on the platform.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Timestamp</TableHead>
              <TableHead>Actor</TableHead>
              <TableHead>Action</TableHead>
              <TableHead>Target ID</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockAuditLogs.map((log) => (
              <TableRow key={log.id}>
                <TableCell>
                  {new Date(log.timestamp).toLocaleString()}
                </TableCell>
                <TableCell>{log.actor}</TableCell>
                <TableCell>
                  <Badge variant="outline">{log.action}</Badge>
                </TableCell>
                <TableCell className="font-mono text-xs">{log.target}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
