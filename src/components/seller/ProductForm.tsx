
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
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { addProduct, updateProduct, type Product } from "@/lib/data";
import Image from "next/image";
import { UploadCloud, X } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";

const MAX_IMAGES = 5;
const MAX_FILE_SIZE = 5000000; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

const formSchema = z.object({
  name_en: z.string().min(3, "Product name must be at least 3 characters."),
  name_hi: z.string().min(1, "Hindi name is required."),
  name_ur: z.string().min(1, "Urdu name is required."),
  name_ar: z.string().min(1, "Arabic name is required."),
  name_tr: z.string().min(1, "Turkish name is required."),
  name_ms: z.string().min(1, "Malay name is required."),
  name_fr: z.string().min(1, "French name is required."),
  description: z.string().min(10, "Description must be at least 10 characters."),
  price: z.coerce.number().positive("Price must be a positive number."),
  category: z.enum(['Food', 'Cosmetics', 'Apparel', 'Home Goods']),
  images: z.any()
    .refine((files) => files?.length > 0, "At least one image is required.")
    .refine((files) => files?.length <= MAX_IMAGES, `You can upload a maximum of ${MAX_IMAGES} images.`)
    .refine((files) => Array.from(files).every((file: any) => file?.size <= MAX_FILE_SIZE), `Max file size is 5MB.`)
    .refine(
      (files) => Array.from(files).every((file: any) => ACCEPTED_IMAGE_TYPES.includes(file?.type)),
      "Only .jpg, .png and .webp formats are supported."
    ).optional().or(z.literal('')),
  isHalalCertified: z.boolean().default(false),
  imageHint: z.string().optional(),
});

interface ProductFormProps {
    product?: Product;
}

