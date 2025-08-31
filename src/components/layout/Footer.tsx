import Link from "next/link";
import { Github, Twitter, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";

function CrescentMoonIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        >
        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
        </svg>
    );
}

export function Footer() {
  const footerLinks = [
      { href: "/about", label: "About Us" },
      { href: "/contact", label: "Contact" },
      { href: "/terms", label: "Terms of Service" },
      { href: "/privacy", label: "Privacy Policy" },
  ]
  return (
    <footer className="w-full border-t border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex flex-col items-center justify-between gap-6 py-10 md:flex-row">
        <div className="flex flex-col items-center gap-4 px-8 md:items-start md:px-0">
          <div className="flex items-center space-x-2">
            <CrescentMoonIcon className="h-6 w-6 text-secondary" />
            <span className="font-bold sm:inline-block font-headline text-lg">
                Jalal Bazaar
            </span>
          </div>
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left font-body">
            © {new Date().getFullYear()} Jalal Bazaar. All rights reserved.
          </p>
        </div>
        <div className="flex flex-col items-center gap-4 md:items-end">
            <nav className="flex flex-wrap justify-center gap-4 md:gap-6 text-sm font-body">
                {footerLinks.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        className="transition-colors hover:text-foreground/80 text-foreground/60"
                    >
                        {link.label}
                    </Link>
                ))}
            </nav>
            <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon">
                    <Twitter className="h-5 w-5" />
                    <span className="sr-only">Twitter</span>
                </Button>
                <Button variant="ghost" size="icon">
                    <Instagram className="h-5 w-5" />
                    <span className="sr-only">Instagram</span>
                </Button>
                <Button variant="ghost" size="icon">
                    <Github className="h-5 w-5" />
                    <span className="sr-only">GitHub</span>
                </Button>
            </div>
        </div>
      </div>
    </footer>
  );
}
