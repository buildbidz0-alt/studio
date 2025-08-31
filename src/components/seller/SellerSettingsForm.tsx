"use client"

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";

const formSchema = z.object({
  storeName: z.string().min(3, "Store name must be at least 3 characters."),
  businessDetails: z.string().min(20, "Please provide more details about your business."),
  bankAccountNumber: z.string().min(9, "Please enter a valid bank account number."),
  ifscCode: z.string().length(11, "Please enter a valid 11-character IFSC code."),
  gstNumber: z.string().optional(),
});

export function SellerSettingsForm() {
  const { user, updateUser } = useAuth();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      storeName: "",
      businessDetails: "",
      bankAccountNumber: "",
      ifscCode: "",
      gstNumber: "",
    },
  });

  useEffect(() => {
    if (user && user.role === 'seller') {
        form.reset({
            storeName: user.storeName || "",
            businessDetails: user.businessDetails || "",
            bankAccountNumber: user.bankAccountNumber || "",
            ifscCode: user.ifscCode || "",
            gstNumber: user.gstNumber || ""
        });
    }
  }, [user, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
      if (!user) return;
    try {
        const updatedUser = {
            ...user,
            ...values,
        }
        await updateUser(updatedUser);
        toast({
            title: "Settings Saved!",
            description: "Your store information has been successfully updated.",
        });
    } catch (err: any) {
        toast({
            title: "Error",
            description: "There was an error saving your settings. Please try again.",
            variant: "destructive"
        });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                name="ifscCode"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>IFSC Code</FormLabel>
                    <FormControl>
                    <Input placeholder="Your bank's IFSC code" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
        </div>
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
        <Button type="submit" disabled={form.formState.isSubmitting}>
           {form.formState.isSubmitting ? 'Saving...' : 'Save Changes'}
        </Button>
      </form>
    </Form>
  );
}
