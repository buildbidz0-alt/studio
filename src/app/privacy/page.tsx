import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb"

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto py-12">
        <Breadcrumb className="mb-8">
            <BreadcrumbList>
                <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                <BreadcrumbPage>Privacy Policy</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
      <div className="prose prose-lg max-w-4xl mx-auto">
        <h1 className="font-headline text-5xl">Privacy Policy</h1>
        <p className="text-lg text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
        
        <h2>1. Introduction</h2>
        <p>
          Welcome to Jalal Bazaar. We are committed to protecting your privacy and ensuring that your personal information is handled in a safe and responsible manner. This Privacy Policy outlines how we collect, use, disclose, and safeguard your information when you visit our website.
        </p>

        <h2>2. Information We Collect</h2>
        <p>
          We may collect personal information from you such as your name, email address, postal address, phone number, and payment information when you register on our site, place an order, or subscribe to our newsletter.
        </p>

        <h2>3. How We Use Your Information</h2>
        <p>
          We use the information we collect to:
        </p>
        <ul>
          <li>Process your transactions and manage your orders.</li>
          <li>Improve our website and customer service.</li>
          <li>Personalize your experience and recommend products.</li>
          <li>Send periodic emails regarding your order or other products and services.</li>
        </ul>

        <h2>4. Information Sharing and Disclosure</h2>
        <p>
          We do not sell, trade, or otherwise transfer to outside parties your personally identifiable information unless we provide users with advance notice. This does not include website hosting partners and other parties who assist us in operating our website, conducting our business, or serving our users, so long as those parties agree to keep this information confidential.
        </p>

        <h2>5. Data Security</h2>
        <p>
          We implement a variety of security measures to maintain the safety of your personal information when you place an order or enter, submit, or access your personal information.
        </p>

        <h2>6. Your Rights</h2>
        <p>
          You have the right to access, correct, or delete your personal information. You can do this by logging into your account or by contacting our customer support.
        </p>

        <h2>7. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
        </p>
      </div>
    </div>
  );
}
