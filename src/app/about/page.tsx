
"use client";

import Image from "next/image";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb"
import { useLanguage } from "@/hooks/use-language";

export default function AboutPage() {
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
                <BreadcrumbPage>{t('about_us_breadcrumb')}</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
      <div className="space-y-12">
        <div className="text-center">
          <h1 className="font-headline text-5xl md:text-6xl text-primary">{t('about_our_story_title')}</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            {t('about_our_story_desc')}
          </p>
        </div>

        <div className="relative h-[50vh] w-full rounded-lg overflow-hidden shadow-lg">
            <Image
                src="https://picsum.photos/1200/800"
                alt={t('about_image_alt')}
                fill
                className="object-cover"
                data-ai-hint="diverse community"
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white p-8">
                <h2 className="font-headline text-4xl md:text-5xl">{t('about_commitment_title')}</h2>
                <p className="mt-4 max-w-2xl font-body text-lg md:text-xl">
                    {t('about_commitment_desc')}
                </p>
            </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="font-headline text-4xl mb-4">{t('about_mission_title')}</h3>
            <p className="text-muted-foreground text-lg leading-relaxed">
              {t('about_mission_desc')}
            </p>
          </div>
          <div>
            <h3 className="font-headline text-4xl mb-4">{t('about_vision_title')}</h3>
            <p className="text-muted-foreground text-lg leading-relaxed">
              {t('about_vision_desc')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
