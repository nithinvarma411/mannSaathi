"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { ProfileIcon } from "@/components/profile/icon";
import LanguageSelector from "@/components/ui/language-selector";
import { useLanguage } from "@/components/ui/language-context";
import {
  Home,
  MessageCircle,
  BookOpen,
  Calendar,
  Users,
  Menu,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const items = [
  { href: "/home", icon: Home, label: "home" },
  { href: "/chat", icon: MessageCircle, label: "chat" },
  { href: "/resources", icon: BookOpen, label: "resources" },
  { href: "/bookings", icon: Calendar, label: "bookings" },
  { href: "/community", icon: Users, label: "community" },
];

export function TopNav() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <>
      {/* Desktop Navigation - Fixed Sidebar */}
      <nav className="hidden md:flex fixed left-0 top-55 h-95 w-16 rounded-lg border bg-[#0B1220] border-r border-[#E5E7EB]/10 flex-col items-center py-6 z-50">
        <ul className="flex flex-col items-center gap-8 w-full">
          {items.map((i) => {
            const active = pathname === i.href;
            const Icon = i.icon;
            return (
              <li key={i.href}>
                <Link
                  href={i.href}
                  className={cn(
                    "flex items-center justify-center w-10 h-10 rounded-lg text-[#E5E7EB]/70 hover:text-[#E5E7EB] transition-colors",
                    active && "bg-[#1E293B] text-[#60A5FA]",
                  )}
                  aria-label={i.label}
                >
                  <Icon className="h-6 w-6" />
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Mobile Navigation - Top Header with Hamburger */}
      <nav className="md:hidden fixed top-0 left-0 right-0 bg-[#0B1220]/95 backdrop-blur-md border-b border-[#E5E7EB]/10 z-50">
        <div className="flex items-center justify-between px-4 py-3">
          {/* Logo/Brand */}
          <div className="flex items-center space-x-2">
            <span className="text-lg font-semibold text-[#E5E7EB]">
              CalmSpace
            </span>
          </div>

          {/* Hamburger Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex items-center justify-center w-10 h-10 rounded-xl text-[#E5E7EB]/70 hover:text-[#E5E7EB] hover:bg-[#1E293B]/80 transition-all duration-200 active:scale-95"
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            <motion.div
              animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </motion.div>
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="bg-[#0B1220]/98 backdrop-blur-md border-t border-[#E5E7EB]/10 shadow-lg"
            >
              <div className="px-4 py-4">
                <ul className="space-y-2">
                  {items.map((i) => {
                    const active = pathname === i.href;
                    const Icon = i.icon;
                    return (
                      <li key={i.href}>
                        <Link
                          href={i.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={cn(
                            "flex items-center space-x-3 w-full px-4 py-3 rounded-xl text-[#E5E7EB]/70 hover:text-[#E5E7EB] hover:bg-[#1E293B]/80 transition-all duration-200",
                            active && "bg-[#1E293B] text-[#60A5FA] shadow-sm",
                          )}
                        >
                          <Icon className="h-5 w-5" />
                          <span className="text-base font-medium">
                            {t(i.label)}
                          </span>
                          {active && (
                            <div className="ml-auto w-2 h-2 bg-[#60A5FA] rounded-full"></div>
                          )}
                        </Link>
                      </li>
                    );
                  })}

                  {/* Language Selector in Mobile Menu */}
                  <li>
                    <div className="px-4 py-3">
                      <LanguageSelector />
                    </div>
                  </li>

                  {/* Profile Icon in Mobile Menu */}
                  <li>
                    <div
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center space-x-3 w-full px-4 py-3 rounded-xl text-[#E5E7EB]/70 hover:text-[#E5E7EB] hover:bg-[#1E293B]/80 transition-all duration-200"
                    >
                      <div className="h-5 w-5 flex items-center justify-center">
                        <ProfileIcon />
                      </div>
                    </div>
                  </li>
                </ul>

                {/* Footer section in mobile menu */}
                <div className="mt-4 pt-4 border-t border-[#E5E7EB]/10">
                  <div className="px-4 py-2">
                    <p className="text-xs text-[#E5E7EB]/50">
                      {t("app_title")} - {t("app_description")}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}

export default TopNav;
