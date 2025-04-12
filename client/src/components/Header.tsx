import { useTheme } from "./ThemeSwitch";
import { Link } from "wouter";
import { useState } from "react";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
  NavigationMenuContent,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <header className="bg-card material-shadow">
      <div className="container mx-auto px-2 sm:px-4 py-2 sm:py-4 flex justify-between items-center">
        <div className="flex items-center gap-4 md:gap-8">
          <Link href="/" className="flex items-center">
              <div className="webgen-logo-container mr-1 md:mr-2">
                <svg width="32" height="32" viewBox="0 0 32 32" className="molecular-logo">
                  <circle cx="16" cy="8" r="3" className="logo-dot" />
                  <circle cx="8" cy="16" r="3" className="logo-dot" />
                  <circle cx="24" cy="16" r="3" className="logo-dot" />
                  <circle cx="16" cy="24" r="3" className="logo-dot" />
                  <line x1="16" y1="8" x2="8" y2="16" className="logo-line" />
                  <line x1="8" y1="16" x2="16" y2="24" className="logo-line" />
                  <line x1="16" y1="24" x2="24" y2="16" className="logo-line" />
                  <line x1="24" y1="16" x2="16" y2="8" className="logo-line" />
                </svg>
              </div>
              <h1 className="text-xl md:text-2xl font-medium">WebGen</h1>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/" className={navigationMenuTriggerStyle()}>
                      Home
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Features</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      <li className="row-span-3">
                        <div className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-primary/20 to-primary/5 p-6 no-underline outline-none focus:shadow-md">
                          <span className="material-icons text-primary text-5xl mb-2">code</span>
                          <div className="mb-2 mt-4 text-lg font-medium">
                            WebGen
                          </div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            Modern project template generator with support for all popular frontend frameworks
                          </p>
                        </div>
                      </li>
                      <li>
                        <div className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                          <div className="text-sm font-medium leading-none">JavaScript/TypeScript</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Create modern JS/TS projects with ease
                          </p>
                        </div>
                      </li>
                      <li>
                        <div className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                          <div className="text-sm font-medium leading-none">React & Next.js</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Generate React and Next.js projects with best practices
                          </p>
                        </div>
                      </li>
                      <li>
                        <div className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                          <div className="text-sm font-medium leading-none">Vue & Angular</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Quickly bootstrap Vue and Angular apps with the best libraries
                          </p>
                        </div>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/docs" className={navigationMenuTriggerStyle()}>
                      Documentation
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
        
        {/* Dark mode toggle for both mobile and desktop */}
        <div className="flex items-center gap-4">
          <div className="flex items-center">
            <span className="text-muted-foreground hidden sm:inline">Dark Mode</span>
            <label className="relative inline-block w-12 h-6 ml-3">
              <input 
                type="checkbox" 
                className="opacity-0 w-0 h-0"
                checked={theme === 'dark'}
                onChange={toggleTheme}
              />
              <span className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 
                ${theme === 'dark' ? 'bg-primary' : 'bg-muted'} 
                rounded-full transition-all duration-300 before:absolute before:h-[18px] 
                before:w-[18px] before:left-[3px] before:bottom-[3px] before:bg-white 
                before:rounded-full before:transition-all before:duration-300
                ${theme === 'dark' ? 'before:translate-x-6' : ''}`}>
              </span>
            </label>
          </div>
          
          {/* Mobile menu button */}
          <div className="block md:hidden">
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <span className="material-icons">menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[240px] sm:w-[300px]">
                <div className="flex flex-col gap-6 py-6">
                  <Link href="/" className="flex items-center" onClick={() => setIsMenuOpen(false)}>
                    <span className="material-icons text-primary text-2xl mr-2">web</span>
                    <h1 className="text-xl font-medium">WebGen</h1>
                  </Link>
                  <nav className="flex flex-col space-y-4">
                    <Link href="/" className="flex items-center px-2 py-1.5 rounded-md hover:bg-accent" onClick={() => setIsMenuOpen(false)}>
                      <span className="material-icons mr-2">home</span>
                      Home
                    </Link>
                    <Link href="/" className="flex items-center px-2 py-1.5 rounded-md hover:bg-accent" onClick={() => setIsMenuOpen(false)}>
                      <span className="material-icons mr-2">code</span>
                      Features
                    </Link>
                    <Link href="/docs" className="flex items-center px-2 py-1.5 rounded-md hover:bg-accent" onClick={() => setIsMenuOpen(false)}>
                      <span className="material-icons mr-2">menu_book</span>
                      Documentation
                    </Link>
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
