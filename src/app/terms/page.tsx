import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb"

export default function TermsOfServicePage() {
  return (
    <div className="container mx-auto py-12">
        <Breadcrumb className="mb-8">
            <BreadcrumbList>
                <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                <BreadcrumbPage>Terms of Service</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
        <div className="prose prose-lg max-w-4xl mx-auto">
            <h1 className="font-headline text-5xl">Terms of Service</h1>
            <p className="text-lg text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
            
            <h2>1. Agreement to Terms</h2>
            <p>
            By using our website, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
            </p>

            <h2>2. User Accounts</h2>
            <p>
            You may be required to create an account to access some features of our website. You are responsible for safeguarding your account information and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.
            </p>

            <h2>3. Products and Services</h2>
            <p>
            We strive to provide accurate descriptions of products. However, we do not warrant that product descriptions or other content is accurate, complete, reliable, current, or error-free. We reserve the right to refuse any order you place with us.
            </p>

            <h2>4. Vendor Responsibilities</h2>
            <p>
            Sellers on Jalal Bazaar are independent entities and are responsible for their own products, listings, and for complying with all applicable laws, including providing valid halal certifications. Jalal Bazaar serves as a platform to connect buyers and sellers and does not endorse any specific seller or product.
            </p>

            <h2>5. Intellectual Property</h2>
            <p>
            All content on this website, including text, graphics, logos, and images, is the property of Jalal Bazaar or its content suppliers and is protected by international copyright laws.
            </p>

            <h2>6. Limitation of Liability</h2>
            <p>
            Jalal Bazaar will not be liable for any damages of any kind arising from the use of this site or from any information, content, materials, products, or services included on or otherwise made available to you through this site.
            </p>

            <h2>7. Governing Law</h2>
            <p>
            These Terms of Service and any separate agreements whereby we provide you services shall be governed by and construed in accordance with the laws of India.
            </p>
        </div>
    </div>
  );
}
