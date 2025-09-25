"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown, Globe } from "lucide-react";
import { useLanguage, type Language } from "./language-context";

interface LanguageOption {
  code: Language;
  name: string;
  nativeName: string;
  flag: string;
}

const languages: LanguageOption[] = [
  {
    code: "en",
    name: "English",
    nativeName: "English",
    flag: "🇺🇸",
  },
  {
    code: "hi",
    name: "Hindi",
    nativeName: "हिंदी",
    flag: "🇮🇳",
  },
  {
    code: "ur",
    name: "Urdu",
    nativeName: "اردو",
    flag: "🇵🇰",
  },
];

interface LanguageSelectorProps {
  className?: string;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  className = "",
}) => {
  const { language, setLanguage } = useLanguage();
  
  const currentLang = languages.find(lang => lang.code === language);

  const handleLanguageChange = (selectedLanguage: Language) => {
    setLanguage(selectedLanguage);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={`
            h-10 px-3 rounded-full border-white/20 bg-white/5 text-slate-300 
            hover:bg-white/10 hover:text-white focus:ring-2 focus:ring-cyan-400/30 
            transition-colors ${className}
          `}
        >
          <Globe className="w-4 h-4 mr-2" />
          <span className="mr-1">{currentLang?.flag}</span>
          <span className="hidden sm:inline">{currentLang?.nativeName}</span>
          <ChevronDown className="w-4 h-4 ml-2" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end"
        className="min-w-[160px] border-white/10 bg-slate-900 text-slate-100"
      >
        {languages.map((languageOption) => (
          <DropdownMenuItem
            key={languageOption.code}
            onClick={() => handleLanguageChange(languageOption.code)}
            className={`
              cursor-pointer rounded-lg transition-colors
              ${language === languageOption.code 
                ? 'bg-cyan-500/20 text-cyan-300' 
                : 'hover:bg-white/10'
              }
            `}
          >
            <span className="mr-3">{languageOption.flag}</span>
            <div className="flex flex-col">
              <span className="font-medium">{languageOption.nativeName}</span>
              <span className="text-xs text-slate-400">{languageOption.name}</span>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;