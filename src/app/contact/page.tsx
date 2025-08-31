
"use client";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/hooks/use-language";

export default function ContactPage() {
  const { t } = useLanguage();
  return (
    <div className="container mx-auto py-12">
        <Breadcrumb className="mb-8">
            <BreadcrumbList>
                <BreadcrumbItem>
                <BreadcrumbLink href="/">{t('breadcrumb_home')}</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                <BreadcrumbPage>{t('breadcrumb_contact')}</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
      <div className="text-center">
        <h1 className="font-headline text-5xl md:text-6xl">{t('contact_title')}</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          {t('contact_description')}
        </p>
      </div>

      <div className="mt-12 max-w-2xl mx-auto">
        <form className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="first-name" className="block text-sm font-medium text-foreground">{t('contact_form_first_name')}</label>
                    <Input id="first-name" name="first-name" type="text" className="mt-1" />
                </div>
                <div>
                    <label htmlFor="last-name" className="block text-sm font-medium text-foreground">{t('contact_form_last_name')}</label>
                    <Input id="last-name" name="last-name" type="text" className="mt-1" />
                </div>
            </div>
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground">{t('contact_form_email')}</label>
                <Input id="email" name="email" type="email" className="mt-1" />
            </div>
            <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground">{t('contact_form_message')}</label>
                <Textarea id="message" name="message" rows={4} className="mt-1" />
            </div>
            <div>
                <Button type="submit" className="w-full" size="lg">{t('contact_form_send')}</Button>
            </div>
        </form>
      </div>
    </div>
  );
}