export function ProductForm({ product }: ProductFormProps) {
  const { user } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const { language } = useLanguage();
  const [imagePreviews, setImagePreviews] = useState<string[]>(product?.imageUrls || []);
  const isEditMode = !!product;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name_en: "",
      name_hi: "",
      name_ur: "",
      name_ar: "",
      name_tr: "",
      name_ms: "",
      name_fr: "",
      description: "",
      price: 0,
      category: "Food",
      isHalalCertified: true,
      imageHint: "",
      images: [],
    },
  });

   useEffect(() => {
    if (isEditMode && product) {
      form.reset({
        name_en: product.name.en,
        name_hi: product.name.hi,
        name_ur: product.name.ur,
        name_ar: product.name.ar,
        name_tr: product.name.tr,
        name_ms: product.name.ms,
        name_fr: product.name.fr,
        description: product.description,
        price: product.price,
        category: product.category,
        isHalalCertified: product.isHalalCertified,
        imageHint: product.imageHint || "",
      });
      setImagePreviews(product.imageUrls);
    }
  }, [product, isEditMode, form]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newPreviews: string[] = [];
      const fileArray = Array.from(files);

      if (fileArray.length + imagePreviews.length > MAX_IMAGES) {
          toast({
              title: "Too many images",
              description: `You can only upload a maximum of ${MAX_IMAGES} images.`,
              variant: "destructive"
          });
          return;
      }

      fileArray.forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          newPreviews.push(reader.result as string);
          if (newPreviews.length === fileArray.length) {
            setImagePreviews(prev => [...prev, ...newPreviews]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  }

  const removeImage = (index: number) => {
    const newPreviews = [...imagePreviews];
    newPreviews.splice(index, 1);
    setImagePreviews(newPreviews);
    
    const currentImages = form.getValues("images");
    if (currentImages && typeof currentImages !== 'string') {
        const newImages = Array.from(currentImages).filter((_, i) => i !== index);
        
        const dataTransfer = new DataTransfer();
        newImages.forEach(file => dataTransfer.items.add(file as File));
        form.setValue("images", dataTransfer.files);
    }
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!user) {
        toast({
            title: "Authentication Error",
            description: "You must be logged in to perform this action.",
            variant: "destructive"
        });
        return;
    }
    
    if (imagePreviews.length === 0) {
        toast({
            title: "Images required",
            description: "Please upload at least one image for the product.",
            variant: "destructive"
        });
        return;
    }
    
    const productDataPayload = {
        name: {
            en: values.name_en,
            hi: values.name_hi,
            ur: values.name_ur,
            ar: values.name_ar,
            tr: values.name_tr,
            ms: values.name_ms,
            fr: values.name_fr,
        },
        description: values.description,
        price: values.price,
        category: values.category,
        isHalalCertified: values.isHalalCertified,
        imageHint: values.imageHint,
        imageUrls: imagePreviews,
    };


    try {
        if (isEditMode && product) {
            await updateProduct(product.id, productDataPayload);
            toast({
                title: "Product Updated!",
                description: `${productDataPayload.name[language]} has been successfully updated.`,
            });
            router.push(user.role === 'admin' ? '/admin' : '/seller/dashboard/products');
        } else {
            await addProduct({
                ...productDataPayload,
                sellerId: user.id
            });
            toast({
                title: "Product Submitted!",
                description: `${productDataPayload.name[language]} has been submitted for review.`,
            });
            router.push("/seller/dashboard/products");
        }
    } catch (err: any) {
         toast({
            title: "Error",
            description: `There was an error submitting your product. Please try again. ${err.message}`,
            variant: "destructive"
        });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name_en"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Name (English)</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Organic Olive Oil" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
           <FormField
            control={form.control}
            name="name_hi"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Name (Hindi)</FormLabel>
                <FormControl>
                  <Input placeholder="उदा., जैविक जैतून का तेल" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
         <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name_ur"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Name (Urdu)</FormLabel>
                <FormControl>
                  <Input placeholder="مثلاً، نامیاتی زیتون کا تیل" {...field} dir="rtl" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
           <FormField
            control={form.control}
            name="name_ar"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Name (Arabic)</FormLabel>
                <FormControl>
                  <Input placeholder="مثال، زيت زيتون عضوي" {...field} dir="rtl"/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
         <div className="grid grid-cols-2 gap-4">
           <FormField
            control={form.control}
            name="name_tr"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Name (Turkish)</FormLabel>
                <FormControl>
                  <Input placeholder="Örn., Organik Zeytinyağı" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
           <FormField
            control={form.control}
            name="name_ms"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Name (Malay)</FormLabel>
                <FormControl>
                  <Input placeholder="Cth., Minyak Zaitun Organik" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
         <FormField
            control={form.control}
            name="name_fr"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Name (French)</FormLabel>
                <FormControl>
                  <Input placeholder="Ex., Huile d'Olive Biologique" {...field} />
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
          name="images"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Images</FormLabel>
                <FormControl>
                    <label className="w-full border-2 border-dashed border-muted-foreground/30 rounded-lg p-6 text-center cursor-pointer hover:border-primary transition-colors block">
                        <UploadCloud className="mx-auto h-12 w-12 text-muted-foreground" />
                        <p className="mt-2 text-sm text-muted-foreground">Click to upload or drag and drop</p>
                        <p className="text-xs text-muted-foreground">Up to {MAX_IMAGES} images (PNG, JPG, WEBP, max 5MB each)</p>
                        <Input 
                            type="file" 
                            className="hidden" 
                            {...form.register("images")}
                            multiple
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
        {imagePreviews.length > 0 && (
            <div>
                <FormLabel>Image Previews</FormLabel>
                <div className="mt-2 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {imagePreviews.map((preview, index) => (
                        <div key={index} className="relative aspect-square rounded-md overflow-hidden border">
                            <Image src={preview} alt={`Preview ${index + 1}`} fill className="object-cover" />
                             <Button 
                                type="button" 
                                variant="destructive" 
                                size="icon" 
                                className="absolute top-1 right-1 h-6 w-6"
                                onClick={() => removeImage(index)}
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                    ))}
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
                Provide one or two keywords to describe the primary image.
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
          {form.formState.isSubmitting 
            ? (isEditMode ? 'Saving Changes...' : 'Submitting Product...') 
            : (isEditMode ? 'Save Changes' : 'Submit for Review')}
        </Button>
      </form>
    </Form>
  );
}
