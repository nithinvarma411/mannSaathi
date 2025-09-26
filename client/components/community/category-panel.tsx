"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/ui/language-context";
import { ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  categories: string[];
  selected: string;
  onSelect: (category: string) => void;
};

export function CategoryPanel({ categories, selected, onSelect }: Props) {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-4 md:mt-0 md:sticky md:top-24">
      {/* Mobile toggle */}
      <div className="mb-2 flex items-center justify-between md:hidden">
        <span className="text-xs font-medium text-slate-100">{t("categories")}</span>
        <Button
          variant="outline"
          size="sm"
          className="h-6 px-2 border-white/10 bg-transparent text-slate-300 hover:bg-white/5 text-xs"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? (
            <ChevronDown className="h-3 w-3" />
          ) : (
            <ChevronRight className="h-3 w-3" />
          )}
        </Button>
      </div>

      <div
        className={cn(
          "rounded-lg border border-white/10 bg-white/5 p-2 md:p-3 shadow-sm backdrop-blur-sm",
          "md:block",
          open ? "block" : "hidden md:block",
        )}
      >
        <ul className="grid grid-cols-3 gap-1 sm:grid-cols-4 md:block md:space-y-2 md:gap-0">
          {categories.map((c) => {
            const active = c === selected;
            return (
              <li key={c}>
                <button
                  onClick={() => {
                    onSelect(c);
                    setOpen(false); // Close mobile menu after selection
                  }}
                  className={cn(
                    "w-full rounded-md px-1.5 py-1.5 text-left text-xs md:px-3 md:py-2 md:text-sm transition-colors",
                    "hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-cyan-400/30",
                    active
                      ? "bg-white/10 text-slate-100"
                      : "bg-transparent text-slate-300 hover:text-slate-100",
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span>{t(c)}</span>
                    {active ? (
                      <span className="rounded-full bg-gradient-to-r from-[#22D3EE] to-[#60A5FA] px-2 py-0.5 text-[10px] font-medium text-slate-900">
                        {t("active")}
                      </span>
                    ) : null}
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
