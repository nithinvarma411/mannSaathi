import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/components/ui/language-context";
import React from "react";

interface BookingFiltersProps {
  specialties: string[];
  selectedFilters: string[];
  toggleFilter: (filter: string) => void;
  clearFilters: () => void;
}

export function BookingFilters({ specialties, selectedFilters, toggleFilter, clearFilters }: BookingFiltersProps) {
  const { t } = useLanguage();

  const SPECIALTY_TRANSLATION_MAP: { [key: string]: string } = {
    "anxiety": "specialty_anxiety",
    "depression": "specialty_depression",
    "stress": "specialty_stress_management",
    "relationships": "specialty_relationships",
    "trauma": "specialty_trauma",
    "grief": "specialty_grief",
    "addiction": "specialty_addiction",
    "family": "specialty_family",
    "academic": "specialty_academic",
    "career": "specialty_career",
    "ocd": "specialty_ocd",
    "ptsd": "specialty_ptsd",
    "bipolar": "specialty_bipolar",
    "eating": "specialty_eating_disorders",
    "sleep": "specialty_sleep",
    "anger": "specialty_anger_management",
    "social": "specialty_social_anxiety",
    "panic": "specialty_panic_attacks",
    "self-esteem": "specialty_self_esteem",
    "mindfulness": "specialty_mindfulness"
  };

  return (
    <Card className="mb-6 p-4 bg-white/5 border border-white/10">
      <h3 className="font-medium mb-3 text-slate-100">{t("filter_by_specialty")}</h3>
      <div className="flex flex-wrap gap-2">
        {specialties.map((specialty) => (
          <Button
            key={specialty}
            variant={selectedFilters.includes(specialty) ? "default" : "outline"}
            size="sm"
            onClick={() => toggleFilter(specialty)}
            className={`text-sm ${
              selectedFilters.includes(specialty)
                ? "bg-gradient-to-r from-[#22D3EE] to-[#60A5FA] text-slate-900 hover:from-[#22D3EE]/90 hover:to-[#60A5FA]/90"
                : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 hover:text-slate-100"
            }`}
          >
            {t(SPECIALTY_TRANSLATION_MAP[specialty.toLowerCase()] || specialty)}
          </Button>
        ))}
      </div>
      {selectedFilters.length > 0 && (
        <Button variant="ghost" size="sm" onClick={clearFilters} className="mt-3 text-sm text-slate-300 hover:text-slate-100 hover:bg-white/5">
          {t("clear_all_filters")}
        </Button>
      )}
    </Card>
  );
}