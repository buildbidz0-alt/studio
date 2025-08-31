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
import Image from "next/image";
import { UploadCloud } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(3, "Product name must be at least 3 characters."),
  description: z.string().min(10, "Description must be at least 10 characters."),
  price: z.coerce.number().positive("Price must be a positive number."),
  category: z.enum(['Food', 'Cosmetics', 'Apparel', 'Home Goods']),
  image: z.any()
    .refine((files) => files?.length == 1, "Image is required.")
    .refine((files) => files?.[0]?.size <= 5000000, `Max file size is 5MB.`)
    .refine(
      (files) => ["image/jpeg", "image/png", "image/webp"].includes(files?.[0]?.type),
      "Only .jpg, .png and .webp formats are supported."
    ),
  isHalalCertified: z.boolean().default(false),
  imageHint: z.string().optional(),
});

export function ProductForm() {
  const { user } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      category: "Food",
      isHalalCertified: true,
      imageHint: "",
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result as string);
        };
        reader.readAsDataURL(file);
    } else {
        setImagePreview(null);
    }
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!user || user.role !== 'seller') {
        toast({
            title: "Authentication Error",
            description: "You must be logged in as a seller to add a product.",
            variant: "destructive"
        });
        return;
    }
    
    if (!imagePreview) {
        toast({
            title: "Image required",
            description: "Please upload an image for the product.",
            variant: "destructive"
        });
        return;
    }

    try {
        const productData = {
            name: values.name,
            description: values.description,
            price: values.price,
            category: values.category,
            isHalalCertified: values.isHalalCertified,
            imageHint: values.imageHint,
            imageUrl: imagePreview,
            sellerId: user.id
        }
        await addProduct(productData);
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
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Image</FormLabel>
                <FormControl>
                    <label className="w-full border-2 border-dashed border-muted-foreground/30 rounded-lg p-6 text-center cursor-pointer hover:border-primary transition-colors block">
                        <UploadCloud className="mx-auto h-12 w-12 text-muted-foreground" />
                        <p className="mt-2 text-sm text-muted-foreground">Click to upload or drag and drop</p>
                        <p className="text-xs text-muted-foreground">PNG, JPG, or WEBP (max 5MB)</p>
                        <Input 
                            type="file" 
                            className="hidden" 
                            {...form.register("image")}
                            onChange={(e) => {
                                field.onChange(e.target.files)
                                handleImageChange(e)
                            }}
                            accept=".jpg,.jpeg,.png,.webp"
                        />
                    </label>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {imagePreview && (
            <div>
                <FormLabel>Image Preview</FormLabel>
                <div className="mt-2 relative w-full aspect-video rounded-md overflow-hidden border">
                    <Image src={imagePreview} alt="Image Preview" fill className="object-cover" />
                </div>
            </div>
        )}
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
