import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";

const navigation = [
  { name: "Features", href: "/#features" },
  { name: "Agents", href: "/#agents" },
  { name: "Pricing", href: "/#pricing" },
  { name: "Enterprise", href: "/#enterprise" },
];

export default function Navbar() {
  const [location] = useLocation();
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const isHomepage = location === "/";

  const handleNavigationClick = (href: string) => {
    if (isSheetOpen) {
      setIsSheetOpen(false);
    }
    
    // Handle smooth scrolling on homepage
    if (isHomepage && href.startsWith('/#')) {
      const element = document.getElementById(href.substring(2));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <Container>
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="flex items-center gap-2">
                <span className="text-primary text-2xl">⬡</span>
                <span className="font-bold text-xl">Vetro AI</span>
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => handleNavigationClick(item.href)}
                  className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-700"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4">
            <Link href="/login">
              <Button variant="ghost" className="text-gray-500 hover:text-gray-700">
                Log in
              </Button>
            </Link>
            <Link href="/register">
              <Button>Get Started</Button>
            </Link>
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-gray-500">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open main menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="flex flex-col space-y-4 mt-6">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      onClick={() => handleNavigationClick(item.href)}
                      className="text-base font-medium text-gray-700 hover:text-primary"
                    >
                      {item.name}
                    </a>
                  ))}
                  <div className="pt-4 mt-4 border-t border-gray-200">
                    <Link href="/login">
                      <Button variant="ghost" className="w-full justify-start">
                        Log in
                      </Button>
                    </Link>
                    <Link href="/register">
                      <Button className="w-full mt-4">
                        Get Started
                      </Button>
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </Container>
    </nav>
  );
}
