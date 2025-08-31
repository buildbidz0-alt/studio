
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

export default function PrivacyPolicyPage() {
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
                <BreadcrumbPage>{t('footer_privacy')}</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
      <div className="prose prose-lg max-w-4xl mx-auto">
        <h1 className="font-headline text-5xl">Privacy Notice</h1>
        <p className="text-lg text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
        
        <p>Jalal Bazaar knows that you care how information about you is used and shared, and we appreciate your trust that we will do so carefully and sensibly. This Privacy Notice describes how Jalal Bazaar and its affiliates collect and process your personal information through Jalal Bazaar websites, devices, products, services, online and physical stores, and applications that reference this Privacy Notice.</p>

        <h2 className="font-headline text-3xl mt-8">What Personal Information About Customers Does Jalal Bazaar Collect?</h2>
        <p>We collect your personal information in order to provide and continually improve our products and services.</p>
        <p>Here are the types of personal information we collect:</p>
        <ul>
          <li><strong>Information You Give Us:</strong> We receive and store any information you provide in relation to Jalal Bazaar Services. You can choose not to provide certain information, but then you might not be able to take advantage of many of our Jalal Bazaar Services.</li>
          <li><strong>Automatic Information:</strong> We automatically collect and store certain types of information about your use of Jalal Bazaar Services, including information about your interaction with content and services available through Jalal Bazaar Services. Like many websites, we use "cookies" and other unique identifiers, and we obtain certain types of information when your web browser or device accesses Jalal Bazaar Services.</li>
          <li><strong>Information from Other Sources:</strong> We might receive information about you from other sources, such as updated delivery and address information from our carriers, which we use to correct our records and deliver your next purchase more easily.</li>
        </ul>

        <h2 className="font-headline text-3xl mt-8">For What Purposes Does Jalal Bazaar Use Your Personal Information?</h2>
        <p>We use your personal information to operate, provide, develop, and improve the products and services that we offer our customers. These purposes include:</p>
        <ul>
          <li><strong>Purchase and delivery of products and services.</strong> We use your personal information to take and handle orders, deliver products and services, process payments, and communicate with you about orders, products and services, and promotional offers.</li>
          <li><strong>Provide, troubleshoot, and improve Jalal Bazaar Services.</strong> We use your personal information to provide functionality, analyze performance, fix errors, and improve the usability and effectiveness of the Jalal Bazaar Services.</li>
          <li><strong>Recommendations and personalization.</strong> We use your personal information to recommend features, products, and services that might be of interest to you, identify your preferences, and personalize your experience with Jalal Bazaar Services.</li>
          <li><strong>Comply with legal obligations.</strong> In certain cases, we collect and use your personal information to comply with laws.</li>
          <li><strong>Communicate with you.</strong> We use your personal information to communicate with you in relation to Jalal Bazaar Services via different channels (e.g., by phone, e-mail, chat).</li>
        </ul>

        <h2 className="font-headline text-3xl mt-8">Does Jalal Bazaar Share Your Personal Information?</h2>
        <p>Information about our customers is an important part of our business, and we are not in the business of selling our customers’ personal information to others. We share customers’ personal information only as described below and with subsidiaries Jalal Bazaar controls that either are subject to this Privacy Notice or follow practices at least as protective as those described in this Privacy Notice.</p>
        <ul>
            <li><strong>Transactions involving Third Parties:</strong> We make available to you services, products, applications, or skills provided by third parties for use on or through Jalal Bazaar Services. For example, you can order products from third-party sellers through our stores. We also offer services or sell product lines jointly with third-party businesses. You can tell when a third party is involved in your transactions, and we share customers’ personal information related to those transactions with that third party.</li>
            <li><strong>Third-Party Service Providers:</strong> We employ other companies and individuals to perform functions on our behalf. Examples include fulfilling orders for products or services, delivering packages, sending postal mail and e-mail, analyzing data, providing marketing assistance, processing payments, and providing customer service. These third-party service providers have access to personal information needed to perform their functions, but may not use it for other purposes.</li>
            <li><strong>Business Transfers:</strong> As we continue to develop our business, we might sell or buy other businesses or services. In such transactions, customer information generally is one of the transferred business assets but remains subject to the promises made in any pre-existing Privacy Notice.</li>
            <li><strong>Protection of Jalal Bazaar and Others:</strong> We release account and other personal information when we believe release is appropriate to comply with the law; enforce or apply our Conditions of Use and other agreements; or protect the rights, property, or safety of Jalal Bazaar, our users, or others.</li>
        </ul>
      </div>
    </div>
  );
}
