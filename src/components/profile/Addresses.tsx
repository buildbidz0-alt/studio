import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Home, Pencil, Trash2, PlusCircle } from "lucide-react";

const mockAddresses = [
  {
    id: 'addr-1',
    type: 'Home',
    street: '123 Muslim Quarter',
    city: 'New Delhi',
    state: 'Delhi',
    zip: '110006',
    country: 'India',
    isDefault: true,
  },
  {
    id: 'addr-2',
    type: 'Office',
    street: '456 Business Hub',
    city: 'Mumbai',
    state: 'Maharashtra',
    zip: '400001',
    country: 'India',
    isDefault: false,
  }
];

export function Addresses() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
            <CardTitle className="font-headline text-2xl">Manage Addresses</CardTitle>
            <CardDescription>Add or edit your shipping addresses.</CardDescription>
        </div>
        <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New Address
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockAddresses.map(address => (
            <div key={address.id} className="border p-4 rounded-lg flex items-start gap-4 transition-colors hover:bg-muted/50">
              <Home className="h-6 w-6 text-muted-foreground mt-1 flex-shrink-0" />
              <div className="flex-grow">
                <p className="font-bold">{address.type} {address.isDefault && <span className="text-xs font-normal bg-primary/10 text-primary px-2 py-0.5 rounded-full ml-2">Default</span>}</p>
                <address className="not-italic text-muted-foreground">
                    {address.street}<br/>
                    {address.city}, {address.state} {address.zip}<br/>
                    {address.country}
                </address>
              </div>
              <div className="flex gap-1">
                <Button variant="ghost" size="icon"><Pencil className="h-4 w-4" /><span className="sr-only">Edit</span></Button>
                <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive"><Trash2 className="h-4 w-4" /><span className="sr-only">Delete</span></Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
