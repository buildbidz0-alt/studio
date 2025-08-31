
"use client";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb"
import { useLanguage } from "@/hooks/use-language";

export default function TermsOfServicePage() {
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
                <BreadcrumbPage>{t('footer_terms')}</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
        <div className="prose prose-lg max-w-4xl mx-auto">
            <h1 className="font-headline text-5xl">Conditions of Use</h1>
            <p className="text-lg text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>

            <p>Welcome to Jalal Bazaar. Jalal Bazaar provides website features and other products and services to you when you visit or shop at jalalbazaar.com, use Jalal Bazaar products or services, use Jalal Bazaar applications for mobile, or use software provided by Jalal Bazaar in connection with any of the foregoing (collectively, "Jalal Bazaar Services"). Jalal Bazaar provides the Jalal Bazaar Services subject to the following conditions.</p>

            <h2 className="font-headline text-3xl mt-8">By using Jalal Bazaar Services, you agree to these conditions. Please read them carefully.</h2>

            <p>We offer a wide range of Jalal Bazaar Services, and sometimes additional terms may apply. When you use a Jalal Bazaar Service (for example, Your Profile, Your Orders, or Seller Central) you also will be subject to the guidelines, terms and agreements applicable to that Jalal Bazaar Service ("Service Terms"). If these Conditions of Use are inconsistent with the Service Terms, those Service Terms will control.</p>
            
            <h3 className="font-headline text-2xl mt-6">PRIVACY</h3>
            <p>Please review our Privacy Notice, which also governs your use of Jalal Bazaar Services, to understand our practices.</p>
            
            <h3 className="font-headline text-2xl mt-6">ELECTRONIC COMMUNICATIONS</h3>
            <p>When you use Jalal Bazaar Services, or send e-mails, text messages, and other communications from your desktop or mobile device to us, you may be communicating with us electronically. You consent to receive communications from us electronically, such as e-mails, texts, mobile push notices, or notices and messages on this site or through the other Jalal Bazaar Services, and you can retain copies of these communications for your records. You agree that all agreements, notices, disclosures, and other communications that we provide to you electronically satisfy any legal requirement that such communications be in writing.</p>

            <h3 className="font-headline text-2xl mt-6">COPYRIGHT</h3>
            <p>All content included in or made available through any Jalal Bazaar Service, such as text, graphics, logos, button icons, images, audio clips, digital downloads, data compilations, and software is the property of Jalal Bazaar or its content suppliers and protected by Indian and international copyright laws. The compilation of all content included in or made available through any Jalal Bazaar Service is the exclusive property of Jalal Bazaar and protected by Indian and international copyright laws.</p>

            <h3 className="font-headline text-2xl mt-6">YOUR ACCOUNT</h3>
            <p>You may need your own Jalal Bazaar account to use certain Jalal Bazaar Services, and you may be required to be logged in to the account and have a valid payment method associated with it. You are responsible for maintaining the confidentiality of your account and password and for restricting access to your account, and you agree to accept responsibility for all activities that occur under your account or password. Jalal Bazaar does sell products for children, but it sells them to adults, who can purchase with a credit card or other permitted payment method. Jalal Bazaar reserves the right to refuse service, terminate accounts, terminate your rights to use Jalal Bazaar Services, remove or edit content, or cancel orders in its sole discretion.</p>

            <h3 className="font-headline text-2xl mt-6">REVIEWS, COMMENTS, COMMUNICATIONS, AND OTHER CONTENT</h3>
            <p>You may post reviews, comments, photos, videos, and other content; and submit suggestions, ideas, comments, questions, or other information, so long as the content is not illegal, obscene, threatening, defamatory, invasive of privacy, infringing of intellectual property rights (including publicity rights), or otherwise injurious to third parties or objectionable, and does not consist of or contain software viruses, political campaigning, commercial solicitation, chain letters, mass mailings, or any form of "spam" or unsolicited commercial electronic messages. You may not use a false e-mail address, impersonate any person or entity, or otherwise mislead as to the origin of a card or other content. Jalal Bazaar reserves the right (but not the obligation) to remove or edit such content, but does not regularly review posted content.</p>

            <h3 className="font-headline text-2xl mt-6">RISK OF LOSS</h3>
            <p>All purchases of physical items from Jalal Bazaar are made pursuant to a shipment contract. This means that the risk of loss and title for such items pass to you upon our delivery to the carrier.</p>

            <h3 className="font-headline text-2xl mt-6">PRODUCT DESCRIPTIONS</h3>
            <p>Jalal Bazaar attempts to be as accurate as possible. However, Jalal Bazaar does not warrant that product descriptions or other content of any Jalal Bazaar Service is accurate, complete, reliable, current, or error-free. If a product offered by Jalal Bazaar itself is not as described, your sole remedy is to return it in unused condition.</p>

            <h3 className="font-headline text-2xl mt-6">DISCLAIMER OF WARRANTIES AND LIMITATION OF LIABILITY</h3>
            <p>THE JALAL BAZAAR SERVICES AND ALL INFORMATION, CONTENT, MATERIALS, PRODUCTS (INCLUDING SOFTWARE) AND OTHER SERVICES INCLUDED ON OR OTHERWISE MADE AVAILABLE TO YOU THROUGH THE JALAL BAZAAR SERVICES ARE PROVIDED BY JALAL BAZAAR ON AN "AS IS" AND "AS AVAILABLE" BASIS, UNLESS OTHERWISE SPECIFIED IN WRITING. JALAL BAZAAR MAKES NO REPRESENTATIONS OR WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, AS TO THE OPERATION OF THE JALAL BAZAAR SERVICES, OR THE INFORMATION, CONTENT, MATERIALS, PRODUCTS (INCLUDING SOFTWARE) OR OTHER SERVICES INCLUDED ON OR OTHERWISE MADE AVAILABLE TO YOU THROUGH THE JALAL BAZAAR SERVICES, UNLESS OTHERWISE SPECIFIED IN WRITING.</p>
            <p>TO THE FULL EXTENT PERMISSIBLE BY LAW, JALAL BAZAAR DISCLAIMS ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE. JALAL BAZAAR WILL NOT BE LIABLE FOR ANY DAMAGES OF ANY KIND ARISING FROM THE USE OF ANY JALAL BAZAAR SERVICE, OR FROM ANY INFORMATION, CONTENT, MATERIALS, PRODUCTS (INCLUDING SOFTWARE) OR OTHER SERVICES INCLUDED ON OR OTHERWISE MADE AVAILABLE TO YOU THROUGH ANY JALAL BAZAAR SERVICE.</p>

            <h3 className="font-headline text-2xl mt-6">DISPUTES</h3>
            <p>Any dispute or claim relating in any way to your use of any Jalal Bazaar Service will be adjudicated in the state or federal courts in Delhi, India, and you consent to exclusive jurisdiction and venue in these courts. We each waive any right to a jury trial.</p>

            <h3 className="font-headline text-2xl mt-6">APPLICABLE LAW</h3>
            <p>By using any Jalal Bazaar Service, you agree that applicable federal law, and the laws of the state of Delhi, without regard to principles of conflict of laws, will govern these Conditions of Use and any dispute of any sort that might arise between you and Jalal Bazaar.</p>

        </div>
    </div>
  );
}
