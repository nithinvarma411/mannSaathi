import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import React from "react";

interface BookingFiltersProps {
  specialties: string[];
  selectedFilters: string[];
  toggleFilter: (filter: string) => void;
  clearFilters: () => void;
}

export function BookingFilters({ specialties, selectedFilters, toggleFilter, clearFilters }: BookingFiltersProps) {
  return (
    <Card className="mb-6 p-4 bg-white/5 border border-white/10">
      <h3 className="font-medium mb-3 text-slate-100">Filter by Specialty</h3>
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
            {specialty}
          </Button>
        ))}
      </div>
      {selectedFilters.length > 0 && (
        <Button variant="ghost" size="sm" onClick={clearFilters} className="mt-3 text-sm text-slate-300 hover:text-slate-100 hover:bg-white/5">
          Clear all filters
        </Button>
      )}
    </Card>
  );
}