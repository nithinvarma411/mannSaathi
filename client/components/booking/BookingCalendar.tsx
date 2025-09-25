import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";

interface BookingCalendarProps {
  currentDate: Date;
  setCurrentDate: (date: Date) => void;
  handleDateSelect: (date: Date) => void;
  generateCalendarDays: () => Date[];
}

export function BookingCalendar({ currentDate, setCurrentDate, handleDateSelect, generateCalendarDays }: BookingCalendarProps) {
  return (
    <Card className="mb-6 p-4 w-full max-w-md bg-white/5 border border-white/10">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium text-slate-100 text-sm sm:text-base">
          {currentDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
        </h3>
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              const newDate = new Date(currentDate);
              newDate.setMonth(currentDate.getMonth() - 1);
              setCurrentDate(newDate);
            }}
            className="text-slate-300 hover:text-slate-100 hover:bg-white/10"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              const newDate = new Date(currentDate);
              newDate.setMonth(currentDate.getMonth() + 1);
              setCurrentDate(newDate);
            }}
            className="text-slate-300 hover:text-slate-100 hover:bg-white/10"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-sm">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="p-2 font-medium text-slate-500">
            {day}
          </div>
        ))}
        {generateCalendarDays().map((date, index) => (
          <Button
            key={index}
            variant="ghost"
            size="sm"
            onClick={() => handleDateSelect(date)}
            className={`p-2 h-8 text-sm ${
              date.getMonth() !== currentDate.getMonth()
                ? "text-slate-500/50"
                : date.toDateString() === currentDate.toDateString()
                  ? "bg-gradient-to-r from-[#22D3EE] to-[#60A5FA] text-slate-900"
                  : "text-slate-300 hover:bg-white/10 hover:text-slate-100"
            }`}
          >
            {date.getDate()}
          </Button>
        ))}
      </div>
    </Card>
  );
}