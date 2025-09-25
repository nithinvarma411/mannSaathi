import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/components/ui/language-context";
import React from "react";

interface Counselor {
  id: number;
  name: string;
  title: string;
  specialties: string[];
  avatar: string;
  initials: string;
}

interface Appointment {
  counselorId: number;
  time: string;
  status: string;
}

interface ScheduleGridProps {
  counselors: Counselor[];
  timeSlots: string[];
  filteredCounselors: Counselor[];
  getAppointmentForCounselor: (counselorId: number, timeSlot: string) => Appointment | undefined;
  handleBookAppointment: (counselorId: number, timeSlot: string) => void;
  getNextHour: (timeSlot: string) => string;
  onShowCounselorDetails: (counselor: Counselor) => void;
}

export function ScheduleGrid({ counselors, timeSlots, filteredCounselors, getAppointmentForCounselor, handleBookAppointment, getNextHour, onShowCounselorDetails }: ScheduleGridProps) {
  const { t } = useLanguage()
  
  return (
    <>
      {/* Desktop Grid Layout */}
      <Card className="hidden lg:block overflow-hidden bg-white/5 border border-white/10">
        <div className="grid grid-cols-9 gap-0">
          {/* Header Row */}
          <div className="p-4 border-b border-r border-white/10 bg-white/5">
            <h3 className="font-medium text-slate-100 px-4.5">{t("counselor_label")}</h3>
          </div>
          {timeSlots.map((time) => (
            <div key={time} className="p-4 border-b border-r border-white/10 bg-white/5 text-center">
              <span className="text-sm font-medium text-slate-300">{time}</span>
            </div>
          ))}

          {/* Counselor Rows */}
          {filteredCounselors.map((counselor) => (
            <div key={counselor.id} className="contents">
              {/* Counselor Info */}
              <div className="p-4 border-b border-r border-white/10 bg-black/20">
                <div className="flex items-center gap-3">
                  <div
                    className="cursor-pointer flex items-center gap-2 min-w-0 flex-1"
                    onClick={() => onShowCounselorDetails(counselor)}
                    title="View details"
                  >
                    <Avatar className="w-8 h-8 flex-shrink-0">
                      <AvatarImage src={counselor.avatar || "/placeholder.svg"} alt={counselor.name} />
                      <AvatarFallback className="bg-white/10 text-slate-100 text-xs">{counselor.initials}</AvatarFallback>
                    </Avatar>
                    <h4 className="font-medium text-slate-100 hover:underline truncate text-xs">{counselor.name}</h4>
                  </div>
                </div>
              </div>

              {/* Time Slots */}
              {timeSlots.map((timeSlot) => {
                const appointment = getAppointmentForCounselor(counselor.id, timeSlot);
                return (
                  <div key={`${counselor.id}-${timeSlot}`} className="p-2 border-b border-r border-white/10 min-h-[80px] bg-black/20">
                    {appointment ? (
                      <div
                        className={`p-3 rounded-lg text-sm h-full flex items-center justify-center cursor-pointer transition-colors ${
                          appointment.status === "available"
                            ? "bg-gradient-to-r from-[#22D3EE]/20 to-[#60A5FA]/20 text-[#22D3EE] border-2 border-[#22D3EE]/30 hover:from-[#22D3EE]/30 hover:to-[#60A5FA]/30"
                            : "bg-red-500/20 text-red-400 border-2 border-red-500/30 cursor-not-allowed"
                        }`}
                        onClick={() =>
                          appointment.status === "available" && handleBookAppointment(counselor.id, timeSlot)
                        }
                      >
                        <div className="text-center">
                          <div className="font-medium">{appointment.time}</div>
                          <div className="text-xs mt-1 font-medium">
                            {appointment.status === "available" ? t("click_to_book") : t("booked")}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="h-full flex items-center justify-center text-slate-500 text-xs bg-white/5 border border-white/10 rounded-lg">
                        {t("unavailable")}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </Card>

      {/* Mobile Card Layout */}
      <div className="lg:hidden space-y-4">
        {filteredCounselors.map((counselor) => (
          <Card key={counselor.id} className="bg-white/5 border border-white/10 p-4">
            {/* Counselor Header */}
            <div 
              className="flex items-center gap-3 mb-4 cursor-pointer"
              onClick={() => onShowCounselorDetails(counselor)}
            >
              <Avatar className="w-10 h-10 flex-shrink-0">
                <AvatarImage src={counselor.avatar || "/placeholder.svg"} alt={counselor.name} />
                <AvatarFallback className="bg-white/10 text-slate-100">{counselor.initials}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-slate-100 hover:underline truncate text-sm">{counselor.name}</h4>
                <p className="text-xs text-slate-400 truncate">{counselor.title}</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {counselor.specialties.slice(0, 2).map((specialty) => (
                    <Badge key={specialty} variant="secondary" className="text-xs">
                      {specialty}
                    </Badge>
                  ))}
                  {counselor.specialties.length > 2 && (
                    <Badge variant="secondary" className="text-xs">
                      +{counselor.specialties.length - 2}
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            {/* Time Slots Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {timeSlots.map((timeSlot) => {
                const appointment = getAppointmentForCounselor(counselor.id, timeSlot);
                return (
                  <div key={`${counselor.id}-${timeSlot}`} className="min-h-[60px]">
                    {appointment ? (
                      <div
                        className={`p-2 rounded-lg text-xs h-full flex flex-col items-center justify-center cursor-pointer transition-colors ${
                          appointment.status === "available"
                            ? "bg-gradient-to-r from-[#22D3EE]/20 to-[#60A5FA]/20 text-[#22D3EE] border border-[#22D3EE]/30 hover:from-[#22D3EE]/30 hover:to-[#60A5FA]/30"
                            : "bg-red-500/20 text-red-400 border border-red-500/30 cursor-not-allowed"
                        }`}
                        onClick={() =>
                          appointment.status === "available" && handleBookAppointment(counselor.id, timeSlot)
                        }
                      >
                        <div className="text-center">
                          <div className="font-medium text-xs">{timeSlot}</div>
                          <div className="text-xs mt-1 opacity-75">
                            {appointment.status === "available" ? t("click_to_book") : t("booked")}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="h-full flex flex-col items-center justify-center text-slate-500 text-xs bg-white/5 border border-white/10 rounded-lg p-2">
                        <div>{timeSlot}</div>
                        <div className="opacity-75">{t("unavailable")}</div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}