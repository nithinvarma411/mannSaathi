import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import React from "react";

interface CounselorDetailsModalProps {
  show: boolean;
  counselor: {
    name: string;
    title: string;
    specialties: string[];
    avatar: string;
    initials: string;
    rating?: number;
    experience?: string;
  } | null;
  onClose: () => void;
}

export function CounselorDetailsModal({ show, counselor, onClose }: CounselorDetailsModalProps) {
  if (!show || !counselor) return null;
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <Card className="w-full max-w-md mx-4 p-6 bg-black border border-white/10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-slate-100">Counselor Details</h3>
          <Button variant="ghost" size="sm" onClick={onClose} className="text-slate-300 hover:text-slate-100">
            <X className="w-4 h-4" />
          </Button>
        </div>
        <div className="flex flex-col items-center space-y-4">
          <Avatar className="w-20 h-20">
            <AvatarImage src={counselor.avatar || "/placeholder.svg"} alt={counselor.name} />
            <AvatarFallback className="bg-white/10 text-slate-100">{counselor.initials}</AvatarFallback>
          </Avatar>
          <h4 className="text-xl font-bold text-center text-slate-100">{counselor.name}</h4>
          <div className="text-center text-slate-300">{counselor.title}</div>
          <div className="flex flex-wrap gap-2 justify-center">
            {counselor.specialties.map((spec) => (
              <Badge key={spec} variant="outline" className="text-xs bg-white/5 border-white/10 text-slate-300">{spec}</Badge>
            ))}
          </div>
          <div className="flex gap-4 mt-2">
            <div className="text-center">
              <div className="font-semibold text-slate-100">Initials</div>
              <div className="text-slate-300">{counselor.initials}</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-slate-100">Rating</div>
              <div className="text-slate-300">{counselor.rating ?? "4.8"}</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-slate-100">Experience</div>
              <div className="text-slate-300">{counselor.experience ?? "8 years"}</div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
