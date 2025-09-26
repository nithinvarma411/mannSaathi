import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/ui/language-context";
import { X, Check, Monitor, Users } from "lucide-react";
import React, { useState, useEffect } from "react";

interface BookingModalProps {
  show: boolean;
  selectedBooking: {
    counselorId: number;
    timeSlot: string;
    counselorName: string;
  } | null;
  selectedDate: string;
  getNextHour: (timeSlot: string) => string;
  confirmBooking: (bookingType: 'online' | 'offline') => void;
  cancelBooking: () => void;
}

export function BookingModal({ show, selectedBooking, selectedDate, getNextHour, confirmBooking, cancelBooking }: BookingModalProps) {
  const { t } = useLanguage();
  const [bookingType, setBookingType] = useState<'online' | 'offline'>('online');
  
  // Reset booking type when modal opens
  useEffect(() => {
    if (show) {
      setBookingType('online');
    }
  }, [show]);
  
  if (!show || !selectedBooking) return null;
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <Card className="w-full max-w-md mx-4 p-6 bg-black border border-white/10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-slate-100">{t("confirm_booking")}</h3>
          <Button variant="ghost" size="sm" onClick={cancelBooking} className="text-slate-300 hover:text-slate-100">
            <X className="w-4 h-4" />
          </Button>
        </div>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-slate-500">{t("counselor_label")}</p>
            <p className="font-medium text-slate-100">{selectedBooking.counselorName}</p>
          </div>
          <div>
            <p className="text-sm text-slate-500">{t("date_time")}</p>
            <p className="font-medium text-slate-100">{selectedDate}</p>
            <p className="font-medium text-slate-100">
              {t(selectedBooking.timeSlot)} - {getNextHour(selectedBooking.timeSlot)}
            </p>
          </div>
          <div>
            <p className="text-sm text-slate-500">{t("session_type")}</p>
            <div className="space-y-3 mt-2">
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setBookingType('online')}
                  className={`flex-1 p-3 rounded-lg border-2 transition-all ${
                    bookingType === 'online'
                      ? 'border-[#22D3EE] bg-[#22D3EE]/10'
                      : 'border-white/10 bg-white/5 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-center gap-2 text-slate-100">
                    <Monitor className="w-4 h-4" />
                    <span className="font-medium">{t("online_session")}</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">{t("video_call_from_home")}</p>
                </button>
                <button
                  type="button"
                  onClick={() => setBookingType('offline')}
                  className={`flex-1 p-3 rounded-lg border-2 transition-all ${
                    bookingType === 'offline'
                      ? 'border-[#22D3EE] bg-[#22D3EE]/10'
                      : 'border-white/10 bg-white/5 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-center gap-2 text-slate-100">
                    <Users className="w-4 h-4" />
                    <span className="font-medium">{t("in_person_session")}</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">{t("meet_at_clinic")}</p>
                </button>
              </div>
            </div>
          </div>
          <div className="flex gap-3 pt-4">
            <Button variant="outline" onClick={cancelBooking} className="flex-1 bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 hover:text-slate-100">
              {t("cancel")}
            </Button>
            <Button onClick={() => confirmBooking(bookingType)} className="flex-1 bg-gradient-to-r from-[#22D3EE] to-[#60A5FA] text-slate-900 hover:from-[#22D3EE]/90 hover:to-[#60A5FA]/90">
              <Check className="w-4 h-4 mr-2" />
              {t("confirm")} {bookingType === 'online' ? t("online_session") : t("in_person_session")} {t("booking_noun")}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}