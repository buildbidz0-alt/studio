
"use client";

import Link from "next/link";
import { Github, Twitter, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/use-language";
import { Logo } from "./Logo";

export function Footer() {
  const { t } = useLanguage();
  const footerLinks = [
      { href: "/about", label: t('footer_about') },
      { href: "/contact", label: t('footer_contact') },
      { href: "/terms", label: t('footer_terms') },
      { href: "/privacy", label: t('footer_privacy') },
  ]
  return (
    <footer className="w-full border-t border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex flex-col items-center justify-between gap-6 py-10 md:flex-row">
        <div className="flex flex-col items-center gap-4 px-8 md:items-start md:px-0">
          <div className="flex items-center space-x-2">
            <Logo className="h-6 w-6 text-secondary" />
            <span className="font-bold sm:inline-block font-headline text-lg">
                Jalal Bazaar
            </span>
          </div>
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left font-body">
            © {new Date().getFullYear()} Jalal Bazaar. {t('footer_rights')}
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
