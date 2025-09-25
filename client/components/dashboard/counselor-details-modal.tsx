"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Star, 
  Users
} from "lucide-react"

interface Student {
  id: string
  name: string
  anonymousId: string
  totalSessions: number
  lastSession: string
  status: string
  mood: number
  avatar: string
}

interface Counselor {
  id: number
  name: string
  email: string
  phone: string
  location: string
  assignedStudents: number
  totalSessions: number
  status: string
  rating: number
  totalRatings: number
  joinDate: string
  experience: string
  bio: string
  specializations: string[]
  avatar: string
  students: Student[]
}

interface CounselorDetailsModalProps {
  counselor: Counselor | null
  isOpen: boolean
  onClose: () => void
}

function StatusBadge({ status }: { status: string }) {
  const statusStyles = {
    active: "bg-green-500/20 text-green-400 border-green-500/30",
    inactive: "bg-gray-500/20 text-gray-400 border-gray-500/30", 
    pending: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    completed: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    high: "bg-red-500/20 text-red-400 border-red-500/30",
    medium: "bg-orange-500/20 text-orange-400 border-orange-500/30",
  }

  return (
    <Badge 
      variant="outline" 
      className={`${statusStyles[status.toLowerCase() as keyof typeof statusStyles] || "bg-gray-500/20 text-gray-400 border-gray-500/30"}`}
    >
      {status}
    </Badge>
  )
}

export function CounselorDetailsModal({ counselor, isOpen, onClose }: CounselorDetailsModalProps) {
  
  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!counselor) return null

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
            onClick={onClose}
          />
          
          {/* Modal Content */}
          <div className="relative bg-black border border-white/20 rounded-2xl shadow-2xl max-w-[95vw] w-full h-[85vh] overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-4 duration-300 ring-1 ring-white/10">
            <div className="p-6 pb-4 border-b border-white/10 bg-black backdrop-blur-sm">
              <div className="flex items-center justify-between">
                    <h2 className="text-slate-100 text-xl font-semibold">
                    Counselor Details - {counselor.name}
                    </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="text-slate-400 hover:text-slate-100 hover:bg-white/10 rounded-full h-9 w-9 p-0 transition-all duration-200 hover:scale-110"
                >
                  <span className="text-lg">×</span>
                </Button>
              </div>
            </div>
        
          <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 p-6 bg-black overflow-y-auto h-[calc(100%-80px)]">
            {/* Left Side - Counselor Details */}
            <div className="space-y-6">
              <Card className="bg-white/5 border-white/10">
                <CardHeader className="pb-4">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={counselor.avatar} alt={counselor.name} />
                      <AvatarFallback className="bg-slate-900 text-slate-300 text-lg">
                        {counselor.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <CardTitle className="text-slate-100 text-xl">{counselor.name}</CardTitle>
                      <div className="flex items-center gap-2 mt-2">
                        <StatusBadge status={counselor.status} />
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-[#FBBF24] fill-current" />
                          <span className="text-slate-300 text-sm">{counselor.rating}</span>
                          <span className="text-slate-500 text-sm">({counselor.totalRatings} reviews)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-3">
                      <Mail className="h-4 w-4 text-slate-400" />
                      <span className="text-slate-300">{counselor.email}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="h-4 w-4 text-slate-400" />
                      <span className="text-slate-300">{counselor.phone}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="h-4 w-4 text-slate-400" />
                      <span className="text-slate-300">{counselor.location}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar className="h-4 w-4 text-slate-400" />
                      <span className="text-slate-300">Joined {new Date(counselor.joinDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                  
                  <Separator className="bg-white/10" />
                  
                  <div>
                    <h4 className="font-medium text-slate-100 mb-2">About</h4>
                    <p className="text-slate-300 text-sm leading-relaxed">{counselor.bio}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-slate-100 mb-3">Specializations</h4>
                    <div className="flex flex-wrap gap-2">
                      {counselor.specializations.map((spec, index) => (
                        <Badge key={index} variant="outline" className="bg-[#60A5FA]/20 text-[#60A5FA] border-[#60A5FA]/30">
                          {spec}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <Separator className="bg-white/10" />
                  
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-[#E5E7EB]">{counselor.assignedStudents}</div>
                      <div className="text-sm text-slate-400">Assigned Students</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-[#E5E7EB]">{counselor.totalSessions}</div>
                      <div className="text-sm text-slate-400">Total Sessions</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-[#E5E7EB]">{counselor.experience}</div>
                      <div className="text-sm text-slate-400">Experience</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Side - Students List */}
            <div className="space-y-6 h-full">
              <Card className="bg-white/5 border-white/10 h-full flex flex-col">
                <CardHeader className="flex-shrink-0">
                  <CardTitle className="text-slate-100 flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Assigned Students ({counselor.students.length})
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="p-0 flex-1 flex flex-col">
                  <ScrollArea className="flex-1">
                    <div className="p-6 pt-0 space-y-4">
                      {counselor.students.map((student) => (
                        <div key={student.id} className="rounded-lg border border-white/10 bg-white/5 p-4 hover:bg-white/10 transition-colors">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-3">
                              <Avatar className="h-10 w-10">
                                <AvatarImage src={student.avatar} alt={student.name} />
                                <AvatarFallback className="bg-slate-900 text-slate-300">
                                  {student.anonymousId.slice(-2)}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <h4 className="font-medium text-slate-100">{student.anonymousId}</h4>
                                <div className="flex items-center gap-2 mt-1">
                                  <StatusBadge status={student.status} />
                                  <span className="text-xs text-slate-400">
                                    Mood: {student.mood}/10
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="mt-3 grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-slate-400">Total Sessions:</span>
                              <span className="text-slate-300 ml-2">{student.totalSessions}</span>
                            </div>
                            <div>
                              <span className="text-slate-400">Last Session:</span>
                              <span className="text-slate-300 ml-2">{new Date(student.lastSession).toLocaleDateString()}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      {counselor.students.length === 0 && (
                        <div className="text-center text-slate-400 py-8">
                          <Users className="h-8 w-8 mx-auto mb-2 opacity-50" />
                          <p>No students assigned</p>
                        </div>
                      )}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>
          </div>
          </div>
        </div>
      )}
    </>
  )
}
