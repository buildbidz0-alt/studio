
"use client";

import { SellerSignupForm } from "@/components/auth/SellerSignupForm";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/hooks/use-language";
import Link from "next/link";

export default function SellerJoinPage() {
  const { t } = useLanguage();
  return (
    <>
    <div className="relative bg-secondary">
        <div className="container mx-auto py-20 lg:py-24 text-center">
            <Badge>{t('seller_join_badge')}</Badge>
            <h1 className="font-headline text-5xl md:text-6xl mt-4">{t('seller_join_title')}</h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                {t('seller_join_description')}
            </p>
        </div>
    </div>
    <div className="container mx-auto py-16">
      <div className="grid lg:grid-cols-5 gap-12">
        <div className="lg:col-span-2">
            <h2 className="font-headline text-3xl mb-2">{t('seller_join_steps_title')}</h2>
            <p className="text-muted-foreground mb-8">{t('seller_join_steps_desc')}</p>
            <div className="space-y-6">
                <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg flex-shrink-0">1</div>
                    <div>
                        <h3 className="font-bold text-lg">{t('seller_join_step1_title')}</h3>
                        <p className="text-muted-foreground text-sm">{t('seller_join_step1_desc')}</p>
                    </div>
                </div>
                 <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg flex-shrink-0">2</div>
                    <div>
                        <h3 className="font-bold text-lg">{t('seller_join_step2_title')}</h3>
                        <p className="text-muted-foreground text-sm">{t('seller_join_step2_desc')}</p>
                    </div>
                </div>
                 <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg flex-shrink-0">3</div>
                    <div>
                        <h3 className="font-bold text-lg">{t('seller_join_step3_title')}</h3>
                        <p className="text-muted-foreground text-sm">{t('seller_join_step3_desc')}</p>
                    </div>
                </div>
            </div>
             <div className="mt-8 text-sm text-center bg-muted p-4 rounded-lg">
                <p>{t('seller_join_already_account')} <Link href="/login" className="font-bold underline">{t('seller_join_login_link')}</Link></p>
            </div>
        </div>
        <div className="lg:col-span-3">
          <div className="mx-auto w-full max-w-lg rounded-xl border bg-card p-8 shadow-sm">
            <div className="grid gap-2 text-left mb-6">
              <h1 className="font-headline text-3xl">{t('seller_join_form_title')}</h1>
              <p className="text-muted-foreground">
                {t('seller_join_form_desc')}
              </p>
            </div>
            <SellerSignupForm />
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
