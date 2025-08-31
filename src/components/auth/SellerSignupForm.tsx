"use client"

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAuth, type User } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { AlertCircle, UploadCloud } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters."),
  lastName: z.string().min(2, "Last name must be at least 2 characters."),
  storeName: z.string().min(3, "Store name must be at least 3 characters."),
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
  gstNumber: z.string().optional(),
  bankAccountNumber: z.string().min(9, "Please enter a valid bank account number."),
  businessDetails: z.string().min(20, "Please provide more details about your business."),
  document: z.any().optional(),
});

export function SellerSignupForm() {
  const { signup } = useAuth();
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      storeName: "",
      email: "",
      password: "",
      gstNumber: "",
      bankAccountNumber: "",
      businessDetails: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setError(null);
    try {
      const signupData: Omit<User, 'id'> = {
          ...values,
          role: 'seller',
          status: 'pending' // Default status for new sellers
      }
      // In a real app, you would upload the document and store the URL.
      // For this prototype, we'll just log it.
      if (values.document && values.document.length > 0) {
        console.log("Document to upload:", values.document[0].name);
        signupData.documentUrl = `docs/${values.document[0].name}`;
      }

      await signup(signupData);
      form.reset();
    } catch (err: any) {
      setError(err.message);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {error && (
            <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Signup Failed</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
            </Alert>
        )}
        <div className="grid grid-cols-2 gap-4">
            <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
                <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                    <Input placeholder="John" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                    <Input placeholder="Doe" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
        </div>
        <FormField
          control={form.control}
          name="storeName"
          render={({ field }) => (
              <FormItem>
              <FormLabel>Store Name</FormLabel>
              <FormControl>
                  <Input placeholder="My Awesome Store" {...field} />
              </FormControl>
              <FormMessage />
              </FormItem>
          )}
          />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="name@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="businessDetails"
          render={({ field }) => (
            <FormItem>
              <FormLabel>About Your Business</FormLabel>
              <FormControl>
                <Textarea placeholder="Describe your business, the products you sell, and your halal certification status..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="bankAccountNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bank Account Number</FormLabel>
                <FormControl>
                  <Input placeholder="Your bank account number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="gstNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>GST Number</FormLabel>
                <FormControl>
                  <Input placeholder="GSTIN (optional)" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
         <FormField
          control={form.control}
          name="document"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Verification Document</FormLabel>
                <FormControl>
                    <label className="w-full border-2 border-dashed border-muted-foreground/30 rounded-lg p-6 text-center cursor-pointer hover:border-primary transition-colors block">
                        <UploadCloud className="mx-auto h-12 w-12 text-muted-foreground" />
                        <p className="mt-2 text-sm text-muted-foreground">Click to upload document</p>
                        <p className="text-xs text-muted-foreground">(e.g., GST Certificate, Business License)</p>
                        <Input 
                            type="file" 
                            className="hidden" 
                            {...form.register("document")}
                        />
                    </label>
              </FormControl>
               <FormDescription>
                 {field.value?.[0]?.name ? `Selected file: ${field.value[0].name}` : 'No file selected.'}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
           {form.formState.isSubmitting ? 'Submitting for review...' : 'Create Account & Submit for Review'}
        </Button>
      </form>
    </Form>
  );
}
