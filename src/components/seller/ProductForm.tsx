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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { addProduct, type Product } from "@/lib/data";

const formSchema = z.object({
  name: z.string().min(3, "Product name must be at least 3 characters."),
  description: z.string().min(10, "Description must be at least 10 characters."),
  price: z.coerce.number().positive("Price must be a positive number."),
  category: z.enum(['Food', 'Cosmetics', 'Apparel', 'Home Goods']),
  imageUrl: z.string().url("Please enter a valid image URL."),
  isHalalCertified: z.boolean().default(false),
  imageHint: z.string().optional(),
});

export function ProductForm() {
  const { user } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      category: "Food",
      imageUrl: "https://picsum.photos/600/400",
      isHalalCertified: true,
      imageHint: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!user || user.role !== 'seller') {
        toast({
            title: "Authentication Error",
            description: "You must be logged in as a seller to add a product.",
            variant: "destructive"
        });
        return;
    }
    
    try {
        await addProduct({ ...values, sellerId: user.id });
        toast({
            title: "Product Added!",
            description: `${values.name} has been successfully listed.`,
        });
        router.push("/seller/dashboard/products");
    } catch (err: any) {
         toast({
            title: "Error",
            description: "There was an error adding your product. Please try again.",
            variant: "destructive"
        });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Organic Olive Oil" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Describe your product in detail..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-4">
            <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Price (₹)</FormLabel>
                <FormControl>
                    <Input type="number" placeholder="1999" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Category</FormLabel>
                 <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Food">Food</SelectItem>
                      <SelectItem value="Cosmetics">Cosmetics</SelectItem>
                      <SelectItem value="Apparel">Apparel</SelectItem>
                      <SelectItem value="Home Goods">Home Goods</SelectItem>
                    </SelectContent>
                  </Select>
                <FormMessage />
                </FormItem>
            )}
            />
        </div>
        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Image URL</FormLabel>
              <FormControl>
                <Input placeholder="https://your-image-url.com/image.png" {...field} />
              </FormControl>
               <FormDescription>
                For now, please use a placeholder URL from a service like picsum.photos.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="imageHint"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image Hint</FormLabel>
              <FormControl>
                <Input placeholder="e.g. olive oil" {...field} />
              </FormControl>
               <FormDescription>
                Provide one or two keywords to describe the image.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="isHalalCertified"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                />
                </FormControl>
                <div className="space-y-1 leading-none">
                <FormLabel>
                    Is this product Halal Certified?
                </FormLabel>
                <FormDescription>
                    You must be able to provide certification if requested.
                </FormDescription>
                </div>
            </FormItem>
          )}
        />
        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? 'Adding Product...' : 'Add Product'}
        </Button>
      </form>
    </Form>
  );
}
