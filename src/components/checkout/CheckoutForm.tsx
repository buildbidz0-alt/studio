
"use client";

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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCart } from "@/hooks/use-cart";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";

const formSchema = z.object({
  email: z.string().email(),
  firstName: z.string().min(2, "First name is too short"),
  lastName: z.string().min(2, "Last name is too short"),
  address: z.string().min(5, "Address is too short"),
  city: z.string().min(2, "City is too short"),
  country: z.string().min(2, "Country is too short"),
  postalCode: z.string().min(4, "Postal code is too short"),
});

declare global {
  interface Window {
    Razorpay: any;
  }
}

export function CheckoutForm() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      address: "",
      city: "",
      country: "India",
      postalCode: "",
    },
  });

  useEffect(() => {
    if(user) {
        form.setValue('email', user.email);
        form.setValue('firstName', user.firstName);
        form.setValue('lastName', user.lastName);
    }
  }, [user, form]);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
        document.body.removeChild(script);
    }
  }, []);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (cartTotal <= 0) {
      toast({
        title: "Your cart is empty",
        description: "Please add items to your cart before checking out.",
        variant: "destructive",
      });
      return;
    }

    const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_eJtA5tOqYFvQ9Z', // Fallback to a test key
        amount: cartTotal * 100, // amount in the smallest currency unit
        currency: "INR",
        name: "Jalal Bazaar",
        description: "Your Halal Marketplace Purchase",
        handler: function (response: any) {
            console.log("Razorpay Response:", response);
            toast({
                title: "Order Placed!",
                description: `Thank you for your purchase. Payment ID: ${response.razorpay_payment_id}`,
            });
            clearCart();
            // Here you would typically redirect to an order confirmation page
            // and verify payment on your backend.
        },
        prefill: {
            name: `${values.firstName} ${values.lastName}`,
            email: values.email,
        },
        notes: {
            address: `${values.address}, ${values.city}, ${values.postalCode}`,
        },
        theme: {
            color: "#006B56" // Corresponds to your primary color
        }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Contact & Shipping</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
             <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input placeholder="you@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid md:grid-cols-2 gap-4">
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
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="123 Halal St" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid md:grid-cols-3 gap-4">
                <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                        <Input placeholder="Mecca" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Country</FormLabel>
                    <FormControl>
                        <Input placeholder="India" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="postalCode"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Postal Code</FormLabel>
                    <FormControl>
                        <Input placeholder="12345" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
            </div>
          </CardContent>
        </Card>

        <Button type="submit" className="w-full" size="lg" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? 'Processing...' : `Pay ₹${cartTotal.toFixed(2)} with Razorpay`}
        </Button>
      </form>
    </Form>
  );
}
