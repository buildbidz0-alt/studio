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

export default function ContactPage() {
  return (
    <div className="container mx-auto py-12">
        <Breadcrumb className="mb-8">
            <BreadcrumbList>
                <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                <BreadcrumbPage>Contact Us</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
      <div className="text-center">
        <h1 className="font-headline text-5xl md:text-6xl">Get In Touch</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          We'd love to hear from you. Whether you have a question about our products, sellers, or anything else, our team is ready to answer all your questions.
        </p>
      </div>

      <div className="mt-12 max-w-2xl mx-auto">
        <form className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="first-name" className="block text-sm font-medium text-foreground">First name</label>
                    <Input id="first-name" name="first-name" type="text" className="mt-1" />
                </div>
                <div>
                    <label htmlFor="last-name" className="block text-sm font-medium text-foreground">Last name</label>
                    <Input id="last-name" name="last-name" type="text" className="mt-1" />
                </div>
            </div>
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground">Email</label>
                <Input id="email" name="email" type="email" className="mt-1" />
            </div>
            <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground">Message</label>
                <Textarea id="message" name="message" rows={4} className="mt-1" />
            </div>
            <div>
                <Button type="submit" className="w-full" size="lg">Send Message</Button>
            </div>
        </form>
      </div>
    </div>
  );
}
