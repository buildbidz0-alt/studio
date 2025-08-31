
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
import { useLanguage } from "@/hooks/use-language";

const formSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters."),
  lastName: z.string().min(2, "Last name must be at least 2 characters."),
  storeName: z.string().min(3, "Store name must be at least 3 characters."),
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
  gstNumber: z.string().optional(),
  bankAccountNumber: z.string().min(9, "Please enter a valid bank account number."),
  ifscCode: z.string().length(11, "Please enter a valid 11-character IFSC code."),
  businessDetails: z.string().min(20, "Please provide more details about your business."),
  document: z.any().optional(),
});

export function SellerSignupForm() {
  const { signup } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const { t } = useLanguage();

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
      ifscCode: "",
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
                <FormLabel>{t('seller_form_first_name')}</FormLabel>
                <FormControl>
                    <Input placeholder={t('seller_form_first_name_placeholder')} {...field} />
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
                <FormLabel>{t('seller_form_last_name')}</FormLabel>
                <FormControl>
                    <Input placeholder={t('seller_form_last_name_placeholder')} {...field} />
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
              <FormLabel>{t('seller_form_store_name')}</FormLabel>
              <FormControl>
                  <Input placeholder={t('seller_form_store_name_placeholder')} {...field} />
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
              <FormLabel>{t('seller_form_email')}</FormLabel>
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
              <FormLabel>{t('seller_form_password')}</FormLabel>
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
              <FormLabel>{t('seller_form_business_details')}</FormLabel>
              <FormControl>
                <Textarea placeholder={t('seller_form_business_details_placeholder')} {...field} />
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
                <FormLabel>{t('seller_form_bank_account')}</FormLabel>
                <FormControl>
                  <Input placeholder={t('seller_form_bank_account_placeholder')} {...field} />
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
                <FormLabel>{t('seller_form_ifsc_code')}</FormLabel>
                <FormControl>
                  <Input placeholder={t('seller_form_ifsc_code_placeholder')} {...field} />
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
                <FormLabel>{t('seller_form_gst')}</FormLabel>
                <FormControl>
                <Input placeholder={t('seller_form_gst_placeholder')} {...field} />
                </FormControl>
                <FormMessage />
            </FormItem>
            )}
        />
         <FormField
          control={form.control}
          name="document"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('seller_form_document')}</FormLabel>
                <FormControl>
                    <label className="w-full border-2 border-dashed border-muted-foreground/30 rounded-lg p-6 text-center cursor-pointer hover:border-primary transition-colors block">
                        <UploadCloud className="mx-auto h-12 w-12 text-muted-foreground" />
                        <p className="mt-2 text-sm text-muted-foreground">{t('seller_form_document_upload')}</p>
                        <p className="text-xs text-muted-foreground">{t('seller_form_document_upload_desc')}</p>
                        <Input 
                            type="file" 
                            className="hidden" 
                            {...form.register("document")}
                        />
                    </label>
              </FormControl>
               <FormDescription>
                 {field.value?.[0]?.name ? `${t('seller_form_document_selected')} ${field.value[0].name}` : t('seller_form_document_none')}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
           {form.formState.isSubmitting ? t('seller_form_submitting_button') : t('seller_form_submit_button')}
        </Button>
      </form>
    </Form>
  );
}
