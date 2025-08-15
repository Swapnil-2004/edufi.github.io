import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { GraduationCap, Mic, Menu } from "lucide-react";
import { LanguageSwitcher } from "@/components/language-switcher";
import { useLanguage } from "@/hooks/use-language";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function Navbar() {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const NavLinks = () => (
    <>
      <Link href="/" className="text-slate-600 hover:text-sky-blue font-medium transition-colors">
        {t('nav.home')}
      </Link>
      <Link href="/features" className="text-slate-600 hover:text-sky-blue font-medium transition-colors">
        {t('nav.features')}
      </Link>
      <Link href="/eduswipe" className="text-slate-600 hover:text-sky-blue font-medium transition-colors">
        {t('nav.eduswipe')}
      </Link>
      <Link href="/scholarships" className="text-slate-600 hover:text-sky-blue font-medium transition-colors">
        {t('nav.scholarships')}
      </Link>
    </>
  );

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 gradient-bg rounded-lg flex items-center justify-center">
              <GraduationCap className="text-white" size={16} />
            </div>
            <span className="text-xl font-bold text-slate-800">EduFi</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <NavLinks />
          </div>

          <div className="flex items-center space-x-4">
            <LanguageSwitcher />
            
            <Button variant="ghost" size="icon" className="text-slate-600 hover:text-sky-blue">
              <Mic size={16} />
            </Button>
            
            <Link href="/auth">
              <Button className="bg-sky-blue text-white hover:bg-blue-600">
                {t('nav.login')}
              </Button>
            </Link>

            {/* Mobile menu */}
            <div className="md:hidden">
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-slate-600">
                    <Menu size={20} />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                  <nav className="flex flex-col space-y-4 mt-8">
                    <NavLinks />
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
